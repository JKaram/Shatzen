import * as icons from "@heroicons/react/outline";

export const HeroIconOutline = ({ icon, ...props }) => {
  const Icon = icons[icon];
  if (!Icon) return <></>;
  return <Icon aria-hidden="true" {...props} />;
};
