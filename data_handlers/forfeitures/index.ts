import prisma from "lib/prisma";

export interface ISingleYearSummary {
  // This is used for the result of our raw SQL query
  // It is DIRECTLY tied to the raw SQL query
  year: Date;
  year_sum: number;
}

export const get_forfeitures_yearly_summary = async (): Promise<
  ISingleYearSummary[]
> => {
  const year_summary_data = prisma.$queryRaw<ISingleYearSummary[]>`
    select sum(fd.amount) as year_sum, date_trunc('year', to_date(fd.date, 'YYYY-MM-DD')) as year from "forfeiture_data" as fd
  where fd.date is not null
  group by year;
`;
  return year_summary_data;
};
