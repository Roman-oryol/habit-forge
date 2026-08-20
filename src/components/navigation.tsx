import { NavLink } from "react-router";
import clsx from "clsx";
import { LayoutDashboard, Repeat } from "lucide-react";

const navigationItems = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/habits", label: "Habits", icon: Repeat },
];

const Navigation = () => {
  const navLinkStyles = ({ isActive }: { isActive: boolean }) =>
    clsx(
      "rounded-lg px-3 py-2 text-sm transition-all flex max-md:flex-col items-center gap-1",
      isActive
        ? "bg-primary text-primary-foreground"
        : "text-muted-foreground hover:bg-muted hover:text-foreground",
    );

  return (
    <nav className="grid grid-cols-4 gap-1 md:flex md:flex-col">
      {navigationItems.map(({ to, label, icon: Icon }) => (
        <NavLink to={to} className={navLinkStyles} key={to}>
          {<Icon className="size-5" />}
          {label}
        </NavLink>
      ))}
    </nav>
  );
};
export default Navigation;
