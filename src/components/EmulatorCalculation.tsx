import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useLocalizedData } from "../hooks/useLocalizedData";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "./ui/select";
import IndustrialImg from "../assets/industrial.jpg";

const SolarConfigurator = () => {
  const { productsList } = useLocalizedData();
  const [sector, setSector] = useState("residential");

  // Filter products by category
  const panelOptions = productsList.filter(
    (p: any) => p.category === "solar-panel",
  );
  const batteryOptions = productsList.filter(
    (p: any) => p.category === "battery",
  );
  const inverterOptions = productsList.filter(
    (p: any) => p.category === "inverter",
  );

  // State for selected product IDs and quantities
  const [panelId, setPanelId] = useState(panelOptions[0]?.id || null);
  const [batteryId, setBatteryId] = useState(batteryOptions[0]?.id || null);
  const [inverterId, setInverterId] = useState(inverterOptions[0]?.id || null);
  const [panelQty, setPanelQty] = useState(1);
  const [batteryQty, setBatteryQty] = useState(1);
  const [inverterQty, setInverterQty] = useState(1);

  // Get selected products
  const selectedPanel = panelOptions.find((p: any) => p.id === panelId);
  const selectedBattery = batteryOptions.find((p: any) => p.id === batteryId);
  const selectedInverter = inverterOptions.find(
    (p: any) => p.id === inverterId,
  );

  // Calculate total price
  const totalPrice =
    (selectedPanel?.price || 0) * panelQty +
    (selectedBattery?.price || 0) * batteryQty +
    (selectedInverter?.price || 0) * inverterQty;

  // Example calculation for maxPotential and realizedOutput (if panel has no max, fallback to 1)
  const efficiency = 0.75;
  const maxPotential = (selectedPanel?.max || 1) * panelQty;
  const realizedOutput = (maxPotential * efficiency).toFixed(2);

  return (
    <div className="min-h-auto bg-[#0c0e11] text-white font-['Manrope'] p-8 lg:p-12">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-12">
          <div className="inline-flex bg-white/5 p-1 rounded-sm border border-white/10">
            <button
              onClick={() => setSector("residential")}
              className={`px-8 py-3 text-sm font-bold uppercase transition-all ${sector === "residential" ? "bg-forcarooLightGreen/20 text-forcarooLightGreen" : "text-white/40 hover:text-white"}`}
            >
              Residential (Home)
            </button>
            <button
              onClick={() => setSector("industrial")}
              className={`px-8 py-3 text-sm font-bold uppercase transition-all ${sector === "industrial" ? "bg-forcarooLightGreen/20 text-forcarooLightGreen" : "text-white/40 hover:text-white"}`}
            >
              Commercial (Industry)
            </button>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Controls */}
          <div className="lg:col-span-3 space-y-6">
            {/* Solar Panels */}
            <section>
              <h3 className="flex items-center text-xs font-black uppercase tracking-widest mb-4 opacity-60">
                <span className="mr-2 text-forcarooLightGreen">■</span> Solar
                Panels
              </h3>
              <div className="space-y-3">
                <div className="mb-2">
                  <Select
                    value={panelId?.toString()}
                    onValueChange={(val) => setPanelId(Number(val))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a panel" />
                    </SelectTrigger>
                    <SelectContent>
                      {panelOptions.map((panel) => (
                        <SelectItem key={panel.id} value={panel.id.toString()}>
                          {panel.name} - ${panel.price}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                {selectedPanel && (
                  <div className="text-xs opacity-70 mb-2">
                    {selectedPanel.description}
                  </div>
                )}
                <div className="flex items-center mb-2">
                  <span className="text-xs mr-2">Qty:</span>
                  <input
                    type="number"
                    min={1}
                    value={panelQty}
                    onChange={(e) => setPanelQty(Number(e.target.value))}
                    className="w-16 px-2 py-1 rounded bg-[#222] border border-white/10 text-white"
                  />
                </div>
              </div>
            </section>

            {/* Batteries */}
            <section>
              <h3 className="flex items-center text-xs font-black uppercase tracking-widest mb-4 opacity-60">
                <span className="mr-2 text-[#00e3fd]">■</span> Batteries
              </h3>
              <div className="space-y-3">
                <div className="mb-2">
                  <Select
                    value={batteryId?.toString()}
                    onValueChange={(val) => setBatteryId(Number(val))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a battery" />
                    </SelectTrigger>
                    <SelectContent>
                      {batteryOptions.map((battery) => (
                        <SelectItem
                          key={battery.id}
                          value={battery.id.toString()}
                        >
                          {battery.name} - ${battery.price}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                {selectedBattery && (
                  <div className="text-xs opacity-70 mb-2">
                    {selectedBattery.description}
                  </div>
                )}
                <div className="flex items-center mb-2">
                  <span className="text-xs mr-2">Qty:</span>
                  <input
                    type="number"
                    min={1}
                    value={batteryQty}
                    onChange={(e) => setBatteryQty(Number(e.target.value))}
                    className="w-16 px-2 py-1 rounded bg-[#222] border border-white/10 text-white"
                  />
                </div>
              </div>
            </section>

            {/* Inverters */}
            <section>
              <h3 className="flex items-center text-xs font-black uppercase tracking-widest mb-4 opacity-60">
                <span className="mr-2 text-[#00e3fd]">■</span> Inverters
              </h3>
              <div className="space-y-3">
                <div className="mb-2">
                  <Select
                    value={inverterId?.toString()}
                    onValueChange={(val) => setInverterId(Number(val))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select an inverter" />
                    </SelectTrigger>
                    <SelectContent>
                      {inverterOptions.map((inverter) => (
                        <SelectItem
                          key={inverter.id}
                          value={inverter.id.toString()}
                        >
                          {inverter.name} - ${inverter.price}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                {selectedInverter && (
                  <div className="text-xs opacity-70 mb-2">
                    {selectedInverter.description}
                  </div>
                )}
                <div className="flex items-center mb-2">
                  <span className="text-xs mr-2">Qty:</span>
                  <input
                    type="number"
                    min={1}
                    value={inverterQty}
                    onChange={(e) => setInverterQty(Number(e.target.value))}
                    className="w-16 px-2 py-1 rounded bg-[#222] border border-white/10 text-white"
                  />
                </div>
              </div>
            </section>
          </div>

          {/* Central Visualizer */}
          <div className="lg:col-span-6">
            <div className="relative h-full bg-[#111417] overflow-hidden rounded-sm group border border-white/5">
              <AnimatePresence mode="wait">
                <motion.div
                  key={sector}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.6 }}
                  className="absolute inset-0"
                >
                  <img
                    src={
                      sector === "residential"
                        ? "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=2000"
                        : IndustrialImg
                    }
                    className="w-full h-full object-cover opacity-50 transition-all duration-700"
                    alt="Visualization"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0c0e11] via-transparent to-transparent" />
                </motion.div>
              </AnimatePresence>

              {/* Status Tags */}
              {/* <div className="absolute top-6 left-6 p-4 bg-[#111417]/80 backdrop-blur-md border-l-2 border-[#00e3fd]">
                <div className="text-[10px] uppercase tracking-widest opacity-50 mb-1">
                  Live Projection
                </div>
                <div className="font-bold uppercase tracking-tight">
                  Resi-System v4.1
                </div>
              </div> */}

              <div className="absolute top-6 right-6 p-4 bg-[#111417]/80 backdrop-blur-md border-l-2 border-[#00e3fd]">
                <div className="text-[10px] uppercase tracking-widest opacity-50 mb-1">
                  Optimization
                </div>
                <div className="font-bold uppercase tracking-tight text-forcarooLightGreen">
                  98.2% Active
                </div>
              </div>

              {/* Interaction Hotspots */}
              <motion.div
                animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute top-1/2 left-1/3 w-8 h-8 rounded-full border border-forcarooLightGreen flex items-center justify-center"
              >
                <div className="w-2 h-2 bg-forcarooLightGreen rounded-full" />
              </motion.div>
            </div>
          </div>

          {/* Right Metrics */}
          <div className="lg:col-span-3 space-y-6">
            <div className="bg-[#111417] p-6 border border-white/5 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-forcarooLightGreen" />
              <h3 className="text-xs font-black uppercase tracking-widest mb-8">
                Power Matrix
              </h3>

              <div className="space-y-8">
                <div>
                  <div className="flex justify-between items-end mb-2">
                    <span className="text-[10px] uppercase tracking-widest opacity-50">
                      Max Potential
                    </span>
                    <span className="text-2xl font-black">
                      {maxPotential.toFixed(2)}{" "}
                      <span className="text-sm font-normal opacity-50">kW</span>
                    </span>
                  </div>
                  <div className="h-1 bg-white/5 w-full">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      className="h-full bg-white/20"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-end mb-2">
                    <span className="text-[10px] uppercase tracking-widest text-forcarooLightGreen">
                      Realized Output
                    </span>
                    <div className="text-right">
                      <div className="text-3xl font-black text-forcarooLightGreen">
                        {realizedOutput}{" "}
                        <span className="text-sm font-normal opacity-50">
                          kW
                        </span>
                      </div>
                      <div className="text-[9px] font-bold text-forcarooLightGreen">
                        75% EFFICIENCY CAP
                      </div>
                    </div>
                  </div>
                  <div className="h-1 bg-white/5 w-full">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: "75%" }}
                      className="h-full bg-forcarooLightGreen"
                    />
                  </div>
                </div>
              </div>

              {/* <div className="grid grid-cols-2 gap-4 mt-8 pt-8 border-t border-white/5">
                <div>
                  <div className="text-[9px] uppercase tracking-widest opacity-40 mb-1 text-white">
                    Annual Offset
                  </div>
                  <div className="text-lg font-bold">-$2,450</div>
                </div>
                <div>
                  <div className="text-[9px] uppercase tracking-widest opacity-40 mb-1 text-white">
                    ROI Timeline
                  </div>
                  <div className="text-lg font-bold">4.2 Yrs</div>
                </div>
              </div> */}

              <div className="mt-8">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-bold text-lg">Total Price</span>
                  <span className="text-2xl font-black text-forcarooLightGreen">
                    ${totalPrice.toFixed(2)}
                  </span>
                </div>
                {/* <button className="w-full mt-4 bg-[#f3ffcd] text-black py-4 font-black uppercase tracking-widest text-xs flex items-center justify-center group">
                  Finalize Configuration
                  <span className="ml-2 group-hover:translate-x-1 transition-transform">
                    →
                  </span>
                </button> */}
              </div>
            </div>

            <div className="bg-[#111417]/50 p-4 border border-white/5 flex items-center space-x-4">
              <div className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center text-forcarooLightGreen">
                🍃
              </div>
              <div>
                <div className="text-[9px] uppercase tracking-widest opacity-40">
                  Carbon Saved
                </div>
                <div className="font-bold">4.8 Tons / Year</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SolarConfigurator;
