import { useState, useEffect, ChangeEvent } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/Dropdown-Menu";
import { ChevronDown, Box } from "lucide-react";

// Define the interface for dropdown options
interface LotAreaOption {
  id: number;
  value: string;
  label: string;
}

// Define the props interface
interface LotAreaDropdownProps {
  onSelectionChange: (range: { min: string | null; max: string | null }) => void;
  reset: boolean;
}

const LotAreaDropdown = ({ onSelectionChange, reset }: LotAreaDropdownProps) => {
  const [minValue, setMinValue] = useState<string>("Minimum");
  const [maxValue, setMaxValue] = useState<string>("Maximum");
  const [triggerLabel, setTriggerLabel] = useState<string>("Lot Size Area");

  const minOptions: LotAreaOption[] = [
    { id: 1, value: "0", label: "0" },
    { id: 2, value: "1", label: "1" },
    { id: 3, value: "2", label: "2" },
    { id: 4, value: "3", label: "3" },
  ];

  const maxOptions: LotAreaOption[] = [
    { id: 1, value: "5", label: "5" },
    { id: 2, value: "7", label: "7" },
    { id: 3, value: "8", label: "8" },
    { id: 4, value: "any", label: "Any" },
  ];

  // Reset effect
  useEffect(() => {
    if (reset) {
      setMinValue("Minimum");
      setMaxValue("Maximum");
      setTriggerLabel("Lot Size Area");
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
      setTriggerLabel("Lot Size Area");
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
        <Box className="h-4 w-4" />
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
              <option value="Minimum">Minimum</option>
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
              className="w-full p-1 font-[ClashDisplay-Medium] text-[20px] rounded text-[#0B3379] bg-[#F7F7F7] focus:outline-none focus:ring-2 focus:ring-[#37D3AE]"
            >
              <option value="Maximum">Maximum</option>
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

export default LotAreaDropdown;