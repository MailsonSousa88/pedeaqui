/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import type { AppRoute } from '../../../../app/routes/types';
import { SecondaryButton } from '../../../../shared/components/SecondaryButton';

type LegalDocumentPageProps = {
  content: string;
  onNavigate: (route: AppRoute, planId?: number) => void;
};

const isTableDivider = (line: string) => /^\|\s*:?-{3,}:?\s*(\|\s*:?-{3,}:?\s*)+\|$/.test(line);

const splitTableRow = (line: string) =>
  line
    .trim()
    .replace(/^\|/, '')
    .replace(/\|$/, '')
    .split('|')
    .map((cell) => cell.trim());

const renderInlineText = (text: string) => {
  const parts = text.split(/(\[[^\]]+\]\([^)]+\)|`[^`]+`|\*\*[^*]+\*\*)/g);

  return parts.map((part, index) => {
    const linkMatch = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);

    if (linkMatch) {
      const [, label, href] = linkMatch;
      const resolvedHref =
        href === 'privacy-policy.md'
          ? '/politica-de-privacidade'
          : href === 'termos-of-use.md'
            ? '/termos-de-uso'
            : href.startsWith('http')
              ? href
              : '#';

      return (
        <a
          key={`${part}-${index}`}
          href={resolvedHref}
          className="font-semibold text-primary underline-offset-4 hover:underline"
          rel={href.startsWith('http') ? 'noreferrer' : undefined}
          target={href.startsWith('http') ? '_blank' : undefined}
        >
          {label}
        </a>
      );
    }

    if (part.startsWith('`') && part.endsWith('`')) {
      return (
        <code
          key={`${part}-${index}`}
          className="rounded-md bg-slate-100 px-1.5 py-0.5 font-mono text-[0.9em] text-slate-800"
        >
          {part.slice(1, -1)}
        </code>
      );
    }

    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={`${part}-${index}`}>{part.slice(2, -2)}</strong>;
    }

    return part;
  });
};

const getHeadingId = (text: string) =>
  text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

export function LegalDocumentPage({ content, onNavigate }: LegalDocumentPageProps) {
  const lines = content.split('\n');
  const elements = [];
  let index = 0;

  while (index < lines.length) {
    const line = lines[index].trim();

    if (!line) {
      index += 1;
      continue;
    }

    if (line.startsWith('# ')) {
      elements.push(
        <h1
          key={`h1-${index}`}
          className="font-display text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl"
        >
          {renderInlineText(line.replace(/^# /, ''))}
        </h1>,
      );
      index += 1;
      continue;
    }

    if (line.startsWith('## ')) {
      const heading = line.replace(/^## /, '');
      elements.push(
        <h2
          key={`h2-${index}`}
          id={getHeadingId(heading)}
          className="scroll-mt-28 border-t border-slate-200 pt-8 font-display text-2xl font-extrabold tracking-tight text-slate-900"
        >
          {renderInlineText(heading)}
        </h2>,
      );
      index += 1;
      continue;
    }

    if (line.startsWith('### ')) {
      const heading = line.replace(/^### /, '');
      elements.push(
        <h3
          key={`h3-${index}`}
          id={getHeadingId(heading)}
          className="scroll-mt-28 font-sans text-lg font-bold text-slate-900"
        >
          {renderInlineText(heading)}
        </h3>,
      );
      index += 1;
      continue;
    }

    if (line.startsWith('> ')) {
      elements.push(
        <blockquote
          key={`quote-${index}`}
          className="rounded-2xl border border-primary/15 bg-primary/5 p-5 text-sm leading-relaxed text-slate-700"
        >
          {renderInlineText(line.replace(/^> /, ''))}
        </blockquote>,
      );
      index += 1;
      continue;
    }

    if (line.startsWith('|') && lines[index + 1] && isTableDivider(lines[index + 1].trim())) {
      const headers = splitTableRow(line);
      const rows = [];
      index += 2;

      while (index < lines.length && lines[index].trim().startsWith('|')) {
        rows.push(splitTableRow(lines[index].trim()));
        index += 1;
      }

      elements.push(
        <div key={`table-${index}`} className="overflow-x-auto rounded-2xl border border-slate-200 bg-white">
          <table className="w-full min-w-[640px] border-collapse text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
              <tr>
                {headers.map((header) => (
                  <th key={header} className="border-b border-slate-200 px-4 py-3 font-bold">
                    {renderInlineText(header)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-600">
              {rows.map((row, rowIndex) => (
                <tr key={`row-${rowIndex}`} className="align-top">
                  {row.map((cell, cellIndex) => (
                    <td key={`${cell}-${cellIndex}`} className="px-4 py-3 leading-relaxed">
                      {renderInlineText(cell)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>,
      );
      continue;
    }

    if (line.startsWith('- ')) {
      const items = [];

      while (index < lines.length && lines[index].trim().startsWith('- ')) {
        items.push(lines[index].trim().replace(/^- /, ''));
        index += 1;
      }

      elements.push(
        <ul key={`ul-${index}`} className="list-disc space-y-2 pl-6 text-sm leading-relaxed text-slate-600 sm:text-base">
          {items.map((item) => (
            <li key={item}>{renderInlineText(item)}</li>
          ))}
        </ul>,
      );
      continue;
    }

    if (/^\d+\.\s/.test(line)) {
      const items = [];

      while (index < lines.length && /^\d+\.\s/.test(lines[index].trim())) {
        items.push(lines[index].trim().replace(/^\d+\.\s/, ''));
        index += 1;
      }

      elements.push(
        <ol key={`ol-${index}`} className="list-decimal space-y-2 pl-6 text-sm leading-relaxed text-slate-600 sm:text-base">
          {items.map((item) => (
            <li key={item}>{renderInlineText(item)}</li>
          ))}
        </ol>,
      );
      continue;
    }

    elements.push(
      <p key={`p-${index}`} className="text-sm leading-relaxed text-slate-600 sm:text-base">
        {renderInlineText(line)}
      </p>,
    );
    index += 1;
  }

  return (
    <section className="bg-slate-50 py-12 sm:py-16">
      <div className="mx-auto flex max-w-5xl flex-col gap-8 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4">
          <span className="w-fit rounded-full bg-primary/10 px-3 py-1 font-sans text-xs font-extrabold uppercase tracking-widest text-primary">
            Documento legal
          </span>
          <SecondaryButton className="w-fit" onClick={() => onNavigate('/')}>
            Voltar ao início
          </SecondaryButton>
        </div>

        <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8 lg:p-10">
          <div className="flex flex-col gap-6">{elements}</div>
        </article>
      </div>
    </section>
  );
}
