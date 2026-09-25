import assert from "node:assert/strict";
import test from "node:test";

import {
  normalizeAlvoMarkdown,
  parseAlvoMarkdown,
} from "../src/lib/alvo-demo-markdown.ts";

test("unescapes presentation markdown emitted inside structured JSON text", () => {
  assert.equal(
    normalizeAlvoMarkdown(
      String.raw`1\. \*\*Scorecard\*\*
\- Revenue vs target`,
    ),
    "1. **Scorecard**\n- Revenue vs target",
  );
});

test("parses ordered sections with nested bullets and bold labels", () => {
  const blocks = parseAlvoMarkdown(
    String.raw`A practical review:

1\. \*\*Scorecard — 5 min\*\*
\- Revenue vs target
\- Pipeline health

2\. \*\*Actions — 5 min\*\*
\- Owner and deadline`,
  );

  assert.equal(blocks.length, 2);
  assert.equal(blocks[0].kind, "paragraph");
  assert.deepEqual(blocks[0].inline, [
    { text: "A practical review:", strong: false },
  ]);

  assert.equal(blocks[1].kind, "ordered_list");
  assert.equal(blocks[1].items.length, 2);
  assert.deepEqual(blocks[1].items[0].inline, [
    { text: "Scorecard — 5 min", strong: true },
  ]);
  assert.deepEqual(blocks[1].items[0].body, []);
  assert.deepEqual(blocks[1].items[0].details, [
    [{ text: "Revenue vs target", strong: false }],
    [{ text: "Pipeline health", strong: false }],
  ]);
});

test("keeps numbered agenda items in one list when descriptions are separated by blank lines", () => {
  const blocks = parseAlvoMarkdown(
    String.raw`1\. \*\*5 min — Executive snapshot\*\*

Sales, margin, traffic, and conversion versus target.

1\. \*\*10 min — Regional performance\*\*

Each regional manager gives one key insight.

1\. \*\*5 min — Decisions\*\*

Confirm owners and deadlines.`,
  );

  assert.equal(blocks.length, 1);
  assert.equal(blocks[0].kind, "ordered_list");
  assert.equal(blocks[0].items.length, 3);
  assert.deepEqual(blocks[0].items.map((item) => item.body.length), [1, 1, 1]);
  assert.equal(blocks[0].items[1].body[0][0].text, "Each regional manager gives one key insight.");
});

test("keeps ordinary prose and percentages out of list parsing", () => {
  const blocks = parseAlvoMarkdown(
    "Revenue increased 1.5% compared with July.",
  );

  assert.deepEqual(blocks, [
    {
      kind: "paragraph",
      inline: [
        {
          text: "Revenue increased 1.5% compared with July.",
          strong: false,
        },
      ],
    },
  ]);
});
