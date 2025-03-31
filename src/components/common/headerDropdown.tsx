import { DropdownMenuItem } from "../ui/Dropdown-Menu"; // Adjust import based on your setup

// Define the interface for each dropdown item
interface DropdownItem {
  label: string;
  icon: React.ReactNode; // For icons or other React elements
  onClick: () => void;   // Click handler function
}

// Define the props interface
interface DropdownProps {
  items: DropdownItem[];
}

const Dropdown = ({ items }: DropdownProps) => {
  return (
    <>
      {items.map((item, index: number) => (
        <DropdownMenuItem
          key={index}
          onClick={item.onClick}
          className="flex items-center gap-2 px-4 py-2 text-[#0B3379] font-[Geologica] font-normal text-[14px] bg-[#B8D4FF] rounded-none cursor-pointer"
        >
          {item.icon}
          <span>{item.label}</span>
        </DropdownMenuItem>
      ))}
    </>
  );
};

export default Dropdown;