import ReactSpeedometer from "react-d3-speedometer";

type SpeedometerProp = {
  value: number
}

// Define the component with proper typing
const Speedometer: React.FC<SpeedometerProp> = ({value}) => {
  // Determine screen width and set speedometer width
  const screenSize = window.screen.width;
  let speedoWidth = 340;

  if (screenSize <= 400) {
    speedoWidth = 300;
  }

  return (
    <div className="w-[450px] h-[327px] bg-[#fff] rounded-[12px] text-center flex justify-center items-center flex-col">
      <div>
        <h6 className="font-[Geologica] font-bold text-[18px] text-[#0B3379] mb-[16px]">
          Market Temperature
        </h6>
      </div>
      <div className="relative">
        <ReactSpeedometer
          textColor="#AAAAAA"
          maxValue={5}
          value={value}
          segments={5}
          segmentColors={["#F9462D", "#f6951e", "#ecdb22", "#afe129", "#6ad72e"]}
          needleColor="#4682B4"
          ringWidth={70}
          width={speedoWidth}
          height={220}
          needleTransitionDuration={500}
          forceRender={true}
        />
        <div className="absolute flex justify-around w-full font-[Geologica] text-[#0B3379] text-[12px] bottom-0">
          <span className="mr-[20px]">
            Seller's <br /> Market
          </span>
          <span className="ml-[20px]">
            Buyer's <br /> Market
          </span>
        </div>
      </div>
    </div>
  );
};

export default Speedometer;