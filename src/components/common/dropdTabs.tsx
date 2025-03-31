import { useState } from "react";
import { RotateCw } from "lucide-react";
import HomeTypeDropdown from "./homeTypeDropDown"; // Fixed casing to match assumed file name
import PriceRangeDropdown from "./priceRange";
import BedsBathsDropdown from "./bedBathroomDropdown";
import LivingAreaDropdown from "./livingAreaDropDown";
import LotAreaDropdown from "./lotAreaDropDown";

// Define types for state and handler parameters
interface Range {
  min: string | null; // Changed from number to string to match child components
  max: string | null; // Changed from number to string to match child components
}

interface BedsBaths {
  beds: string[];
  baths: string[];
}

const DropdownTabs = () => {
  const [selectedHomeTypes, setSelectedHomeTypes] = useState<number[]>([]); // Changed from string[] to number[]
  const [priceRange, setPriceRange] = useState<Range>({ min: null, max: null });
  const [livingArea, setLivingArea] = useState<Range>({ min: null, max: null }); // Renamed to camelCase
  const [lotArea, setLotArea] = useState<Range>({ min: null, max: null }); // Renamed to camelCase
  const [bedsBaths, setBedsBaths] = useState<BedsBaths>({ beds: [], baths: [] });
  const [resetTrigger, setResetTrigger] = useState(false);

  const handleHomeTypeChange = (newSelectedHomeTypes: number[]) => { // Changed from string[] to number[]
    setSelectedHomeTypes(newSelectedHomeTypes);
  };

  const handlePriceRangeChange = (newPriceRange: Range) => {
    setPriceRange(newPriceRange);
  };

  const handleLivingArea = (newLivingArea: Range) => {
    setLivingArea(newLivingArea);
  };

  const handleLotArea = (newLotArea: Range) => {
    setLotArea(newLotArea);
  };

  const handleBedsBathsChange = (newBedsBaths: BedsBaths) => {
    setBedsBaths(newBedsBaths);
  };

  const handleReset = () => {
    setResetTrigger(true);
    setSelectedHomeTypes([]);
    setPriceRange({ min: null, max: null });
    setLivingArea({ min: null, max: null });
    setLotArea({ min: null, max: null });
    setBedsBaths({ beds: [], baths: [] });
    setTimeout(() => setResetTrigger(false), 0);
  };

  const isAnythingSelected =
    selectedHomeTypes.length > 0 ||
    priceRange.min !== null ||
    priceRange.max !== null ||
    livingArea.min !== null ||
    livingArea.max !== null ||
    lotArea.min !== null ||
    lotArea.max !== null ||
    bedsBaths.beds.length > 0 ||
    bedsBaths.baths.length > 0;

  return (
    <div className="flex w-full justify-center m-auto my-4 gap-4 items-center flex-wrap md:flex-nowrap">
      <p className="text-[20px] font-[ClashDisplay-Medium] text-[#0B3379]">
        Customise my report
      </p>
      <div className="flex gap-4 flex-wrap md:flex-nowrap justify-center md:justify-unset">
        <HomeTypeDropdown
          onSelectionChange={handleHomeTypeChange}
          reset={resetTrigger}
        />
        <PriceRangeDropdown
          onSelectionChange={handlePriceRangeChange}
          reset={resetTrigger}
        />
        <BedsBathsDropdown
          onSelectionChange={handleBedsBathsChange}
          reset={resetTrigger}
        />
        <LivingAreaDropdown
          onSelectionChange={handleLivingArea}
          reset={resetTrigger}
        />
        <LotAreaDropdown
          onSelectionChange={handleLotArea}
          reset={resetTrigger}
        />
      </div>
      {isAnythingSelected && (
        <button
          onClick={handleReset}
          className="px-3 py-2 bg-[#0B3379] text-[#fff] hover:bg-[#37D3AE] rounded-full"
        >
          <RotateCw className="h-4 w-4" />
        </button>
      )}
    </div>
  );
};

export default DropdownTabs;