import { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/Dropdown-Menu";
import { ChevronDown, Bed } from "lucide-react";
import CheckBox from "../ui/checkBox";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../store/store";
import {
  setApiCall,
  setBaths,
  setBeds,
  setExactMatch,
} from "../../store/reducer/common.reducer";

// Define the props interface
interface BedsBathsDropdownProps {
  bedOptions: string[];
  bathOptions: string[];
}

const BedsBathsDropdown = ({
  bedOptions = [],
  bathOptions = [],
}: BedsBathsDropdownProps) => {
  const [selectedBeds, setSelectedBeds] = useState<string>("");
  const [selectedBaths, setSelectedBaths] = useState<string>("");
  const [triggerLabel, setTriggerLabel] = useState("Beds/Baths");
  const bedsBaths = useSelector((state: any) => state.common.filter);
  const dispatch = useAppDispatch();

  const handleBedChange = (bed: string) => {
    if (bedsBaths.exactMatch) {
      dispatch(setBeds(bed));
      dispatch(setBaths(bed));
    } else {
      dispatch(setBeds(bed));
    }
  };

  const handleBathChange = (bath: string) => {
    if (bedsBaths.exactMatch) {
      dispatch(setBeds(bath));
      dispatch(setBaths(bath));
      dispatch(setExactMatch(true));
    } else {
      dispatch(setBaths(bath));
    }
  };

  const handleApply = () => {
    const bedsLabel = bedsBaths.beds !== "Any" ? `${bedsBaths.beds}+` : "Any";
    const bathsLabel =
      bedsBaths.baths !== "Any" ? `${bedsBaths.baths}+` : "Any";
    const newLabel = `${bedsLabel} / ${bathsLabel}`;
    setTriggerLabel(newLabel);
    dispatch(setApiCall(true));
  };

  useEffect(()=>{
    setTriggerLabel("Beds/Baths")
  },[bedsBaths])

  const isSelected = bedsBaths.baths !== "Any" || bedsBaths.beds !== "Any"

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
      <DropdownMenuContent className="w-auto bg-white">
        <div className="p-2">
          {/* No. of Beds */}
          <div className="mb-2">
            <label className="text-sm text-[#0B3379] mb-1 block text-[20px] font-[ClashDisplay-Medium] text-center">
              Number of Bedrooms
            </label>
            <div className="flex gap-2">
              {bedOptions.length === 0 ? (
                <div>....Loading</div>
              ) : (
                bedOptions.map((bed) => (
                  <button
                    key={bed}
                    onClick={() => handleBedChange(bed)}
                    className={`w-12 h-12 flex items-center justify-center text-[20px] font-[ClashDisplay-Medium] ${
                      bedsBaths.beds === bed
                        ? "bg-[#0B3379] text-[#fff]"
                        : "bg-[#F7F7F7] text-[#0B3379] hover:bg-[#37D3AE]"
                    }`}
                  >
                    {bed === "Any" ? bed : `${bed}+`}
                  </button>
                ))
              )}
            </div>
          </div>
          <div className="mb-2">
            <div className="flex items-center gap-2 py-1">
              <CheckBox
                id="exact-check"
                checked={bedsBaths.exactMatch}
                onCheckedChange={() => {
                  dispatch(setExactMatch(!bedsBaths.exactMatch));
                  if (!bedsBaths.exactMatch) {
                    // If enabling "Use Exact", sync beds and baths to the first selected bed (if any)
                    if (selectedBeds !== "") {
                      setSelectedBaths(selectedBeds);
                      setSelectedBeds(selectedBeds);
                    } else if (selectedBaths !== "") {
                      setSelectedBeds(selectedBaths);
                      setSelectedBaths(selectedBaths);
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
              {bathOptions.length === 0 ? (
                <div>....Loading</div>
              ) : (
                bathOptions.map((bath) => (
                  <button
                    key={bath}
                    onClick={() => handleBathChange(bath)}
                    className={`w-12 h-12 flex items-center justify-center text-[20px] font-[ClashDisplay-Medium] ${
                      bedsBaths.baths === bath
                        ? "bg-[#0B3379] text-[#fff]"
                        : "bg-[#F7F7F7] text-[#0B3379] hover:bg-[#37D3AE]"
                    }`}
                  >
                    {bath === "Any" ? bath : `${bath}+`}
                  </button>
                ))
              )}
            </div>
          </div>

          {/* Apply Button */}
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

export default BedsBathsDropdown;
