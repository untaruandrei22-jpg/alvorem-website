export type AlvoMarkdownInlineSegment = {
  text: string;
  strong: boolean;
};

export type AlvoMarkdownListItem = {
  inline: AlvoMarkdownInlineSegment[];
  details: AlvoMarkdownInlineSegment[][];
};

export type AlvoMarkdownBlock =
  | {
      kind: "paragraph";
      inline: AlvoMarkdownInlineSegment[];
    }
  | {
      kind: "ordered_list";
      items: AlvoMarkdownListItem[];
    }
  | {
      kind: "unordered_list";
      items: AlvoMarkdownInlineSegment[][];
    };

const ESCAPED_MARKDOWN_PUNCTUATION = /\\([\\\`*_[\]{}()#+\-.!>])/g;
const STRONG_PATTERN = /\*\*([^*\n]+)\*\*/g;
const ORDERED_ITEM_PATTERN = /^\s*\d+[.)]\s+(.+)$/;
const UNORDERED_ITEM_PATTERN = /^\s*[-•]\s+(.+)$/;

export function normalizeAlvoMarkdown(text: string): string {
  return text.replace(ESCAPED_MARKDOWN_PUNCTUATION, "$1");
}

export function parseAlvoMarkdownInline(
  text: string,
): AlvoMarkdownInlineSegment[] {
  const normalized = normalizeAlvoMarkdown(text);
  const segments: AlvoMarkdownInlineSegment[] = [];
  let cursor = 0;

  for (const match of normalized.matchAll(STRONG_PATTERN)) {
    const index = match.index ?? 0;
    if (index > cursor) {
      segments.push({
        text: normalized.slice(cursor, index),
        strong: false,
      });
    }
    segments.push({
      text: match[1],
      strong: true,
    });
    cursor = index + match[0].length;
  }

  if (cursor < normalized.length) {
    segments.push({
      text: normalized.slice(cursor),
      strong: false,
    });
  }

  return segments.length > 0
    ? segments
    : [{ text: normalized, strong: false }];
}

export function parseAlvoMarkdown(text: string): AlvoMarkdownBlock[] {
  const normalized = normalizeAlvoMarkdown(text)
    .replace(/\r\n?/g, "\n")
    .trim();
  if (!normalized) return [];

  const lines = normalized.split("\n");
  const blocks: AlvoMarkdownBlock[] = [];
  let index = 0;

  while (index < lines.length) {
    const current = lines[index].trim();
    if (!current) {
      index += 1;
      continue;
    }

    const ordered = current.match(ORDERED_ITEM_PATTERN);
    if (ordered) {
      const items: AlvoMarkdownListItem[] = [];
      while (index < lines.length) {
        const orderedLine = lines[index].trim().match(ORDERED_ITEM_PATTERN);
        if (!orderedLine) break;

        index += 1;
        const details: AlvoMarkdownInlineSegment[][] = [];
        while (index < lines.length) {
          const detailLine = lines[index].trim();
          const detail = detailLine.match(UNORDERED_ITEM_PATTERN);
          if (!detail) break;
          details.push(parseAlvoMarkdownInline(detail[1]));
          index += 1;
        }

        items.push({
          inline: parseAlvoMarkdownInline(orderedLine[1]),
          details,
        });

        while (index < lines.length && !lines[index].trim()) {
          index += 1;
        }
      }
      blocks.push({ kind: "ordered_list", items });
      continue;
    }

    const unordered = current.match(UNORDERED_ITEM_PATTERN);
    if (unordered) {
      const items: AlvoMarkdownInlineSegment[][] = [];
      while (index < lines.length) {
        const line = lines[index].trim().match(UNORDERED_ITEM_PATTERN);
        if (!line) break;
        items.push(parseAlvoMarkdownInline(line[1]));
        index += 1;
      }
      blocks.push({ kind: "unordered_list", items });
      continue;
    }

    const paragraph: string[] = [];
    while (index < lines.length) {
      const line = lines[index].trim();
      if (!line) break;
      if (
        paragraph.length > 0 &&
        (ORDERED_ITEM_PATTERN.test(line) || UNORDERED_ITEM_PATTERN.test(line))
      ) {
        break;
      }
      paragraph.push(line);
      index += 1;
    }
    blocks.push({
      kind: "paragraph",
      inline: parseAlvoMarkdownInline(paragraph.join(" ")),
    });
  }

  return blocks;
}
