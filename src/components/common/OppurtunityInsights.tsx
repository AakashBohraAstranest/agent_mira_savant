import { ScrollArea, ScrollBar } from "../ui/Scroll-Area";
import "../../custom.css";
import { FC } from "react";

type OpportunityInsightsProp ={
  heading?: string;
  items: string[]
}

const OpportunityInsights:FC<OpportunityInsightsProp> = ({heading = "Opportunity Insights", items}) => {
  return (
    <ScrollArea className="w-full h-[327px] flex-1 overflow-hidden custom-scroll pr-0 md:pr-[24px]">
     <div className=" rounded-[12px] w-full h-auto flex-1 overflow-y-hidden bg-[#fff]">
     <h2 className="text-[18px] text-[#0B3379] font-[Geologica] font-bold mb-2">
        {heading}
      </h2>
      <ul className="list-disc pl-6 text-[#0B3379]">
        {items.map((item, index) => (
          <li key={index} className="my-2">{item}</li>
        ))}
      </ul>
     </div>
      <ScrollBar className="text-[#000000]" />
    </ScrollArea>
  );
};

export default OpportunityInsights;