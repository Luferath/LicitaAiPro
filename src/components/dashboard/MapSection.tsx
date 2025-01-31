import { Card } from "@/components/ui/card";
import { useDashboard } from "@/contexts/DashboardContext";
import BrazilMap from "./BrazilMap";

const REGIONS = {
  north: { name: "Norte", color: "#2a2a3c", hoverColor: "#3a3a4c", count: 2 },
  northeast: {
    name: "Nordeste",
    color: "#2a2a3c",
    hoverColor: "#3a3a4c",
    count: 5,
  },
  midwest: {
    name: "Centro-Oeste",
    color: "#2a2a3c",
    hoverColor: "#3a3a4c",
    count: 3,
  },
  southeast: {
    name: "Sudeste",
    color: "#2a2a3c",
    hoverColor: "#3a3a4c",
    count: 8,
  },
  south: { name: "Sul", color: "#2a2a3c", hoverColor: "#3a3a4c", count: 4 },
};

export default function MapSection() {
  const { filters, setFilters } = useDashboard();

  return (
    <Card className="w-full h-[500px] bg-[#1a1f3c] border-[#2a2a3c] p-4">
      <div className="w-full h-full rounded-lg bg-[#2a2a3c] p-6">
        <div className="flex justify-between mb-4">
          <h2 className="text-[#00ff88] text-lg font-semibold">
            Distribuição de Licitações
          </h2>
          <div className="flex gap-4">
            {Object.entries(REGIONS).map(([key, region]) => (
              <button
                key={key}
                onClick={() => setFilters({ region: key })}
                className={`px-3 py-1 rounded-full text-sm transition-colors ${filters.region === key ? "bg-[#00ff88] text-[#1a1f3c]" : "text-[#00ff88] hover:bg-[#3a3a4c]"}`}
              >
                {region.name} ({region.count})
              </button>
            ))}
          </div>
        </div>
        <div className="w-full h-[400px]">
          <BrazilMap
            data={{
              SP: 15,
              RJ: 12,
              MG: 8,
              RS: 6,
              PR: 5,
              BA: 4,
              SC: 4,
              PE: 3,
              CE: 3,
              GO: 2,
              DF: 2,
              ES: 2,
              PA: 1,
              AM: 1,
              MT: 1,
              MS: 1,
              MA: 1,
              PB: 1,
              RN: 1,
              PI: 1,
              AL: 1,
              SE: 1,
              RO: 1,
              AC: 1,
              AP: 1,
              RR: 1,
              TO: 1,
            }}
            selectedRegion={
              filters.region !== "all" ? filters.region : undefined
            }
            onStateClick={(region) => setFilters({ region })}
          />
        </div>
      </div>
    </Card>
  );
}
