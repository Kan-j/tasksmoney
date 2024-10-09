import { FaFolder, FaTasks } from 'react-icons/fa'
import { IoGrid } from 'react-icons/io5';
import { FaRankingStar } from "react-icons/fa6";
import { BiLogOut, BiMoneyWithdraw, BiSolidReport } from "react-icons/bi";
import { AiOutlineAudit } from "react-icons/ai";
import { HiOutlineFolderOpen, HiOutlineUserCircle } from "react-icons/hi2";
import { MdInfoOutline } from "react-icons/md";
import { SlNotebook } from "react-icons/sl";
import { MdOutlineCallReceived } from "react-icons/md";

export const sideBarLinks = [
    {
        icon: <HiOutlineUserCircle fontSize={22} />,
        route: "/investor/dashboard/profile",
        label: "Profile",
    },
    {
        icon: <FaTasks fontSize={22}/>,
        route: "/investor/dashboard/tasks",
        label: "Tasks",
    },
    // {
    //     icon: <HiOutlineFolderOpen fontSize={22}/>,
    //     route: "/investor/dashboard/record",
    //     label: "Record",
    // },
    {
        icon: <BiMoneyWithdraw fontSize={22}/>,
        route: "/investor/dashboard/withdrawal",
        label: "Withdrawal",
    },
    {
        icon: <SlNotebook fontSize={22}/>,
        route: "/investor/dashboard/salary-list",
        label: "Salary List",
    },
    {
        icon: <MdOutlineCallReceived fontSize={22}/>,
        route: "/investor/dashboard/recharge",
        label: "Recharge",
    },
    {
        icon: <MdOutlineCallReceived fontSize={22}/>,
        route: "/investor/dashboard/account-settings",
        label: "Account Settings",
    },
    {
        icon: <MdInfoOutline fontSize={22}/>,
        route: "/investor/dashboard/terms",
        label: "Terms & Conditions",
    },
    {
        icon: <HiOutlineUserCircle fontSize={22}/>,
        route: "/investor/dashboard/about",
        label: "About Us",
    }
]
