import PlaceholderTable from "@components/PlaceholderTable"
import data from "../../components/NAME.json";
import { GetStaticProps } from "next";
import prisma from "lib/prisma";

export const getStaticProps: GetStaticProps = async () => {
    const feed = await prisma.post.findMany();
    console.log(feed)
    return {
      props: {
        users: JSON.parse(JSON.stringify(feed))
      }
    };
};


export default function Test({users, db}) {
    return <PlaceholderTable json={users}/>
}