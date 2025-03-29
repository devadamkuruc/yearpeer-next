import CalendarSidebar from "@/app/ui/calendar/calendar-sidebar";
import Link from "next/link";
import Image from "next/image";
import YearPicker from "@/app/ui/calendar/year-picker";
import {SidebarProvider} from "@/components/ui/sidebar";

export default async function Layout({children, params}: {
    children: React.ReactNode,
    params: Promise<{ year: string }>
}) {
    const {year} = await params;

    console.log(year);

    return (
        <SidebarProvider>
            <div className="flex h-screen bg-[#E5E5E5]">
                <div className="flex flex-1 flex-col">
                    <div className="flex">
                        <Link href={`/calendar/${year}`}>
                            <Image src="/yearpeer-logo.svg" alt="YearPeer Logo" width={120} height={27}/>
                        </Link>

                        <YearPicker year={year}/>
                    </div>

                    {children}
                </div>
                <CalendarSidebar/>
            </div>
        </SidebarProvider>
    );
};