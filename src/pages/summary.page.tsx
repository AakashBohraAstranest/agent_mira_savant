import Speedometer from "../components/common/speedometer";
import OpportunityInsights from "../components/common/OppurtunityInsights";
import "../custom.css";
import { useContext, useEffect, useRef, useState } from "react";
import { MarketReportResponse } from "../types/types";
import { LoaderContext } from "../services/LoaderContext";
import { useFetchSummary } from "../lib/ApiCall";
import { useAppDispatch } from "../store/store";
import { useSelector } from "react-redux";
import { setApiCall } from "../store/reducer/common.reducer";

const SummaryPage = () => {
  const [summaryResponse, setSummaryResponse] =
    useState<MarketReportResponse>();
  const hasFetched = useRef(false);
  const context = useContext(LoaderContext);
  const { fetchSummary } = useFetchSummary();
  const dispatch = useAppDispatch();
  const summary = useSelector((state:any)=>state.common.apiCall)

  if (!context) {
    throw new Error("LoaderContext must be used within a LoaderProvider");
  }

  const { showLoader, hideLoader } = context;

  useEffect(() => {
    const fetchData = async () => {
        if (!hasFetched.current) {
            showLoader();
            try {
                const data = await fetchSummary(); // ✅ Wait for the Promise
                setSummaryResponse(data as MarketReportResponse); // ✅ Correctly set state
                dispatch(setApiCall(false))
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
            const data = await fetchSummary(); // ✅ Wait for the Promise
            setSummaryResponse(data as MarketReportResponse); // ✅ Correctly set state
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
