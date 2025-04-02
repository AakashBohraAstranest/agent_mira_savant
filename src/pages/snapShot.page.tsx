import { useContext, useEffect, useRef, useState } from "react";
import PriceMetricCard, {
  PriceDataProps,
} from "../components/common/priceMetricCard";
import { LoaderContext } from "../services/LoaderContext";
import { useSnapShot } from "../lib/ApiCall";
import { useAppDispatch } from "../store/store";
import { useSelector } from "react-redux";
import { setApiCall } from "../store/reducer/common.reducer";

const SnapShotPage = () => {
  const [listings, setListings] = useState<PriceDataProps[]>([]);
  const context = useContext(LoaderContext);
  const hasFetched = useRef(false);
  const dispatch = useAppDispatch();
  const summary = useSelector((state:any)=>state.common.apiCall)
  
      if (!context) {
        throw new Error('LoaderContext must be used within a LoaderProvider');
    }
  
    const { showLoader, hideLoader } = context;
    const {fetchSnapShot} = useSnapShot()

  useEffect(() => {
     const fetchData = async () => {
            if (!hasFetched.current) {
                showLoader();
                try {
                    const data = await fetchSnapShot();// ✅ Wait for the Promise
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
                const data = await fetchSnapShot(); // ✅ Wait for the Promise
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

  if(listings.length === 0 || listings === undefined){
    return(
      null
    )
  }

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
