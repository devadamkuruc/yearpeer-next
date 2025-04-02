import {signOut} from "@/auth";
import {Button} from "@/components/ui/button";
import {LogOut} from "lucide-react";

export default function SignOut() {
    return (
        <form
            action={async () => {
                "use server"
                await signOut()
            }}
        >
            <Button type="submit" variant="ghost" size="xs" className="w-full p-0">
                <LogOut/>
                Sign out
            </Button>
        </form>
    )
}