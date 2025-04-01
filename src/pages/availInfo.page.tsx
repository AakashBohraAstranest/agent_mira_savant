import { toast } from "react-toastify";
import AvailCard, { ListingData } from "../components/common/availCard";
import { useContext, useEffect, useRef, useState } from "react";
import { getHomeLists } from "../services/apiService";
import { LoaderContext } from "../services/LoaderContext";
// import { useAppDispatch } from "../store/store";
// import { setMonth } from "../store/reducer/common.reducer";
import { useSelector } from "react-redux";

const AvailInfoPage = () => {
  const [listings, setListings] = useState<
    { title: string; sub_list: ListingData[] }[]
  >([]);
  const context = useContext(LoaderContext);
  const hasFetched = useRef(false);
  // const dispatch = useAppDispatch()
  const apiCall = useSelector((state:any)=>state.common.filter)

  if (!context) {
    throw new Error("LoaderContext must be used within a LoaderProvider");
  }

  const { showLoader, hideLoader } = context;

  useEffect(() => {
    const fetchQuestions = async () => {
      const storedFilters = sessionStorage.getItem(btoa("filters"));
      const decodedFilters = storedFilters
        ? JSON.parse(atob(storedFilters))
        : {};
      try {
        showLoader();
        const apiResponse = await getHomeLists(
          { filters: decodedFilters },
          "second_page"
        );
        if (apiResponse.code === 200) {
          // Handle response
          setListings(apiResponse?.response?.listing);
          // dispatch(setMonth(apiResponse.response?.month as string))
        }
        hideLoader();
      } catch (error: any) {
        hideLoader();
        toast.warning("Failed to fetch data.", error);
      }
    };
    if (!hasFetched.current) {
      showLoader();
      fetchQuestions();
      hasFetched.current = true;
  }
  }, [hasFetched, hideLoader, showLoader, apiCall]);

  if (listings.length === 0 || listings[0].sub_list === undefined) {
    return null;
  }

  return (
    <div className="flex flex-wrap gap-4">
      {listings[0].sub_list.map((item, index) => (
        <AvailCard key={index} {...item} />
      ))}
    </div>
  );
};

export default AvailInfoPage;
