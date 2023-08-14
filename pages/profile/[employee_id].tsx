import { FunctionComponentElement } from "react"
import HeaderWSearch from "@components/HeaderWSearch"
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import prisma from "lib/prisma";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const employee_id = context.params?.employee_id as string
  const intEmployeeId = parseInt(employee_id)
  const res = await prisma.police_financial.findFirst({
    where: {
      employee_id: intEmployeeId
    }
  })
  const officerData = {
    id: res.id,
    employee_id: res.employee_id,
    name: res.name,
    title: res.title,
    postal: res.postal,
    department: res.department_name
  }

  return {
    props: { officerData }
  }
}

export default function OfficerProfile({officerData}: InferGetServerSidePropsType<typeof getServerSideProps>): FunctionComponentElement<{}> {
  return (
    <>
      <HeaderWSearch title="Officer Profile"/>

      <section className="w-full">
        <div className="card card-side bg-gray-100 shadow-xl mt-10 max-w-3xl mx-auto">
          <figure>
            <img className="w-[350px]"
              src="https://creazilla-store.fra1.digitaloceanspaces.com/icons/3500612/blank-woman-placeholder-icon-md.png" />
          </figure>
          <div className="card-body">
            <h1 className="card-title text-3xl mb-5">{officerData.name}</h1>
            <p><strong>Title: </strong>{officerData.title}</p>
            <p><strong>Employee ID: </strong>{officerData.employee_id}</p>
            <p><strong>Department: </strong>{officerData.department}</p>
            <p><strong>Zip Code: </strong>{officerData.postal}</p>
          </div>
        </div>
      </section>
    </>
  )
}