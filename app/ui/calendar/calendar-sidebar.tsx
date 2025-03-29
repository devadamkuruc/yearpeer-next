import { Sidebar, SidebarContent, SidebarHeader } from "@/components/ui/sidebar";

export default function CalendarSidebar() {
    return (
        <Sidebar side="right">
            <SidebarHeader>
                Header
            </SidebarHeader>
            <SidebarContent>
                Content
            </SidebarContent>
        </Sidebar>
    );
};