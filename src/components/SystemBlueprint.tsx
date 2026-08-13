import { useId, useMemo } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ACCENTS, type SectorKey } from "../lib/solarSystem";

/* ------------------------------------------------------------------ *
 * A drawn-to-scale-ish picture of the system the visitor just built:
 * every panel, battery and inverter on screen is one real unit they
 * picked. The roof is a perspective quad, so panels laid on it get
 * mapped through it instead of being drawn as a flat grid.
 * ------------------------------------------------------------------ */

type Point = { x: number; y: number };
type Quad = { tl: Point; tr: Point; br: Point; bl: Point };

const VIEW_W = 900;
const VIEW_H = 560;
const GROUND_Y = 412;

/* Equipment yard in the foreground */
const UNIT_BASE_Y = 500;
const UNIT_CENTER_X = 452;
const UNIT_GAP = 18;
const UNIT_SIZE = {
  inverter: { w: 58, h: 76 },
  battery: { w: 52, h: 92 },
} as const;
const MAX_INVERTERS = 4;
const MAX_BATTERIES = 8;
const BADGE_MIN_GAP = 114;

type SceneLayout = {
  roof: Quad;
  cols: number;
  maxRows: number;
  /* fraction of a cell left as a gap between panels */
  gap: number;
  padding: { side: number; top: number; bottom: number };
  /* where the DC cable leaves the building */
  cableAnchor: Point;
  meter: Point;
};

const SCENES: Record<SectorKey, SceneLayout> = {
  residential: {
    roof: {
      tl: { x: 335, y: 158 },
      tr: { x: 565, y: 158 },
      br: { x: 648, y: 268 },
      bl: { x: 252, y: 268 },
    },
    cols: 6,
    maxRows: 4,
    gap: 0.16,
    padding: { side: 0.05, top: 0.08, bottom: 0.06 },
    cableAnchor: { x: 292, y: 272 },
    meter: { x: 592, y: 306 },
  },
  industrial: {
    roof: {
      tl: { x: 215, y: 150 },
      tr: { x: 655, y: 150 },
      br: { x: 742, y: 272 },
      bl: { x: 128, y: 272 },
    },
    cols: 10,
    maxRows: 5,
    gap: 0.18,
    padding: { side: 0.035, top: 0.06, bottom: 0.05 },
    cableAnchor: { x: 150, y: 278 },
    meter: { x: 690, y: 318 },
  },
};

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/* Bilinear mapping into the roof quad: (0,0) is the far-left ridge
   corner, (1,1) the near-right eave. Gives cheap, believable foreshortening. */
const onQuad = ({ tl, tr, br, bl }: Quad, u: number, v: number): Point => {
  const topX = lerp(tl.x, tr.x, u);
  const topY = lerp(tl.y, tr.y, u);
  const bottomX = lerp(bl.x, br.x, u);
  const bottomY = lerp(bl.y, br.y, u);
  return { x: lerp(topX, bottomX, v), y: lerp(topY, bottomY, v) };
};

const toPoints = (points: Point[]) =>
  points.map((point) => `${point.x.toFixed(1)},${point.y.toFixed(1)}`).join(" ");

type PanelShape = {
  key: number;
  face: string;
  glare: string;
  seam: [Point, Point];
};

const buildPanels = (layout: SceneLayout, qty: number): PanelShape[] => {
  const { roof, cols, maxRows, gap, padding } = layout;
  const capacity = cols * maxRows;
  const shown = Math.max(0, Math.min(qty, capacity));

  const cellW = (1 - padding.side * 2) / cols;
  const cellH = (1 - padding.top - padding.bottom) / maxRows;
  const gapU = (cellW * gap) / 2;
  const gapV = (cellH * gap) / 2;

  const shapes: PanelShape[] = [];

  for (let index = 0; index < shown; index += 1) {
    /* Row 0 sits at the eave — real installs fill from the bottom up. */
    const row = Math.floor(index / cols);
    const col = index % cols;

    const u0 = padding.side + col * cellW + gapU;
    const u1 = padding.side + (col + 1) * cellW - gapU;
    const v1 = 1 - padding.bottom - row * cellH - gapV;
    const v0 = 1 - padding.bottom - (row + 1) * cellH + gapV;

    const topLeft = onQuad(roof, u0, v0);
    const topRight = onQuad(roof, u1, v0);
    const bottomRight = onQuad(roof, u1, v1);
    const bottomLeft = onQuad(roof, u0, v1);
    const midTop = onQuad(roof, (u0 + u1) / 2, v0);
    const midBottom = onQuad(roof, (u0 + u1) / 2, v1);

    shapes.push({
      key: index,
      face: toPoints([topLeft, topRight, bottomRight, bottomLeft]),
      glare: toPoints([topLeft, topRight, bottomLeft]),
      seam: [midTop, midBottom],
    });
  }

  /* Draw back rows first so the near rows overlap them. */
  return shapes.reverse();
};

type UnitKind = keyof typeof UNIT_SIZE;

type UnitShape = {
  kind: UnitKind;
  index: number;
  x: number;
  y: number;
  w: number;
  h: number;
};

const buildUnits = (inverterQty: number, batteryQty: number): UnitShape[] => {
  const inverters = Math.max(0, Math.min(inverterQty, MAX_INVERTERS));
  const batteries = Math.max(0, Math.min(batteryQty, MAX_BATTERIES));

  const kinds: UnitKind[] = [
    ...Array.from({ length: inverters }, () => "inverter" as const),
    ...Array.from({ length: batteries }, () => "battery" as const),
  ];

  const totalWidth =
    kinds.reduce((sum, kind) => sum + UNIT_SIZE[kind].w, 0) +
    Math.max(0, kinds.length - 1) * UNIT_GAP;

  let cursor = UNIT_CENTER_X - totalWidth / 2;
  let inverterIndex = 0;
  let batteryIndex = 0;

  return kinds.map((kind) => {
    const { w, h } = UNIT_SIZE[kind];
    const unit: UnitShape = {
      kind,
      index: kind === "inverter" ? inverterIndex++ : batteryIndex++,
      x: cursor,
      y: UNIT_BASE_Y - h,
      w,
      h,
    };
    cursor += w + UNIT_GAP;
    return unit;
  });
};

type BadgeProps = {
  x: number;
  y: number;
  count: number;
  detail: string;
  accent: string;
};

const Badge = ({ x, y, count, detail, accent }: BadgeProps) => (
  <g transform={`translate(${x.toFixed(1)},${y.toFixed(1)})`}>
    <rect
      x={-52}
      y={-19}
      width={104}
      height={38}
      rx={12}
      fill="#080b0e"
      fillOpacity={0.88}
      stroke={accent}
      strokeOpacity={0.45}
    />
    <text
      x={0}
      y={-2}
      textAnchor="middle"
      fontSize={16}
      fontWeight={800}
      fill="#ffffff"
    >
      {`×${count}`}
    </text>
    <text
      x={0}
      y={12}
      textAnchor="middle"
      fontSize={10}
      fontWeight={700}
      fill={accent}
      letterSpacing={0.6}
    >
      {detail}
    </text>
  </g>
);

/* How many units the drawing can hold before it starts summarising.
   The metrics always count everything — only the picture is capped. */
export const hiddenUnitCount = (
  sector: SectorKey,
  panelQty: number,
  batteryQty: number,
  inverterQty: number,
) => {
  const { cols, maxRows } = SCENES[sector];
  return (
    Math.max(0, panelQty - cols * maxRows) +
    Math.max(0, batteryQty - MAX_BATTERIES) +
    Math.max(0, inverterQty - MAX_INVERTERS)
  );
};

type SystemBlueprintProps = {
  sector: SectorKey;
  panelQty: number;
  batteryQty: number;
  inverterQty: number;
  arrayKw: number;
  storageKwh: number;
  inverterKw: number;
  title: string;
};

const SystemBlueprint = ({
  sector,
  panelQty,
  batteryQty,
  inverterQty,
  arrayKw,
  storageKwh,
  inverterKw,
  title,
}: SystemBlueprintProps) => {
  const shouldReduceMotion = useReducedMotion();
  const uid = useId().replace(/[^a-zA-Z0-9]/g, "");
  const layout = SCENES[sector];

  const panels = useMemo(() => buildPanels(layout, panelQty), [layout, panelQty]);
  const units = useMemo(
    () => buildUnits(inverterQty, batteryQty),
    [inverterQty, batteryQty],
  );

  const inverterUnits = units.filter((unit) => unit.kind === "inverter");
  const batteryUnits = units.filter((unit) => unit.kind === "battery");
  const firstInverter = inverterUnits[0];
  const yardLeft = units.length ? units[0].x : UNIT_CENTER_X;
  const yardRight = units.length
    ? units[units.length - 1].x + units[units.length - 1].w
    : UNIT_CENTER_X;

  /* Read-outs sit under their own group, but a one-inverter/one-battery yard
     is narrower than two badges — nudge them apart when that happens. */
  const groupCenter = (group: UnitShape[]) =>
    group.length
      ? group[0].x + (group[group.length - 1].x + group[group.length - 1].w - group[0].x) / 2
      : null;

  let inverterBadgeX = groupCenter(inverterUnits);
  let batteryBadgeX = groupCenter(batteryUnits);
  if (inverterBadgeX !== null && batteryBadgeX !== null) {
    const overlap = BADGE_MIN_GAP - (batteryBadgeX - inverterBadgeX);
    if (overlap > 0) {
      inverterBadgeX -= overlap / 2;
      batteryBadgeX += overlap / 2;
    }
  }

  const isProducing = panelQty > 0 && inverterQty > 0;
  const roofCenterX = (layout.roof.tl.x + layout.roof.tr.x) / 2;

  /* Cable runs: array -> inverter, inverter -> storage, inverter -> meter. */
  const dcCable = firstInverter
    ? `M ${layout.cableAnchor.x} ${layout.cableAnchor.y} L ${layout.cableAnchor.x} ${GROUND_Y - 34} C ${layout.cableAnchor.x} ${GROUND_Y + 34} ${firstInverter.x - 60} ${firstInverter.y - 30} ${firstInverter.x + 6} ${firstInverter.y - 4}`
    : null;

  const storageCable =
    firstInverter && batteryUnits.length
      ? `M ${firstInverter.x + firstInverter.w} ${firstInverter.y + firstInverter.h - 18} Q ${(firstInverter.x + firstInverter.w + batteryUnits[0].x) / 2} ${UNIT_BASE_Y + 16} ${batteryUnits[0].x + 4} ${batteryUnits[0].y + batteryUnits[0].h - 18}`
      : null;

  const acCable = firstInverter
    ? `M ${firstInverter.x + firstInverter.w - 8} ${firstInverter.y - 2} C ${firstInverter.x + firstInverter.w + 70} ${firstInverter.y - 60} ${layout.meter.x - 30} ${GROUND_Y + 10} ${layout.meter.x} ${layout.meter.y + 34}`
    : null;

  const flow = shouldReduceMotion
    ? {}
    : {
        animate: { strokeDashoffset: [0, -48] },
        transition: { duration: 1.6, repeat: Infinity, ease: "linear" as const },
      };

  return (
    <svg
      viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
      role="img"
      aria-label={title}
      className="h-auto w-full"
      preserveAspectRatio="xMidYMid meet"
    >
      <title>{title}</title>

      <defs>
        {/* Clear late-morning sky: deep blue overhead fading to horizon haze */}
        <linearGradient id={`sky-${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1877c6" />
          <stop offset="45%" stopColor="#63b4e8" />
          <stop offset="100%" stopColor="#dcf0fa" />
        </linearGradient>
        <linearGradient id={`ground-${uid}`} x1="0" y1="0" x2="0" y2="1">
          {sector === "residential" ? (
            <>
              <stop offset="0%" stopColor="#6ea053" />
              <stop offset="100%" stopColor="#416c37" />
            </>
          ) : (
            <>
              <stop offset="0%" stopColor="#9aa4ac" />
              <stop offset="100%" stopColor="#6d777f" />
            </>
          )}
        </linearGradient>
        <linearGradient id={`wall-${uid}`} x1="1" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="55%" stopColor="#e6ecf0" />
          <stop offset="100%" stopColor="#bcc7cf" />
        </linearGradient>
        <linearGradient id={`panel-${uid}`} x1="0" y1="0" x2="0.3" y2="1">
          <stop offset="0%" stopColor="#2c6f96" />
          <stop offset="100%" stopColor="#0d2a3c" />
        </linearGradient>
        <linearGradient id={`glass-${uid}`} x1="0" y1="0" x2="0.4" y2="1">
          <stop offset="0%" stopColor="#cfeafa" />
          <stop offset="100%" stopColor="#7fb6d6" />
        </linearGradient>
        <linearGradient id={`metal-${uid}`} x1="1" y1="0" x2="0" y2="0">
          <stop offset="0%" stopColor="#5b666f" />
          <stop offset="50%" stopColor="#454f57" />
          <stop offset="100%" stopColor="#2c343a" />
        </linearGradient>
        <radialGradient id={`sun-${uid}`} cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
          <stop offset="35%" stopColor="#fff2b0" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#ffe27a" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Sky, sun and weather */}
      <rect width={VIEW_W} height={GROUND_Y} fill={`url(#sky-${uid})`} />
      <circle cx={790} cy={86} r={150} fill={`url(#sun-${uid})`} />
      <circle cx={790} cy={86} r={32} fill="#fffbe6" />
      <circle cx={790} cy={86} r={38} fill="#fff3ae" fillOpacity={0.55} />
      <motion.g
        style={{ transformBox: "view-box", transformOrigin: "790px 86px" }}
        animate={shouldReduceMotion ? undefined : { rotate: 360 }}
        transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
        aria-hidden="true"
      >
        {Array.from({ length: 8 }, (_, index) => {
          const angle = (index * Math.PI) / 4;
          return (
            <line
              key={index}
              x1={790 + Math.cos(angle) * 40}
              y1={86 + Math.sin(angle) * 40}
              x2={790 + Math.cos(angle) * 54}
              y2={86 + Math.sin(angle) * 54}
              stroke="#fff6c8"
              strokeOpacity={0.85}
              strokeWidth={4}
              strokeLinecap="round"
            />
          );
        })}
      </motion.g>

      {/* Sunlight landing on the array */}
      {isProducing &&
        Array.from({ length: 3 }, (_, index) => (
          <motion.line
            key={index}
            x1={772 + index * 14}
            y1={110}
            x2={roofCenterX - 40 + index * 46}
            y2={layout.roof.tl.y + 26}
            stroke="#fff8d0"
            strokeWidth={14}
            strokeLinecap="round"
            initial={{ opacity: 0.18 }}
            animate={
              shouldReduceMotion
                ? { opacity: 0.22 }
                : { opacity: [0.14, 0.34, 0.14] }
            }
            transition={{
              duration: 3.4,
              repeat: Infinity,
              delay: index * 0.4,
            }}
          />
        ))}

      <motion.g
        aria-hidden="true"
        animate={shouldReduceMotion ? undefined : { x: [0, 26, 0] }}
        transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
        opacity={0.9}
      >
        <ellipse cx={150} cy={82} rx={54} ry={17} fill="#ffffff" />
        <ellipse cx={196} cy={90} rx={38} ry={13} fill="#ffffff" />
        <ellipse cx={112} cy={92} rx={34} ry={12} fill="#ffffff" />
        <ellipse cx={520} cy={62} rx={44} ry={14} fill="#f4fbff" />
        <ellipse cx={556} cy={70} rx={30} ry={11} fill="#f4fbff" />
      </motion.g>

      {/* Ground */}
      <rect
        y={GROUND_Y}
        width={VIEW_W}
        height={VIEW_H - GROUND_Y}
        fill={`url(#ground-${uid})`}
      />
      {/* Sunlit strip right at the horizon */}
      <rect
        y={GROUND_Y}
        width={VIEW_W}
        height={12}
        fill="#ffffff"
        fillOpacity={0.16}
      />

      {sector === "residential" ? (
        <ResidentialShell uid={uid} isProducing={isProducing} />
      ) : (
        <IndustrialShell uid={uid} isProducing={isProducing} />
      )}

      {/* Roof deck under the array */}
      <polygon
        points={toPoints([
          layout.roof.tl,
          layout.roof.tr,
          layout.roof.br,
          layout.roof.bl,
        ])}
        fill="#4a555f"
        stroke="#2b333a"
        strokeWidth={2}
      />
      <polygon
        points={toPoints([
          layout.roof.bl,
          layout.roof.br,
          { x: layout.roof.br.x, y: layout.roof.br.y + 9 },
          { x: layout.roof.bl.x, y: layout.roof.bl.y + 9 },
        ])}
        fill="#2b333a"
      />

      {/* The array itself — one polygon per panel the visitor picked */}
      <g>
        {panels.map((panel) => (
          <g key={panel.key}>
            <polygon
              points={panel.face}
              fill={`url(#panel-${uid})`}
              stroke={ACCENTS.panel}
              strokeOpacity={0.75}
              strokeWidth={1.2}
            />
            {/* Midday sun bouncing off the glass */}
            <polygon points={panel.glare} fill="#ffffff" fillOpacity={0.22} />
            <line
              x1={panel.seam[0].x}
              y1={panel.seam[0].y}
              x2={panel.seam[1].x}
              y2={panel.seam[1].y}
              stroke="#ffffff"
              strokeOpacity={0.12}
            />
          </g>
        ))}
      </g>

      {/* Cabling */}
      {dcCable && (
        <>
          <path d={dcCable} fill="none" stroke="#0a0e11" strokeWidth={6} />
          <motion.path
            d={dcCable}
            fill="none"
            stroke={ACCENTS.panel}
            strokeWidth={2.5}
            strokeDasharray="10 14"
            strokeLinecap="round"
            {...flow}
          />
        </>
      )}
      {storageCable && (
        <>
          <path d={storageCable} fill="none" stroke="#0a0e11" strokeWidth={6} />
          <motion.path
            d={storageCable}
            fill="none"
            stroke={ACCENTS.battery}
            strokeWidth={2.5}
            strokeDasharray="10 14"
            strokeLinecap="round"
            {...flow}
          />
        </>
      )}
      {acCable && (
        <>
          <path d={acCable} fill="none" stroke="#0a0e11" strokeWidth={6} />
          <motion.path
            d={acCable}
            fill="none"
            stroke={ACCENTS.inverter}
            strokeWidth={2.5}
            strokeDasharray="10 14"
            strokeLinecap="round"
            {...flow}
          />
        </>
      )}

      {/* Meter on the wall, fed by the inverter */}
      <g>
        <rect
          x={layout.meter.x - 13}
          y={layout.meter.y}
          width={26}
          height={34}
          rx={5}
          fill="#616c74"
          stroke="#3d464d"
        />
        <rect
          x={layout.meter.x - 8}
          y={layout.meter.y + 6}
          width={16}
          height={10}
          rx={2}
          fill={isProducing ? ACCENTS.inverter : "#4a545c"}
          fillOpacity={isProducing ? 0.85 : 1}
        />
        <circle
          cx={layout.meter.x}
          cy={layout.meter.y + 25}
          r={3}
          fill={isProducing ? "#7dffb0" : "#4a545c"}
        />
      </g>

      {/* Equipment yard: real inverter and battery counts */}
      {units.length > 0 && (
        <>
          <rect
            x={yardLeft - 22}
            y={UNIT_BASE_Y - 2}
            width={yardRight - yardLeft + 44}
            height={16}
            rx={7}
            fill="#b6bfc6"
          />
          {units.map((unit) => (
            <ellipse
              key={`shadow-${unit.kind}-${unit.index}`}
              cx={unit.x + unit.w / 2 - 10}
              cy={UNIT_BASE_Y + 8}
              rx={unit.w * 0.62}
              ry={7}
              fill="#000000"
              fillOpacity={0.28}
            />
          ))}
          {units.map((unit) =>
            unit.kind === "inverter" ? (
              <InverterUnit
                key={`inverter-${unit.index}`}
                unit={unit}
                uid={uid}
                live={isProducing}
                delay={unit.index * 0.25}
                shouldReduceMotion={Boolean(shouldReduceMotion)}
              />
            ) : (
              <BatteryUnit
                key={`battery-${unit.index}`}
                unit={unit}
                uid={uid}
                live={isProducing}
                delay={unit.index * 0.2}
                shouldReduceMotion={Boolean(shouldReduceMotion)}
              />
            ),
          )}
        </>
      )}

      {/* Read-outs */}
      {panelQty > 0 && (
        <Badge
          x={roofCenterX}
          y={layout.roof.tl.y - 36}
          count={panelQty}
          detail={`${arrayKw.toFixed(2)} kW DC`}
          accent={ACCENTS.panel}
        />
      )}
      {inverterBadgeX !== null && (
        <Badge
          x={inverterBadgeX}
          y={UNIT_BASE_Y + 36}
          count={inverterQty}
          detail={`${inverterKw.toFixed(1)} kW AC`}
          accent={ACCENTS.inverter}
        />
      )}
      {batteryBadgeX !== null && (
        <Badge
          x={batteryBadgeX}
          y={UNIT_BASE_Y + 36}
          count={batteryQty}
          detail={`${storageKwh.toFixed(1)} kWh`}
          accent={ACCENTS.battery}
        />
      )}
    </svg>
  );
};

type ShellProps = { uid: string; isProducing: boolean };

const ResidentialShell = ({ uid, isProducing }: ShellProps) => (
  <g>
    {/* Trees behind the house */}
    {[
      { x: 92, scale: 1 },
      { x: 828, scale: 0.85 },
    ].map((tree) => (
      <g key={tree.x} transform={`translate(${tree.x},${GROUND_Y}) scale(${tree.scale})`}>
        <ellipse cx={-26} cy={4} rx={44} ry={9} fill="#000000" fillOpacity={0.18} />
        <rect x={-5} y={-52} width={10} height={52} fill="#6b5236" />
        <circle cx={0} cy={-70} r={34} fill="#4e9440" />
        <circle cx={-20} cy={-54} r={22} fill="#417f36" />
        <circle cx={22} cy={-56} r={20} fill="#5aa84a" />
      </g>
    ))}

    {/* Sun is up on the right, so the house throws its shadow left */}
    <polygon
      points="286,412 616,412 540,436 210,436"
      fill="#000000"
      fillOpacity={0.2}
    />

    {/* Chimney sits behind the roof plane */}
    <rect x={556} y={104} width={30} height={62} fill="#b0522f" />
    <rect x={550} y={98} width={42} height={10} rx={3} fill="#8d3f24" />

    {/* Walls */}
    <rect
      x={286}
      y={266}
      width={330}
      height={GROUND_Y - 266}
      fill={`url(#wall-${uid})`}
    />
    <rect x={286} y={266} width={330} height={6} fill="#aeb9c1" />

    {/* Daylight windows: sky in the glass, warm room behind it when producing */}
    {[
      { x: 322, y: 300 },
      { x: 520, y: 300 },
    ].map((window) => (
      <g key={window.x}>
        <rect
          x={window.x}
          y={window.y}
          width={62}
          height={54}
          rx={4}
          fill={`url(#glass-${uid})`}
        />
        {isProducing && (
          <rect
            x={window.x}
            y={window.y}
            width={62}
            height={54}
            rx={4}
            fill="#ffd68a"
            fillOpacity={0.35}
          />
        )}
        <polygon
          points={`${window.x + 4},${window.y + 50} ${window.x + 34},${window.y + 4} ${window.x + 50},${window.y + 4} ${window.x + 20},${window.y + 50}`}
          fill="#ffffff"
          fillOpacity={0.45}
        />
        <rect
          x={window.x}
          y={window.y}
          width={62}
          height={54}
          rx={4}
          fill="none"
          stroke="#59636b"
          strokeWidth={3}
        />
        <line
          x1={window.x + 31}
          y1={window.y}
          x2={window.x + 31}
          y2={window.y + 54}
          stroke="#59636b"
          strokeWidth={3}
        />
        <line
          x1={window.x}
          y1={window.y + 27}
          x2={window.x + 62}
          y2={window.y + 27}
          stroke="#59636b"
          strokeWidth={3}
        />
      </g>
    ))}

    {/* Door */}
    <rect x={424} y={310} width={54} height={GROUND_Y - 310} rx={4} fill="#7c5a3a" />
    <circle cx={468} cy={366} r={3.5} fill="#f0d9a8" />
    <rect x={414} y={GROUND_Y} width={74} height={8} rx={3} fill="#c8ced3" />
  </g>
);

const IndustrialShell = ({ uid, isProducing }: ShellProps) => (
  <g>
    {/* Roof-top plant behind the array */}
    <rect x={250} y={126} width={54} height={26} rx={4} fill="#8d979f" />
    <rect x={310} y={132} width={38} height={20} rx={4} fill="#79838b" />
    <rect x={560} y={128} width={62} height={24} rx={4} fill="#8d979f" />

    {/* Sun is up on the right, so the building throws its shadow left */}
    <polygon
      points="128,412 742,412 668,438 54,438"
      fill="#000000"
      fillOpacity={0.2}
    />

    {/* Walls */}
    <rect
      x={128}
      y={270}
      width={614}
      height={GROUND_Y - 270}
      fill={`url(#wall-${uid})`}
    />
    {/* Tilt-up concrete seams */}
    {[212, 296, 470, 554, 638].map((x) => (
      <line
        key={x}
        x1={x}
        y1={272}
        x2={x}
        y2={GROUND_Y}
        stroke="#9aa5ad"
        strokeWidth={2}
        strokeOpacity={0.7}
      />
    ))}
    <rect x={128} y={264} width={614} height={12} rx={3} fill="#aab4bc" />

    {/* Roller door */}
    <rect x={320} y={306} width={140} height={GROUND_Y - 306} rx={3} fill="#7d8790" />
    {Array.from({ length: 7 }, (_, index) => (
      <line
        key={index}
        x1={322}
        y1={314 + index * 13}
        x2={458}
        y2={314 + index * 13}
        stroke="#98a2aa"
        strokeWidth={4}
      />
    ))}

    {/* Office glazing reflecting the sky */}
    {[152, 196, 240, 596, 640, 684].map((x) => (
      <g key={x}>
        <rect
          x={x}
          y={300}
          width={34}
          height={44}
          rx={3}
          fill={`url(#glass-${uid})`}
          stroke="#59636b"
          strokeWidth={2.5}
        />
        {isProducing && (
          <rect
            x={x}
            y={300}
            width={34}
            height={44}
            rx={3}
            fill="#ffd68a"
            fillOpacity={0.3}
          />
        )}
        <polygon
          points={`${x + 3},340 ${x + 20},304 ${x + 30},304 ${x + 13},340`}
          fill="#ffffff"
          fillOpacity={0.4}
        />
      </g>
    ))}

    {/* Signage band */}
    <rect x={476} y={286} width={96} height={16} rx={4} fill={ACCENTS.panel} />

    {/* Yard light — off, it is the middle of the day */}
    <g>
      <ellipse cx={786} cy={GROUND_Y + 3} rx={26} ry={6} fill="#000000" fillOpacity={0.18} />
      <rect x={806} y={236} width={7} height={GROUND_Y - 236} fill="#8b949b" />
      <rect x={790} y={228} width={40} height={12} rx={4} fill="#9fa8af" />
      <circle cx={810} cy={246} r={12} fill="#c6ced3" />
    </g>
  </g>
);

type UnitProps = {
  unit: UnitShape;
  uid: string;
  live: boolean;
  delay: number;
  shouldReduceMotion: boolean;
};

const InverterUnit = ({ unit, uid, live, delay, shouldReduceMotion }: UnitProps) => (
  <g>
    <rect
      x={unit.x}
      y={unit.y}
      width={unit.w}
      height={unit.h}
      rx={8}
      fill={`url(#metal-${uid})`}
      stroke="#232a30"
      strokeWidth={2}
    />
    <rect
      x={unit.x + 8}
      y={unit.y + 10}
      width={unit.w - 16}
      height={18}
      rx={3}
      fill="#0c1116"
    />
    <rect
      x={unit.x + 12}
      y={unit.y + 15}
      width={live ? unit.w - 30 : 8}
      height={4}
      rx={2}
      fill={ACCENTS.inverter}
      fillOpacity={0.85}
    />
    {[0, 1, 2, 3].map((index) => (
      <line
        key={index}
        x1={unit.x + 10}
        y1={unit.y + 40 + index * 7}
        x2={unit.x + unit.w - 10}
        y2={unit.y + 40 + index * 7}
        stroke="#161d23"
        strokeWidth={3}
      />
    ))}
    <motion.circle
      cx={unit.x + unit.w - 12}
      cy={unit.y + unit.h - 10}
      r={3.5}
      fill={live ? "#7dffb0" : "#4a545c"}
      animate={
        shouldReduceMotion || !live ? undefined : { opacity: [1, 0.25, 1] }
      }
      transition={{ duration: 1.8, repeat: Infinity, delay }}
    />
  </g>
);

const BatteryUnit = ({ unit, uid, live, delay, shouldReduceMotion }: UnitProps) => (
  <g>
    <rect
      x={unit.x}
      y={unit.y}
      width={unit.w}
      height={unit.h}
      rx={8}
      fill={`url(#metal-${uid})`}
      stroke="#232a30"
      strokeWidth={2}
    />
    <rect
      x={unit.x + 7}
      y={unit.y + 9}
      width={unit.w - 14}
      height={14}
      rx={3}
      fill="#0c1116"
    />
    {[0, 1, 2].map((index) => (
      <motion.rect
        key={index}
        x={unit.x + 9}
        y={unit.y + 34 + index * 16}
        width={unit.w - 18}
        height={10}
        rx={3}
        fill={ACCENTS.battery}
        fillOpacity={live ? 0.85 : 0.25}
        animate={
          shouldReduceMotion || !live
            ? undefined
            : { fillOpacity: [0.3, 0.9, 0.3] }
        }
        transition={{
          duration: 2.4,
          repeat: Infinity,
          delay: delay + index * 0.35,
        }}
      />
    ))}
    <rect
      x={unit.x + 6}
      y={unit.y + unit.h - 10}
      width={unit.w - 12}
      height={5}
      rx={2}
      fill="#161d23"
    />
  </g>
);

export default SystemBlueprint;
