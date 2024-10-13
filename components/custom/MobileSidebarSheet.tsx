"use client"
import { Sheet, SheetTrigger, SheetContent, SheetClose } from "@/components/ui/sheet";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Dispatch, SetStateAction } from "react";
import { BiLogOut } from "react-icons/bi";

interface MobileSidebarSheetProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  links: { label: string; route: string }[]; // Links passed as props (Array of objects)
}

const MobileSidebarSheet: React.FC<MobileSidebarSheetProps> = ({ isOpen, setIsOpen, links }) => {
  const pathname = usePathname()
  return (
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
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
      </SheetTrigger>

      {/* Mobile Sidebar Sheet Content */}
      <SheetContent side="left" className="p-4 bg-white">
        <nav className="flex flex-col overflow-auto h-screen gap-4">
          {/* Map through the links and render the navigation items */}
          {links.map((link: any) => {
            const isActive =
                (pathname.includes(link.route) && link.route.length > 10) ||
                pathname === link.route;
            return (
                <Link
                href={link.route}
                key={link.label}
                className={`relative flex justify-start gap-4 rounded-lg p-4 ${
                    isActive && 'bg-orange-500 text-white '
                }`}
                onClick={() => setIsOpen(false)}
                >
                {link.icon}
                <p className="font-medium ">{link.label}</p>
                </Link>
            );
            })}
            {/* Logout Button */}
            <div className="">
            
            <button onClick={() => signOut()} className="flex gap-4 p-4">
                <BiLogOut fontSize={22} />
                <p className="text-gray-900 font-medium ">Logout</p>
            </button>
            </div>

          {/* Add Logout button */}
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default MobileSidebarSheet;
