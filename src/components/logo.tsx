import { Leaf } from "lucide-react";
import { Link } from "react-router";

const Logo = () => {
  return (
    <Link
      to="/dashboard"
      className="flex items-center gap-2 text-lg font-semibold transition-opacity hover:opacity-80 active:opacity-70"
    >
      <Leaf className="text-primary-foreground bg-primary size-8 rounded-lg p-2" />
      <span>HabitForge</span>
    </Link>
  );
};
export default Logo;
