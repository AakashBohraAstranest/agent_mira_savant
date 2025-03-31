import { Outlet } from "react-router";
import { Logo, Background } from "../assets/Images";
import { cn } from "../lib/utils";


export function AuthLayout() {
  return (
    <div className="bg-[#E3EEFF] p-12 min-h-screen flex items-center justify-center">
      <div className="flex w-full max-w-7xl h-auto">
        {/* Left side with image */}
        <div className="relative hidden w-1/2 lg:block self-stretch">
          <div className="absolute left-0 top-0 rounded-br-2xl rounded-tl-2xl bg-[#1E4DB7] p-10 z-10">
            <img src={Logo} alt="Logo" className="h-20 w-14" />
          </div>

          <div
            className={cn(
              "relative rounded-tl-[32px] rounded-bl-[32px] border-[#1E4DB7] border-8 overflow-hidden h-full rounded-tr-[32px]",
            )}
          >
            {/* Background Image */}
            <img
              src={Background}
              alt="Background"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Right side with form */}
        <div className="w-1/2 flex items-center justify-center self-stretch">
          <Outlet/>
        </div>
      </div>
    </div>
  );
}