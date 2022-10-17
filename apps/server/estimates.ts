export type Estimate = {
  id: string;
  estimate: number;
};

export const claculateAverage = (estimates: Estimate[]) => {
  const filterOutNonEstimates = estimates.filter((estimate) => estimate.estimate > -1);

  return filterOutNonEstimates.reduce((total, b) => total + b.estimate, 0) / filterOutNonEstimates.length;
};
