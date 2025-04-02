import { Sidebar, SidebarContent, SidebarHeader } from "@/components/ui/sidebar";
import UserAvatar from "@/app/ui/common/user-avatar";
import Goals from "@/app/ui/calendar/goals/goals";

interface CalendarSidebarProps {
    year: string;
}

export default function CalendarSidebar({year} : CalendarSidebarProps) {
    return (
        <Sidebar side="right" color="black">
            <SidebarHeader className="flex items-end w-full p-4">
                <UserAvatar/>
            </SidebarHeader>
            <SidebarContent className="p-4">
                <Goals year={year}/>
            </SidebarContent>
        </Sidebar>
    );
};