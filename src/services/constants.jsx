import {
  LayoutDashboard,
  Calendar,
  WalletCards,
  List,
  Settings,
} from "lucide-react";

export const SideBaseOptions = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
    current: true,
  },
  {
    name: "Scheduled Interviews",
    path: "/scheduled-interviews",
    icon: Calendar,
    current: false,
  },
  {
    name: "All Interviews",
    path: "/all-interviews",
    icon: List,
    current: false,
  },
  {
    name: "Billing",
    path: "/billing",
    icon: WalletCards,
    current: false,
  },
  {
    name: "Settings",
    path: "/settings",
    icon: Settings,
    current: false,
  },
];
