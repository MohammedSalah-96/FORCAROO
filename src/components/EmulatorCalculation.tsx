import { useMemo, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { useTranslation } from "react-i18next";
import CountUp from "react-countup";
import {
  AlertTriangle,
  BatteryCharging,
  CheckCircle2,
  Clock,
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
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "./ui/select";
import {
  ACCENTS,
  MAX_QTY,
  SECTORS,
  SYSTEM_EFFICIENCY,
  computeSystem,
  money,
  type SectorKey,
  type SolarProduct as Product,
} from "../lib/solarSystem";

const selectTriggerClass =
  "h-11 w-full rounded-xl border-white/10 bg-white/[0.04] px-3 text-sm text-white shadow-none transition-colors hover:border-white/20 hover:bg-white/[0.07] focus:ring-2 focus:ring-forcarooLightGreen/70 data-[placeholder]:text-white/40";

const selectContentClass =
  "rounded-xl border-white/10 bg-[#12161a] text-white shadow-2xl shadow-black/50";

const selectItemClass =
  "rounded-lg py-2 text-sm text-white/75 focus:bg-forcarooLightGreen/15 focus:text-white";

type ConfigCardProps = {
  id: string;
  icon: LucideIcon;
  accent: string;
  title: string;
  placeholder: string;
  options: Product[];
  value: number | null;
  onValueChange: (id: number) => void;
  qty: number;
  onQtyChange: (qty: number) => void;
  subtotalLabel: string;
  qtyLabel: string;
  decreaseLabel: string;
  increaseLabel: string;
};

const ConfigCard = ({
  id,
  icon: Icon,
  accent,
  title,
  placeholder,
  options,
  value,
  onValueChange,
  qty,
  onQtyChange,
  subtotalLabel,
  qtyLabel,
  decreaseLabel,
  increaseLabel,
}: ConfigCardProps) => {
  const selected = options.find((option) => option.id === value);
  const subtotal = (selected?.price ?? 0) * qty;

  return (
    <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition-colors duration-300 hover:border-white/20">
      <h3 className="mb-3 flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-white/60">
        <span
          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg"
          style={{ backgroundColor: `${accent}1f`, color: accent }}
        >
          <Icon className="h-4 w-4" aria-hidden="true" />
        </span>
        {title}
      </h3>

      <Select
        value={value?.toString()}
        onValueChange={(next) => onValueChange(Number(next))}
      >
        <SelectTrigger
          id={id}
          aria-label={title}
          className={selectTriggerClass}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent className={selectContentClass}>
          {options.map((option) => (
            <SelectItem
              key={option.id}
              value={option.id.toString()}
              className={selectItemClass}
            >
              {option.name} — {money(option.price)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {selected?.description && (
        <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-white/45">
          {selected.description}
        </p>
      )}

      <div className="mt-4 flex items-center justify-between gap-3">
        <div className="flex items-center rounded-xl border border-white/10 bg-white/[0.04] p-1">
          <button
            type="button"
            onClick={() => onQtyChange(Math.max(0, qty - 1))}
            disabled={qty <= 0}
            aria-label={decreaseLabel}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-white/70 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forcarooLightGreen/70 disabled:cursor-not-allowed disabled:opacity-30"
          >
            <Minus className="h-3.5 w-3.5" />
          </button>
          <input
            id={`${id}-qty`}
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
            className="w-10 bg-transparent text-center text-sm font-bold text-white outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
          />
          <button
            type="button"
            onClick={() => onQtyChange(Math.min(MAX_QTY, qty + 1))}
            disabled={qty >= MAX_QTY}
            aria-label={increaseLabel}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-white/70 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forcarooLightGreen/70 disabled:cursor-not-allowed disabled:opacity-30"
          >
            <Plus className="h-3.5 w-3.5" />
          </button>
        </div>

        <div className="text-right">
          <div className="text-[9px] uppercase tracking-widest text-white/35">
            {subtotalLabel}
          </div>
          <div className="text-sm font-bold" style={{ color: accent }}>
            {money(subtotal)}
          </div>
        </div>
      </div>
    </section>
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

const EmulatorCalculation = () => {
  const { t } = useTranslation();
  const { productsList } = useLocalizedData();
  const shouldReduceMotion = useReducedMotion();

  const products = productsList as unknown as Product[];
  const panelOptions = useMemo(
    () => products.filter((p) => p.category === "solar-panel"),
    [products],
  );
  const batteryOptions = useMemo(
    () => products.filter((p) => p.category === "battery"),
    [products],
  );
  const inverterOptions = useMemo(
    () => products.filter((p) => p.category === "inverter"),
    [products],
  );

  const defaults = {
    panelId: panelOptions[0]?.id ?? null,
    batteryId: batteryOptions[0]?.id ?? null,
    inverterId: inverterOptions[0]?.id ?? null,
  };

  const [sector, setSector] = useState<SectorKey>("residential");
  const [panelId, setPanelId] = useState<number | null>(defaults.panelId);
  const [batteryId, setBatteryId] = useState<number | null>(defaults.batteryId);
  const [inverterId, setInverterId] = useState<number | null>(
    defaults.inverterId,
  );
  const [panelQty, setPanelQty] = useState(0);
  const [batteryQty, setBatteryQty] = useState(0);
  const [inverterQty, setInverterQty] = useState(0);

  const resetConfiguration = () => {
    setPanelId(defaults.panelId);
    setBatteryId(defaults.batteryId);
    setInverterId(defaults.inverterId);
    setPanelQty(0);
    setBatteryQty(0);
    setInverterQty(0);
  };

  const selectedPanel = panelOptions.find((p) => p.id === panelId);
  const selectedBattery = batteryOptions.find((p) => p.id === batteryId);
  const selectedInverter = inverterOptions.find((p) => p.id === inverterId);

  const profile = SECTORS[sector];

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
      selectedBattery,
      selectedInverter,
      panelQty,
      batteryQty,
      inverterQty,
    ],
  );

  /* Both bars share one axis — the larger of the array and the inverter cap —
     so their lengths can be read against each other, and the DC bar actually
     grows as panels are added instead of sitting pinned at full width. */
  const barScale = Math.max(result.arrayKw, result.inverterKw);
  const arrayBarWidth = barScale > 0 ? (result.arrayKw / barScale) * 100 : 0;
  const usableBarWidth = barScale > 0 ? (result.usableKw / barScale) * 100 : 0;
  const inverterMarker =
    barScale > 0 ? (result.inverterKw / barScale) * 100 : 0;

  const isWarning =
    result.status === "noPanels" ||
    result.status === "noInverter" ||
    result.status === "inverterSmall";

  const countDuration = shouldReduceMotion ? 0 : 0.7;

  return (
    <div className="rounded-3xl bg-[#0c0e11] p-5 text-white sm:p-8 lg:p-10">
      <div className="mx-auto max-w-7xl">
        {/* Sector switch + live health of the configuration */}
        <header className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div
              role="group"
              aria-label={t("emulator.sector.label")}
              className="inline-flex rounded-xl border border-white/10 bg-white/5 p-1"
            >
              {(Object.keys(SECTORS) as SectorKey[]).map((key) => {
                const isActive = sector === key;
                return (
                  <button
                    key={key}
                    type="button"
                    aria-pressed={isActive}
                    onClick={() => setSector(key)}
                    className={`relative rounded-lg px-5 py-2.5 text-xs font-bold uppercase tracking-wide transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forcarooLightGreen/70 sm:px-8 sm:text-sm ${
                      isActive
                        ? "text-forcarooLightGreen"
                        : "text-white/40 hover:text-white"
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="sector-pill"
                        transition={{
                          type: "spring",
                          stiffness: 380,
                          damping: 32,
                        }}
                        className="absolute inset-0 rounded-lg bg-forcarooLightGreen/15 ring-1 ring-forcarooLightGreen/30"
                      />
                    )}
                    <span className="relative z-10">
                      {t(`emulator.sector.${key}`)}
                    </span>
                  </button>
                );
              })}
            </div>
            <p className="mt-2 text-xs text-white/40">
              {t(`emulator.sector.${sector}Note`)}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div
              className={`flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold ${
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
                <CheckCircle2 className="h-4 w-4 shrink-0" aria-hidden="true" />
              )}
              <span aria-live="polite">
                {t(`emulator.status.${result.status}`)}
              </span>
            </div>
            <button
              type="button"
              onClick={resetConfiguration}
              className="flex items-center gap-1.5 rounded-full border border-white/10 px-4 py-2 text-xs font-semibold text-white/50 transition-colors hover:border-white/25 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forcarooLightGreen/70"
            >
              <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
              {t("emulator.config.reset")}
            </button>
          </div>
        </header>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Controls */}
          <div className="order-1 space-y-4 lg:col-span-3 lg:order-1">
            <ConfigCard
              id="emulator-panels"
              icon={Sun}
              accent={ACCENTS.panel}
              title={t("emulator.config.panels")}
              placeholder={t("emulator.config.selectPanel")}
              options={panelOptions}
              value={panelId}
              onValueChange={setPanelId}
              qty={panelQty}
              onQtyChange={setPanelQty}
              subtotalLabel={t("emulator.config.subtotal")}
              qtyLabel={t("emulator.config.quantity", {
                item: t("emulator.config.panels"),
              })}
              decreaseLabel={t("emulator.config.decrease", {
                item: t("emulator.config.panels"),
              })}
              increaseLabel={t("emulator.config.increase", {
                item: t("emulator.config.panels"),
              })}
            />
            <ConfigCard
              id="emulator-batteries"
              icon={BatteryCharging}
              accent={ACCENTS.battery}
              title={t("emulator.config.batteries")}
              placeholder={t("emulator.config.selectBattery")}
              options={batteryOptions}
              value={batteryId}
              onValueChange={setBatteryId}
              qty={batteryQty}
              onQtyChange={setBatteryQty}
              subtotalLabel={t("emulator.config.subtotal")}
              qtyLabel={t("emulator.config.quantity", {
                item: t("emulator.config.batteries"),
              })}
              decreaseLabel={t("emulator.config.decrease", {
                item: t("emulator.config.batteries"),
              })}
              increaseLabel={t("emulator.config.increase", {
                item: t("emulator.config.batteries"),
              })}
            />
            <ConfigCard
              id="emulator-inverters"
              icon={Plug}
              accent={ACCENTS.inverter}
              title={t("emulator.config.inverters")}
              placeholder={t("emulator.config.selectInverter")}
              options={inverterOptions}
              value={inverterId}
              onValueChange={setInverterId}
              qty={inverterQty}
              onQtyChange={setInverterQty}
              subtotalLabel={t("emulator.config.subtotal")}
              qtyLabel={t("emulator.config.quantity", {
                item: t("emulator.config.inverters"),
              })}
              decreaseLabel={t("emulator.config.decrease", {
                item: t("emulator.config.inverters"),
              })}
              increaseLabel={t("emulator.config.increase", {
                item: t("emulator.config.inverters"),
              })}
            />
          </div>

          {/* Visualizer */}
          <div className="order-3 lg:col-span-5 lg:order-2">
            <div className="relative h-64 overflow-hidden rounded-2xl border border-white/5 bg-[#111417] sm:h-80 lg:h-full lg:min-h-[26rem]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={sector}
                  initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.98 }}
                  transition={{ duration: shouldReduceMotion ? 0 : 0.5 }}
                  className="absolute inset-0"
                >
                  <img
                    src={profile.img}
                    alt={t("emulator.sector.imageAlt", {
                      sector: t(`emulator.sector.${sector}`),
                    })}
                    loading="lazy"
                    className="h-full w-full object-cover opacity-50"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0c0e11] via-[#0c0e11]/30 to-transparent" />
                </motion.div>
              </AnimatePresence>

              {!shouldReduceMotion && (
                <motion.div
                  animate={{ scale: [1, 1.25, 1], opacity: [0.35, 0.7, 0.35] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute left-1/3 top-1/2 flex h-8 w-8 items-center justify-center rounded-full border border-forcarooLightGreen"
                  aria-hidden="true"
                >
                  <div className="h-2 w-2 rounded-full bg-forcarooLightGreen" />
                </motion.div>
              )}

              {/* Headline numbers, read straight off the live configuration */}
              <div className="absolute inset-x-0 bottom-0 flex flex-wrap items-end justify-between gap-4 p-5 sm:p-6">
                <div>
                  <div className="mb-1 flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-white/50">
                    <span className="flex h-1.5 w-1.5 rounded-full bg-forcarooLightGreen" />
                    {t("emulator.metrics.live")}
                  </div>
                  <div className="text-3xl font-black text-white sm:text-4xl">
                    <CountUp
                      end={result.usableKw}
                      decimals={2}
                      duration={countDuration}
                      preserveValue
                    />
                    <span className="ml-1 text-sm font-normal text-white/50">
                      kW
                    </span>
                  </div>
                </div>
                <div className="rounded-xl border border-white/10 bg-[#111417]/80 px-4 py-3 backdrop-blur-md">
                  <div className="text-[10px] uppercase tracking-widest text-white/40">
                    {t("emulator.metrics.annualProduction")}
                  </div>
                  <div className="font-bold text-forcarooLightGreen">
                    <CountUp
                      end={result.annualKwh}
                      duration={countDuration}
                      separator=","
                      preserveValue
                    />{" "}
                    <span className="text-[10px] font-medium text-white/40">
                      {t("emulator.metrics.kwhPerYear")}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Metrics */}
          <div className="order-2 space-y-4 lg:col-span-4 lg:order-3">
            <div className="relative overflow-hidden rounded-2xl border border-white/5 bg-[#111417] p-6">
              <div className="absolute inset-y-0 left-0 w-1 bg-forcarooLightGreen" />
              <h3 className="mb-6 text-[11px] font-black uppercase tracking-widest text-white/70">
                {t("emulator.metrics.title")}
              </h3>

              <div className="space-y-6" aria-live="polite">
                <div>
                  <div className="mb-2 flex items-end justify-between gap-2">
                    <span className="text-[10px] uppercase tracking-widest text-white/50">
                      {t("emulator.metrics.arrayPotential")}
                    </span>
                    <span className="text-xl font-black">
                      <CountUp
                        end={result.arrayKw}
                        decimals={2}
                        duration={countDuration}
                        preserveValue
                      />
                      <span className="ml-1 text-xs font-normal text-white/40">
                        kW
                      </span>
                    </span>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-white/5">
                    <motion.div
                      animate={{ width: `${arrayBarWidth}%` }}
                      initial={false}
                      transition={{ duration: shouldReduceMotion ? 0 : 0.5 }}
                      className="h-full rounded-full bg-white/25"
                    />
                  </div>
                </div>

                <div>
                  <div className="mb-2 flex items-end justify-between gap-2">
                    <span className="text-[10px] uppercase tracking-widest text-forcarooLightGreen">
                      {t("emulator.metrics.usableOutput")}
                    </span>
                    <div className="text-right">
                      <div className="text-2xl font-black text-forcarooLightGreen">
                        <CountUp
                          end={result.usableKw}
                          decimals={2}
                          duration={countDuration}
                          preserveValue
                        />
                        <span className="ml-1 text-xs font-normal text-white/40">
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
                  {/* Bar is the real ratio; the tick shows where the inverter cuts in */}
                  <div className="relative h-1.5 w-full rounded-full bg-white/5">
                    <motion.div
                      animate={{ width: `${usableBarWidth}%` }}
                      initial={false}
                      transition={{ duration: shouldReduceMotion ? 0 : 0.5 }}
                      className="h-full rounded-full bg-forcarooLightGreen"
                    />
                    {result.arrayKw > 0 && result.inverterKw > 0 && (
                      <div
                        className="absolute -top-1 h-3.5 w-0.5 -translate-x-1/2 bg-amber-300"
                        style={{ left: `${inverterMarker}%` }}
                        title={`${t("emulator.metrics.inverterCap")}: ${result.inverterKw} kW`}
                        aria-hidden="true"
                      />
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3 border-t border-white/5 pt-6">
                <StatTile
                  icon={TrendingDown}
                  label={t("emulator.metrics.annualSavings")}
                  value={money(result.annualSavings)}
                />
                <StatTile
                  icon={Clock}
                  label={t("emulator.metrics.payback")}
                  value={
                    result.paybackYears ? result.paybackYears.toFixed(1) : "—"
                  }
                  unit={result.paybackYears ? t("emulator.metrics.years") : ""}
                />
                <StatTile
                  icon={Leaf}
                  label={t("emulator.metrics.co2")}
                  value={result.co2Tons.toFixed(1)}
                  unit={t("emulator.metrics.tonsPerYear")}
                />
                <StatTile
                  icon={Zap}
                  label={t("emulator.metrics.backup")}
                  value={
                    result.storageKwh > 0 ? result.backupHours.toFixed(1) : "—"
                  }
                  unit={
                    result.storageKwh > 0 ? t("emulator.metrics.hours") : ""
                  }
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

            <p className="px-1 text-[11px] leading-relaxed text-white/35">
              {t("emulator.disclaimer")}
            </p>
          </div>
        </div>

        {/* Keeps the two numbers that matter in reach while scrolling on phones */}
        <div className="sticky bottom-0 z-20 -mx-5 mt-6 flex items-center justify-between gap-4 border-t border-white/10 bg-[#0c0e11]/90 px-5 py-3 backdrop-blur-md sm:-mx-8 sm:px-8 lg:hidden">
          <div>
            <div className="text-[9px] uppercase tracking-widest text-white/40">
              {t("emulator.metrics.usableOutput")}
            </div>
            <div className="font-black text-white">
              {result.usableKw.toFixed(2)}
              <span className="ml-1 text-[10px] font-normal text-white/40">
                kW
              </span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-[9px] uppercase tracking-widest text-white/40">
              {t("emulator.metrics.totalPrice")}
            </div>
            <div className="font-black text-forcarooLightGreen">
              {money(result.totalPrice)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmulatorCalculation;
