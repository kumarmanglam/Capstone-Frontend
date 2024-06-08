import "./checkbox.css";

type Checkbox = {
  completed: boolean;
  toggleCompleted: () => void;
};
const Checkbox = ({ completed, toggleCompleted }: Checkbox) => {
  return (
    <input
      className="myCheckbox"
      type="checkbox"
      checked={completed}
      onChange={() => toggleCompleted()}
    />
  );
};

export default Checkbox;
