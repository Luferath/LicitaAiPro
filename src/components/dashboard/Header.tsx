import { MoonIcon, SunIcon, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function Header() {
  const [isDark, setIsDark] = useState(true);

  return (
    <header className="w-full h-16 bg-[#1a1f3c] border-b border-[#2a2a3c] flex items-center justify-between px-6">
      <div className="flex items-center gap-2">
        <h1 className="text-[#00ff88] text-xl font-bold">
          Licitações Públicas
        </h1>
      </div>
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="text-[#00ff88] relative">
          <Bell className="h-5 w-5" />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#00ff88] text-[#1a1f3c] rounded-full text-xs flex items-center justify-center">
            3
          </span>
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="text-[#00ff88]"
          onClick={() => setIsDark(!isDark)}
        >
          {isDark ? (
            <MoonIcon className="h-5 w-5" />
          ) : (
            <SunIcon className="h-5 w-5" />
          )}
        </Button>
      </div>
    </header>
  );
}
