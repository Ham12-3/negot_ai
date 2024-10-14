/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";


const navItems: { name: string; href: string }[] = [
    {name: "Dashboard", href: "/dashboard"},

    { name: "Pricing", href: "/pricing" },
    {name: "Privacy", href: "/privacy"},
]


function googleSignIn():Promise<void> {
    return new Promise((resolve)=> {
        window.location.href= "http://localhost:8080/auth/google"
        resolve()
    })
}

export function Header () {
const pathname = usePathname()





const user = true


    return (
        <header className="sticky px-4 top-0 z-50 w-full border-b bg-background/95 backdrop-blur ">
        <div className="container flex h-16 items-center">
            <div className="mr-4 hidden md:flex">

                <Link href={"/"} className="mr-6 fex items-center space-x-2">
                NEGOT.ai

                </Link>

                <nav className="flex items-center spx- text-sm font-medium">
                    {
                        navItems.map((item)=> (
                            <Link key={item.name} href={item.href}
                            className={cn("transition-colors hover:text-foreground/80",
                                pathname === item.href ? "text-foreground" : "text-background/60"
                            )}
                            >
                            {item.name}
                            
                            </Link>
                        ))
                    }

                </nav>

            </div>
<div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
<div className="w-full flex-1 md:auto md:flex-none space-x-2 hidden md:flex">

    <Button
    onClick={googleSignIn}>
        Get Started
    </Button>

</div>
</div>
        </div>
        </header>
    )
}