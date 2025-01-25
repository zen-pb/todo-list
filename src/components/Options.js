import optionsSvg from "../assets/images/options.svg";
import editSvg from "../assets/images/edit.svg";
import deleteSvg from "../assets/images/delete.svg";
import Button from "./Button";
import Dropdown from "./Dropdown";

export default function Options() {
  const optionsBTN = Button("", optionsSvg);
  optionsBTN.id = "options";
  optionsBTN.classList.add("options");

  const optionsList = [Button("Edit", editSvg), Button("Delete", deleteSvg)];

  const optionsDiv = Dropdown(optionsBTN, optionsList);

  return optionsDiv;
}
