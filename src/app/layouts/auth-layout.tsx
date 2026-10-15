import { Outlet } from "react-router";
import Logo from "@/components/logo";
import ThemeToggle from "@/components/theme-toggle";

const AuthLayout = () => {
  return (
    <div className="bg-background text-foreground flex min-h-svh flex-col">
      <header className="flex items-center justify-between px-4 py-3 md:px-6">
        <Logo />
        <ThemeToggle />
      </header>
      <main className="flex flex-1 items-center justify-center p-4">
        <div className="w-full max-w-sm">
          <Outlet />
        </div>
      </main>
    </div>
  );
};
export default AuthLayout;
