import { FC } from "react";
 import SearchInput from "./ui/SearchInput";

import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "./ui/dropdown-menu";
import { ShoppingCart, ChevronDown } from "lucide-react";
import images from "../assets";
import { Link } from "react-router-dom";
import { URLS } from "../lib/api"; // adjust path if needed

// Define Type for Props
interface HeaderProps {
  navCategories: Record<string, Record<string, string>>;
}

const Header: FC<HeaderProps> = ({ navCategories }) => {
  return (
    <header className="bg-black text-white py-4 px-8 flex flex-col font-poppins">
      <div className="flex justify-between w-full flex-col md:flex-row">
        <div className="flex justify-between items-center md:hidden">
          <Link to="/">
            <img src={images.logo} alt="Logo" className="w-16 h-16" />
          </Link>
          <div className="flex space-x-4">
            <DropdownMenu>
              <DropdownMenuTrigger className="flex text-white font-medium bg-transparent text-sm">
                My Account <ChevronDown className="ml-1 mt-1 w-4 h-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-black text-white mt-2 rounded-md shadow-md p-2 border border-yellow-400">
                <DropdownMenuItem asChild>
                <a href={URLS.login} target="_blank">Login</a>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/register" className="hover:bg-yellow-400 hover:text-black">
                    Register
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button className="bg-transparent flex items-center space-x-1">
              <span className="text-white text-lg font-bold bg-slate-800 rounded-md px-2">0</span>
              <ShoppingCart style={{ width: "24px", height: "24px" }} />
            </Button>
          </div>
        </div>

        <div className="hidden md:flex justify-center md:justify-start">
          <Link to="/">
            <img src={images.logo} alt="Logo" className="w-24 h-24 md:w-32 md:h-32" />
          </Link>
        </div>

        <div className="flex-1 mx-0 md:mx-8 flex flex-col mt-4 md:mt-0">
          <div className="text-center text-white mb-1">
            <span className="font-bold text-lg italic md:text-xl">Rare Posters & Art Prints</span>
            <br className="md:hidden" />
            <span className="text-sm italic md:text-base">on Paper or Stretched Canvas</span>
          </div>
          <div className="relative flex items-center w-full mt-2">
            <SearchInput />
          </div>
          <nav className="grid grid-cols-2 gap-2 md:flex md:flex-row justify-between mt-4 text-yellow-400 font-medium md:space-y-0">
            {Object.entries(navCategories).map(([category, subCategories]) => (
              <DropdownMenu key={category}>
                <DropdownMenuTrigger className="border-0 flex items-center bg-transparent text-sm md:text-base w-full justify-between">
                  {category} <ChevronDown className="ml-1 w-4 h-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-black text-white mt-2 rounded-md shadow-md p-2 border border-yellow-400 max-h-60 overflow-y-auto">
                  {Object.entries(subCategories).map(([subCategory, url]) => (
                    <DropdownMenuItem asChild key={subCategory}>
                      <Link to={`/products/${url}`} className="hover:bg-yellow-400 hover:text-black">
                        {subCategory}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            ))}
          </nav>
        </div>

        <div className="hidden md:flex justify-center md:justify-end space-x-4 mt-4 md:mt-8">
          <DropdownMenu>
            <DropdownMenuTrigger className="flex text-white font-medium bg-transparent h-10 border-0">
              My Account <ChevronDown className="ml-1 mt-1 w-4 h-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-black text-white mt-2 rounded-md shadow-md p-2 border border-yellow-400">
              <DropdownMenuItem asChild>
              <a href={URLS.login} target="_blank">Login</a>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/register" className="hover:bg-yellow-400 hover:text-black">
                  Register
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button className="bg-transparent flex items-center space-x-1">
            <span className="text-white text-lg font-bold bg-slate-800 rounded-md px-2">0</span>
            <ShoppingCart style={{ width: "30px", height: "30px" }} />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
