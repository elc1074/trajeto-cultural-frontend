import {
  Home,
  BatteryCharging,
  MapPin,
  BookOpenText,
  Delete,
} from "lucide-react";

export function BottomNav() {
  return (
    <div className="fixed bottom-0 left-0 right-0 border-t bg-background shadow-md">
      <nav className="flex justify-around items-center h-14">
        <button className="flex flex-col items-center text-sm text-muted-foreground hover:text-primary">
          <Home className="h-5 w-5" />
        </button>

        <button className="flex flex-col items-center text-sm text-muted-foreground hover:text-primary">
          <BatteryCharging className="h-5 w-5" />
        </button>

        <button className="flex flex-col items-center text-sm text-muted-foreground hover:text-primary">
          <MapPin className="h-5 w-5" />
        </button>

        <button className="flex flex-col items-center text-sm text-muted-foreground hover:text-primary">
          <BookOpenText className="h-5 w-5" />
        </button>

        <button className="flex flex-col items-center text-sm text-muted-foreground hover:text-primary">
          <Delete className="h-5 w-5" />
        </button>
      </nav>
    </div>
  );
}
