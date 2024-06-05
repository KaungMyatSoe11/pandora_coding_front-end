"use client";
import { MenuIcon, MountainIcon } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

const Header = () => {
  const { data } = useSession();
  const handleSignOut = async () => {
    await signOut({ callbackUrl: "/" }); // Redirect to home page after sign out
  };
  return (
    <header className="flex items-center justify-between h-16 px-4 md:px-6 border-b sticky w-full top-0 z-50 bg-white">
      <Link href="/" className="flex items-center gap-2" prefetch={false}>
        <MountainIcon className="h-6 w-6" />
        <span className="text-lg font-semibold">Blog</span>
      </Link>
      <nav className="hidden md:flex items-center gap-6">
        <Link
          href="/admin/post"
          className={`text-sm font-medium hover:underline ${!data?.user && "hidden"}`}
          prefetch={false}
        >
          Blog Setting
        </Link>
        <Link
          size="sm"
          href={"/auth/signin"}
          className={`${data?.user && "hidden"}`}
        >
          <Button className="rounded-md px-4 py-2 text-sm font-medium">
            Admin Login
          </Button>
        </Link>
        <Button
          variant="outline"
          size="sm"
          className={`${
            !data?.user && "hidden"
          } rounded-md px-4 py-2 text-sm font-medium text-red-500 hover:text-red-600`}
          onClick={handleSignOut}
        >
          Logout
        </Button>
      </nav>
      <Button variant="outline" size="icon" className="md:hidden">
        <MenuIcon className="h-6 w-6" />
        <span className="sr-only">Toggle navigation</span>
      </Button>
    </header>
  );
};

export default Header;
