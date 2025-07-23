"use client";

import { usePathname } from "next/navigation";
import { AppSidebar } from "./_components/AppSidebar";
import WelcomeContainer from "./dashboard/_components/WelcomeContainer";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

function DashboardProvider({ children }) {
  return (
    <SidebarProvider className="bg-gray-100 min-h-screen">
      <AppSidebar />

      {/* <SidebarTrigger /> */}
      <div className="flex flex-col flex-1 w-full px-5 pt-10 m-2">
        <WelcomeContainer />
        <div>{children}</div>
      </div>
    </SidebarProvider>
  );
}

export default DashboardProvider;
