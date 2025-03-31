import { useEffect, useState } from "react";
import PriceMetricCard, {
  PriceDataProps,
} from "../components/common/priceMetricCard";
import { getHomeLists } from "../services/apiService";
import { toast } from "react-toastify";

const SnapShotPage = () => {
  const [activeTab, setActiveTab] = useState(
    () => sessionStorage.getItem("activeTab") || "summary"
  );
  const [listings, setListings] = useState<PriceDataProps[]>([]);
  const [savedFlList, setSavedFlList] = useState("All");

  const returnFilters = () => {
    const storedFilters = sessionStorage.getItem(btoa("filters"));
    return storedFilters ? JSON.parse(atob(storedFilters)) : {};
  };

  const returnHeading = () => {
    const strFl = sessionStorage.getItem(btoa("heading"));
    return strFl ? JSON.parse(atob(strFl)) : "All";
  };

  useEffect(() => {
    if (returnFilters() !== null) {
      setSavedFlList(returnHeading());
    }

    const savedTab = localStorage.getItem("activeTab");
    if (savedTab) {
      setActiveTab(savedTab);
    }
  }, []);

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
          console.log(apiResponse);
          // setShowMonth(apiResponse?.response?.month);
          // hideLoader();
        }
      } catch (error: any) {
        // hideLoader();
        toast.warning("Failed to fetch data.", error);
      }
    };
    fetchQuestions();
  }, []);

  if(listings.length === 0){
    return(
      <div>
        Loading....
      </div>
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
