import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar"
import {User, Settings, ReceiptText} from 'lucide-react';
import {auth} from "@/auth";
import SignOut from "@/app/ui/logout/logout-button";
import Link from "next/link";

export default async function UserAvatar() {
    const session = await auth()
    if (!session?.user) return null
    
    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="flex w-fit outline-none">
                <Avatar className="size-9">
                    <AvatarImage src={session.user.image || ""} alt="User Avatar"/>
                    <AvatarFallback className="bg-white">
                        <User className="text-black" size={16}/>
                    </AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-2xs">
                <DropdownMenuLabel className="flex items-center gap-4">
                    <Avatar>
                        <AvatarImage src={session.user.image || ""} alt="User Avatar"/>
                        <AvatarFallback className="bg-white">
                            <User className="text-black"/>
                        </AvatarFallback>
                    </Avatar>
                    {session.user.email}
                </DropdownMenuLabel>
                <DropdownMenuSeparator/>
                <DropdownMenuItem>
                    <Link className="flex items-center gap-2 w-full cursor-default" href="/dashboard">
                        <Settings/>
                        Settings
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <Link className="flex items-center gap-2 w-full cursor-default" href="#">
                        <ReceiptText/>
                        Subscription
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator/>
                <DropdownMenuItem>
                    <SignOut/>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

