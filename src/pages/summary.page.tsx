import Speedometer from "../components/common/speedometer";
import OpportunityInsights from "../components/common/OppurtunityInsights";
import "../custom.css";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { getSummaryLists } from "../services/apiService";
import { toast } from "react-toastify";
import { MarketReportResponse } from "../types/types";
import { LoaderContext } from "../services/LoaderContext";
// import { useAppDispatch } from "../store/store";
// import { setMonth } from "../store/reducer/common.reducer";
import { useSelector } from "react-redux";

const SummaryPage = () => {
  const [summaryResponse, setSummaryResponse] =
    useState<MarketReportResponse>();
  const hasFetched = useRef(false);
  const context = useContext(LoaderContext);
  // const dispatch = useAppDispatch()
  const apiCall = useSelector((state:any)=>state.common.filter)

  if (!context) {
    throw new Error("LoaderContext must be used within a LoaderProvider");
  }

  const { showLoader, hideLoader } = context;

  // Stable function for fetching summary
  const fetchSummary = useCallback(async () => {
    const storedFilters = sessionStorage.getItem(btoa("filters"));
    const decodedFilters = storedFilters ? JSON.parse(atob(storedFilters)) : {};

    try {
      showLoader();
      const apiResponse = await getSummaryLists({ filters: decodedFilters });
      if (apiResponse.code === 200) {
        setSummaryResponse(apiResponse.response);
        // dispatch(setMonth(apiResponse.response?.month as string))
      }
    } catch (error) {
      toast.warning("Failed to fetch data.");
    } finally {
      hideLoader();
    }
  }, [showLoader, hideLoader]);

  useEffect(() => {
    // Fetch data only when the component mounts or when the filters change (apiCall changes)
    if (!hasFetched.current || apiCall !== hasFetched.current) {
      showLoader();
      fetchSummary();
      hasFetched.current = apiCall; // Store the current filters
    }
  }, [fetchSummary, apiCall, showLoader, hideLoader]);

  if(summaryResponse?.summary === undefined){
    return null
  }

  return (
    <>
      {summaryResponse?.summary.map((data, index) => (
        <div key={index}>
          <h1 className="text-[#fff] font-[ClashDisplay-Medium] text-[24px] my-4">
            {data.title}
          </h1>
          <div className="flex gap-8 flex-wrap md:flex-nowrap">
            <Speedometer value={data.chart.score} />
            <OpportunityInsights items={data.summary} />
          </div>
        </div>
      ))}
    </>
  );
};

export default SummaryPage;
