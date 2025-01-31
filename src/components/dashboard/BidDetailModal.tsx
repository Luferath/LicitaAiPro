import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface BidDetailModalProps {
  open?: boolean;
  onClose?: () => void;
  bid?: {
    title: string;
    status: "active" | "closed";
    value: number;
    deadline: string;
    description?: string;
    requirements?: string[];
    documents?: { name: string; url: string }[];
  };
}

export default function BidDetailModal({
  open = true,
  onClose = () => {},
  bid = {
    title: "Aquisição de Equipamentos de TI",
    status: "active",
    value: 150000,
    deadline: "2024-04-30",
    description:
      "Aquisição de computadores, notebooks e periféricos para modernização do parque tecnológico.",
    requirements: [
      "Certificação ISO 9001",
      "Experiência prévia em fornecimento para órgãos públicos",
      "Garantia mínima de 36 meses",
    ],
    documents: [
      { name: "Edital Completo", url: "#" },
      { name: "Termo de Referência", url: "#" },
      { name: "Anexos", url: "#" },
    ],
  } as const,
}: BidDetailModalProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-[800px] bg-[#1a1f3c] border-[#2a2a3c] text-white">
        <DialogHeader>
          <DialogTitle className="text-[#00ff88] text-xl">
            {bid.title}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="grid grid-cols-2 gap-4">
            <Card className="bg-[#2a2a3c] border-none p-4">
              <p className="text-sm text-gray-400">Valor Estimado</p>
              <p className="text-lg font-semibold">
                R$ {bid.value.toLocaleString("pt-BR")}
              </p>
            </Card>
            <Card className="bg-[#2a2a3c] border-none p-4">
              <p className="text-sm text-gray-400">Prazo Final</p>
              <p className="text-lg font-semibold">
                {new Date(bid.deadline).toLocaleDateString("pt-BR")}
              </p>
            </Card>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Descrição</h3>
            <p className="text-gray-300">{bid.description}</p>
          </div>

          <Separator className="bg-[#2a2a3c]" />

          <div>
            <h3 className="text-lg font-semibold mb-2">Requisitos</h3>
            <ul className="list-disc list-inside space-y-1">
              {bid.requirements?.map((req, index) => (
                <li key={index} className="text-gray-300">
                  {req}
                </li>
              ))}
            </ul>
          </div>

          <Separator className="bg-[#2a2a3c]" />

          <div>
            <h3 className="text-lg font-semibold mb-2">Documentos</h3>
            <div className="space-y-2">
              {bid.documents?.map((doc, index) => (
                <a
                  key={index}
                  href={doc.url}
                  className="block text-[#00ff88] hover:underline"
                >
                  {doc.name}
                </a>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
