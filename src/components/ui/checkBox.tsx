// Custom CheckBox Component
import "../../custom.css";
interface CheckBoxProps {
  id: string;
  checked: boolean;
  onCheckedChange: () => void;
}

const CheckBox = ({ id, checked, onCheckedChange }: CheckBoxProps) => {
  return (
    <input
      type="checkbox"
      id={id}
      checked={checked}
      onChange={() => onCheckedChange()}
      className="h-4 w-4 rounded border-[#0B3379] border-2 text-blue-600 focus:ring-blue-500 custom-checkbox-wrapper"
    />
  );
};

export default CheckBox;
