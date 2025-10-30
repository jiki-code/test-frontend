import { CircleCheck } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "../components/ui/button";
const Header = ({ className }) => {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);
  return (
    <div className={`${className} w-full`}>
      <div className="space-y-2 flex flex-row items-center justify-between w-full bg-neutral-50 dark:bg-slate-900 rounded-xl mt-3 shadow-lg border border-neutral-200 dark:border-slate-800 p-6">
        <div className="flex items-center gap-2 w-full">
          <CircleCheck className="size-6 mt-2 text-primary" />
          <h1 className="text-2xl font-bold text-[#000] dark:text-white bg-primary bg-clip-text">
            Inventory Dashboard
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex flex-col items-start gap-1">
            <p className="text-sm text-neutral-500 dark:text-slate-100">
              Theme
            </p>
            <select value={theme} onChange={(e) => setTheme(e.target.value)} className="border-1 bg-gray-50 dark:bg-neutral-900 border-neutral-200 dark:border-back rounded-xl p-2 text-sm">
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
          </div>
          <Button type="primary" className="text-sm text-white dark:bg-primary dark:text-black dark:hover:bg-primary/90">
            Menu
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Header;
