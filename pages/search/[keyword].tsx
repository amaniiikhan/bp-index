import { FunctionComponentElement } from "react"
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import HeaderWSearch from "@components/HeaderWSearch";
import prisma from "lib/prisma";
import Link from "next/link";

export const getServerSideProps: GetServerSideProps = async (context) => {

  const keyword = context.params?.keyword as string
  const intKeyword = parseInt(keyword)
  const res = await prisma.police_financial.findMany({
    where: {
      OR:[
        {
          name: {
            contains: keyword,
            mode: 'insensitive'
          },
        },
        {
          title: {
            contains: keyword,
            mode: 'insensitive'
          },
        },
        {
          postal: {
            contains: keyword,
            mode: 'insensitive'
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
  let searchResData = []
  if (res.length && res.length > 0) {
    searchResData = res.map((item) => {
      return {
        id: item.id,
        employee_id: item.employee_id,
        name: item.name,
        title: item.title,
        postal: item.postal
      }
    })
  }

  return {
    props: { searchResData }
  }
}



export default function SearchResult({searchResData}: InferGetServerSidePropsType<typeof getServerSideProps>): 
  FunctionComponentElement<{}> {
  const cols: GridColDef[] = [
    { 
      field: 'employee_id',
      headerName: 'Employee ID',
      type: 'number',
      valueFormatter: (params) => {
        return params.value
      }
    },
    {
      field: 'name',
      headerName: 'Name',
      width: 250,
      type: 'string',
      renderCell: (params) => {
        return(
          <Link href={{
            pathname: "/profile/[employee_id]",
            query: {employee_id: params.row.employee_id}
          }} 
          className="link hover:text-blue-500"
          >
            {params.row.name}
          </Link>
        )
      }
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
      type: 'string'
    }
  ]
  return (
    <>
      <HeaderWSearch title="Search Results"/>
      {/* Table */}
      <section className="w-full pt-16 pb-16">
        <DataGrid 
          columns={cols}
          rows={searchResData}
          className="max-w-5xl mx-auto"
          initialState={{
            pagination: {paginationModel: {pageSize: 20}}
          }}
          slots={{ toolbar: GridToolbar }}
        />
      </section>
    </>
  )
}
