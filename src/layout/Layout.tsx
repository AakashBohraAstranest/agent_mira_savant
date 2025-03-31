import Header from "../components/common/header";
import DropdownTabs from "../components/common/dropdTabs";
import SearchBar from "../components/common/searchBar";
import TabbedInterface from "../pages/tabbedInterface";

export default function Layout() {
  return (
    <div>
      <div className="pb-8">
        <Header />
        <SearchBar />
        <DropdownTabs />
      </div>
      <div className="w-full md:w-5/6 m-auto px-4">
        <h4 className="text-[#797979] font-[Geologica] font-normal text-[20px] md:text-[24px] mb-[40px]">
          All Homes in{" "}
          <span className="font-[ClashDisplay-Semibold]">
            Miami-Dade County, FL
          </span>
        </h4>
        <TabbedInterface/>
      </div>
      <p className="text-[#0B3379] text-[18px] font-medium font-[Geologica] text-center mt-14 mb-2">
        © 2025 Astranest. All rights reserved.
      </p>
    </div>
  );
}
