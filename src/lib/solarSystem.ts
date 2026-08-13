import IndustrialImg from "@/assets/industrial.jpg";
import ResidentialImg from "@/assets/solar-panel-service.jpg";

export type SolarProduct = {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  max?: number;
  capacity?: number;
  productImg?: string;
};

export type SectorKey = "residential" | "industrial";

export type SectorProfile = {
  img: string;
  peakSunHours: number;
  tariff: number;
  averageLoadKw: number;
};

/* Sector picks the assumptions behind every number the configurator shows. */
export const SECTORS: Record<SectorKey, SectorProfile> = {
  residential: {
    img: ResidentialImg,
    peakSunHours: 5.2,
    tariff: 0.16,
    averageLoadKw: 1.2,
  },
  industrial: {
    img: IndustrialImg,
    peakSunHours: 5.8,
    tariff: 0.12,
    averageLoadKw: 6,
  },
};

export const SYSTEM_EFFICIENCY = 0.75;
export const CO2_KG_PER_KWH = 0.4;
export const USABLE_BATTERY_SHARE = 0.9;
export const MAX_QTY = 99;

export const ACCENTS = {
  panel: "#00adae",
  battery: "#00e3fd",
  inverter: "#ffc80b",
} as const;

export type SystemStatus =
  | "noPanels"
  | "noInverter"
  | "inverterSmall"
  | "inverterLarge"
  | "balanced";

export type SystemInput = {
  sector: SectorKey;
  panel?: SolarProduct;
  panelQty: number;
  battery?: SolarProduct;
  batteryQty: number;
  inverter?: SolarProduct;
  inverterQty: number;
};

export type SystemResult = {
  totalPrice: number;
  arrayKw: number;
  inverterKw: number;
  usableKw: number;
  storageKwh: number;
  backupHours: number;
  annualKwh: number;
  annualSavings: number;
  co2Tons: number;
  paybackYears: number | null;
  status: SystemStatus;
};

export const computeSystem = ({
  sector,
  panel,
  panelQty,
  battery,
  batteryQty,
  inverter,
  inverterQty,
}: SystemInput): SystemResult => {
  const profile = SECTORS[sector];

  const totalPrice =
    (panel?.price ?? 0) * panelQty +
    (battery?.price ?? 0) * batteryQty +
    (inverter?.price ?? 0) * inverterQty;

  /* DC potential of the array, then what the inverter can actually pass through. */
  const arrayKw = (panel?.max ?? 0) * panelQty;
  const inverterKw = (inverter?.max ?? 0) * inverterQty;
  const afterLossesKw = arrayKw * SYSTEM_EFFICIENCY;
  const usableKw = Math.min(afterLossesKw, inverterKw);

  const storageKwh = (battery?.capacity ?? 0) * batteryQty;
  const backupHours =
    (storageKwh * USABLE_BATTERY_SHARE) / profile.averageLoadKw;

  const annualKwh = usableKw * profile.peakSunHours * 365;
  const annualSavings = annualKwh * profile.tariff;
  const co2Tons = (annualKwh * CO2_KG_PER_KWH) / 1000;
  const paybackYears = annualSavings > 0 ? totalPrice / annualSavings : null;

  let status: SystemStatus;
  if (arrayKw <= 0) status = "noPanels";
  else if (inverterKw <= 0) status = "noInverter";
  else if (inverterKw < afterLossesKw * 0.95) status = "inverterSmall";
  else if (inverterKw > afterLossesKw * 1.6) status = "inverterLarge";
  else status = "balanced";

  return {
    totalPrice,
    arrayKw,
    inverterKw,
    usableKw,
    storageKwh,
    backupHours,
    annualKwh,
    annualSavings,
    co2Tons,
    paybackYears,
    status,
  };
};

export const money = (value: number, fractionDigits = 0) =>
  value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  });
