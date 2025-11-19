// src/components/app-sidebar.tsx
import {
  Home,
  Users,
  Building2,
  Megaphone,
  UserCircle,
  MoreVertical,
  LogOut,
  Settings,
  Plus
} from "lucide-react"
import { useNavigate, useLocation } from "react-router"
import { useAuthUser, useLogout } from "@/hooks/useAuth"

// Sections configuration
const sections = [
  {
    label: "Admins",
    path: "/admins",
    icon: UserCircle,
  },
  {
    label: "Brands",
    path: "/brands",
    icon: Building2,
  },
  {
    label: "Campaigns",
    path: "/campaigns",
    icon: Megaphone,
  },
  {
    label: "Influencers",
    path: "/influencers",
    icon: Users,
  },
]

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from "@/components/ui/sidebar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ModeToggle } from "./mode-toggle"

export function AppSidebar() {
  const navigate = useNavigate()
  const location = useLocation()
  const { data: user } = useAuthUser()
  const { mutate: logout } = useLogout()

  const handleNavigation = (url: string) => {
    navigate(url)
  }

  const handleLogout = () => {
    logout(undefined, {
      onSuccess: () => {
        navigate("/")
      },
    })
  }

  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={() => handleNavigation("/home")}
                  isActive={location.pathname === "/home"}
                  tooltip="Home"
                >
                  <Home />
                  <span>Home</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {sections.map((section) => (
          <SidebarGroup key={section.label}>
            <SidebarGroupLabel>{section.label}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    onClick={() => handleNavigation(section.path)}
                    isActive={location.pathname === section.path}
                    tooltip={section.label}
                  >
                    <section.icon />
                    <span>See all {section.label}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    onClick={() => handleNavigation(`${section.path}/create`)}
                    isActive={location.pathname === `${section.path}/create`}
                    tooltip={`Create ${section.label}`}
                  >
                    <Plus />
                    <span>Create {section.label.slice(0, -1)}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <ModeToggle />
          </SidebarMenuItem>
        </SidebarMenu>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                  <UserCircle className="h-8 w-8" />
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">
                      {user?.firstName || "User"}
                    </span>
                    <span className="truncate text-xs">
                      {user?.email || "user@example.com"}
                    </span>
                  </div>
                  <MoreVertical className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                side="bottom"
                align="end"
                sideOffset={4}
              >
                <DropdownMenuItem onClick={() => navigate("/settings")}>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}