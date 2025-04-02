import AvailCard, { ListingData } from "../components/common/availCard";
import { useContext, useEffect, useRef, useState } from "react";
import { LoaderContext } from "../services/LoaderContext";
import { useAvailableInfo } from "../lib/ApiCall";
import { useAppDispatch } from "../store/store";
import { useSelector } from "react-redux";
import { setApiCall } from "../store/reducer/common.reducer";

const AvailInfoPage = () => {
  const [listings, setListings] = useState<
    { title: string; sub_list: ListingData[] }[]
  >([]);
  const context = useContext(LoaderContext);
  const hasFetched = useRef(false);

  const dispatch = useAppDispatch();
  const summary = useSelector((state:any)=>state.common.apiCall)

  if (!context) {
    throw new Error("LoaderContext must be used within a LoaderProvider");
  }

  const { showLoader, hideLoader } = context;
  const {fetchAvailableInfo} = useAvailableInfo();

  useEffect(() => {
    const fetchData = async () => {
      if (!hasFetched.current) {
          showLoader();
          try {
              const data = await fetchAvailableInfo();// ✅ Wait for the Promise
              setListings(data.listing); // ✅ Correctly set state
              hasFetched.current = true; // ✅ Only set after successful fetch
          } catch (error) {
              console.error("Error fetching summary:", error);
          } finally {
              hideLoader();
          }
      }
  };

  fetchData();
  }, []);

  useEffect(()=>{
    const fetchData = async () => {
      if (summary) {
          showLoader();
          try {
              const data = await fetchAvailableInfo(); // ✅ Wait for the Promise
              setListings(data.listing); // ✅ Correctly set state
              dispatch(setApiCall(false)) // ✅ Only set after successful fetch
          } catch (error) {
              console.error("Error fetching summary:", error);
          } finally {
              hideLoader();
          }
      }
  };
  
  fetchData();
  },[summary])

  if (listings === undefined || listings.length === 0 || listings[0].sub_list === undefined) {
    return <div>{"data not available"}</div>;
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
