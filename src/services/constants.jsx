// Importing icons from lucide-react
import {
  LayoutDashboard,
  Calendar,
  WalletCards,
  List,
  Settings,
  Puzzle,
  Code2,
  User,
  BriefcaseBusiness,
  Crown,
} from "lucide-react";

// Sidebar base navigation options
export const SideBaseOptions = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Scheduled Interviews",
    path: "/scheduled-interviews",
    icon: Calendar,
  },
  {
    name: "All Interviews",
    path: "/all-interviews",
    icon: List,
  },
  {
    name: "Billing",
    path: "/billing",
    icon: WalletCards,
  },
  {
    name: "Settings",
    path: "/settings",
    icon: Settings,
  },
];

// Interview type options
export const InterviewTypes = [
  {
    title: "Technical",
    icon: Code2,
  },
  {
    title: "Behavioral",
    icon: User,
  },
  {
    title: "Experience",
    icon: BriefcaseBusiness,
  },
  {
    title: "Problem Solving",
    icon: Puzzle,
  },
  {
    title: "Leadership",
    icon: Crown,
  },
];
