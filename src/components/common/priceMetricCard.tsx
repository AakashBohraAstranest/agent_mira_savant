import {
  DollarSign,
  ArrowDown,
  ArrowUp,
  Home,
  Scale,
  Hourglass,
  CalendarDays,
  Plus,
  Clock2,
} from "lucide-react";
import { FC } from "react";
import { GetIcon } from "../../lib/getIcons";
import { cn } from "../../lib/utils";

export type PriceDataProps = {
  name: string;
  value: string;
  subText: string;
  arrow: "up" | "down";
  color: "positive" | "negative";
  subText2: string;
  arrow2: "up" | "down";
  color2: "positive" | "negative";
};

const PriceMetricCard:FC<PriceDataProps> = ({name, value, subText, arrow, color, subText2, arrow2, color2}) => {

  return (
    <div
      className="w-full md:w-[calc(50%-0.5rem)] bg-[#fff] p-6 rounded-[12px]"
    >
      <div className="flex justify-center items-center bg-[#E3EEFF] py-4 gap-2">
        {GetIcon(name)}
        <h4 className="font-[Geologica] text-[#0B3379] text-[20px] font-regular">
          {name}
        </h4>
      </div>
      <h1 className="text-[40px] font-[ClashDisplay-Medium] text-center my-4 text-[#0B3379]">
        {value}
      </h1>
      <div className="flex justify-center items-center gap-4">
          <div
            className={cn("text-center flex justify-center items-center text-[20px]", color === "positive" ? "text-[#F1361B]" :"text-[#30904D]")}
          >
            {arrow === "up"? <ArrowUp/> : <ArrowDown/>}
            <p>{subText}</p>
          </div>
          <div
            className={cn("text-center flex justify-center items-center text-[20px]", color2 === "positive" ? "text-[#F1361B]" :"text-[#30904D]")}
          >
            {arrow2 === "up"? <ArrowUp/> : <ArrowDown/>}
            <p>{subText2}</p>
          </div>
      </div>
    </div>
  );
};

export default PriceMetricCard;
