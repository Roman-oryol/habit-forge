import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCurrentUser } from "@/hooks/use-current-user";
import { useLogout } from "@/hooks/use-logout";

const UserMenu = () => {
  const { data: user } = useCurrentUser();
  const logout = useLogout();

  return (
    <div className="flex items-center gap-2">
      {user && (
        <span className="text-muted-foreground hidden text-sm sm:inline">
          {user.email}
        </span>
      )}
      <Button variant="ghost" size="icon" aria-label="Log out" onClick={logout}>
        <LogOut className="size-5" />
      </Button>
    </div>
  );
};
export default UserMenu;
