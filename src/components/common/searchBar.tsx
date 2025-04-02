import { useSelector } from "react-redux";
import { Input } from "../ui/Input";
import { useAppDispatch } from "../../store/store";
import { ChangeEvent, useState } from "react";
import { setCityZip } from "../../store/reducer/common.reducer";
import { useDebounce } from "../../lib/Debounced";
import { searchData } from "../../dummydata";
import { Search, X } from "lucide-react";

const SearchBar = () => {
  const SearchText = useSelector((state: any) => state.common.filter.cityZip);
  const dispatch = useAppDispatch();
  const debouncedQuery = useDebounce(SearchText, 300);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State for controlling dropdown visibility

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setCityZip(e.target.value));
    setIsDropdownOpen(true); // Open the dropdown when typing starts
  };

  const filteredResults =
    debouncedQuery.trim() === ""
      ? null // Return null when query is empty
      : searchData.filter((item) =>
          item.toLowerCase().includes(debouncedQuery.toLowerCase())
        );

  const handleSelectOption = (selectedOption: string) => {
    dispatch(setCityZip(selectedOption));
    setIsDropdownOpen(false); // Close the dropdown after selecting an option
  };

  return (
    <div className="flex w-full md:w-[75%] m-auto my-4 flex-wrap md:flex-nowrap px-4 md:p-0 relative">
      <p className="text-[20px] font-[ClashDisplay-Medium] text-[#0B3379] text-center md:text-center w-full md:w-[20%] pb-4 md:pb-0">
        I am Interested in
      </p>
      <div className="w-full">
        <div className="relative flex items-center w-full">
          <Input
            placeholder="Neighbourhood, city, zip..."
            className="font-[Geologica] xl:ml-[6%]"
            value={SearchText}
            onChange={onChange}
          />
          {SearchText ? (
            <X
              size={18}
              className="absolute right-3 text-[#0B3379] cursor-pointer"
              onClick={() => dispatch(setCityZip(""))}
            />
          ) : (
            <Search
              size={18}
              className="absolute right-3 text-[#0B3379] pointer-events-none"
            />
          )}
        </div>
        {isDropdownOpen && filteredResults && filteredResults.length > 0 && (
          <ul className="absolute left-0 w-[90%] xl:ml-[8%] bg-white border border-gray-300 mt-1 shadow-md rounded-md max-h-40 overflow-y-auto z-10">
            {filteredResults.map((result, index) => (
              <li
                key={index}
                className="px-4 py-2 cursor-pointer hover:bg-gray-200"
                onClick={() => handleSelectOption(result)} // Close dropdown and update value
              >
                {result}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
