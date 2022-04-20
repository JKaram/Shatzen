import { findIndex } from "lodash";

export const estimates: Estimate[] = [];

type Estimate = {
  id: string;
  estimate: number;
};

export const addEstimate = (newEstimate: Estimate) => {
  const hasGuessed = estimates.findIndex((estimate) => estimate.id === newEstimate.id);
  if (hasGuessed >= 0 && newEstimate.estimate === estimates[hasGuessed].estimate) return removeEstimate(newEstimate);
  if (hasGuessed >= 0) return (estimates[hasGuessed] = newEstimate);
  estimates.push(newEstimate);
};

export const removeEstimate = (estimateToRemove: Estimate) => {
  const indexOfRemovedItem = findIndex(estimates, { id: estimateToRemove.id });
  estimates.splice(indexOfRemovedItem, 1);
};

export const removeUserEstimate = (userId: string) => {
  const hasGuessed = estimates.findIndex((estimate) => estimate.id === userId);
  if (hasGuessed >= 0) estimates.splice(hasGuessed, 1);
};

export const clearEstimates = () => estimates.splice(0, estimates.length);

export const claculateAverage = () =>
  estimates.filter((estimate) => estimate.estimate > -1).reduce((total, b) => total + b.estimate, 0) / estimates.length;
