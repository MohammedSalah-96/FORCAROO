import { useMemo, useState, type ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useTranslation } from "react-i18next";
import CountUp from "react-countup";
import { Link } from "react-router";
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  BatteryCharging,
  Building2,
  Check,
  CheckCircle2,
  Clock,
  House,
  Leaf,
  Minus,
  Plug,
  Plus,
  RotateCcw,
  Sun,
  TrendingDown,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { useLocalizedData } from "../hooks/useLocalizedData";
import SystemBlueprint, { hiddenUnitCount } from "./SystemBlueprint";
import {
  ACCENTS,
  MAX_QTY,
  SECTORS,
  SYSTEM_EFFICIENCY,
  computeSystem,
  money,
  type SectorKey,
  type SolarProduct,
} from "../lib/solarSystem";

const STEPS = ["sector", "panels", "batteries", "inverters", "review"] as const;
type StepKey = (typeof STEPS)[number];

const STEP_ICONS: Record<StepKey, LucideIcon> = {
  sector: House,
  panels: Sun,
  batteries: BatteryCharging,
  inverters: Plug,
  review: Check,
};

const SECTOR_ICONS: Record<SectorKey, LucideIcon> = {
  residential: House,
  industrial: Building2,
};

type QtyStepperProps = {
  id: string;
  qty: number;
  onQtyChange: (qty: number) => void;
  qtyLabel: string;
  decreaseLabel: string;
  increaseLabel: string;
};

const QtyStepper = ({
  id,
  qty,
  onQtyChange,
  qtyLabel,
  decreaseLabel,
  increaseLabel,
}: QtyStepperProps) => (
  <div className="flex items-center rounded-xl border border-white/10 bg-white/[0.04] p-1">
    <button
      type="button"
      onClick={() => onQtyChange(Math.max(0, qty - 1))}
      disabled={qty <= 0}
      aria-label={decreaseLabel}
      className="flex h-9 w-9 items-center justify-center rounded-lg text-white/70 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forcarooLightGreen/70 disabled:cursor-not-allowed disabled:opacity-30"
    >
      <Minus className="h-4 w-4" />
    </button>
    <input
      id={id}
      type="number"
      inputMode="numeric"
      min={0}
      max={MAX_QTY}
      value={qty}
      aria-label={qtyLabel}
      onChange={(event) => {
        const next = Number(event.target.value);
        if (event.target.value === "") return onQtyChange(0);
        if (Number.isNaN(next)) return;
        onQtyChange(Math.min(MAX_QTY, Math.max(0, Math.round(next))));
      }}
      className="w-12 bg-transparent text-center text-base font-bold text-white outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
    />
    <button
      type="button"
      onClick={() => onQtyChange(Math.min(MAX_QTY, qty + 1))}
      disabled={qty >= MAX_QTY}
      aria-label={increaseLabel}
      className="flex h-9 w-9 items-center justify-center rounded-lg text-white/70 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forcarooLightGreen/70 disabled:cursor-not-allowed disabled:opacity-30"
    >
      <Plus className="h-4 w-4" />
    </button>
  </div>
);

type SelectionStepProps = {
  idPrefix: string;
  icon: LucideIcon;
  accent: string;
  title: string;
  description: string;
  options: SolarProduct[];
  value: number | null;
  onSelect: (id: number) => void;
  qty: number;
  onQtyChange: (qty: number) => void;
  spec: (option: SolarProduct) => string;
  itemLabel: string;
  footer?: ReactNode;
};

const SelectionStep = ({
  idPrefix,
  icon: Icon,
  accent,
  title,
  description,
  options,
  value,
  onSelect,
  qty,
  onQtyChange,
  spec,
  itemLabel,
  footer,
}: SelectionStepProps) => {
  const { t } = useTranslation();
  const selected = options.find((option) => option.id === value);

  return (
    <div>
      <div className="mb-5 flex items-start gap-3">
        <span
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl"
          style={{ backgroundColor: `${accent}1f`, color: accent }}
        >
          <Icon className="h-5 w-5" aria-hidden="true" />
        </span>
        <div>
          <h3 className="text-lg font-black text-white sm:text-xl">{title}</h3>
          <p className="mt-1 max-w-2xl text-sm leading-relaxed text-white/45">
            {description}
          </p>
        </div>
      </div>

      <div
        role="radiogroup"
        aria-label={title}
        className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3"
      >
        {options.map((option) => {
          const isActive = option.id === value;
          return (
            <button
              key={option.id}
              type="button"
              role="radio"
              aria-checked={isActive}
              onClick={() => {
                onSelect(option.id);
                if (qty === 0) onQtyChange(1);
              }}
              className={`group relative flex gap-3 rounded-2xl border p-3 text-start transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forcarooLightGreen/70 ${
                isActive
                  ? "border-transparent bg-white/[0.07]"
                  : "border-white/10 bg-white/[0.03] hover:border-white/25 hover:bg-white/[0.05]"
              }`}
              style={isActive ? { boxShadow: `0 0 0 2px ${accent}` } : undefined}
            >
              {option.productImg && (
                <span className="h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-white/5">
                  <img
                    src={option.productImg}
                    alt=""
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                </span>
              )}
              <span className="min-w-0 flex-1">
                <span className="flex items-center justify-between gap-2">
                  <span className="truncate text-sm font-bold text-white">
                    {option.name}
                  </span>
                  {isActive && (
                    <span
                      className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full"
                      style={{ backgroundColor: accent }}
                    >
                      <Check className="h-3 w-3 text-black" aria-hidden="true" />
                    </span>
                  )}
                </span>
                <span className="mt-1 flex items-center gap-2">
                  <span
                    className="rounded-md px-1.5 py-0.5 text-[10px] font-black uppercase tracking-wider"
                    style={{ backgroundColor: `${accent}1f`, color: accent }}
                  >
                    {spec(option)}
                  </span>
                  <span className="text-xs font-bold text-white/70">
                    {money(option.price)}
                  </span>
                </span>
                <span className="mt-1.5 line-clamp-2 block text-[11px] leading-relaxed text-white/40">
                  {option.description}
                </span>
              </span>
            </button>
          );
        })}
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
        <div>
          <div className="text-[10px] font-black uppercase tracking-widest text-white/40">
            {t("builder.select.howMany", { item: itemLabel })}
          </div>
          <div className="mt-0.5 text-sm text-white/60">
            {selected ? selected.name : t("builder.select.nothingYet")}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <QtyStepper
            id={`${idPrefix}-qty`}
            qty={qty}
            onQtyChange={onQtyChange}
            qtyLabel={t("emulator.config.quantity", { item: itemLabel })}
            decreaseLabel={t("emulator.config.decrease", { item: itemLabel })}
            increaseLabel={t("emulator.config.increase", { item: itemLabel })}
          />
          <div className="text-end">
            <div className="text-[9px] uppercase tracking-widest text-white/35">
              {t("emulator.config.subtotal")}
            </div>
            <div className="text-base font-black" style={{ color: accent }}>
              {money((selected?.price ?? 0) * qty)}
            </div>
          </div>
        </div>
      </div>

      {footer}
    </div>
  );
};

type StatTileProps = {
  icon: LucideIcon;
  label: string;
  value: string;
  unit?: string;
};

const StatTile = ({ icon: Icon, label, value, unit }: StatTileProps) => (
  <div className="rounded-xl border border-white/5 bg-white/[0.03] p-3">
    <div className="mb-1 flex items-center gap-1.5 text-[9px] uppercase tracking-widest text-white/40">
      <Icon className="h-3 w-3" aria-hidden="true" />
      {label}
    </div>
    <div className="text-base font-bold leading-tight text-white">
      {value}
      {unit && (
        <span className="ml-1 text-[10px] font-medium text-white/40">
          {unit}
        </span>
      )}
    </div>
  </div>
);

type SummaryRowProps = {
  icon: LucideIcon;
  accent: string;
  label: string;
  name: string;
  qty: number;
  subtotal: number;
};

const SummaryRow = ({
  icon: Icon,
  accent,
  label,
  name,
  qty,
  subtotal,
}: SummaryRowProps) => (
  <div className="flex items-center gap-3 border-b border-white/5 py-3 last:border-none">
    <span
      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
      style={{ backgroundColor: `${accent}1f`, color: accent }}
    >
      <Icon className="h-4 w-4" aria-hidden="true" />
    </span>
    <div className="min-w-0 flex-1">
      <div className="text-[9px] uppercase tracking-widest text-white/35">
        {label}
      </div>
      <div className="truncate text-sm font-bold text-white">{name}</div>
    </div>
    <div className="text-end">
      <div className="text-sm font-black" style={{ color: accent }}>
        ×{qty}
      </div>
      <div className="text-[11px] text-white/45">{money(subtotal)}</div>
    </div>
  </div>
);

const SystemBuilder = () => {
  const { t } = useTranslation();
  const { productsList } = useLocalizedData();
  const shouldReduceMotion = useReducedMotion();

  const products = productsList as unknown as SolarProduct[];
  const panelOptions = useMemo(
    () => products.filter((product) => product.category === "solar-panel"),
    [products],
  );
  const batteryOptions = useMemo(
    () => products.filter((product) => product.category === "battery"),
    [products],
  );
  const inverterOptions = useMemo(
    () => products.filter((product) => product.category === "inverter"),
    [products],
  );

  const defaults = {
    panelId: panelOptions[0]?.id ?? null,
    batteryId: batteryOptions[0]?.id ?? null,
    inverterId: inverterOptions[0]?.id ?? null,
  };

  const [step, setStep] = useState(0);
  const [furthestStep, setFurthestStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [sector, setSector] = useState<SectorKey>("residential");
  const [panelId, setPanelId] = useState<number | null>(defaults.panelId);
  const [batteryId, setBatteryId] = useState<number | null>(defaults.batteryId);
  const [inverterId, setInverterId] = useState<number | null>(
    defaults.inverterId,
  );
  const [panelQty, setPanelQty] = useState(0);
  const [batteryQty, setBatteryQty] = useState(0);
  const [inverterQty, setInverterQty] = useState(0);

  const selectedPanel = panelOptions.find((option) => option.id === panelId);
  const selectedBattery = batteryOptions.find(
    (option) => option.id === batteryId,
  );
  const selectedInverter = inverterOptions.find(
    (option) => option.id === inverterId,
  );

  const result = useMemo(
    () =>
      computeSystem({
        sector,
        panel: selectedPanel,
        panelQty,
        battery: selectedBattery,
        batteryQty,
        inverter: selectedInverter,
        inverterQty,
      }),
    [
      sector,
      selectedPanel,
      panelQty,
      selectedBattery,
      batteryQty,
      selectedInverter,
      inverterQty,
    ],
  );

  const currentStep = STEPS[step];
  const isLastStep = step === STEPS.length - 1;
  const notDrawn = hiddenUnitCount(sector, panelQty, batteryQty, inverterQty);

  const blockingHint =
    currentStep === "panels" && (!selectedPanel || panelQty < 1)
      ? t("builder.requirePanels")
      : currentStep === "inverters" && (!selectedInverter || inverterQty < 1)
        ? t("builder.requireInverter")
        : null;

  const goTo = (next: number) => {
    const clamped = Math.max(0, Math.min(STEPS.length - 1, next));
    setDirection(clamped >= step ? 1 : -1);
    setStep(clamped);
    setFurthestStep((furthest) => Math.max(furthest, clamped));
  };

  const startOver = () => {
    setPanelId(defaults.panelId);
    setBatteryId(defaults.batteryId);
    setInverterId(defaults.inverterId);
    setPanelQty(0);
    setBatteryQty(0);
    setInverterQty(0);
    setSector("residential");
    setDirection(-1);
    setStep(0);
    setFurthestStep(0);
  };

  const isWarning =
    result.status === "noPanels" ||
    result.status === "noInverter" ||
    result.status === "inverterSmall";

  const countDuration = shouldReduceMotion ? 0 : 0.7;
  const slide = shouldReduceMotion ? 0 : 40;
  const progress = (step / (STEPS.length - 1)) * 100;

  return (
    <div className="rounded-3xl bg-[#0c0e11] p-5 text-white sm:p-8 lg:p-10">
      <div className="mx-auto max-w-7xl">
        {/* Progress rail */}
        <header className="mb-8">
          <div className="mb-4 flex items-center justify-between gap-4">
            <span className="text-[11px] font-black uppercase tracking-widest text-white/45">
              {t("builder.stepOf", {
                current: step + 1,
                total: STEPS.length,
              })}
            </span>
            <button
              type="button"
              onClick={startOver}
              className="flex items-center gap-1.5 rounded-full border border-white/10 px-4 py-2 text-xs font-semibold text-white/50 transition-colors hover:border-white/25 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forcarooLightGreen/70"
            >
              <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
              {t("builder.startOver")}
            </button>
          </div>

          <div className="relative">
            {/* Rail is inset to line up with the first and last step circles */}
            <div className="absolute inset-x-[10%] top-5 h-0.5 bg-white/10" />
            <motion.div
              className="absolute start-[10%] top-5 h-0.5 bg-forcarooLightGreen"
              initial={false}
              animate={{ width: `${progress * 0.8}%` }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.45 }}
            />
            <ol className="relative flex items-start justify-between">
              {STEPS.map((key, index) => {
                const Icon = STEP_ICONS[key];
                const isDone = index < step;
                const isActive = index === step;
                const isReachable = index <= furthestStep;
                return (
                  <li key={key} className="flex min-w-0 flex-1 flex-col items-center">
                    <button
                      type="button"
                      onClick={() => isReachable && goTo(index)}
                      disabled={!isReachable}
                      aria-current={isActive ? "step" : undefined}
                      className={`flex h-10 w-10 items-center justify-center rounded-full border-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forcarooLightGreen/70 ${
                        isActive
                          ? "border-forcarooLightGreen bg-forcarooLightGreen text-[#0c0e11]"
                          : isDone
                            ? "border-forcarooLightGreen bg-[#0c0e11] text-forcarooLightGreen"
                            : "border-white/15 bg-[#0c0e11] text-white/35"
                      } ${isReachable ? "cursor-pointer" : "cursor-not-allowed"}`}
                    >
                      {isDone ? (
                        <Check className="h-4 w-4" aria-hidden="true" />
                      ) : (
                        <Icon className="h-4 w-4" aria-hidden="true" />
                      )}
                    </button>
                    <span
                      className={`mt-2 hidden text-center text-[11px] font-bold uppercase tracking-wide sm:block ${
                        isActive ? "text-forcarooLightGreen" : "text-white/40"
                      }`}
                    >
                      {t(`builder.steps.${key}`)}
                    </span>
                  </li>
                );
              })}
            </ol>
          </div>
        </header>

        {/* Step body */}
        <div className="min-h-[26rem]">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentStep}
              custom={direction}
              initial={{ opacity: 0, x: direction * slide }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction * -slide }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.35 }}
            >
              {currentStep === "sector" && (
                <div>
                  <div className="mb-5">
                    <h3 className="text-lg font-black text-white sm:text-xl">
                      {t("builder.sector.title")}
                    </h3>
                    <p className="mt-1 max-w-2xl text-sm leading-relaxed text-white/45">
                      {t("builder.sector.description")}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    {(Object.keys(SECTORS) as SectorKey[]).map((key) => {
                      const Icon = SECTOR_ICONS[key];
                      const isActive = sector === key;
                      return (
                        <button
                          key={key}
                          type="button"
                          aria-pressed={isActive}
                          onClick={() => setSector(key)}
                          className={`group relative overflow-hidden rounded-2xl border text-start transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forcarooLightGreen/70 ${
                            isActive
                              ? "border-forcarooLightGreen"
                              : "border-white/10 hover:border-white/30"
                          }`}
                        >
                          <div className="relative h-40 w-full overflow-hidden sm:h-48">
                            <img
                              src={SECTORS[key].img}
                              alt=""
                              loading="lazy"
                              className={`h-full w-full object-cover transition-all duration-500 ${
                                isActive
                                  ? "scale-105 opacity-80"
                                  : "opacity-45 group-hover:opacity-65"
                              }`}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0c0e11] via-[#0c0e11]/40 to-transparent" />
                            {isActive && (
                              <span className="absolute end-3 top-3 flex h-7 w-7 items-center justify-center rounded-full bg-forcarooLightGreen">
                                <Check
                                  className="h-4 w-4 text-[#0c0e11]"
                                  aria-hidden="true"
                                />
                              </span>
                            )}
                          </div>
                          <div className="flex items-start gap-3 p-4">
                            <span
                              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                                isActive
                                  ? "bg-forcarooLightGreen/15 text-forcarooLightGreen"
                                  : "bg-white/5 text-white/50"
                              }`}
                            >
                              <Icon className="h-5 w-5" aria-hidden="true" />
                            </span>
                            <div>
                              <div className="text-base font-black text-white">
                                {t(`emulator.sector.${key}`)}
                              </div>
                              <p className="mt-1 text-xs leading-relaxed text-white/45">
                                {t(`emulator.sector.${key}Note`)}
                              </p>
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {currentStep === "panels" && (
                <SelectionStep
                  idPrefix="builder-panels"
                  icon={Sun}
                  accent={ACCENTS.panel}
                  title={t("builder.select.panelsTitle")}
                  description={t("builder.select.panelsDescription")}
                  options={panelOptions}
                  value={panelId}
                  onSelect={setPanelId}
                  qty={panelQty}
                  onQtyChange={setPanelQty}
                  spec={(option) => `${option.max ?? 0} kW`}
                  itemLabel={t("emulator.config.panels")}
                  footer={
                    <p className="mt-3 px-1 text-xs text-white/40">
                      {t("builder.select.panelsFooter", {
                        value: result.arrayKw.toFixed(2),
                      })}
                    </p>
                  }
                />
              )}

              {currentStep === "batteries" && (
                <SelectionStep
                  idPrefix="builder-batteries"
                  icon={BatteryCharging}
                  accent={ACCENTS.battery}
                  title={t("builder.select.batteriesTitle")}
                  description={t("builder.select.batteriesDescription")}
                  options={batteryOptions}
                  value={batteryId}
                  onSelect={setBatteryId}
                  qty={batteryQty}
                  onQtyChange={setBatteryQty}
                  spec={(option) => `${option.capacity ?? 0} kWh`}
                  itemLabel={t("emulator.config.batteries")}
                  footer={
                    <div className="mt-3 flex flex-wrap items-center justify-between gap-3 px-1">
                      <p className="text-xs text-white/40">
                        {batteryQty > 0
                          ? t("builder.select.batteriesFooter", {
                              value: result.backupHours.toFixed(1),
                            })
                          : t("builder.select.batteriesOptional")}
                      </p>
                      <button
                        type="button"
                        onClick={() => {
                          setBatteryQty(0);
                          goTo(step + 1);
                        }}
                        className="text-xs font-bold uppercase tracking-wide text-white/45 underline-offset-4 transition-colors hover:text-white hover:underline"
                      >
                        {t("builder.select.skipStorage")}
                      </button>
                    </div>
                  }
                />
              )}

              {currentStep === "inverters" && (
                <SelectionStep
                  idPrefix="builder-inverters"
                  icon={Plug}
                  accent={ACCENTS.inverter}
                  title={t("builder.select.invertersTitle")}
                  description={t("builder.select.invertersDescription")}
                  options={inverterOptions}
                  value={inverterId}
                  onSelect={setInverterId}
                  qty={inverterQty}
                  onQtyChange={setInverterQty}
                  spec={(option) => `${option.max ?? 0} kW`}
                  itemLabel={t("emulator.config.inverters")}
                  footer={
                    <div
                      className={`mt-3 flex items-center gap-2 rounded-xl border px-4 py-3 text-xs font-semibold ${
                        isWarning
                          ? "border-amber-400/30 bg-amber-400/10 text-amber-300"
                          : "border-forcarooLightGreen/30 bg-forcarooLightGreen/10 text-forcarooLightGreen"
                      }`}
                    >
                      {isWarning ? (
                        <AlertTriangle
                          className="h-4 w-4 shrink-0"
                          aria-hidden="true"
                        />
                      ) : (
                        <CheckCircle2
                          className="h-4 w-4 shrink-0"
                          aria-hidden="true"
                        />
                      )}
                      <span aria-live="polite">
                        {t(`emulator.status.${result.status}`)}
                      </span>
                    </div>
                  }
                />
              )}

              {currentStep === "review" && (
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
                  {/* The drawing */}
                  <div className="lg:col-span-7">
                    <div className="overflow-hidden rounded-2xl border border-white/5 bg-[#111417]">
                      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/5 px-5 py-4">
                        <div>
                          <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-white/50">
                            <span className="flex h-1.5 w-1.5 rounded-full bg-forcarooLightGreen" />
                            {t("builder.review.sceneTitle")}
                          </div>
                          <div className="mt-1 text-sm font-bold text-white">
                            {t(`emulator.sector.${sector}`)} ·{" "}
                            {result.usableKw.toFixed(2)} kW
                          </div>
                        </div>
                        <div
                          className={`flex items-center gap-2 rounded-full border px-3 py-1.5 text-[11px] font-semibold ${
                            isWarning
                              ? "border-amber-400/30 bg-amber-400/10 text-amber-300"
                              : "border-forcarooLightGreen/30 bg-forcarooLightGreen/10 text-forcarooLightGreen"
                          }`}
                        >
                          {isWarning ? (
                            <AlertTriangle
                              className="h-3.5 w-3.5 shrink-0"
                              aria-hidden="true"
                            />
                          ) : (
                            <CheckCircle2
                              className="h-3.5 w-3.5 shrink-0"
                              aria-hidden="true"
                            />
                          )}
                          {t(`emulator.status.${result.status}`)}
                        </div>
                      </div>

                      <SystemBlueprint
                        sector={sector}
                        panelQty={panelQty}
                        batteryQty={batteryQty}
                        inverterQty={inverterQty}
                        arrayKw={result.arrayKw}
                        storageKwh={result.storageKwh}
                        inverterKw={result.inverterKw}
                        title={t("builder.review.sceneAlt", {
                          sector: t(`emulator.sector.${sector}`),
                          panels: panelQty,
                          batteries: batteryQty,
                          inverters: inverterQty,
                        })}
                      />

                      <div className="flex flex-wrap gap-4 border-t border-white/5 px-5 py-4">
                        {[
                          {
                            accent: ACCENTS.panel,
                            label: t("emulator.config.panels"),
                            value: `×${panelQty}`,
                          },
                          {
                            accent: ACCENTS.battery,
                            label: t("emulator.config.batteries"),
                            value: `×${batteryQty}`,
                          },
                          {
                            accent: ACCENTS.inverter,
                            label: t("emulator.config.inverters"),
                            value: `×${inverterQty}`,
                          },
                        ].map((item) => (
                          <div
                            key={item.label}
                            className="flex items-center gap-2 text-[11px] font-semibold text-white/55"
                          >
                            <span
                              className="h-2.5 w-2.5 rounded-sm"
                              style={{ backgroundColor: item.accent }}
                            />
                            {item.label}
                            <span className="font-black text-white">
                              {item.value}
                            </span>
                          </div>
                        ))}
                        {notDrawn > 0 && (
                          <span className="text-[11px] font-semibold text-white/40">
                            {t("builder.review.more", { value: notDrawn })}
                          </span>
                        )}
                      </div>
                    </div>

                    <p className="mt-3 px-1 text-[11px] leading-relaxed text-white/35">
                      {t("emulator.disclaimer")}
                    </p>
                  </div>

                  {/* Numbers */}
                  <div className="space-y-4 lg:col-span-5">
                    <div className="relative overflow-hidden rounded-2xl border border-white/5 bg-[#111417] p-6">
                      <div className="absolute inset-y-0 start-0 w-1 bg-forcarooLightGreen" />
                      <h3 className="mb-4 text-[11px] font-black uppercase tracking-widest text-white/70">
                        {t("builder.review.summaryTitle")}
                      </h3>

                      <div>
                        {selectedPanel && panelQty > 0 && (
                          <SummaryRow
                            icon={Sun}
                            accent={ACCENTS.panel}
                            label={t("emulator.config.panels")}
                            name={selectedPanel.name}
                            qty={panelQty}
                            subtotal={selectedPanel.price * panelQty}
                          />
                        )}
                        {selectedBattery && batteryQty > 0 && (
                          <SummaryRow
                            icon={BatteryCharging}
                            accent={ACCENTS.battery}
                            label={t("emulator.config.batteries")}
                            name={selectedBattery.name}
                            qty={batteryQty}
                            subtotal={selectedBattery.price * batteryQty}
                          />
                        )}
                        {selectedInverter && inverterQty > 0 && (
                          <SummaryRow
                            icon={Plug}
                            accent={ACCENTS.inverter}
                            label={t("emulator.config.inverters")}
                            name={selectedInverter.name}
                            qty={inverterQty}
                            subtotal={selectedInverter.price * inverterQty}
                          />
                        )}
                      </div>

                      <div className="mt-5 border-t border-white/5 pt-5" aria-live="polite">
                        <div className="mb-2 flex items-end justify-between gap-2">
                          <span className="text-[10px] uppercase tracking-widest text-forcarooLightGreen">
                            {t("emulator.metrics.usableOutput")}
                          </span>
                          <div className="text-end">
                            <div className="text-2xl font-black text-forcarooLightGreen">
                              <CountUp
                                end={result.usableKw}
                                decimals={2}
                                duration={countDuration}
                                preserveValue
                              />
                              <span className="ms-1 text-xs font-normal text-white/40">
                                kW
                              </span>
                            </div>
                            <div className="text-[9px] font-bold uppercase text-forcarooLightGreen/70">
                              {t("emulator.metrics.efficiencyNote", {
                                value: Math.round(SYSTEM_EFFICIENCY * 100),
                              })}
                            </div>
                          </div>
                        </div>
                        <div className="h-1.5 w-full rounded-full bg-white/5">
                          <motion.div
                            initial={false}
                            animate={{
                              width: `${
                                result.arrayKw > 0
                                  ? (result.usableKw / result.arrayKw) * 100
                                  : 0
                              }%`,
                            }}
                            transition={{
                              duration: shouldReduceMotion ? 0 : 0.5,
                            }}
                            className="h-full rounded-full bg-forcarooLightGreen"
                          />
                        </div>
                      </div>

                      <div className="mt-6 grid grid-cols-2 gap-3 border-t border-white/5 pt-6">
                        <StatTile
                          icon={Zap}
                          label={t("emulator.metrics.annualProduction")}
                          value={Math.round(result.annualKwh).toLocaleString(
                            "en-US",
                          )}
                          unit={t("emulator.metrics.kwhPerYear")}
                        />
                        <StatTile
                          icon={TrendingDown}
                          label={t("emulator.metrics.annualSavings")}
                          value={money(result.annualSavings)}
                        />
                        <StatTile
                          icon={Clock}
                          label={t("emulator.metrics.payback")}
                          value={
                            result.paybackYears
                              ? result.paybackYears.toFixed(1)
                              : "—"
                          }
                          unit={
                            result.paybackYears
                              ? t("emulator.metrics.years")
                              : ""
                          }
                        />
                        <StatTile
                          icon={Leaf}
                          label={t("emulator.metrics.co2")}
                          value={result.co2Tons.toFixed(1)}
                          unit={t("emulator.metrics.tonsPerYear")}
                        />
                      </div>

                      <div className="mt-6 flex items-center justify-between gap-3 border-t border-white/5 pt-5">
                        <span className="text-sm font-bold text-white/80">
                          {t("emulator.metrics.totalPrice")}
                        </span>
                        <span className="text-2xl font-black text-forcarooLightGreen">
                          <CountUp
                            end={result.totalPrice}
                            duration={countDuration}
                            separator=","
                            prefix="$"
                            preserveValue
                          />
                        </span>
                      </div>
                    </div>

                    <Link
                      to="/contact"
                      className="flex w-full items-center justify-center gap-2 rounded-2xl bg-forcarooLightGreen px-6 py-4 text-sm font-black uppercase tracking-wide text-[#0c0e11] transition-transform duration-300 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forcarooLightGreen/70"
                    >
                      {t("builder.review.cta")}
                      <ArrowRight
                        className="h-4 w-4 rtl:rotate-180"
                        aria-hidden="true"
                      />
                    </Link>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <div className="mt-8 flex flex-col gap-3 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <button
            type="button"
            onClick={() => goTo(step - 1)}
            disabled={step === 0}
            className="flex items-center justify-center gap-2 rounded-xl border border-white/10 px-5 py-3 text-sm font-bold text-white/60 transition-colors hover:border-white/25 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forcarooLightGreen/70 disabled:cursor-not-allowed disabled:opacity-30 sm:w-auto"
          >
            <ArrowLeft className="h-4 w-4 rtl:rotate-180" aria-hidden="true" />
            {t("builder.back")}
          </button>

          <div className="flex flex-col items-stretch gap-2 sm:flex-row sm:items-center">
            {blockingHint && (
              <span className="text-center text-xs font-semibold text-amber-300">
                {blockingHint}
              </span>
            )}
            {!isLastStep && (
              <button
                type="button"
                onClick={() => goTo(step + 1)}
                disabled={Boolean(blockingHint)}
                className="flex items-center justify-center gap-2 rounded-xl bg-forcarooLightGreen px-6 py-3 text-sm font-black uppercase tracking-wide text-[#0c0e11] transition-transform duration-300 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forcarooLightGreen/70 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0"
              >
                {step === STEPS.length - 2
                  ? t("builder.seeBlueprint")
                  : t("builder.next")}
                <ArrowRight
                  className="h-4 w-4 rtl:rotate-180"
                  aria-hidden="true"
                />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemBuilder;
