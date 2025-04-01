// Chart interface
interface Chart {
    score: number;
  }
  
  // Summary details for each report section
  interface SummarySection {
    title: string;
    chart: Chart;
    summary: string[];
  }
  
  // Response structure containing month and summary sections
  export interface MarketReportResponse {
    month: string;
    summary: SummarySection[];
  }
  
  // Main API response structure
  export interface ApiResponse<T = any> {
    code: number;
    message: string;
    response: T;
  }
  
  // Final interface for the report API response
  export type MarketReportApiResponse = ApiResponse<MarketReportResponse>;
  
  export type Option = {
    label: string;
    value: string;
  };
  
  export type RangeOption = {
    min: Option[];
    max: Option[];
  };
  
  export type PropertyFilters = {
    bedroomOptions: string[];
    bathroomOptions: string[];
    months: string[];
    priceOptions: RangeOption;
    lotSizeList: RangeOption;
    livingAreaList: RangeOption;
    homeTypeList: Option[];
  };
  