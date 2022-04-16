export let status = "estimating";

export type Status = "estimating" | "revealing";

export const changeStatus = (status: Status) => (status = status);
