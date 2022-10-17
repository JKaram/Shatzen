export let appStatus = "estimating";

export type Status = "estimating" | "revealing";

export const changeStatus = (status: Status) => {
  appStatus = status;
};