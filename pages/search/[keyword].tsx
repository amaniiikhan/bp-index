import { FunctionComponentElement } from "react"
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";

interface ISearchResultProps {
  keyword: string;
}

const cols: GridColDef[] = [
  { 
    field: 'employee_id',
    headerName: 'Employee ID',
    width: 200,
    type: 'number'
  },
  {
    field: 'name',
    headerName: 'Name',
    width: 200,
    type: 'string'
  },
  {
    field: 'title',
    headerName: 'Title',
    width: 200,
    type: 'string'
  },
  {
    field: 'postal',
    headerName: 'Zip Code',
    width: 150,
    type: 'string'
  }
]

export default function SearchResult(): FunctionComponentElement<{}> {
  return (
    <>
      {/* Header */}
      <div className="flex justify-between px-16 w-screen items-center shrink">
        <h2 className="font-bold text-4xl">Search Results</h2>
        <div className="w-full max-w-md mt-2 relative">
          <input type="text" placeholder="" 
          className="input w-full bg-gray-100 join-item rounded-2xl border-gray-200 pe-20"
          onKeyDown={(e)=>{
            if (e.key === 'Enter') {
              e.preventDefault();
            }
          }}/>
          <button type="button" className="absolute inset-y-0 end-0 grid w-16 place-content-center
            rounded-r-2xl text-gray-400 hover:text-gray-500">
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

      {/* Table */}
      <section className="w-full pt-16">
        <DataGrid 
          columns={cols}
          rows={[]}
          initialState={{
            pagination: {paginationModel: {pageSize: 20}}
          }}
          slots={{ toolbar: GridToolbar }}
          className="max-w-5xl mx-auto"
        />
      </section>
    </>
  )
}
