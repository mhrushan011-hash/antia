"use client";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

export default function AdminLogoutButton() {
    const router = useRouter();
    const handleLogout = async () => {
        await fetch("/api/auth/logout", { method: "POST" });
        router.push("/admin");
    };
    return (
        <button onClick={handleLogout} className="flex items-center gap-2 px-4 py-2 text-red-600 hover:text-red-700 transition-colors">
            <LogOut className="h-4 w-4" /> Logout
        </button>
    );
}
