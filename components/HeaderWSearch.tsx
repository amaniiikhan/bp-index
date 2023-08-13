import { FC } from "react";
import { useRouter } from "next/router";
import { useState } from "react";

interface IHeaderWSearchProps {
  title: string;
}
const HeaderWSearch: FC<IHeaderWSearchProps> = ({title}) => {
  
  const router = useRouter();
  const [keyword, setKeyword] = useState<string>(router.query.keyword as string || "");
  const handleSearch = () => {
    if (keyword.length > 0) {
      router.push({
        pathname: "/search/[keyword]", query: {keyword: keyword}
      });
    }
  };

  return (
    <>
      <div className="flex justify-between px-16 w-screen items-center shrink mt-10">
        <h2 className="font-bold text-4xl">{title}</h2>
        <div className="w-full max-w-md mt-2 relative">
          <input type="text" placeholder="" 
            className="input w-full bg-gray-100 join-item rounded-2xl border-gray-200 pe-20"
            onChange={(e)=>setKeyword(e.target.value)}
            onKeyDown={(e)=>{
              if (e.key === 'Enter') {
                e.preventDefault();
                handleSearch();
              }
            }}
            value={keyword}
          />
          <button type="button" className="absolute inset-y-0 end-0 grid w-16 place-content-center
            rounded-r-2xl text-gray-400 hover:text-gray-500"
            onClick={()=>handleSearch()}
          >
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
    </>
  )
}

export default HeaderWSearch;