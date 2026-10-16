"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleClick = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/login");
  }

  return (
    <nav className="flex items-center justify-between bg-blue-600 px-6 py-3 text-white">
      <Link href="/" className="font-bold">
        Task Manager
      </Link>

      <div className="space-x-4">
        {
          !isLoggedIn ? (
            <>
              <Link href="/login">Login</Link>
              <Link href="/register">Register</Link>
            </>
          ) : (
            <>
              <Link href="/tasks">Tasks</Link>
              <Link href="/tasks/create">Create</Link>
              <button
                onClick={handleClick}
              >
                Logout
              </button>
            </>
          )
        }
      </div>
    </nav>
  );
}