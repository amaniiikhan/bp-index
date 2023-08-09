import { police_dept_yearly } from "@prisma/client";
import prisma from "lib/prisma";

export const get_yearly_wage_data = async (): Promise<
  police_dept_yearly[]
> => {
  // Placeholder until we put the data into the DB
  // return Promise.resolve(yearlyData);
  const data = await prisma.police_dept_yearly.findMany();
  return data;
};
