import { ReactNode } from "react";
import BottomNav from "./BottomNav";

interface Props {
  children: ReactNode;
  showNav?: boolean;
  className?: string;
}

export default function AppShell({ children, showNav = true, className = "" }: Props) {
  return (
    <div className="app-shell">
      <main className={`flex-1 overflow-y-auto pb-4 ${className}`}>{children}</main>
      {showNav && <BottomNav />}
    </div>
  );
}
