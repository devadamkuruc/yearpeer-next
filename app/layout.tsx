import '@/app/ui/global.css';
import { yearpeerFont } from '@/app/ui/fonts';

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
        <body className={`${yearpeerFont.className} antialiased bg-[#E5E5E5]`}>{children}</body>
        </html>
    );
}
