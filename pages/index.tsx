import DataOverviewCard from "@components/OverviewCard";
import RoleAverageWageChart from "@components/PoliceFinancial_RoleAverageWage";
import ForfeitureTotalAssetsChart from "@components/Forfeiture_TotalAssets";
import {
  ISingleYearSummary,
  get_forfeitures_yearly_summary,
} from "data_handlers/forfeitures";
import {get_yearly_wage_data} from "data_handlers/police_financial";
import { police_dept_yearly } from "@prisma/client";
import { useState } from "react";
import { useRouter } from "next/router";
import { string } from "prop-types";
interface IHomeProps {
  role_average_data: police_dept_yearly[];
  forfeitures_yearly_summary: ISingleYearSummary[];
}

export async function getStaticProps<NextPage, IHomeProps>() {
  return {
    props: {
      role_average_data: await get_yearly_wage_data(),
      forfeitures_yearly_summary: await get_forfeitures_yearly_summary(),
    },
    revalidate: 60 * 60 * 24, // 24 hours
  };
}

export default function Home({
  role_average_data,
  forfeitures_yearly_summary,
}: IHomeProps) {
  const data_cards = [
    <DataOverviewCard
      title="Officer Pay"
      chart={<RoleAverageWageChart data={role_average_data} />}
      link={"/details/police-financial"}
    />,
    <DataOverviewCard
      title="Department Salaries"
      chart={<p>Testing Content</p>}
      link="/details/police-financial"
    />,
    <DataOverviewCard
      title="Overtime Pay"
      chart={<p>Testing Content</p>}
      link="/details/police-financial"
    />,
    <DataOverviewCard
      title="Forfeitures per XXX"
      chart={
        <ForfeitureTotalAssetsChart
          yearly_summary_data={forfeitures_yearly_summary}
        />
      }
      link="/details/forfeiture"
    />,
    <DataOverviewCard
      title="Detail Pay"
      chart={<p>Testing Content</p>}
      link="/details/police-financial"
    />,
    <DataOverviewCard
      title="FIOs per XXX"
      chart={<p>Testing Content</p>}
      link="/details/fio"
    />,
    <DataOverviewCard
      title="Civil Settlements"
      chart={<p>Testing Content</p>}
      link="/details/settlement"
    />,
    <DataOverviewCard
      title="Arrest data"
      chart={<p>Testing Content</p>}
      link="/details/arrest"
    />,
    <DataOverviewCard
      title="Internal Affairs Open Cases"
      chart={<p>Testing Content</p>}
      link="/details/internal-affairs"
    />,
    // <DataOverviewCard
    //   title="Sample Office Detail Page"
    //   chart={<p>Testing Content</p>}
    //   link="/details/officer-profile/123456"
    // />,
  ];

  const [keyword, setKeyword] = useState<string>("");
  const router = useRouter();
  const handleSearch = () => {
    if (keyword.length > 0) {
      router.push({
        pathname: "/search/[keyword]", query: {keyword: keyword}
      });
    }
  };

  return (
    <>
      {/* hero section */}
      <section className="hero pt-14" >
        <div className="hero-content text-center pb-10">
          <div className="max-w-5xl flex flex-col place-items-center">
            <h1 className="text-5xl font-bold">Boston Police Index</h1>
            <p className="my-6 text-lg">Lorem ipsum dolor sit amet consectetur. 
            Ultricies pretium gravida donec blandit amet libero. 
            Gravida augue sollicitudin mauris at eget eget. 
            Pretium nisi euismod curabitur porta tincidunt malesuada. 
            Ut in ac at vitae placerat. </p>
            <div className="w-full max-w-[38rem] mt-2 relative">
              <input type="text" placeholder="Search by Employee ID, Name, Department, Title, or Postal Code" 
                className="input w-full bg-gray-100 join-item rounded-2xl border-gray-200 pe-20"
                onChange={(e)=>setKeyword(e.target.value)}
                onKeyDown={(e)=>{
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleSearch();
                  }
              }}/>
              <button type="button" className="absolute inset-y-0 end-0 grid w-16 place-content-center
                bg-gray-200 rounded-r-2xl hover:bg-gray-300 text-gray-400"
                onClick={()=>handleSearch()}>
                <span className="sr-only">Search</span>
                <svg
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="3"
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* data overview section */}
      <section className="mt-5 w-full text-center bg-gray-300 py-8 mb-10">
        <div className="flex flex-col items-center w-full max-w-3xl mx-auto">
          <h3 className="text-xl font-bold">Lorem ipsum dolor sit amet consectetur. Vulputate ut justo nunc sed amet.</h3>
          <div className="carousel w-full">
            <div id="chart1" className="carousel-item w-full h-[21rem] bg-white mt-5 place-content-center items-center text-6xl" >1</div>
            <div id="chart2" className="carousel-item w-full h-[21rem] bg-white mt-5 place-content-center items-center text-6xl" >2</div>
            <div id="chart3" className="carousel-item w-full h-[21rem] bg-white mt-5 place-content-center items-center text-6xl" >3</div>
            <div id="chart4" className="carousel-item w-full h-[21rem] bg-white mt-5 place-content-center items-center text-6xl" >4</div>
          </div>
          <div className="flex justify-center w-full my-2 gap-2">
            <a href="#chart1" className="btn btn-xs rounded-full">1</a> 
            <a href="#chart2" className="btn btn-xs rounded-full">2</a>
            <a href="#chart3" className="btn btn-xs rounded-full">3</a> 
            <a href="#chart4" className="btn btn-xs rounded-full">4</a> 
          </div>
        </div>
      </section>
    </>
  );
}
