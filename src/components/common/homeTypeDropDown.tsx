import { useState, useEffect } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/Dropdown-Menu";
import { ChevronDown, Home } from "lucide-react";
import CheckBox from "../ui/checkBox";
import "../../custom.css";

// Define the interface for home menu items
interface HomeMenuItem {
  id: number;
  label: string;
}

// Define the props interface
interface HomeTypeDropdownProps {
  onSelectionChange: (selectedIds: number[]) => void;
  reset: boolean;
}

const HomeTypeDropdown = ({ onSelectionChange, reset }: HomeTypeDropdownProps) => {
  const [homeTypeLabel, setHomeTypeLabel] = useState<string>("HomeType");
  const [selectedHomeTypes, setSelectedHomeTypes] = useState<number[]>([]);

  const homeMenuItems: HomeMenuItem[] = [
    { id: 1, label: "Select All" },
    { id: 2, label: "Single Family" },
    { id: 3, label: "Condo" },
    { id: 4, label: "TownHouse" },
    { id: 5, label: "Multi-Family" },
  ];

  // Reset effect
  useEffect(() => {
    if (reset) {
      setSelectedHomeTypes([]);
      setHomeTypeLabel("HomeType");
    }
  }, [reset]);

  const handleCheckBoxChange = (itemId: number) => {
    setSelectedHomeTypes((prev) =>
      prev.includes(itemId)
        ? prev.filter((id) => id !== itemId)
        : [...prev, itemId]
    );
  };

  const handleApply = () => {
    if (selectedHomeTypes.length > 0) {
      const selectedLabels = homeMenuItems
        .filter((item) => selectedHomeTypes.includes(item.id))
        .map((item) => item.label)
        .join(", ");
      setHomeTypeLabel(selectedLabels || "HomeType");
      onSelectionChange(selectedHomeTypes);
    } else {
      setHomeTypeLabel("HomeType");
      onSelectionChange([]);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger
          className={`flex items-center gap-2 rounded-full px-2 py-2 text-[#0B3379] 
            ${selectedHomeTypes.length > 0 ? "bg-[#37D3AE]" : "bg-[#B8D4FF]"} 
            hover:bg-[#B8D4FF] hover:text-[#0B3379] 
            data-[state=open]:bg-[#37D3AE] data-[state=open]:text-[#0B3379] 
            focus:outline-none`}
        >
          <Home className="h-4 w-4" />
          {homeTypeLabel}
          <ChevronDown className="h-4 w-4 ml-2" />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <h4 className="text-[#0B3379] text-[20px] font-[ClashDisplay-Medium] text-center">
            HomeType
          </h4>
          <div className="p-2">
            {homeMenuItems.map((item) => (
              <div key={item.id} className="flex items-center gap-2 py-1 text-[#0B3379]">
                <CheckBox
                  id={`checkbox-${item.id}`}
                  checked={selectedHomeTypes.includes(item.id)}
                  onCheckedChange={() => handleCheckBoxChange(item.id)}
                />
                <label
                  htmlFor={`checkbox-${item.id}`}
                  className="cursor-pointer font-[Geologica] text-[14px] font-semibold"
                >
                  {item.label}
                </label>
              </div>
            ))}
            <button
              onClick={handleApply}
              className="w-full mt-2 px-4 py-2 bg-[#37D3AE] text-[#0B3379] text-[20px] mt-6 font-[ClashDisplay-Medium] rounded-full hover:bg-[#37D3AE]"
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