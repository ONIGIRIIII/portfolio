"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

const RAMP = " .:-+*#%@";
const DRIFT_SPEED = 0.09; // px per ms, ambient drift once released
const INITIAL_HOLD_MS = 3000; // both rows sit still on the English name before drifting
const SEP = "   /   ";

interface Cell {
  x: number;
  y: number;
  coverage: number;
}

interface WordSpan {
  start: number;
  width: number;
}

interface RowState {
  cells: Cell[];
  patternWidth: number;
  spans: WordSpan[];
  scrollX: number;
  cellW: number;
  cellH: number;
}

function freshRow(): RowState {
  return { cells: [], patternWidth: 0, spans: [], scrollX: 0, cellW: 8, cellH: 15 };
}

interface AsciiNameSlotProps {
  firsts: string[];
  lasts: string[];
  className?: string;
}

export function AsciiNameSlot({ firsts, lasts, className = "" }: AsciiNameSlotProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const topRef = useRef<HTMLCanvasElement>(null);
  const bottomRef = useRef<HTMLCanvasElement>(null);
  const mouseTopRef = useRef({ x: -9999, y: -9999 });
  const mouseBottomRef = useRef({ x: -9999, y: -9999 });
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const container = containerRef.current;
    const canvasTop = topRef.current;
    const canvasBottom = bottomRef.current;
    if (!container || !canvasTop || !canvasBottom) return;
    const ctxTop = canvasTop.getContext("2d");
    const ctxBottom = canvasBottom.getContext("2d");
    if (!ctxTop || !ctxBottom) return;

    // "Nirmala UI" (Windows) and the Noto/Kohinoor families cover Devanagari
    // and Gurmukhi with correct conjunct shaping — generic monospace/sans-serif
    // fonts often lack that, rendering broken/disconnected glyphs instead.
    const fontStack = `ui-monospace, "SFMono-Regular", "Nirmala UI", "Noto Sans Devanagari", "Noto Sans Gurmukhi", "Kohinoor Devanagari", "Gurmukhi MN", "Noto Sans", monospace, sans-serif`;

    let width = 0;
    let rowHeight = 0;
    let raf = 0;
    let lastTime = 0;
    let driftStartTime = 0;
    const rowTop = freshRow();
    const rowBottom = freshRow();

    function colors() {
      const styles = getComputedStyle(document.documentElement);
      const fg = styles.getPropertyValue("--color-fg").trim() || "10 10 10";
      const accent = styles.getPropertyValue("--color-accent").trim() || "196 0 16";
      const accent2 = styles.getPropertyValue("--accent-blue").trim() || "37 99 235";
      return { fg, accent, accent2 };
    }

    function buildRow(words: string[], row: RowState, canvasH: number) {
      const vPad = canvasH * 0.04;
      const scratch = document.createElement("canvas");
      const sctx = scratch.getContext("2d");
      if (!sctx) return;

      function measure(t: string, size: number) {
        sctx!.font = `800 ${size}px ${fontStack}`;
        const m = sctx!.measureText(t);
        return {
          width: m.width,
          ascent: m.actualBoundingBoxAscent || size * 0.8,
          descent: m.actualBoundingBoxDescent || size * 0.25,
        };
      }

      const fullText = words.join(SEP) + SEP;

      let lo = 10;
      let hi = canvasH * 2.5;
      let fontSize = lo;
      for (let iter = 0; iter < 20; iter++) {
        const mid = (lo + hi) / 2;
        const m = measure(fullText, mid);
        if (m.ascent + m.descent <= canvasH - vPad * 2) {
          fontSize = mid;
          lo = mid;
        } else {
          hi = mid;
        }
      }

      const m = measure(fullText, fontSize);
      row.patternWidth = m.width;
      // Grid resolution is derived from the font size (not container width)
      // so glyphs keep a constant amount of sampled detail regardless of
      // how big the text ends up — coarser grids at a fixed size lose the
      // letterform, finer grids at a small size just look crammed.
      row.cellH = Math.max(7, Math.round(fontSize / 11));
      row.cellW = Math.max(4, Math.round(row.cellH / 1.85));

      const sepWidth = measure(SEP, fontSize).width;
      let cursor = 0;
      const spans: WordSpan[] = [];
      for (const w of words) {
        const ww = measure(w, fontSize).width;
        spans.push({ start: cursor, width: ww });
        cursor += ww + sepWidth;
      }
      row.spans = spans;

      const maskW = Math.max(1, Math.ceil(row.patternWidth) + row.cellW * 4);
      const maskH = canvasH;
      const mask = document.createElement("canvas");
      mask.width = maskW;
      mask.height = maskH;
      const mctx = mask.getContext("2d", { willReadFrequently: true });
      if (!mctx) return;
      mctx.clearRect(0, 0, maskW, maskH);
      mctx.fillStyle = "#fff";
      mctx.textAlign = "left";
      mctx.textBaseline = "alphabetic";
      mctx.font = `800 ${fontSize}px ${fontStack}`;
      const baselineY = maskH / 2 + (m.ascent - m.descent) / 2;
      mctx.fillText(fullText, 0, baselineY);

      const data = mctx.getImageData(0, 0, maskW, maskH).data;
      const cols = Math.ceil(maskW / row.cellW);
      const rows = Math.ceil(maskH / row.cellH);
      const next: Cell[] = [];
      const steps = 3;
      for (let gy = 0; gy < rows; gy++) {
        for (let gx = 0; gx < cols; gx++) {
          const cellX0 = gx * row.cellW;
          const cellY0 = gy * row.cellH;
          let alpha = 0;
          for (let sy = 0; sy < steps; sy++) {
            for (let sx = 0; sx < steps; sx++) {
              const px = Math.min(maskW - 1, Math.round(cellX0 + ((sx + 0.5) * row.cellW) / steps));
              const py = Math.min(maskH - 1, Math.round(cellY0 + ((sy + 0.5) * row.cellH) / steps));
              const a = data[(py * maskW + px) * 4 + 3] / 255;
              if (a > alpha) alpha = a;
            }
          }
          if (alpha > 0.2) {
            const px = Math.min(maskW - 1, Math.round(cellX0 + row.cellW / 2));
            const py = Math.min(maskH - 1, Math.round(cellY0 + row.cellH / 2));
            next.push({ x: px, y: py, coverage: alpha });
          }
        }
      }
      row.cells = next;

      // Start with the first (English) word centered — the row sits here
      // until driftStartTime releases it.
      const first = spans[0];
      if (first) {
        row.scrollX = width / 2 - (first.start + first.width / 2);
      }
    }

    function build() {
      if (!container || !canvasTop || !canvasBottom || !ctxTop || !ctxBottom) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = container.clientWidth;
      rowHeight = container.clientHeight / 2;
      if (width === 0 || rowHeight === 0) return;

      canvasTop.width = width * dpr;
      canvasTop.height = rowHeight * dpr;
      canvasTop.style.width = `${width}px`;
      canvasTop.style.height = `${rowHeight}px`;
      ctxTop.setTransform(dpr, 0, 0, dpr, 0, 0);

      canvasBottom.width = width * dpr;
      canvasBottom.height = rowHeight * dpr;
      canvasBottom.style.width = `${width}px`;
      canvasBottom.style.height = `${rowHeight}px`;
      ctxBottom.setTransform(dpr, 0, 0, dpr, 0, 0);

      buildRow(firsts, rowTop, rowHeight);
      buildRow(lasts, rowBottom, rowHeight);

      const family = getComputedStyle(container).fontFamily || "monospace";
      ctxTop.font = `${Math.max(10, rowTop.cellH * 0.72)}px ${family}`;
      ctxTop.textAlign = "center";
      ctxTop.textBaseline = "middle";
      ctxBottom.font = `${Math.max(10, rowBottom.cellH * 0.72)}px ${family}`;
      ctxBottom.textAlign = "center";
      ctxBottom.textBaseline = "middle";
    }

    function updateRow(row: RowState, dt: number, dir: 1 | -1, time: number, paused: boolean) {
      if (row.patternWidth <= 0) return;
      if (!reduceMotion && !paused && time >= driftStartTime) {
        row.scrollX += dir * DRIFT_SPEED * dt;
      }
      while (row.scrollX <= -row.patternWidth) row.scrollX += row.patternWidth;
      while (row.scrollX >= row.patternWidth) row.scrollX -= row.patternWidth;
    }

    function drawRow(
      ctx: CanvasRenderingContext2D,
      row: RowState,
      h: number,
      fg: string,
      accent: string,
      accent2: string,
      mouse: { x: number; y: number },
    ) {
      ctx.clearRect(0, 0, width, h);
      if (row.patternWidth <= 0) return;
      const repeats = Math.ceil(width / row.patternWidth) + 2;
      for (let r = -1; r < repeats; r++) {
        const baseX = row.scrollX + r * row.patternWidth;
        if (baseX > width || baseX + row.patternWidth < 0) continue;
        for (const c of row.cells) {
          const cx = baseX + c.x;
          if (cx < -row.cellW || cx > width + row.cellW) continue;

          const dx = cx - mouse.x;
          const dy = c.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const proximity = Math.max(0, 1 - dist / 130);

          const intensity = Math.min(1, c.coverage + proximity * 0.55);
          const charIndex = Math.min(RAMP.length - 1, Math.floor(intensity * RAMP.length));
          const char = RAMP[charIndex];
          if (char === " ") continue;

          const twinkle = !reduceMotion && proximity > 0.65 && Math.random() < 0.04;
          const color = twinkle ? accent2 : proximity > 0.15 ? accent : fg;
          const alpha = Math.min(1, 0.35 + intensity * 0.75);

          ctx.fillStyle = `rgb(${color} / ${alpha})`;
          const scale = 1 + proximity * 0.3;
          if (scale !== 1) {
            ctx.save();
            ctx.translate(cx, c.y);
            ctx.scale(scale, scale);
            ctx.fillText(char, 0, 0);
            ctx.restore();
          } else {
            ctx.fillText(char, cx, c.y);
          }
        }
      }
    }

    function draw(time: number) {
      if (!ctxTop || !ctxBottom) return;
      if (!lastTime) lastTime = time;
      const dt = Math.min(50, time - lastTime);
      lastTime = time;

      updateRow(rowTop, dt, -1, time, mouseTopRef.current.x > -9000);
      updateRow(rowBottom, dt, 1, time, mouseBottomRef.current.x > -9000);

      const { fg, accent, accent2 } = colors();
      drawRow(ctxTop, rowTop, rowHeight, fg, accent, accent2, mouseTopRef.current);
      drawRow(ctxBottom, rowBottom, rowHeight, fg, accent, accent2, mouseBottomRef.current);

      raf = requestAnimationFrame(draw);
    }

    const ro = new ResizeObserver(() => build());
    ro.observe(container);
    build();
    driftStartTime = performance.now() + INITIAL_HOLD_MS;
    raf = requestAnimationFrame(draw);

    function onMoveTop(e: MouseEvent) {
      const rect = canvasTop!.getBoundingClientRect();
      mouseTopRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    }
    function onMoveBottom(e: MouseEvent) {
      const rect = canvasBottom!.getBoundingClientRect();
      mouseBottomRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    }
    function onLeaveTop() {
      mouseTopRef.current = { x: -9999, y: -9999 };
    }
    function onLeaveBottom() {
      mouseBottomRef.current = { x: -9999, y: -9999 };
    }
    canvasTop.addEventListener("mousemove", onMoveTop);
    canvasTop.addEventListener("mouseleave", onLeaveTop);
    canvasBottom.addEventListener("mousemove", onMoveBottom);
    canvasBottom.addEventListener("mouseleave", onLeaveBottom);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      canvasTop.removeEventListener("mousemove", onMoveTop);
      canvasTop.removeEventListener("mouseleave", onLeaveTop);
      canvasBottom.removeEventListener("mousemove", onMoveBottom);
      canvasBottom.removeEventListener("mouseleave", onLeaveBottom);
    };
  }, [firsts, lasts, reduceMotion]);

  return (
    <div ref={containerRef} className={`relative flex flex-col overflow-hidden ${className}`}>
      <canvas ref={topRef} className="block w-full" aria-hidden="true" style={{ height: "50%" }} />
      <canvas ref={bottomRef} className="block w-full" aria-hidden="true" style={{ height: "50%" }} />
      <div className="from-bg pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r to-transparent" />
      <div className="from-bg pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l to-transparent" />
    </div>
  );
}
