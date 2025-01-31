import BidCard from "./BidCard";
import { Button } from "@/components/ui/button";
import { useDashboard } from "@/contexts/DashboardContext";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

const ITEMS_PER_PAGE = 4;

export default function BidGrid() {
  const { filteredBids, openBidDetail, favorites, toggleFavorite } =
    useDashboard();
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(filteredBids.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const visibleBids = filteredBids.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE,
  );

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        {visibleBids.map((bid) => (
          <BidCard
            key={bid.id}
            id={bid.id}
            title={bid.title}
            status={bid.status}
            value={bid.value}
            deadline={bid.deadline}
            isFavorite={favorites.includes(bid.id)}
            onToggleFavorite={() => toggleFavorite(bid.id)}
            onViewDetails={() => openBidDetail(bid)}
          />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="bg-[#2a2a3c] border-[#2a2a3c] text-[#00ff88] hover:bg-[#3a3a4c] hover:text-[#00ff88]"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <div className="flex items-center px-4 text-[#00ff88]">
            {currentPage} / {totalPages}
          </div>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="bg-[#2a2a3c] border-[#2a2a3c] text-[#00ff88] hover:bg-[#3a3a4c] hover:text-[#00ff88]"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
}
