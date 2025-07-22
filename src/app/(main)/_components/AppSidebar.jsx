"use client";
import Image from "next/image";
import Link from "next/link";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import { SideBaseOptions } from "@/services/constants";
import { usePathname } from "next/navigation";

export function AppSidebar() {
  const path = usePathname();
  console.log("Current path:", path);
  return (
    <Sidebar>
      <SidebarHeader className="flex items-center justify-center pt-5">
        <Image
          src="/sidebarLogo.png"
          alt="Logo"
          width={200}
          height={200}
          className="w-[150px]"
        />
        <Button className="w-full">
          <Plus /> Create New Interview
        </Button>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup />
        <SidebarMenu>
          {SideBaseOptions.map((option, index) => (
            <SidebarMenuItem key={index} className="p-1">
              <SidebarMenuButton
                asChild
                className={`p-5 ${path == option.path && "bg-blue-50"}`}
              >
                <Link href={option.path}>
                  <option.icon
                    className={`${path == option.path && "text-primary"} `}
                  />
                  <span
                    className={`text-[16px] font-medium ${
                      path == option.path && "text-primary"
                    } `}
                  >
                    {option.name}
                  </span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
        <SidebarGroup />
      </SidebarContent>

      <SidebarFooter />
    </Sidebar>
  );
}
