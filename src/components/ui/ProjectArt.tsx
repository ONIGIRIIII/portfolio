export type ProjectArtVariant = "rag" | "revault" | "fc25" | "vancouver" | "controller";

const colorClass: Record<ProjectArtVariant, string> = {
  rag: "text-accent-teal",
  revault: "text-accent-blue",
  fc25: "text-accent-amber",
  vancouver: "text-accent-violet",
  controller: "text-accent",
};

function RagDiagram() {
  const nodes = [
    { x: 205, y: 95 },
    { x: 232, y: 78 },
    { x: 250, y: 108 },
    { x: 224, y: 128 },
    { x: 196, y: 122 },
    { x: 190, y: 90 },
    { x: 240, y: 140 },
  ];
  const edges: [number, number][] = [
    [0, 1],
    [0, 2],
    [0, 3],
    [0, 4],
    [0, 5],
    [2, 6],
    [3, 6],
    [1, 2],
  ];

  return (
    <g strokeLinecap="round">
      {[0, 1, 2].map((i) => (
        <rect key={i} x={36 + i * 6} y={54 + i * 6} width="66" height="86" rx="3" opacity={0.55 + i * 0.1} />
      ))}
      {[0, 1, 2].map((i) => (
        <line key={i} x1="48" y1={78 + i * 12} x2="90" y2={78 + i * 12} opacity="0.7" />
      ))}

      <path d="M112 96 h44" strokeDasharray="4 4" opacity="0.7" />
      <path d="M150 96 l7 -4 l0 8 z" fill="currentColor" stroke="none" opacity="0.8" />

      {edges.map(([a, b], i) => (
        <line
          key={i}
          x1={nodes[a].x}
          y1={nodes[a].y}
          x2={nodes[b].x}
          y2={nodes[b].y}
          opacity="0.55"
        />
      ))}
      {nodes.map((n, i) => (
        <circle key={i} cx={n.x} cy={n.y} r={i === 0 ? 6 : 3.5} fill="currentColor" stroke="none" opacity={i === 0 ? 1 : 0.8} />
      ))}
      <circle cx={nodes[0].x} cy={nodes[0].y} r="12" opacity="0.6" />

      <path d="M266 108 h24" strokeDasharray="4 4" opacity="0.7" />
      <path d="M290 108 l7 -4 l0 8 z" fill="currentColor" stroke="none" opacity="0.8" />

      <rect x="300" y="66" width="76" height="88" rx="4" opacity="0.75" />
      <path d="M312 92 l8 6 l-8 6" opacity="0.9" />
      <rect x="326" y="96" width="18" height="6" fill="currentColor" stroke="none" opacity="0.9" />
      <line x1="312" y1="116" x2="364" y2="116" opacity="0.6" />
      <line x1="312" y1="128" x2="350" y2="128" opacity="0.6" />
    </g>
  );
}

function RevaultDiagram() {
  const tables = [
    { x: 34, y: 44, w: 108, h: 66, rows: 3 },
    { x: 206, y: 28, w: 120, h: 88, rows: 4 },
    { x: 108, y: 148, w: 128, h: 66, rows: 3 },
  ];

  return (
    <g transform="translate(20 0)">
      {tables.map((t, i) => (
        <g key={i} opacity="0.95">
          <rect x={t.x} y={t.y} width={t.w} height={t.h} rx="2" opacity="0.8" />
          <line x1={t.x} y1={t.y + 20} x2={t.x + t.w} y2={t.y + 20} opacity="0.8" />
          {Array.from({ length: t.rows }).map((_, r) => (
            <line
              key={r}
              x1={t.x + 10}
              y1={t.y + 34 + r * 13}
              x2={t.x + t.w - 14}
              y2={t.y + 34 + r * 13}
              opacity="0.5"
            />
          ))}
        </g>
      ))}

      <path d="M142 78 h64" opacity="0.7" />
      <path d="M142 72 v12 M206 72 v12" opacity="0.7" />

      <path d="M266 116 v22" opacity="0.7" />
      <path d="M260 116 h12 M260 138 h12" opacity="0.7" />

      <path d="M172 148 v-40 h-32" opacity="0.7" />
      <path d="M166 108 h12 M172 114 v-12" opacity="0.7" />
    </g>
  );
}

function Fc25Diagram() {
  const muted = [
    [70, 168], [92, 150], [58, 140], [110, 160], [128, 132], [140, 176],
    [160, 118], [178, 150], [196, 100], [214, 130], [232, 84], [250, 112],
    [268, 150], [286, 96], [304, 128], [322, 70], [338, 104], [350, 140],
  ];
  const gems = [
    [118, 108], [186, 66], [258, 60], [312, 44],
  ];

  return (
    <g strokeLinecap="round" transform="translate(5 9)">
      <path d="M46 26 v170 h300" opacity="0.7" />
      {Array.from({ length: 6 }).map((_, i) => (
        <line key={`v${i}`} x1={46 + (i + 1) * 48} y1="196" x2={46 + (i + 1) * 48} y2="190" opacity="0.6" />
      ))}
      {Array.from({ length: 4 }).map((_, i) => (
        <line key={`h${i}`} x1="46" y1={168 - i * 40} x2="40" y2={168 - i * 40} opacity="0.6" />
      ))}

      <path d="M56 186 L346 56" strokeDasharray="3 5" opacity="0.55" />

      {muted.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="3" fill="currentColor" stroke="none" opacity="0.55" />
      ))}
      {gems.map(([x, y], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r="9" opacity="0.55" />
          <circle cx={x} cy={y} r="4.5" fill="currentColor" stroke="none" />
        </g>
      ))}
    </g>
  );
}

function VancouverDiagram() {
  const bars = [
    { x: 70, h: 20 },
    { x: 110, h: 34 },
    { x: 150, h: 26 },
    { x: 190, h: 52 },
    { x: 230, h: 44 },
    { x: 270, h: 74 },
    { x: 310, h: 96 },
  ];

  return (
    <g strokeLinecap="round" transform="translate(5 9)">
      <path d="M46 26 v170 h300" opacity="0.7" />
      {bars.map((b, i) => (
        <rect
          key={i}
          x={b.x}
          y={196 - b.h}
          width="26"
          height={b.h}
          rx="2"
          fill="currentColor"
          stroke="none"
          opacity={0.4 + i * 0.08}
        />
      ))}
      <path d="M60 176 L336 96" strokeDasharray="3 5" opacity="0.55" />

      <g transform="translate(354 46)">
        <circle cx="0" cy="0" r="22" opacity="0.6" />
        <circle cx="0" cy="0" r="15" opacity="0.4" />
        {Array.from({ length: 10 }).map((_, i) => {
          const angle = (i / 10) * Math.PI * 2;
          const x1 = Math.round(Math.cos(angle) * 1600) / 100;
          const y1 = Math.round(Math.sin(angle) * 1600) / 100;
          const x2 = Math.round(Math.cos(angle) * 2200) / 100;
          const y2 = Math.round(Math.sin(angle) * 2200) / 100;
          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} opacity="0.55" />;
        })}
      </g>
    </g>
  );
}

function ControllerDiagram() {
  const dpad = [
    { x: 110, y: 96 },
    { x: 110, y: 144 },
    { x: 86, y: 120 },
    { x: 134, y: 120 },
  ];
  const face = [
    { x: 210, y: 96 },
    { x: 210, y: 144 },
    { x: 186, y: 120 },
    { x: 234, y: 120 },
  ];

  return (
    <g strokeLinecap="round">
      <rect x="46" y="58" width="216" height="124" rx="8" opacity="0.6" />
      {[...dpad, ...face].map((p, i) => (
        <g key={i}>
          <line x1={p.x} y1={p.y} x2="300" y2="120" opacity="0.35" />
          <circle cx={p.x} cy={p.y} r="10" opacity="0.8" />
        </g>
      ))}
      <rect x="300" y="95" width="70" height="50" rx="4" opacity="0.85" />
      <line x1="312" y1="86" x2="312" y2="95" opacity="0.6" />
      <line x1="326" y1="86" x2="326" y2="95" opacity="0.6" />
      <line x1="340" y1="86" x2="340" y2="95" opacity="0.6" />
      <line x1="312" y1="145" x2="312" y2="154" opacity="0.6" />
      <line x1="326" y1="145" x2="326" y2="154" opacity="0.6" />
      <line x1="340" y1="145" x2="340" y2="154" opacity="0.6" />
      <path d="M370 120 h18" opacity="0.6" />
      <rect x="388" y="112" width="9" height="16" rx="1" fill="currentColor" stroke="none" opacity="0.7" />
    </g>
  );
}

export function ProjectArt({ variant, className = "" }: { variant: ProjectArtVariant; className?: string }) {
  return (
    <svg
      viewBox="0 0 400 240"
      className={`${colorClass[variant]} ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.25}
      aria-hidden="true"
    >
      {variant === "rag" && <RagDiagram />}
      {variant === "revault" && <RevaultDiagram />}
      {variant === "fc25" && <Fc25Diagram />}
      {variant === "vancouver" && <VancouverDiagram />}
      {variant === "controller" && <ControllerDiagram />}
    </svg>
  );
}
