import { useEffect, useState } from "react";
import { RotateCw } from "lucide-react";
import HomeTypeDropdown from "./homeTypeDropDown"; // Fixed casing to match assumed file name
import PriceRangeDropdown from "./priceRange";
import BedsBathsDropdown from "./bedBathroomDropdown";
import LivingAreaDropdown from "./livingAreaDropDown";
import LotAreaDropdown from "./lotAreaDropDown";
import { toast } from "react-toastify";
import { dropdownFiltersList } from "../../services/apiService";
import { PropertyFilters } from "../../types/types";
import { useAppDispatch } from "../../store/store";
import { resetFilters, setApiCall } from "../../store/reducer/common.reducer";
import { useSelector } from "react-redux";

const DropdownTabs = () => {
  const [filterLists, setFilterLists] = useState<PropertyFilters>();
  const filter = useSelector((state:any)=>state.common.filter)
  const dispatch = useAppDispatch()

  useEffect(() => {
    const fetchMonthFilters = async () => {
      try {
        const apiResponse = await dropdownFiltersList();
        if (apiResponse.code === 200) {
          setFilterLists(apiResponse?.response);
        }
      } catch (error: any) {
        toast.warning("Failed to fetch data.", error);
      }
    };

    fetchMonthFilters();

    // if (activeTabInfo) {
    //     setActiveTab(activeTabInfo);
    // }
  }, []);

  const handleReset = () => {
    dispatch(resetFilters())
    dispatch(setApiCall(true));
  };

  const isAnythingSelected =
    filter.homeType.single_family !== false ||
    filter.homeType.condo !== false ||
    filter.homeType.townhouse !== false ||    
    filter.homeType.multi_family !== false ||    
    filter.listingPrice.min !== "" ||
    filter.listingPrice.max !== "" ||
    filter.livingArea.min !== "" ||
    filter.livingArea.max !== "" ||
    filter.lotSize.min !== "" ||
    filter.lotSize.max !== "" ||
    filter.beds !== "Any" ||
    filter.baths !== "Any";

  if (filterLists === undefined) {
    return null;
  }

  return (
    <div className="flex w-full justify-center m-auto my-4 gap-4 items-center flex-wrap md:flex-nowrap">
      <p className="text-[20px] font-[ClashDisplay-Medium] text-[#0B3379]">
        Customise my report
      </p>
      <div className="flex gap-4 flex-wrap md:flex-nowrap justify-center md:justify-unset">
        <HomeTypeDropdown
          data={filterLists.homeTypeList}
        />
        <PriceRangeDropdown
          RangeOptionData={filterLists.priceOptions}
        />
        <BedsBathsDropdown
          bathOptions={filterLists.bathroomOptions}
          bedOptions={filterLists.bedroomOptions}
        />
        <LivingAreaDropdown
          RangeOption={filterLists.livingAreaList}
        />
        <LotAreaDropdown
          RangeOption={filterLists.lotSizeList}
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
