import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye, Star } from "lucide-react";

interface BidCardProps {
  id?: number;
  isFavorite?: boolean;
  onToggleFavorite?: () => void;
  title?: string;
  status?: "active" | "closed";
  value?: number;
  deadline?: string;
  onViewDetails?: () => void;
}

export default function BidCard({
  id = 1,
  isFavorite = false,
  onToggleFavorite = () => {},
  title = "Aquisição de Equipamentos de TI",
  status = "active",
  value = 150000,
  deadline = "2024-04-30",
  onViewDetails = () => {},
}: BidCardProps) {
  return (
    <Card className="w-[280px] h-[320px] bg-[#1a1f3c] border-[#2a2a3c] p-4 flex flex-col justify-between">
      <div className="relative">
        <Button
          variant="ghost"
          size="icon"
          className={`absolute right-0 top-0 ${isFavorite ? "text-[#00ff88]" : "text-gray-400"}`}
          onClick={onToggleFavorite}
        >
          <Star className="w-5 h-5" fill={isFavorite ? "#00ff88" : "none"} />
        </Button>
        <div
          className={`text-xs font-semibold inline-block px-2 py-1 rounded-full mb-3 ${
            status === "active"
              ? "bg-[#00ff88]/10 text-[#00ff88]"
              : "bg-red-500/10 text-red-500"
          }`}
        >
          {status === "active" ? "Vigente" : "Encerrada"}
        </div>
        <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
        <div className="space-y-2">
          <p className="text-sm text-gray-400">
            Valor:{" "}
            <span className="text-white">
              R$ {value.toLocaleString("pt-BR")}
            </span>
          </p>
          <p className="text-sm text-gray-400">
            Prazo:{" "}
            <span className="text-white">
              {new Date(deadline).toLocaleDateString("pt-BR")}
            </span>
          </p>
        </div>
      </div>
      <Button
        onClick={onViewDetails}
        className="w-full bg-[#2a2a3c] hover:bg-[#2a2a3c]/80 text-[#00ff88]"
      >
        <Eye className="w-4 h-4 mr-2" />
        Ver Detalhes
      </Button>
    </Card>
  );
}
