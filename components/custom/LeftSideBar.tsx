"use client"

import { signOut } from 'next-auth/react'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { BiLogOut } from 'react-icons/bi'
import { sideBarLinks } from '@/constants/sidebarNavigation'
import { sideBarLinksForAdmin } from '@/constants/sidebarNavigationForAdmin'


interface LeftSideBarProps {
  isAdmin: boolean; // Pass this prop to determine if the user is an admin
}

const LeftSideBar: React.FC<LeftSideBarProps> = ({ isAdmin }) => {
  const pathname = usePathname();

  // Select the correct set of links based on the user type
  const links = isAdmin ? sideBarLinksForAdmin : sideBarLinks;

  return (
    <section className="sticky left-0 top-0 z-20 flex h-screen w-fit flex-col justify-between overflow-auto border-r border-r-dark-4 bg-white pb-5 pt-20 max-md:hidden">
      <div className="flex w-full flex-1 flex-col gap-1 px-6 pt-6 bg-white">
        {/* Map over the appropriate links array */}
        {links.map((link: any) => {
          const isActive =
            (pathname.includes(link.route) && link.route.length > 10) ||
            pathname === link.route;
          return (
            <Link
              href={link.route}
              key={link.label}
              className={`relative flex justify-start gap-4 rounded-lg p-4 ${
                isActive && 'bg-mainColor text-white '
              }`}
            >
              {link.icon}
              <p className="font-medium max-lg:hidden">{link.label}</p>
            </Link>
          );
        })}
        {/* Logout Button */}
        <div className="">
          
          <button onClick={() => signOut()} className="flex gap-4 p-4">
            <BiLogOut fontSize={22} />
            <p className="text-gray-900 font-medium max-lg:hidden">Logout</p>
          </button>
        </div>
      </div>
    </section>
  );
};

export default LeftSideBar;
