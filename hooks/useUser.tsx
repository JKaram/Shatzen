import { Estimate } from "../types/aliases";

export const useUserEstimates = (socketId: string | undefined, estimates: Estimate[]) => {
  if (!socketId) return [false, undefined];
  const hasEstimated = estimates.find((estimate) => estimate.id === socketId);
  if (hasEstimated) return [!!hasEstimated, hasEstimated ? hasEstimated.estimate : undefined];
  return [false, undefined];
};
