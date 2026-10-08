"use client";

import { useState } from "react";
import { PlayIcon } from "@/components/icons";
import { dashboardVideos, type VideoItem } from "@/content/dashboard";
import { cn } from "@/lib/cn";

const thumbGradients: Record<VideoItem["theme"], string> = {
  violet: "bg-[linear-gradient(135deg,#5b22e8_0%,#7c3cff_100%)]",
  orange: "bg-[linear-gradient(135deg,#ff7a1a_0%,#ffb066_100%)]",
  navy: "bg-[linear-gradient(135deg,#06142e_0%,#1c3f7a_100%)]",
  teal: "bg-[linear-gradient(135deg,#148c8c_0%,#2bc4b0_100%)]",
};

const categories = [
  "Todos",
  ...Array.from(new Set(dashboardVideos.map((video) => video.category))),
];

export function VideoLibrary() {
  const [category, setCategory] = useState("Todos");

  const visible =
    category === "Todos"
      ? dashboardVideos
      : dashboardVideos.filter((video) => video.category === category);

  return (
    <div>
      <div
        role="tablist"
        aria-label="Filtrar videos por categoría"
        className="mb-5 flex flex-wrap gap-2"
      >
        {categories.map((item) => {
          const isActive = item === category;
          return (
            <button
              key={item}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setCategory(item)}
              className={cn(
                "rounded-full border px-4 py-2 text-[0.84rem] font-bold transition",
                isActive
                  ? "border-transparent brand-gradient text-white shadow-[0_10px_24px_rgb(91_34_232_/_0.2)]"
                  : "border-line bg-surface text-muted hover:-translate-y-0.5 hover:border-brand/40 hover:text-ink",
              )}
            >
              {item}
            </button>
          );
        })}
      </div>

      <div className="grid gap-[18px] sm:grid-cols-2 xl:grid-cols-3">
        {visible.map((video) => (
          <article
            key={video.title}
            className="group overflow-hidden rounded-[20px] border border-line bg-surface shadow-[var(--shadow-soft)] transition duration-200 hover:-translate-y-1.5 hover:shadow-[var(--shadow)]"
          >
            <div className={cn("relative aspect-video", thumbGradients[video.theme])}>
              <span
                aria-hidden="true"
                className="absolute inset-0 bg-[radial-gradient(circle_at_25%_20%,rgb(255_255_255_/_0.28),transparent_58%)]"
              />
              <span className="absolute top-3 left-3 rounded-full bg-white/90 px-3 py-1 text-[0.7rem] font-extrabold tracking-[0.04em] text-brand uppercase">
                {video.category}
              </span>
              <span className="absolute right-3 bottom-3 rounded-full bg-navy/85 px-2.5 py-1 text-[0.72rem] font-bold text-white backdrop-blur-[6px]">
                {video.duration}
              </span>
              <button
                type="button"
                aria-label={`Reproducir ${video.title}`}
                className="absolute inset-0 grid place-items-center"
              >
                <span className="grid size-14 place-items-center rounded-full bg-white/92 text-brand shadow-[0_12px_28px_rgb(6_20_46_/_0.28)] transition duration-200 group-hover:scale-110">
                  <PlayIcon className="size-6 translate-x-0.5" />
                </span>
              </button>
            </div>

            <div className="p-[18px]">
              <h4 className="text-[1.02rem] leading-tight font-bold tracking-[-0.03em]">
                {video.title}
              </h4>
              <p className="mt-2 text-[0.88rem] text-muted">{video.text}</p>
              <div className="mt-3.5 flex items-center justify-between gap-3 border-t border-line pt-3 text-[0.78rem] text-muted">
                <span className="font-semibold text-ink">{video.author}</span>
                <span>{video.views}</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
