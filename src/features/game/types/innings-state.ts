import type { Delivery } from "./delivery";

export type InningsState = {
  runs: number;
  wickets: number;
  deliveries: Delivery[];
};