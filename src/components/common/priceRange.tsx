import { useState, useEffect, ChangeEvent } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/Dropdown-Menu";
import { ChevronDown, CircleDollarSign } from "lucide-react";
import { RangeOption } from "../../types/types";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../store/store";
import { setApiCall, setListingPriceMax, setListingPriceMin } from "../../store/reducer/common.reducer";

// Define the props interface
interface PriceRangeDropdownProps {
  RangeOptionData: RangeOption
}

const PriceRangeDropdown = ({ RangeOptionData = {min: [], max:[]} }: PriceRangeDropdownProps) => {
  const [triggerLabel, setTriggerLabel] = useState<string>("Price Range");
  const PriceRange = useSelector((state:any)=>state.common.filter.listingPrice);
  const dispatch = useAppDispatch();

  const handleMinChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const newMin = e.target.value;
    dispatch(setListingPriceMin(newMin))
  };

  const handleMaxChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const newMax = e.target.value;
    dispatch(setListingPriceMax(newMax))
  };

  const updateTriggerLabel = (min: string, max: string) => {
    const minLabel = RangeOptionData.min.find((opt) => opt.value === min)?.label || "Min";
    const maxLabel = RangeOptionData.max.find((opt) => opt.value === max)?.label || "Max";
    if (min !== "" || max !== "") {
      setTriggerLabel(`${minLabel} - ${maxLabel}`);
    } else {
      setTriggerLabel("Price Range");
    }
  };

  useEffect(()=>{
    updateTriggerLabel(PriceRange.min, PriceRange.max);
  },[PriceRange])

  const handleApply = () => {
      dispatch(setApiCall(true))
    };

  const isSelected = PriceRange.min !== "" || PriceRange.max !== "";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={`flex items-center gap-2 rounded-full px-2 py-2 text-[#0B3379]
          ${isSelected ? "bg-[#37D3AE]" : "bg-[#B8D4FF]"}
          hover:bg-[#B8D4FF] hover:text-[#0B3379]
          data-[state=open]:bg-[#37D3AE] data-[state=open]:text-[#0B3379]
          focus:outline-none`}
      >
        <CircleDollarSign className="h-4 w-4" />
        {triggerLabel}
        <ChevronDown className="h-4 w-4 ml-2" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 bg-white">
        <div className="p-2">
          <div className="mb-2">
            <label className="text-sm text-[#0B3379] mb-1 block text-[14px] font-[Geologica]">
              Minimum
            </label>
            <select
              value={PriceRange.min}
              onChange={handleMinChange}
              className="w-full p-1 font-[ClashDisplay-Medium] text-[20px] rounded text-[#0B3379] bg-[#F7F7F7] focus:outline-none focus:ring-2 focus:ring-[#37D3AE]"
            >
              {RangeOptionData.min.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-sm text-[#0B3379] mb-1 block text-[14px] font-[Geologica]">
              Maximum
            </label>
            <select
              value={PriceRange.max}
              onChange={handleMaxChange}
              className="w-full font-[ClashDisplay-Medium] text-[20px] p-1 rounded text-[#0B3379] bg-[#F7F7F7] focus:outline-none focus:ring-2 focus:ring-[#37D3AE]"
            >
              {RangeOptionData.max.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <button
              onClick={handleApply}
              className="w-full mt-2 px-4 py-2 bg-[#37D3AE] text-[#0B3379] text-[20px] font-[ClashDisplay-Medium] rounded-full hover:bg-[#37D3AE]"
            >
              Apply
            </button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default PriceRangeDropdown;