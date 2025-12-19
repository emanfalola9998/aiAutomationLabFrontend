"use client";

import { usePathname } from "next/navigation";

export default function PageWrapper({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    const bgClass = pathname === "/" ? "bg-[#FAF3E1]" : "bg-white";

    return (
        <div className={`min-h-screen ${bgClass}`}>
            {children}
        </div>
    );
}