"use client";

import Image from "next/image";
import Link from "next/link";
import { BiLogOut } from "react-icons/bi";
import { CiBellOn } from "react-icons/ci";
import { MdArrowDropDown } from "react-icons/md";
import { FaRegCircleUser } from "react-icons/fa6";
import { useSession } from "next-auth/react"; // To get the session data
import { useState } from "react"; // To handle the mobile navigation state
import { Sheet, SheetTrigger, SheetContent, SheetClose } from "@/components/ui/sheet"; // Shadcn Sheet

const TopBar = ({isAdmin}:any) => {
  const { data: session } = useSession(); // Retrieve session data (username)
  const username = session?.user?.name || "User"; // Default to "User" if session doesn't exist

  const [isOpen, setIsOpen] = useState(false); // Manage Sheet state

  return (
    <nav className="fixed top-0 z-30 flex w-full items-center justify-between px-6 py-3 bg-white shadow-sm">
      {/* Logo Section */}
      <div className="flex items-center gap-4">
        {/* Replace this with your logo */}
        <Link
          href="/"
          className="text-gray-700 hover:bg-transparent font-bold text-xl py-2"
        >
          Logo
        </Link>
      </div>

      {/* Hamburger Menu for Mobile */}
      <div className="lg:hidden">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <button className="text-gray-700 hover:text-black">
              {/* Hamburger Icon */}
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                ></path>
              </svg>
            </button>
          </SheetTrigger>

          {/* Sheet Content for Mobile Navigation */}
          <SheetContent side="left" className="p-4 bg-white">
            <nav className="flex flex-col gap-4">
              <Link href="/" onClick={() => setIsOpen(false)}>
                Home
              </Link>
              <Link href="/dashboard" onClick={() => setIsOpen(false)}>
                Dashboard
              </Link>
              <Link href="/investor/dashboard/notifications" onClick={() => setIsOpen(false)}>
                Notifications
              </Link>
              <Link href="/profile" onClick={() => setIsOpen(false)}>
                Profile
              </Link>
              <SheetClose asChild>
                <button className="text-gray-600 mt-6">
                  Close Menu
                </button>
              </SheetClose>
            </nav>
          </SheetContent>
        </Sheet>
      </div>

      {/* Notification and Profile Section */}
      <section className="hidden lg:flex items-center gap-6">
        {/* Notification Icon */}
        <div className="relative flex items-center">
          {!isAdmin && (
            <button className="flex items-center text-gray-500 hover:text-black">
            {/* Notification Bell Icon */}
            <div className="relative">
              <Link href={'/investor/dashboard/notification'}>
                <CiBellOn size={24} />
              </Link>

              {/* Notification Dot */}
              <div className="absolute top-0 right-0 h-2 w-2 bg-orange-500 rounded-full"></div>
            </div>

            {/* Dropdown Arrow */}
            <span className="ml-1">
              <MdArrowDropDown size={24} />
            </span>
          </button>
          )}
          
        </div>

        {/* Profile Section */}
        <div className="flex items-center gap-2">
          {/* Profile Image */}
          <FaRegCircleUser size={32} />

          {/* Profile Greeting */}
          <div className="flex flex-col">
            <span className="text-sm font-medium text-gray-800">
              Hi, {username}
            </span>
            <span className="text-xs text-gray-500">Account</span>
          </div>
        </div>
      </section>
    </nav>
  );
};

export default TopBar;
