import { FunctionComponentElement } from "react"
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import HeaderWSearch from "@components/HeaderWSearch";
import prisma from "lib/prisma";

export const getServerSideProps: GetServerSideProps = async (context) => {

  const keyword = context.params?.keyword as string
  const intKeyword = parseInt(keyword)
  const res = await prisma.police_financial.findMany({
    where: {
      OR:[
        {
          name: {
            contains: keyword
          },
        },
        {
          title: {
            contains: keyword
          },
        },
        {
          postal: {
            contains: keyword
          },
        },
        {
          employee_id: {
            equals: intKeyword || 0
          },
        }
      ]
    },
    orderBy: {
      employee_id: 'asc'
    }
  })
  const searchResData = res.map((item) => {
    return {
      id: item.id,
      employee_id: item.employee_id,
      name: item.name,
      title: item.title,
      postal: item.postal
    }
  })

  return {
    props: { searchResData }
  }
}

const cols: GridColDef[] = [
  { 
    field: 'employee_id',
    headerName: 'Employee ID',
    type: 'number',
  },
  {
    field: 'name',
    headerName: 'Name',
    width: 250,
    type: 'string'
  },
  {
    field: 'title',
    headerName: 'Title',
    width: 250,
    type: 'string'
  },
  {
    field: 'postal',
    headerName: 'Zip Code',
    width: 150,
    type: 'string'
  }
]

export default function SearchResult({searchResData}: InferGetServerSidePropsType<typeof getServerSideProps>): 
  FunctionComponentElement<{}> {
  return (
    <>
      <HeaderWSearch title="Search Results"/>

      {/* Table */}
      <section className="w-full pt-16">
        <DataGrid 
          columns={cols}
          rows={searchResData}
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
