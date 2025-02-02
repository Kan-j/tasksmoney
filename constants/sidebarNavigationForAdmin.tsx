import { FaFolder, FaTasks } from 'react-icons/fa'
import { IoGrid } from 'react-icons/io5';
import { FaRankingStar } from "react-icons/fa6";
import { BiLogOut, BiMoneyWithdraw, BiSolidReport } from "react-icons/bi";
import { AiOutlineAudit } from "react-icons/ai";
import { HiOutlineFolderOpen, HiOutlineUserCircle } from "react-icons/hi2";
import { MdInfoOutline } from "react-icons/md";
import { SlNotebook } from "react-icons/sl";
import { MdOutlineCallReceived } from "react-icons/md";

export const sideBarLinksForAdmin = [
    {
        icon: <HiOutlineUserCircle fontSize={22} />,
        route: "/admin/dashboard/users",
        label: "Users",
    },
    {
        icon: <FaTasks fontSize={22}/>,
        route: "/admin/dashboard/customer-service",
        label: "Customer Service",
    },
    {
        icon: <HiOutlineFolderOpen fontSize={22}/>,
        route: "/admin/dashboard/withdrawal",
        label: "Withdrawal",
    },
    {
        icon: <HiOutlineFolderOpen fontSize={22}/>,
        route: "/admin/dashboard/recharge",
        label: "Recharge",
    },
    {
        icon: <HiOutlineFolderOpen fontSize={22}/>,
        route: "/admin/dashboard/tasks",
        label: "Tasks",
    },
    {
        icon: <BiMoneyWithdraw fontSize={22}/>,
        route: "/admin/dashboard/promotions",
        label: "Promotions",
    },
    {
        icon: <SlNotebook fontSize={22}/>,
        route: "/admin/dashboard/message-broadcast",
        label: "Message Broadcast",
    },
    {
        icon: <MdInfoOutline fontSize={22}/>,
        route: "/admin/dashboard/terms",
        label: "Terms & Conditions",
    },
    {
        icon: <HiOutlineUserCircle fontSize={22}/>,
        route: "/admin/dashboard/about",
        label: "About Us",
    }
]
