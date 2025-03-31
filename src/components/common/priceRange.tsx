import { useState, useEffect, ChangeEvent } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/Dropdown-Menu";
import { ChevronDown, CircleDollarSign } from "lucide-react";

// Define the interface for dropdown options
interface PriceOption {
  id: number;
  value: string;
  label: string;
}

// Define the props interface
interface PriceRangeDropdownProps {
  onSelectionChange: (range: { min: string | null; max: string | null }) => void;
  reset: boolean;
}

const PriceRangeDropdown = ({ onSelectionChange, reset }: PriceRangeDropdownProps) => {
  const [minValue, setMinValue] = useState<string>("Minimum");
  const [maxValue, setMaxValue] = useState<string>("Maximum");
  const [triggerLabel, setTriggerLabel] = useState<string>("Price Range");

  const minOptions: PriceOption[] = [
    { id: 1, value: "0", label: "$0" },
    { id: 2, value: "100000", label: "$100,000" },
    { id: 3, value: "200000", label: "$200,000" },
    { id: 4, value: "300000", label: "$300,000" },
  ];

  const maxOptions: PriceOption[] = [
    { id: 1, value: "500000", label: "$500,000" },
    { id: 2, value: "750000", label: "$750,000" },
    { id: 3, value: "1000000", label: "$1,000,000" },
    { id: 4, value: "any", label: "Any" },
  ];

  // Reset effect
  useEffect(() => {
    if (reset) {
      setMinValue("Minimum");
      setMaxValue("Maximum");
      setTriggerLabel("Price Range");
      onSelectionChange({ min: null, max: null });
    }
  }, [reset, onSelectionChange]);

  const handleMinChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const newMin = e.target.value;
    setMinValue(newMin);
    updateTriggerLabel(newMin, maxValue);
  };

  const handleMaxChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const newMax = e.target.value;
    setMaxValue(newMax);
    updateTriggerLabel(minValue, newMax);
  };

  const updateTriggerLabel = (min: string, max: string) => {
    const minLabel = minOptions.find((opt) => opt.value === min)?.label || "Min";
    const maxLabel = maxOptions.find((opt) => opt.value === max)?.label || "Max";
    if (min !== "Minimum" || max !== "Maximum") {
      setTriggerLabel(`${minLabel} - ${maxLabel}`);
      onSelectionChange({ min: min === "Minimum" ? null : min, max: max === "Maximum" ? null : max });
    } else {
      setTriggerLabel("Price Range");
      onSelectionChange({ min: null, max: null });
    }
  };

  const isSelected = minValue !== "Minimum" || maxValue !== "Maximum";

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
      <DropdownMenuContent className="w-56">
        <div className="p-2">
          <div className="mb-2">
            <label className="text-sm text-[#0B3379] mb-1 block text-[14px] font-[Geologica]">
              Minimum
            </label>
            <select
              value={minValue}
              onChange={handleMinChange}
              className="w-full p-1 font-[ClashDisplay-Medium] text-[20px] rounded text-[#0B3379] bg-[#F7F7F7] focus:outline-none focus:ring-2 focus:ring-[#37D3AE]"
            >
              <option value="Minimum">No Minimum</option>
              {minOptions.map((option) => (
                <option key={option.id} value={option.value}>
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
              value={maxValue}
              onChange={handleMaxChange}
              className="w-full font-[ClashDisplay-Medium] text-[20px] p-1 rounded text-[#0B3379] bg-[#F7F7F7] focus:outline-none focus:ring-2 focus:ring-[#37D3AE]"
            >
              <option value="Maximum">No Maximum</option>
              {maxOptions.map((option) => (
                <option key={option.id} value={option.value}>
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

export default PriceRangeDropdown;