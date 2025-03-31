import React, { useState, useCallback } from "react";
import { Button } from "../components/ui/Button";
import "../custom.css";
import SummaryPage from "./summary.page";
import SnapShotPage from "./snapShot.page";
import AvailInfoPage from "./availInfo.page";

// Define the props interface
interface TabbedInterfaceProps {
  initialVariant?: "summary" | "snapshots" | "available";
}

const TabbedInterface = React.memo(
  ({ initialVariant = "summary" }: TabbedInterfaceProps) => {
    const [selectedVariant, setSelectedVariant] = useState(initialVariant);
    const tabIndexMap: { [key: string]: number } = {
      summary: 0,
      snapshots: 1,
      available: 2,
    };
    const [activeTab, setActiveTab] = useState(tabIndexMap[initialVariant] || 0);

    const tabs = [
      {
        title: "Summary",
        variant: "summary",
        content:
          selectedVariant === "summary" ? <SummaryPage /> : "No summary available.",
      },
      {
        title: "Recent Sales Snapshot",
        variant: "snapshots",
        content:
          selectedVariant === "snapshots" ? <SnapShotPage /> : "No snapshots available.",
      },
      {
        title: "What is available",
        variant: "available",
        content:
          selectedVariant === "available" ? (
            <AvailInfoPage />
          ) : (
            "No availability info."
          ),
      },
    ];

    const handleTabClick = useCallback((index: number) => {
      setActiveTab(index);
      setSelectedVariant(tabs[index].variant as "summary" | "snapshots" | "available");
    }, []);

    return (
      <div className="tabs-container w-full bg-transparent rounded-lg md:rounded-none md:bg-transparent">
        {/* Tab Headers */}
        <div className="tab-headers flex gap-0 md:gap-4 border-b border-[#ccc] overflow-scroll md:overflow-hidden flex-wrap md:flex-nowrap bg-[#0B3379] md:bg-transparent">
          {tabs.map((tab, index) => (
            <Button
              key={index}
              variant={activeTab === index ? "default" : "ghost"}
              className={`px-6 py-8 text-[20px] md:text-[36px] font-[ClashDisplay-Medium] rounded-[12px] md:rounded-none md:rounded-t-[24px] transition-colors bg-[#0B3379] ${
                activeTab === index
                  ? "text-[#0B3379] bg-[#fff] border-[#0B3379] border-2 hover:bg-[#0B3379] md:bg-[#0B3379] md:text-white"
                  : "text-[#fff] md:text-[#0B3379] bg-[#0B3379] md:bg-transparent hover:border-2 hover:border-b-0 hover:text-[#0B3379]"
              }`}
              onClick={() => handleTabClick(index)}
            >
              {tab.title}
            </Button>
          ))}
        </div>

        {/* Tab Content */}
        <div
          className={`tab-content p-6 pt-8 z-[10] relative bg-[#0B3379] rounded-lg ${
            selectedVariant === "summary" ? "rounded-tl-none" : null
          } -mt-1`}
        >
          {tabs[activeTab].content}
        </div>
      </div>
    );
  }
);

TabbedInterface.displayName = "TabbedInterface";

export default TabbedInterface;