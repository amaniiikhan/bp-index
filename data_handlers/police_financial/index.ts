import { yearlyData } from "utility/yearly_information";

export interface IWageDataLineChartPoint {
  // TODO: Probably remove this, cleanup input data or something
  // Maybe rename it to index or key
  FIELD1: number;
  year: number;
  infl_adj_total: string;
}

export const get_yearly_wage_data = async (): Promise<
  IWageDataLineChartPoint[]
> => {
  // Placeholder until we put the data into the DB
  return Promise.resolve(yearlyData);
};
