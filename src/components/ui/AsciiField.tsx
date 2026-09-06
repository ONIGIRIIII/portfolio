"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

const RAMP = " .:-+*#%@";

interface Ripple {
  x: number;
  y: number;
  start: number;
}

function hash(x: number, y: number) {
  const s = Math.sin(x * 127.1 + y * 311.7) * 43758.5453;
  return s - Math.floor(s);
}

interface AsciiFieldProps {
  className?: string;
  cell?: number;
  intensity?: number;
}

export function AsciiField({ className = "", cell = 15, intensity = 1 }: AsciiFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const ripplesRef = useRef<Ripple[]>([]);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const CELL = cell;
    let width = 0;
    let height = 0;
    let cols = 0;
    let rows = 0;
    let raf = 0;

    function resize() {
      if (!canvas || !container || !ctx) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = container.clientWidth;
      height = container.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cols = Math.ceil(width / CELL);
      rows = Math.ceil(height / CELL);
      const family = getComputedStyle(container).fontFamily || "monospace";
      ctx.font = `${CELL - 3}px ${family}`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
    }

    function readColors() {
      const styles = getComputedStyle(document.documentElement);
      const fg = styles.getPropertyValue("--color-fg").trim() || "10 10 10";
      const accent = styles.getPropertyValue("--color-accent").trim() || "196 0 16";
      return { fg, accent };
    }

    // Reading computed styles forces a synchronous style recalc — expensive to
    // do every frame. Cache it and only refresh when the theme class changes.
    let cachedColors = readColors();
    const themeObserver = new MutationObserver(() => {
      cachedColors = readColors();
    });
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    // This redraws every cell in the viewport with trig + distance math and a
    // fillText call — real cost at 60fps. It's a slow ambient effect, so
    // capping it well below 60fps cuts CPU use a lot with no visible change.
    const FRAME_INTERVAL = 1000 / 24;
    let lastDrawTime = 0;

    function draw(time: number) {
      if (!ctx) return;
      if (time - lastDrawTime < FRAME_INTERVAL) {
        if (!reduceMotion) raf = requestAnimationFrame(draw);
        return;
      }
      lastDrawTime = time;
      ctx.clearRect(0, 0, width, height);
      const { fg, accent } = cachedColors;
      const mouse = mouseRef.current;
      const hoverRadius = CELL * 6;

      ripplesRef.current = ripplesRef.current.filter((r) => time - r.start < 1400);

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const cx = col * CELL + CELL / 2;
          const cy = row * CELL + CELL / 2;

          const seed = hash(col, row);
          const idle = reduceMotion
            ? seed * 0.45
            : (Math.sin(col * 0.35 + time * 0.0006 + seed * 6) *
                Math.cos(row * 0.35 - time * 0.0004 + seed * 6) +
                1) /
              2 *
              0.55;

          const dx = cx - mouse.x;
          const dy = cy - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const hover = Math.max(0, 1 - dist / hoverRadius);

          let ripple = 0;
          for (const r of ripplesRef.current) {
            const rdx = cx - r.x;
            const rdy = cy - r.y;
            const rdist = Math.sqrt(rdx * rdx + rdy * rdy);
            const age = time - r.start;
            const radius = (age / 1400) * (CELL * 18);
            const ringWidth = CELL * 3.2;
            const ringDist = Math.abs(rdist - radius);
            if (ringDist < ringWidth) {
              const strength = (1 - ringDist / ringWidth) * (1 - age / 1400);
              ripple = Math.max(ripple, strength);
            }
          }

          const influence = Math.min(1, idle * 0.65 + hover * 0.9 + ripple);
          if (influence < 0.03) continue;

          const charIndex = Math.min(RAMP.length - 1, Math.floor(influence * RAMP.length));
          const char = RAMP[charIndex];
          if (char === " ") continue;

          const alpha = Math.min(1, (0.22 + influence * 1.05) * intensity);
          const useAccent = hover > 0.25 || ripple > 0.2 || idle > 0.42;
          ctx.fillStyle = `rgb(${useAccent ? accent : fg} / ${alpha})`;
          ctx.fillText(char, cx, cy);
        }
      }

      if (!reduceMotion) {
        raf = requestAnimationFrame(draw);
      }
    }

    const ro = new ResizeObserver(() => {
      resize();
      draw(performance.now());
    });
    ro.observe(container);
    resize();
    draw(performance.now());
    if (!reduceMotion) raf = requestAnimationFrame(draw);

    function toLocal(clientX: number, clientY: number) {
      const rect = canvas!.getBoundingClientRect();
      return { x: clientX - rect.left, y: clientY - rect.top };
    }

    function onMouseMove(e: MouseEvent) {
      mouseRef.current = toLocal(e.clientX, e.clientY);
      if (reduceMotion) draw(performance.now());
    }
    function onMouseOut(e: MouseEvent) {
      if (e.relatedTarget) return;
      mouseRef.current = { x: -9999, y: -9999 };
      if (reduceMotion) draw(performance.now());
    }
    function spawnRipple(clientX: number, clientY: number) {
      const p = toLocal(clientX, clientY);
      ripplesRef.current = [...ripplesRef.current.slice(-4), { ...p, start: performance.now() }];
      if (reduceMotion) {
        draw(performance.now());
        setTimeout(() => draw(performance.now()), 1200);
      }
    }
    function onClick(e: MouseEvent) {
      spawnRipple(e.clientX, e.clientY);
    }
    function onTouchStart(e: TouchEvent) {
      const t = e.touches[0];
      if (!t) return;
      mouseRef.current = toLocal(t.clientX, t.clientY);
      spawnRipple(t.clientX, t.clientY);
    }
    function onTouchMove(e: TouchEvent) {
      const t = e.touches[0];
      if (!t) return;
      mouseRef.current = toLocal(t.clientX, t.clientY);
      if (reduceMotion) draw(performance.now());
    }

    // Listen on window (not the canvas) since the canvas sits behind all page
    // content — attaching to it directly would only catch events over the
    // rare pixel it's actually the topmost element for.
    window.addEventListener("mousemove", onMouseMove);
    document.documentElement.addEventListener("mouseout", onMouseOut);
    window.addEventListener("click", onClick);
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      themeObserver.disconnect();
      window.removeEventListener("mousemove", onMouseMove);
      document.documentElement.removeEventListener("mouseout", onMouseOut);
      window.removeEventListener("click", onClick);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
    };
  }, [reduceMotion, cell, intensity]);

  return (
    <div ref={containerRef} className={`font-mono relative ${className}`}>
      <canvas ref={canvasRef} className="block h-full w-full" aria-hidden="true" />
    </div>
  );
}
