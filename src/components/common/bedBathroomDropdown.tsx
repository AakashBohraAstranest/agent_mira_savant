import { useState, useEffect } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/Dropdown-Menu";
import { ChevronDown, Bed } from "lucide-react";
import CheckBox from "../ui/checkBox";

// Define the props interface
interface BedsBathsDropdownProps {
  onSelectionChange: (selection: { beds: string[]; baths: string[] }) => void;
  reset: boolean;
}

const BedsBathsDropdown = ({ onSelectionChange, reset }: BedsBathsDropdownProps) => {
  const [selectedBeds, setSelectedBeds] = useState<string[]>([]);
  const [selectedBaths, setSelectedBaths] = useState<string[]>([]);
  const [triggerLabel, setTriggerLabel] = useState("Beds/Baths");
  const [useExact, setUseExact] = useState(false);

  const bedOptions = ["1+", "2+", "3+", "4+", "5+"];
  const bathOptions = ["1+", "2+", "3+", "4+", "5+"];

  // Reset effect
  useEffect(() => {
    if (reset) {
      setSelectedBeds([]);
      setSelectedBaths([]);
      setUseExact(false);
      setTriggerLabel("Beds/Baths");
      onSelectionChange({ beds: [], baths: [] });
    }
  }, [reset, onSelectionChange]);

  const handleBedChange = (bed: string) => {
    if (useExact) {
      setSelectedBeds((prev) => (prev.includes(bed) ? [] : [bed]));
      setSelectedBaths((prev) => (prev.includes(bed) ? [] : [bed]));
    } else {
      setSelectedBeds((prev) =>
        prev.includes(bed) ? prev.filter((b) => b !== bed) : [...prev, bed]
      );
    }
  };

  const handleBathChange = (bath: string) => {
    if (useExact) {
      setSelectedBaths((prev) => (prev.includes(bath) ? [] : [bath]));
      setSelectedBeds((prev) => (prev.includes(bath) ? [] : [bath]));
    } else {
      setSelectedBaths((prev) =>
        prev.includes(bath) ? prev.filter((b) => b !== bath) : [...prev, bath]
      );
    }
  };

  const handleApply = () => {
    const bedsLabel = selectedBeds.length > 0 ? `${selectedBeds.sort().join(", ")} Bed` : "Any Bed";
    const bathsLabel = selectedBaths.length > 0 ? `${selectedBaths.sort().join(", ")} Bath` : "Any Bath";
    const newLabel = `${bedsLabel} / ${bathsLabel}`;
    setTriggerLabel(newLabel);
    onSelectionChange({ beds: selectedBeds, baths: selectedBaths });
  };

  const handleAny = () => {
    setSelectedBeds([]);
    setSelectedBaths([]);
    setUseExact(false);
    setTriggerLabel("Beds/Baths");
    onSelectionChange({ beds: [], baths: [] });
  };

  const isSelected = selectedBeds.length > 0 || selectedBaths.length > 0;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={`flex items-center gap-2 rounded-full px-2 py-2 text-[#0B3379]
          ${isSelected ? "bg-[#37D3AE]" : "bg-[#B8D4FF]"}
          hover:bg-[#B8D4FF] hover:text-[#0B3379]
          data-[state=open]:bg-[#37D3AE] data-[state=open]:text-[#0B3379]
          focus:outline-none`}
      >
        <Bed className="h-4 w-4 rounded-[12px]" />
        {triggerLabel}
        <ChevronDown className="h-4 w-4 ml-2" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-64">
        <div className="p-2">
          {/* No. of Beds */}
          <div className="mb-2">
            <label className="text-sm text-[#0B3379] mb-1 block text-[20px] font-[ClashDisplay-Medium] text-center">
              Number of Bedrooms
            </label>
            <div className="flex gap-2">
              {bedOptions.map((bed) => (
                <button
                  key={bed}
                  onClick={() => handleBedChange(bed)}
                  className={`w-10 h-10 flex items-center justify-center text-[20px] font-[ClashDisplay-Medium] ${
                    selectedBeds.includes(bed)
                      ? "bg-[#0B3379] text-[#fff]"
                      : "bg-[#F7F7F7] text-[#0B3379] hover:bg-[#37D3AE]"
                  }`}
                >
                  {bed}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleAny}
            className="w-full mb-2 px-4 py-2 text-[#0B3379] rounded hover:bg-[#0B3379] hover:text-[#fff] text-[20px] font-[ClashDisplay-Medium]"
          >
            Any
          </button>

          <div className="mb-2">
            <div className="flex items-center gap-2 py-1">
              <CheckBox
                id="exact-check"
                checked={useExact}
                onCheckedChange={() => {
                  setUseExact(!useExact);
                  if (!useExact) {
                    // If enabling "Use Exact", sync beds and baths to the first selected bed (if any)
                    if (selectedBeds.length > 0) {
                      setSelectedBaths([selectedBeds[0]]);
                      setSelectedBeds([selectedBeds[0]]);
                    } else if (selectedBaths.length > 0) {
                      setSelectedBeds([selectedBaths[0]]);
                      setSelectedBaths([selectedBaths[0]]);
                    }
                  }
                }}
              />
              <label
                htmlFor="exact-check"
                className="cursor-pointer text-sm text-[#0B3379] font-[Geologica] text-[14px]"
              >
                Use Exact
              </label>
            </div>
          </div>

          {/* No. of Baths */}
          <div className="mb-2">
            <label className="text-sm text-[#0B3379] mb-2 block text-[20px] font-[ClashDisplay-Medium] text-center">
              Number of Baths
            </label>
            <div className="flex gap-2">
              {bathOptions.map((bath) => (
                <button
                  key={bath}
                  onClick={() => handleBathChange(bath)}
                  className={`w-10 h-10 flex items-center justify-center text-[20px] font-[ClashDisplay-Medium] ${
                    selectedBaths.includes(bath)
                      ? "bg-[#0B3379] text-[#fff]"
                      : "bg-[#F7F7F7] text-[#0B3379] hover:bg-[#37D3AE]"
                  }`}
                >
                  {bath}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleAny}
            className="w-full mb-2 px-4 py-2 text-[#0B3379] rounded hover:bg-[#0B3379] hover:text-[#fff] text-[20px] font-[ClashDisplay-Medium]"
          >
            Any
          </button>

          {/* Apply Button */}
          <button
            onClick={handleApply}
            className="w-full mt-2 px-4 py-2 bg-[#37D3AE] text-[#0B3379] text-[20px] mt-4 font-[ClashDisplay-Medium] rounded-full hover:bg-[#37D3AE]"
          >
            Apply
          </button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default BedsBathsDropdown;