import { useState, useEffect, ChangeEvent } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/Dropdown-Menu";
import { ChevronDown, Box } from "lucide-react";
import { RangeOption } from "../../types/types";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../store/store";
import {
  setApiCall,
  setLivingAreaMax,
  setLivingAreaMin,
} from "../../store/reducer/common.reducer";

// Define the props interface
interface LivingAreaDropdownProps {
  RangeOption: RangeOption;
}

const LivingAreaDropdown = ({
  RangeOption = { max: [], min: [] },
}: LivingAreaDropdownProps) => {
  const [triggerLabel, setTriggerLabel] = useState<string>("Living Area");
  const LivingArea = useSelector(
    (state: any) => state.common.filter.livingArea
  );
  const dispatch = useAppDispatch();

  const updateTriggerLabel = (min: string, max: string) => {
    const minLabel =
      RangeOption.min.find((opt) => opt.value === min)?.label || "Min";
    const maxLabel =
      RangeOption.max.find((opt) => opt.value === max)?.label || "Max";
    if (min !== "" || max !== "") {
      setTriggerLabel(`${minLabel} - ${maxLabel}`);
    } else {
      setTriggerLabel("Living Area");
    }
  };

  const onChangeMin = (e: ChangeEvent<HTMLSelectElement>) => {
    dispatch(setLivingAreaMin(e.target.value));
  };

  const onChangeMax = (e: ChangeEvent<HTMLSelectElement>) => {
    dispatch(setLivingAreaMax(e.target.value));
  };

  useEffect(() => {
    updateTriggerLabel(LivingArea.min, LivingArea.max);
  }, [LivingArea]);

  const handleApply = () => {
    dispatch(setApiCall(true));
  };

  const isSelected = LivingArea.min !== "" || LivingArea.max !== "";

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
              value={LivingArea.min}
              onChange={onChangeMin}
              className="w-full p-1 font-[ClashDisplay-Medium] text-[20px] rounded text-[#0B3379] bg-[#F7F7F7] focus:outline-none focus:ring-2 focus:ring-[#37D3AE]"
            >
              {RangeOption.min.length > 0
                ? RangeOption.min.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))
                : null}
            </select>
          </div>
          <div>
            <label className="text-sm text-[#0B3379] mb-1 block text-[14px] font-[Geologica]">
              Maximum
            </label>
            <select
              value={LivingArea.max}
              onChange={onChangeMax}
              className="w-full p-1 font-[ClashDisplay-Medium] text-[20px] rounded text-[#0B3379] bg-[#F7F7F7] focus:outline-none focus:ring-2 focus:ring-[#37D3AE]"
            >
              {RangeOption.max.length > 0
                ? RangeOption.max.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))
                : null}
            </select>
          </div>
          <DropdownMenuItem>
            <button
              onClick={handleApply}
              className="w-full mt-2 px-4 py-2 bg-[#37D3AE] text-[#0B3379] text-[20px] font-[ClashDisplay-Medium] rounded-full hover:bg-[#37D3AE]/50"
            >
              Apply
            </button>
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LivingAreaDropdown;
