import { Estimate } from "../types/aliases";

export const userEstimate = (id: string | undefined, estimates: Estimate[]) => {
  if (!id) return false;
  const findEstimate = estimates.find((estimate) => estimate.id === id);
  if (findEstimate) return findEstimate.estimate;
  return false;
};
