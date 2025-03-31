import Speedometer from "../components/common/speedometer";
import OpportunityInsights from "../components/common/oppurtunityInsights";
import "../custom.css";
import { useCallback, useEffect, useState } from "react";
import { getSummaryLists } from "../services/apiService";
import { toast } from "react-toastify";
import { MarketReportResponse } from "../types/types";

const SummaryPage = () => {
  const [summaryResponse, setSummaryResponse] =
    useState<MarketReportResponse>();

  // Stable function for fetching summary
  const fetchSummary = useCallback(async () => {
    const storedFilters = sessionStorage.getItem(btoa("filters"));
    const decodedFilters = storedFilters ? JSON.parse(atob(storedFilters)) : {};

    try {
      //       showLoader();
      const apiResponse = await getSummaryLists({ filters: decodedFilters });
      if (apiResponse.code === 200) {
        setSummaryResponse(apiResponse.response);
      }
    } catch (error) {
      toast.warning("Failed to fetch data.");
    } finally {
      //       hideLoader();
    }
  }, []);

  useEffect(() => {
    fetchSummary();
  }, [fetchSummary]);

  if(summaryResponse === undefined){
    return <div>...Loading</div>
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
