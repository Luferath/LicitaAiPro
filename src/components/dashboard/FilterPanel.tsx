import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { useDashboard } from "@/contexts/DashboardContext";

export default function FilterPanel() {
  const { filters, setFilters } = useDashboard();

  return (
    <Card className="w-[280px] bg-[#1a1f3c] border-[#2a2a3c] p-4">
      <div className="space-y-6">
        <div className="space-y-2">
          <Label className="text-[#00ff88]">Buscar</Label>
          <Input
            placeholder="Pesquisar licitações..."
            className="bg-[#2a2a3c] border-[#2a2a3c] text-white"
            value={filters.search}
            onChange={(e) => setFilters({ search: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label className="text-[#00ff88]">Status</Label>
          <Select
            value={filters.status}
            onValueChange={(value) => setFilters({ status: value })}
          >
            <SelectTrigger className="bg-[#2a2a3c] border-[#2a2a3c] text-white">
              <SelectValue placeholder="Todos" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="active">Vigentes</SelectItem>
              <SelectItem value="closed">Encerradas</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label className="text-[#00ff88]">Valor Máximo</Label>
          <Slider
            value={[filters.maxValue]}
            max={1000000}
            step={10000}
            className="py-4"
            onValueChange={([value]) => setFilters({ maxValue: value })}
          />
          <p className="text-sm text-gray-400">
            Até R$ {filters.maxValue.toLocaleString("pt-BR")}
          </p>
        </div>

        <div className="space-y-2">
          <Label className="text-[#00ff88]">Região</Label>
          <Select
            value={filters.region}
            onValueChange={(value) => setFilters({ region: value })}
          >
            <SelectTrigger className="bg-[#2a2a3c] border-[#2a2a3c] text-white">
              <SelectValue placeholder="Todas" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas</SelectItem>
              <SelectItem value="north">Norte</SelectItem>
              <SelectItem value="northeast">Nordeste</SelectItem>
              <SelectItem value="midwest">Centro-Oeste</SelectItem>
              <SelectItem value="southeast">Sudeste</SelectItem>
              <SelectItem value="south">Sul</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </Card>
  );
}
