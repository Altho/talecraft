import './globals.css'
import {Inter} from 'next/font/google'
import {SideBar} from "@/app/components/layout/SideBar";
import {Providers} from "@/app/Providers";
import {ReactNode} from "react";

//const inter = Inter({subsets: ['latin']})

export default function RootLayout({children}: {
    children: ReactNode
}) {
    return (
        <html lang="en">
        <Providers>
            <body>
              <SideBar/>
              {children}
            </body>
        </Providers>
        </html>
    )
}
