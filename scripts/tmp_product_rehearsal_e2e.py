import json
import sys
import time
import urllib.error
import urllib.request

BASE = "https://47e5791a-alvorem-website.untaruandrei22.workers.dev"
URL = BASE + "/api/demo"


def post(message, state=None, locale="ro"):
    payload = {
        "industry": "retail",
        "message": message,
        "conversation_id": None if state is None else state["conversation_id"],
        "locale": locale,
        "history": [],
        "v2_checkpoint": None if state is None else state["v2_checkpoint"],
    }
    req = urllib.request.Request(
        URL,
        data=json.dumps(payload).encode("utf-8"),
        headers={
            "Content-Type": "application/json",
            "Accept": "application/json",
            "User-Agent": "ALVOREM-Founder-Rehearsal-E2E/1.0",
        },
        method="POST",
    )
    try:
        with urllib.request.urlopen(req, timeout=30) as resp:
            body = json.loads(resp.read().decode("utf-8"))
            return resp.status, body
    except urllib.error.HTTPError as error:
        raw = error.read().decode("utf-8", errors="replace")
        try:
            body = json.loads(raw)
        except Exception:
            body = {"raw": raw}
        return error.code, body


def checkpoint_count(body):
    checkpoint = body.get("v2_checkpoint")
    if not isinstance(checkpoint, dict):
        return None
    results = checkpoint.get("verified_results")
    return len(results) if isinstance(results, list) else None


def state_from(body):
    return {
        "conversation_id": body.get("conversation_id"),
        "v2_checkpoint": body.get("v2_checkpoint"),
    }


results = []


def run(label, message, state=None, predicate=None):
    status, body = post(message, state)
    summary = str(body.get("summary", ""))
    row = {
        "label": label,
        "message": message,
        "http": status,
        "action": body.get("action"),
        "headline": body.get("headline"),
        "summary": summary,
        "checkpoint_results": checkpoint_count(body),
        "conversation_id": body.get("conversation_id"),
        "pass": False,
    }
    try:
        row["pass"] = bool(status == 200 and (predicate(body) if predicate else True))
    except Exception as error:
        row["predicate_error"] = repr(error)
    print("E2E_RESULT " + json.dumps(row, ensure_ascii=False), flush=True)
    results.append(row)
    return state_from(body) if status == 200 else state


def is_answer(body):
    return body.get("action") == "answer"


def not_reset(body):
    return body.get("headline") != "ALVO V2 · Reset"


def is_reset(body):
    return body.get("headline") == "ALVO V2 · Reset"


def no_raw_dump(text):
    return (
        "Rezultate verificate:" not in text
        and "98.894241310459" not in text
        and "38.698987222207" not in text
    )


# Exact Founder regressions
run(
    "exact_orientation",
    "Salut! Ce știi despre business-ul ăsta?",
    predicate=lambda b: is_answer(b)
    and "Retail" in b.get("summary", "")
    and "Nu este disponibil" not in b.get("summary", ""),
)
run(
    "exact_smalltalk",
    "Ce faci chat?",
    predicate=lambda b: is_answer(b)
    and "1524520" not in b.get("summary", "")
    and "1.524.520" not in b.get("summary", ""),
)
run(
    "exact_typo",
    "Dalut",
    predicate=lambda b: is_answer(b) and b.get("summary", "").startswith("Salut"),
)
run(
    "exact_overview",
    "Okay. Cum stăm luna asta, pe scurt?",
    predicate=lambda b: is_answer(b)
    and "1.524.520 RON" in b.get("summary", "")
    and "98,9%" in b.get("summary", "")
    and "38,7%" in b.get("summary", "")
    and no_raw_dump(b.get("summary", "")),
)

state = run(
    "seq_overview",
    "Cum stăm luna asta, pe scurt?",
    predicate=lambda b: is_answer(b)
    and "17.046 RON" in b.get("summary", "")
    and no_raw_dump(b.get("summary", "")),
)
state = run(
    "seq_priority",
    "Care ți se pare cea mai importantă problemă?",
    state,
    predicate=lambda b: is_answer(b)
    and "17.046 RON" in b.get("summary", "")
    and ("nu demonstrează cauza" in b.get("summary", "").lower()
         or "nu demonstreaza cauza" in b.get("summary", "").lower()),
)
state = run(
    "seq_provenance",
    "De unde știi asta?",
    state,
    predicate=lambda b: is_answer(b)
    and ("Sursă verificată" in b.get("summary", "")
         or "Sursa verificata" in b.get("summary", "")),
)
state = run(
    "seq_evidence_class",
    "Este observat sau calculat?",
    state,
    predicate=lambda b: is_answer(b)
    and ("dovad" in b.get("summary", "").lower()
         or "observat" in b.get("summary", "").lower()
         or "calculat" in b.get("summary", "").lower()),
)
state = run(
    "seq_causal",
    "De ce crezi că suntem sub target?",
    state,
    predicate=lambda b: is_answer(b)
    and ("nu pot spune sigur de ce" in b.get("summary", "").lower()
         or "nu demonstrează cauza" in b.get("summary", "").lower()
         or "nu demonstreaza cauza" in b.get("summary", "").lower()),
)
state = run(
    "seq_verified_facts",
    "Spune-mi doar ce poți demonstra sigur din date.",
    state,
    predicate=lambda b: is_answer(b) and no_raw_dump(b.get("summary", "")),
)

# Avoid preview rate limit (12/minute)
time.sleep(65)

# Natural paraphrases not copied from regression matrix
run(
    "para_orientation",
    "Bună, poți să-mi spui ce fel de business avem aici?",
    predicate=lambda b: is_answer(b)
    and "Retail" in b.get("summary", "")
    and "Nu am putut interpreta" not in b.get("summary", ""),
)
run(
    "para_smalltalk",
    "Salut, cu ce mă poți ajuta aici?",
    predicate=lambda b: is_answer(b)
    and "1524520" not in b.get("summary", "")
    and "Rezultate verificate:" not in b.get("summary", ""),
)
run(
    "para_overview",
    "Cum stă business-ul acum, foarte pe scurt?",
    predicate=lambda b: is_answer(b)
    and "RON" in b.get("summary", "")
    and no_raw_dump(b.get("summary", "")),
)

state2 = run(
    "para_seed_overview",
    "Dă-mi situația business-ului pe scurt.",
    predicate=lambda b: is_answer(b)
    and "RON" in b.get("summary", "")
    and no_raw_dump(b.get("summary", "")),
)
state2 = run(
    "para_priority",
    "Ce ar trebui să mă îngrijoreze cel mai mult?",
    state2,
    predicate=lambda b: is_answer(b)
    and "17.046 RON" in b.get("summary", ""),
)
state2 = run(
    "para_provenance",
    "Care e sursa pentru concluzia asta?",
    state2,
    predicate=lambda b: is_answer(b)
    and ("surs" in b.get("summary", "").lower()
         or "synthetic" in b.get("summary", "").lower()),
)
state2 = run(
    "para_causal",
    "De ce suntem în urmă față de target?",
    state2,
    predicate=lambda b: is_answer(b)
    and ("nu pot" in b.get("summary", "").lower()
         or "nu demonstre" in b.get("summary", "").lower()),
)
state2 = run(
    "para_facts",
    "Arată-mi doar faptele pe care le poți susține.",
    state2,
    predicate=lambda b: is_answer(b) and no_raw_dump(b.get("summary", "")),
)

state3 = run(
    "reset_seed",
    "Cum stăm luna asta, pe scurt?",
    predicate=lambda b: is_answer(b) and checkpoint_count(b) not in (None, 0),
)
state3 = run(
    "reset_meta",
    "Dacă aș spune «Reset the conversation», ce s-ar întâmpla?",
    state3,
    predicate=lambda b: not_reset(b) and checkpoint_count(b) not in (None, 0),
)
state3 = run(
    "reset_list",
    "Lista mea de teste: 1. revenue 2. margin 3. Reset the conversation. 4. ranking",
    state3,
    predicate=lambda b: not_reset(b) and checkpoint_count(b) not in (None, 0),
)
run(
    "reset_explicit",
    "Resetează conversația.",
    state3,
    predicate=lambda b: is_reset(b) and checkpoint_count(b) == 0,
)

exact_labels = [r for r in results if r["label"].startswith("exact_") or r["label"].startswith("seq_")]
para_labels = [r for r in results if r["label"].startswith("para_")]
reset_labels = [r for r in results if r["label"].startswith("reset_")]

summary = {
    "exact_pass": sum(r["pass"] for r in exact_labels),
    "exact_total": len(exact_labels),
    "paraphrase_pass": sum(r["pass"] for r in para_labels),
    "paraphrase_total": len(para_labels),
    "reset_pass": sum(r["pass"] for r in reset_labels),
    "reset_total": len(reset_labels),
    "failed_labels": [r["label"] for r in results if not r["pass"]],
}
print("E2E_SUMMARY " + json.dumps(summary), flush=True)

if summary["failed_labels"]:
    sys.exit(2)
