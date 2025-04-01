import { useContext, useEffect, useRef, useState } from "react";
import PriceMetricCard, {
  PriceDataProps,
} from "../components/common/priceMetricCard";
import { getHomeLists } from "../services/apiService";
import { toast } from "react-toastify";
import { LoaderContext } from "../services/LoaderContext";
// import { useAppDispatch } from "../store/store";
// import { setMonth } from "../store/reducer/common.reducer";
import { useSelector } from "react-redux";

const SnapShotPage = () => {
  const [listings, setListings] = useState<PriceDataProps[]>([]);
  const context = useContext(LoaderContext);
  const hasFetched = useRef(false);
  // const dispatch = useAppDispatch()
  const apiCall = useSelector((state:any)=>state.common.filter)
  
      if (!context) {
        throw new Error('LoaderContext must be used within a LoaderProvider');
    }
  
    const { showLoader, hideLoader } = context;

  const returnFilters = () => {
    const storedFilters = sessionStorage.getItem(btoa("filters"));
    return storedFilters ? JSON.parse(atob(storedFilters)) : {};
  };

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const apiResponse = await getHomeLists(
          { filters: returnFilters() },
          "first_page"
        );
        if (apiResponse.code === 200) {
          // Handle response
          setListings(apiResponse?.response?.listing);
          // dispatch(setMonth(apiResponse.response?.month as string))
          hideLoader();
        }
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

  // if(listings.length === 0){
  //   return(
  //     <div>
  //       Loading....
  //     </div>
  //   )
  // }

  return (
    <div className="flex flex-wrap gap-4">
      {listings.map((item, index) => (
        <PriceMetricCard key={index} {...item} />
      ))}
      {/*  */}
    </div>
  );
};

export default SnapShotPage;
