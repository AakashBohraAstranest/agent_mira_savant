import { toast } from "react-toastify";
import AvailCard, { ListingData } from "../components/common/availCard"
import { useEffect, useState } from "react";
import { getHomeLists } from "../services/apiService";

const AvailInfoPage = () => {

  const [listings, setListings] = useState<{title: string, sub_list: ListingData[]}[]>([]);

  useEffect(() => {
    const fetchQuestions = async () => {
        const storedFilters = sessionStorage.getItem(btoa("filters"));
        const decodedFilters = storedFilters ? JSON.parse(atob(storedFilters)) : {};
        try {
            // showLoader();
            const apiResponse = await getHomeLists({ "filters": decodedFilters }, 'second_page');
            if (apiResponse.code === 200) {
                // Handle response
                setListings(apiResponse?.response?.listing);
                console.log(...apiResponse?.response?.listing)
                // sendDataToMainPage(apiResponse?.response?.date);
            }
            // hideLoader();
        } catch (error:any) {
            // hideLoader();
            toast.warning("Failed to fetch data.", error);
        }
    };
    fetchQuestions();

}, []);

// console.log(listings)

if(listings.length === 0){
  return (
    <div>Loading....</div>
  )
}

  return (
    <div className="flex flex-wrap gap-4">
      {
        listings[0].sub_list.map((item, index)=>(
          <AvailCard key={index} {...item}/>
        ))
      }
    {/* <AvailCard/> */}
    </div>
  )
}

export default AvailInfoPage
