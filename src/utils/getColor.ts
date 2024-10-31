import { colorsStorage } from "@/constants/colorsStorage";
import { colorType } from "@/interfaces/colors";

export const getColor = (key: keyof colorType) : string=> {
  return colorsStorage[key];
};
