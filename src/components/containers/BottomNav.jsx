import {
  Home,
  BatteryCharging,
  MapPin,
  BookOpenText,
  Delete,
} from "lucide-react";

export function BottomNav() {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-purple-800">
      <nav className="flex justify-around items-center h-16">
        <button className="text-white text-2xl p-2">
          <Home />
        </button>

        <button className="text-white text-2xl p-2">
          <BatteryCharging />
        </button>

        <button className="text-white text-2xl p-2">
          <MapPin />
        </button>

        <button className="text-white text-2xl p-2">
          <BookOpenText />
        </button>

        <button className="text-white text-2xl p-2">
          <Delete />
        </button>
      </nav>
    </div>
  );
}
