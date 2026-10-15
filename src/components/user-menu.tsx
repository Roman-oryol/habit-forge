import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCurrentUser } from "@/hooks/use-current-user";
import { authToken } from "@/lib/auth-token";

const UserMenu = () => {
  const { data: user } = useCurrentUser();

  return (
    <div className="flex items-center gap-2">
      {user && (
        <span className="text-muted-foreground hidden text-sm sm:inline">
          {user.email}
        </span>
      )}
      <Button
        variant="ghost"
        size="icon"
        aria-label="Log out"
        onClick={() => authToken.clear()}
      >
        <LogOut className="size-5" />
      </Button>
    </div>
  );
};
export default UserMenu;
