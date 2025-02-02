import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { MdArrowDropDown } from "react-icons/md"; // For dropdown arrows
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "@/components/ui/avatar"

const transactions = [
  { name: "Darlene Robertson", amount: "250 USDT", image: "/path-to-image" },
  { name: "Darlene Robertson", amount: "380 USDT", image: "/path-to-image" },
  { name: "Darlene Robertson", amount: "70 USDT", image: "/path-to-image" },
  { name: "Darlene Robertson", amount: "5500 USDT", image: "/path-to-image" },
];

const TransactionTable = () => {
  return (
    <div className="w-full overflow-auto ">
      <Table className="min-w-full border-collapse bg-white">
        {/* Table Head */}
        <TableHeader>
          <TableRow className="bg-gray-100">
            <TableHead className="px-6 py-4 text-left text-gray-600">
              Name
              <MdArrowDropDown className="inline ml-1" />
            </TableHead>
            <TableHead className="px-6 py-4 text-right text-gray-600">
              Amount
              <MdArrowDropDown className="inline ml-1" />
            </TableHead>
          </TableRow>
        </TableHeader>
        {/* Table Body */}
        <TableBody>
          {transactions.map((transaction, index) => (
            <TableRow key={index} className="bg-white  hover:bg-gray-100">
              {/* Avatar and Name */}
              <TableCell className="flex items-center px-6 py-4 whitespace-nowrap">
                <Avatar className="mr-4">
                  <AvatarImage src={transaction.image} alt={transaction.name} />
                  <AvatarFallback>{transaction.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <span className="font-medium text-gray-600">{transaction.name}</span>
              </TableCell>
              {/* Amount */}
              <TableCell className="px-6 py-4 text-right font-medium text-gray-600">
                {transaction.amount}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TransactionTable;
