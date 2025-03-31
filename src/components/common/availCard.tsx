import { FC } from "react";
import { GetIcon } from "../../lib/getIcons";

export type ListingData = {
  name: string;
  value: string | number;
  date?: string; // ISO date string format (e.g., "2025-03-31")
};

const AvailCard: FC<ListingData> = ({ name, value, date }) => {
  return (
    <div className="w-full md:w-[calc(50%-0.5rem)] bg-[#fff] p-6 rounded-[12px]">
      <div className="flex justify-center items-center bg-[#E3EEFF] py-4 gap-2 px-2 md:px-0">
        {GetIcon(name)}
        <h4 className="font-[Geologica] text-[#0B3379] text-[20px] font-regular text-center">
          {name}
        </h4>
      </div>
      <h1 className="text-[40px] font-[ClashDisplay-Medium] text-center  text-[#0B3379]">
        {value}
      </h1>
    </div>
  );
};

export default AvailCard;
