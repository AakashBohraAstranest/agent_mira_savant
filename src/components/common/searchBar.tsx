import { Input } from "../ui/input"

const SearchBar = () => {
  return (
    <div className="flex w-full md:w-[75%] m-auto my-4 flex-wrap md:flex-nowrap px-4 md:p-0 ">
      <p className="text-[20px] font-[ClashDisplay-Medium] text-[#0B3379] text-center md:text-center w-full md:w-[20%] pb-4 md:pb-0 ">I am Interested in</p>
      <Input placeholder="Neighbourhood, city, zip..." className="font-[Geologica] xl:ml-[6%]"/>
    </div>
  )
}

export default SearchBar
