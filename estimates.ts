export type Estimate = {
  id: string;
  estimate: number;
};

export const claculateAverage = (estimates: Estimate[]) =>
  estimates.filter((estimate) => estimate.estimate > -1).reduce((total, b) => total + b.estimate, 0) / estimates.length;
