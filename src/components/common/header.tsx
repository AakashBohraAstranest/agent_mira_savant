import { houseImage, profileImage } from "../../assets/Images";
import { Avatar, AvatarImage } from "../ui/Avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/Dropdown-Menu"; // Assuming these are your components
import { Lock, LogOut } from "lucide-react";
import Dropdown from "./headerDropdown";
import { userLogout } from "../../services/apiService";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../store/store";
import { resetFilters } from "../../store/reducer/common.reducer";

const Header = () => {

  const navigate = useNavigate()
  const header = useSelector((state:any)=> state.common.month)
  const dispatch = useAppDispatch()

  const logout = async () => {
    await userLogout();
    localStorage.clear();
    sessionStorage.clear();
    dispatch(resetFilters())
    navigate('/login')
  };

  const dropdownItems = [
    {
      label: "Forgot Password",
      icon: <Lock className="h-4 w-4 mr-2 text-[#0B3379]" />,
      onClick: () => {},
    },
    {
      label: "Logout",
      icon: <LogOut className="h-4 w-4 mr-2 text-[#0B3379]" />,
      onClick: logout
    },
  ];
  return (
    <header className="bg-[#F7F7F7]">
      <div className="flex justify-between p-6 items-center md:items-start">
        <div className="flex items-center gap-4">
          <img src={houseImage} alt="House" />
          <h4 className="heading-title2 sm:text-[12px] text-[#0B3379] font-[ClashDisplay-Medium]">
            Agent Mira
          </h4>
        </div>
        <div>
          <h1 className="text-[18px] md:text-[36px] text-[#0B3379] font-[ClashDisplay-Medium] md:mt-4">
            Market Report - {header}
          </h1>
        </div>
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className=" w-8 h-8  md:w-14 md:h-14 cursor-pointer">
                <AvatarImage src={profileImage} alt="Profile" />
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-48 p-0 rouded-md" align="end">
              <Dropdown items={dropdownItems} />
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Header;
