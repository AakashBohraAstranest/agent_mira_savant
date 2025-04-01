import { useState, useEffect, ChangeEvent } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/Dropdown-Menu";
import { ChevronDown, Box } from "lucide-react";
import { RangeOption } from "../../types/types";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../store/store";
import { setLotSizeMax, setLotSizeMin } from "../../store/reducer/common.reducer";

// Define the props interface
interface LotAreaDropdownProps {
  RangeOption: RangeOption;
}

const LotAreaDropdown = ({ RangeOption= {max:[], min:[]} }: LotAreaDropdownProps) => {
  const [triggerLabel, setTriggerLabel] = useState<string>("Lot Size Area");
  const lotArea = useSelector((state:any)=>state.common)
  const dispatch = useAppDispatch()

  const updateTriggerLabel = (min: string, max: string) => {
    const minLabel = RangeOption.min.find((opt) => opt.value === min)?.label || "Min";
    const maxLabel = RangeOption.max.find((opt) => opt.value === max)?.label || "Max";
    if (min !== "" || max !== "") {
      setTriggerLabel(`${minLabel} - ${maxLabel}`);
    } else {
      setTriggerLabel("Lot Size Area");
    }
  };

  const onChangeMin = (e: ChangeEvent<HTMLSelectElement>)=>{
    dispatch(setLotSizeMin(e.target.value))
  }

  const onChangeMax = (e: ChangeEvent<HTMLSelectElement>)=>{
    dispatch(setLotSizeMax(e.target.value))
  }

  useEffect(()=>{
    updateTriggerLabel(lotArea.filter.lotSize.min, lotArea.filter.lotSize.max)
  },[lotArea.filter.lotSize])

  const isSelected = lotArea.filter.lotSize.min !== "" || lotArea.filter.lotSize.max !== "";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={`flex items-center gap-2 rounded-full px-2 py-2 text-[#0B3379]
          ${isSelected ? "bg-[#37D3AE]" : "bg-[#B8D4FF]"}
          hover:bg-[#B8D4FF] hover:text-[#0B3379]
          data-[state=open]:bg-[#37D3AE] data-[state=open]:text-[#0B3379]
          focus:outline-none`}
      >
        <Box className="h-4 w-4" />
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
              value={lotArea.filter.lotSize.min}
              onChange={onChangeMin}
              className="w-full p-1 font-[ClashDisplay-Medium] text-[20px] rounded text-[#0B3379] bg-[#F7F7F7] focus:outline-none focus:ring-2 focus:ring-[#37D3AE]"
            >
              {RangeOption.min.map((option) => (
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
              value={lotArea.filter.lotSize.max}
              onChange={onChangeMax}
              className="w-full p-1 font-[ClashDisplay-Medium] text-[20px] rounded text-[#0B3379] bg-[#F7F7F7] focus:outline-none focus:ring-2 focus:ring-[#37D3AE]"
            >
              {RangeOption.max.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LotAreaDropdown;