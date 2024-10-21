// TopBar.tsx

"use client";

import Image from "next/image";
import Link from "next/link";
import { BiLogOut } from "react-icons/bi";
import { CiBellOn } from "react-icons/ci";
import { MdArrowDropDown } from "react-icons/md";
import { FaRegCircleUser } from "react-icons/fa6";
import { useSession } from "next-auth/react";
import { useState } from "react";
import MobileSidebarSheet from "./MobileSidebarSheet";
import { sideBarLinksForAdmin } from "@/constants/sidebarNavigationForAdmin";
import { sideBarLinks } from "@/constants/sidebarNavigation";


const TopBar = ({ isAdmin }: { isAdmin: boolean }) => {
  const { data: session } = useSession(); // Retrieve session data
  const username = session?.user?.name || "User"; // Fallback username
  const [isOpen, setIsOpen] = useState(false); // Manage Sheet state

  // Select appropriate links based on the admin status
  const links = isAdmin ? sideBarLinksForAdmin : sideBarLinks;

  return (
    <nav className="fixed top-0 z-30 flex w-full items-center justify-between px-6 py-3 bg-white shadow-sm">
      {/* Logo Section */}
      <div className="flex items-center gap-4">
        <Link href="/" className="text-gray-700 hover:bg-transparent font-bold text-xl py-2">
         <Image src="/assets/images/logo.png" className="object-cover" alt="alt" width={180} height={140} />
        </Link>
      </div>

      {/* Hamburger Menu for Mobile */}
      <div className="md:hidden">
        <MobileSidebarSheet isOpen={isOpen} setIsOpen={setIsOpen} links={links} /> {/* Pass the links */}
      </div>

      {/* Notification and Profile Section */}
      <section className="hidden lg:flex items-center gap-6">
        {/* Notification Icon (Only for regular users) */}
        {!isAdmin && (
          <div className="relative flex items-center">
            <Link href="/investor/dashboard/notification" className="flex items-center text-gray-500 hover:text-black">
              <CiBellOn size={24} />
              <div className="absolute top-0 right-0 h-2 w-2 bg-mainColor rounded-full"></div>
              <span className="ml-1">
                <MdArrowDropDown size={24} />
              </span>
            </Link>
          </div>
        )}

        {/* Profile Section */}
        <div className="flex items-center gap-2">
          <FaRegCircleUser size={32} />
          <div className="flex flex-col">
            <span className="text-sm font-medium text-gray-800">Hi, {username}</span>
            <span className="text-xs text-gray-500">Account</span>
          </div>
        </div>
      </section>
    </nav>
  );
};

export default TopBar;
