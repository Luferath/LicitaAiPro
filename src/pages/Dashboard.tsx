import Header from "@/components/dashboard/Header";
import MapSection from "@/components/dashboard/MapSection";
import FilterPanel from "@/components/dashboard/FilterPanel";
import BidGrid from "@/components/dashboard/BidGrid";
import BidDetailModal from "@/components/dashboard/BidDetailModal";
import { DashboardProvider, useDashboard } from "@/contexts/DashboardContext";

function DashboardContent() {
  const { selectedBid, isDetailModalOpen, closeBidDetail } = useDashboard();

  return (
    <div className="min-h-screen bg-[#1a1f3c]">
      <Header />

      <main className="container mx-auto py-6 px-4">
        <div className="grid grid-cols-[1fr_280px] gap-6">
          <div className="space-y-6">
            <MapSection />
            <BidGrid />
          </div>
          <FilterPanel />
        </div>
      </main>

      {selectedBid && (
        <BidDetailModal
          open={isDetailModalOpen}
          onClose={closeBidDetail}
          bid={selectedBid}
        />
      )}
    </div>
  );
}

export default function Dashboard() {
  return (
    <DashboardProvider>
      <DashboardContent />
    </DashboardProvider>
  );
}
