import { Outlet } from "react-router";
import Navigation from "@/components/navigation";
import Logo from "@/components/logo";
import ThemeToggle from "@/components/theme-toggle";

const AppLayout = () => {
  return (
    <div className="bg-background text-foreground flex h-svh overflow-hidden md:p-6 md:pt-0">
      <div className="mx-auto grid h-full w-full max-w-360 grid-rows-[auto_1fr]">
        <header className="flex items-center justify-between px-4 py-3 max-md:border-b">
          <Logo />
          <div className="flex items-center gap-2">
            <ThemeToggle />
          </div>
        </header>
        <div className="border-border relative min-h-0 rounded-2xl md:border">
          <aside className="md:border-border bg-card fixed p-4 max-md:inset-x-0 max-md:bottom-0 max-md:border-t max-md:py-2 md:absolute md:inset-y-0 md:flex md:w-64 md:flex-col md:rounded-l-2xl md:border-r">
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
