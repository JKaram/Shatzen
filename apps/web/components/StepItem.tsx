import { HeroIconOutline } from "./HeroIcon";
import { motion } from "framer-motion";
import { slideIn } from "../utils/motion";

export const StepItem = (props: {
  label: string;
  icon: string;
  description: string;
  index: number;
}) => {
  return (
    <motion.li
      variants={{ ...slideIn("right", "tween", 0.2 * props.index, 1) }}
      initial="hidden"
      whileInView="show"
      className="flex items-center xl:items-start"
    >
      <HeroIconOutline className="w-10 h-10" icon={props.icon} />
      <div className="flex flex-col ml-2 leading-3">
        <h1 className="text-2xl font-bold">{props.label}</h1>
        <span className="text-sm md:text-lg">{props.description}</span>
      </div>
    </motion.li>
  );
};
