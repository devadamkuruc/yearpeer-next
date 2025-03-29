import {
    Card, CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import Link from "next/link";
import GoogleSignInButton from "@/app/ui/login/google-signin-button";

export default function SigninForm() {

    return (
        <div className="flex flex-col gap-6">
            <Card>
                <CardHeader className="text-center">
                    <CardTitle className="text-xl">Welcome back</CardTitle>
                    <CardDescription>
                        Login with your Google account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-6">
                        <div className="flex flex-col gap-4">
                            <GoogleSignInButton/>
                        </div>
                    </div>

                </CardContent>
            </Card>
            <div
                className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary  ">
                By clicking continue, you agree to our <Link href="#">Terms of Service</Link>{" "}
                and <Link href="#">Privacy Policy</Link>.
            </div>
        </div>
    )
}
