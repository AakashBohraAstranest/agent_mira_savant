import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/Dropdown-Menu";
import { ChevronDown, Home } from "lucide-react";
import CheckBox from "../ui/checkBox";
import "../../custom.css";
import { Option } from "../../types/types";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../store/store";
import { setApiCall, setHomeType } from "../../store/reducer/common.reducer";

// Define the props interface
interface HomeTypeDropdownProps {
  data: Option[];
}

const HomeTypeDropdown = ({ data = [] }: HomeTypeDropdownProps) => {
  const [homeTypeLabel, setHomeTypeLabel] = useState<string>("HomeType");
  const [selectedHomeTypes, setSelectedHomeTypes] = useState<string[]>([]);
  const homeType = useSelector((state: any) => state.common.filter.homeType);
  const dispatch = useAppDispatch();

  const handleCheckBoxChange = (itemId: keyof typeof homeType) => {
    const updatedHomeType = { ...homeType, [itemId]: !homeType[itemId] };
    dispatch(setHomeType(updatedHomeType));
    setSelectedHomeTypes(
      (prev) =>
        prev.includes(itemId as string)
          ? prev.filter((item) => item !== itemId) // Remove if exists
          : [...prev, itemId as string] // Add if not exists
    );
  };

  const handleApply = () => {
    const selectedKeys = Object.keys(homeType).filter((key) => homeType[key]); // Get selected keys
  
    if (selectedKeys.length > 0) {
      const selectedLabels = data
        .filter((item) => selectedKeys.includes(item.value)) // Match selected values
        .map((item) => item.label)
        .join(", ");
      setHomeTypeLabel(selectedLabels || "HomeType");
    } else {
      setHomeTypeLabel("HomeType");
    }
  
    setSelectedHomeTypes(selectedKeys);
    dispatch(setApiCall(true))
  };

  return (
    <div className="flex items-center gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger
          className={`flex items-center gap-2 rounded-full px-2 py-2 text-[#0B3379] 
            ${
              selectedHomeTypes.filter((item) =>
                Object.keys(homeType).filter((key) => item === key)
              ).length > 0
                ? "bg-[#37D3AE]"
                : "bg-[#B8D4FF]"
            } 
            hover:bg-[#B8D4FF] hover:text-[#0B3379] 
            data-[state=open]:bg-[#37D3AE] data-[state=open]:text-[#0B3379] 
            focus:outline-none`}
        >
          <Home className="h-4 w-4" />
          {homeTypeLabel}
          <ChevronDown className="h-4 w-4 ml-2" />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 bg-white">
          <h4 className="text-[#0B3379] text-[20px] font-[ClashDisplay-Medium] text-center">
            HomeType
          </h4>
          <div className="p-2">
            {data.length > 0
              ? data.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 py-1 text-[#0B3379]"
                  >
                    <CheckBox
                      id={`checkbox-${index}`}
                      checked={homeType[item.value as keyof typeof homeType]}
                      onCheckedChange={() => handleCheckBoxChange(item.value)}
                    />
                    <label
                      htmlFor={`checkbox-${index}`}
                      className="cursor-pointer font-[Geologica] text-[14px] font-semibold"
                    >
                      {item.label}
                    </label>
                  </div>
                ))
              : null}
            <button
              onClick={handleApply}
              className="w-full mt-2 px-4 py-2 bg-[#37D3AE] text-[#0B3379] text-[20px] font-[ClashDisplay-Medium] rounded-full hover:bg-[#37D3AE]"
            >
              Apply
            </button>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default HomeTypeDropdown;
