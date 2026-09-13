import { Leaf } from "lucide-react";
import { Outlet } from "react-router";
import Navigation from "@/components/navigation";

const AppLayout = () => {
  return (
    <div className="bg-background text-foreground flex h-svh overflow-hidden md:p-6 md:pt-0">
      <div className="mx-auto grid h-full w-full max-w-360 grid-rows-[auto_1fr]">
        <header className="max-md:bg-card border-border py-4 max-md:border-b max-md:px-4">
          Header
        </header>
        <div className="border-border relative min-h-0 rounded-2xl md:border">
          <aside className="md:border-border bg-card fixed p-4 max-md:inset-x-0 max-md:bottom-0 max-md:border-t max-md:py-2 md:absolute md:inset-y-0 md:flex md:w-64 md:flex-col md:rounded-l-2xl md:border-r">
            <div className="mb-8 flex items-center gap-2 text-lg font-semibold max-md:hidden">
              <Leaf className="text-primary-foreground bg-primary size-8 rounded-lg p-2" />
              <span>HabitForge</span>
            </div>
            <Navigation />
          </aside>

          <main className="h-full overflow-y-auto p-4 pb-24 md:ml-64 md:p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default AppLayout;
