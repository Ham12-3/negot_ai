import { ProtectedLayout } from "@/components/dashboard/protected-layout";
import React from "react";

export default function Layout({children}: {children:React.ReactNode}){
    return (
        <ProtectedLayout>
        <main>
        {children}
        </main>
        
        </ProtectedLayout>
    )
}