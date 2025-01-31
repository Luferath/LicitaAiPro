import { createContext, useContext, useState, ReactNode } from "react";

type Bid = {
  id: number;
  title: string;
  status: "active" | "closed";
  value: number;
  deadline: string;
  description?: string;
  requirements?: string[];
  documents?: { name: string; url: string }[];
};

type FilterState = {
  search: string;
  status: string;
  maxValue: number;
  region: string;
};

type DashboardContextType = {
  favorites: number[];
  toggleFavorite: (bidId: number) => void;
  bids: Bid[];
  filters: FilterState;
  selectedBid: Bid | null;
  isDetailModalOpen: boolean;
  setFilters: (filters: Partial<FilterState>) => void;
  openBidDetail: (bid: Bid) => void;
  closeBidDetail: () => void;
  filteredBids: Bid[];
};

const MOCK_BIDS: Bid[] = [
  {
    id: 1,
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
  },
  {
    id: 2,
    title: "Serviços de Manutenção Predial",
    status: "active",
    value: 280000,
    deadline: "2024-05-15",
    description:
      "Contratação de empresa especializada em serviços de manutenção predial preventiva e corretiva.",
    requirements: [
      "Registro no CREA",
      "Atestado de capacidade técnica",
      "Equipe técnica qualificada",
    ],
    documents: [
      { name: "Edital Completo", url: "#" },
      { name: "Planilha de Custos", url: "#" },
    ],
  },
  {
    id: 3,
    title: "Fornecimento de Material de Escritório",
    status: "closed",
    value: 75000,
    deadline: "2024-03-30",
    description:
      "Aquisição de materiais de escritório para suprimento do almoxarifado.",
    requirements: [
      "Amostras dos produtos",
      "Entrega em até 15 dias",
      "Garantia de qualidade",
    ],
    documents: [
      { name: "Edital Completo", url: "#" },
      { name: "Lista de Itens", url: "#" },
    ],
  },
];

const DashboardContext = createContext<DashboardContextType | null>(null);

export function DashboardProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<number[]>([]);

  const toggleFavorite = (bidId: number) => {
    setFavorites((prev) =>
      prev.includes(bidId)
        ? prev.filter((id) => id !== bidId)
        : [...prev, bidId],
    );
  };
  const [filters, setFilters] = useState<FilterState>({
    search: "",
    status: "all",
    maxValue: 1000000,
    region: "all",
  });

  const [selectedBid, setSelectedBid] = useState<Bid | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  const filteredBids = MOCK_BIDS.filter((bid) => {
    const matchesSearch = bid.title
      .toLowerCase()
      .includes(filters.search.toLowerCase());
    const matchesStatus =
      filters.status === "all" || bid.status === filters.status;
    const matchesValue = bid.value <= filters.maxValue;
    return matchesSearch && matchesStatus && matchesValue;
  });

  const openBidDetail = (bid: Bid) => {
    setSelectedBid(bid);
    setIsDetailModalOpen(true);
  };

  const closeBidDetail = () => {
    setIsDetailModalOpen(false);
    setSelectedBid(null);
  };

  return (
    <DashboardContext.Provider
      value={{
        bids: MOCK_BIDS,
        filters,
        selectedBid,
        isDetailModalOpen,
        setFilters,
        openBidDetail,
        closeBidDetail,
        filteredBids,
        favorites,
        toggleFavorite,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
}

export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error("useDashboard must be used within a DashboardProvider");
  }
  return context;
};
