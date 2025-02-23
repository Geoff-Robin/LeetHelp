import ThemeToggle from "@/components/ThemeToggle";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav
      className="w-full bg-white/30 dark:bg-zinc-800/30 backdrop-blur-md border-b border-white/20 dark:border-zinc-700 shadow-md px-6 py-3
                md:fixed md:top-0 md:left-0 md:w-full md:z-50"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <span className="text-xl font-bold font-Oswald">
          LeetHelp
        </span>
        <div className="flex flex-row gap-4 items-center">
          <button className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
            <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
            <span className="inline-flex px-7 h-full w-full cursor-pointer items-center justify-center rounded-full dark:bg-slate-950 py-1 text-sm font-medium dark:text-white backdrop-blur-3xl">
              <Link to="/home">Get Started</Link>
            </span>
          </button>
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
