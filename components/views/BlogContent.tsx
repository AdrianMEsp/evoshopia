"use client";

import Image from "next/image";
import {
  BlocksRenderer,
  type BlocksContent,
} from "@strapi/blocks-react-renderer";
import { resolveMediaUrl } from "@/lib/api";

export function BlogContent({ content }: { content: BlocksContent }) {
  if (!Array.isArray(content) || content.length === 0) return null;

  return (
    <div className="mt-5 border-t border-line pt-4">
      <BlocksRenderer
        content={content}
        blocks={{
          paragraph: ({ children }) => (
            <p className="mt-3 text-[0.95rem] leading-7 text-muted first:mt-0">
              {children}
            </p>
          ),
          heading: ({ children, level }) => {
            if (level <= 2) {
              return (
                <h4 className="mt-5 text-[1.1rem] font-bold tracking-[-0.03em]">
                  {children}
                </h4>
              );
            }

            if (level <= 4) {
              return (
                <h5 className="mt-4 text-[1.02rem] font-bold tracking-[-0.03em]">
                  {children}
                </h5>
              );
            }

            return (
              <h6 className="mt-4 text-[0.95rem] font-bold tracking-[-0.02em]">
                {children}
              </h6>
            );
          },
          list: ({ children, format }) =>
            format === "ordered" ? (
              <ol className="mt-3 list-decimal space-y-1 pl-5 text-[0.95rem] leading-7 text-muted">
                {children}
              </ol>
            ) : (
              <ul className="mt-3 list-disc space-y-1 pl-5 text-[0.95rem] leading-7 text-muted">
                {children}
              </ul>
            ),
          "list-item": ({ children }) => <li>{children}</li>,
          quote: ({ children }) => (
            <blockquote className="mt-4 border-l-4 border-brand/50 pl-4 text-[0.95rem] leading-7 text-ink italic">
              {children}
            </blockquote>
          ),
          code: ({ children }) => (
            <pre className="mt-4 overflow-x-auto rounded-xl bg-navy p-4 text-[0.85rem] leading-6 text-white">
              <code>{children}</code>
            </pre>
          ),
          image: ({ image }) => {
            const src = resolveMediaUrl(image.url);
            if (!src) return null;

            return (
              <figure className="mt-4 overflow-hidden rounded-2xl">
                <Image
                  src={src}
                  alt={image.alternativeText ?? ""}
                  width={image.width || 1200}
                  height={image.height || 675}
                  className="h-auto w-full object-cover"
                />
                {image.caption ? (
                  <figcaption className="mt-2 text-[0.8rem] text-muted">
                    {image.caption}
                  </figcaption>
                ) : null}
              </figure>
            );
          },
          link: ({ children, url }) => (
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-brand underline underline-offset-2"
            >
              {children}
            </a>
          ),
        }}
        modifiers={{
          bold: ({ children }) => <strong>{children}</strong>,
          italic: ({ children }) => <em>{children}</em>,
          underline: ({ children }) => <u>{children}</u>,
          strikethrough: ({ children }) => <s>{children}</s>,
          code: ({ children }) => (
            <code className="rounded bg-surface-2 px-1.5 py-0.5 text-[0.88em]">
              {children}
            </code>
          ),
        }}
      />
    </div>
  );
}
