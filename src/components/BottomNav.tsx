import { NavLink } from "react-router-dom";
import { Home, Map, BookOpen, Dumbbell, User } from "lucide-react";

const items = [
  { to: "/home", label: "GuideMate", Icon: Home },
  { to: "/roadmap", label: "Roadmap", Icon: Map },
  { to: "/learning", label: "Learning", Icon: BookOpen },
  { to: "/practice", label: "Practice", Icon: Dumbbell },
  { to: "/profile", label: "Profile", Icon: User },
];

export default function BottomNav() {
  return (
    <nav className="sticky bottom-0 z-40 mx-auto w-full max-w-md border-t border-border/60 bg-background/80 backdrop-blur-xl">
      <ul className="grid grid-cols-5 px-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-2">
        {items.map(({ to, label, Icon }) => (
          <li key={to}>
            <NavLink
              to={to}
              className={({ isActive }) =>
                `flex flex-col items-center gap-1 rounded-2xl px-1 py-2 text-[10px] font-medium transition-colors ${
                  isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <span
                    className={`flex h-9 w-9 items-center justify-center rounded-2xl transition-all ${
                      isActive ? "bg-primary/15" : "bg-transparent"
                    }`}
                  >
                    <Icon className="h-5 w-5" strokeWidth={isActive ? 2.4 : 1.8} />
                  </span>
                  <span>{label}</span>
                </>
              )}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
