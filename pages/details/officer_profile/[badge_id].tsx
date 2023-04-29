import Head from "next/head";
import Footer from "@components/Footer";
import PlaceholderTable from "@components/PlaceholderTable";
import Table from "@components/Table";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router"
import prisma from "lib/prisma";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const bid = +context.params.badge_id
  console.log("bid is ", bid)
  const feed = await prisma.officermisconduct.findMany({
    where: {
      IA_No: {
        equals: bid.toString()
      }
    }
  });
  console.log("feed is", feed)
  return {
    props: {
      users: JSON.parse(JSON.stringify(feed))
    },
  };
};

function Officer_Profile({users}) {
  const router = useRouter()
  const current_url = router.query.badge_id

  // const theme = useTheme();
  // const tableStyle = {
  //   backgroundColor: "red"
  // };

  return (
    <>
      <Head>
        <title>Boston Police Index</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div id="container" style={{ display: "flex" }}>
        <div className="leftcol" style={{ width: "50%" }}>
          <h1 className="heading 1"> Officer Profile</h1>
          <h2 className="subheading 1"> Pay Information</h2>
          <PlaceholderTable json={users}/>
          <h2 className="subheading 2"> Incidents &amp; FIOs</h2>
          <PlaceholderTable json={users}/>
          <h2 className="subheading 3"> Settlements &amp; IA</h2>
          <PlaceholderTable json={users}/>
          <h2 className="subheading 4"> Dataset 1</h2>
          <PlaceholderTable json={users}/>
        </div> 
        <div className="rightcol" style={{ width: "50%" }}>
            <Table />
            <h2 className="subheading 5"> Dataset 2</h2>
            <PlaceholderTable json={users}/>
            <h2 className="subheading 6"> Dataset 3</h2>
            <PlaceholderTable json={users}/>
            <h2 className="subheading 7"> Analysis</h2>
            <p className="analysis paragraph"> Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Proin quis massa eu urna tempor dictum. Aliquam aliquam tortor nisi, ac vestibulum metus pretium convallis.
          Pellentesque consectetur turpis justo, sed rhoncus nisl faucibus sit amet. Vivamus ultricies tempus arcu,
          id venenatis libero ornare eget. Nam rutrum a quam eu tempor. Fusce sollicitudin, quam ut laoreet interdum,
          odio arcu luctus ex, nec euismod lacus elit non odio. Nullam eget magna erat. Nullam pretium
          quam massa, fringilla fringilla orci malesuada et. Donec at orci non urna volutpat dictum ut sed odio. </p>
            <h2 className="subheading 8"> Explanation</h2>
            <p className="explanation paragraph"> Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Proin quis massa eu urna tempor dictum. Aliquam aliquam tortor nisi, ac vestibulum metus pretium convallis.
          Pellentesque consectetur turpis justo, sed rhoncus nisl faucibus sit amet. Vivamus ultricies tempus arcu,
          id venenatis libero ornare eget. Nam rutrum a quam eu tempor. Fusce sollicitudin, quam ut laoreet interdum,
          odio arcu luctus ex, nec euismod lacus elit non odio. Nullam eget magna erat. Nullam pretium
          quam massa, fringilla fringilla orci malesuada et. Donec at orci non urna volutpat dictum ut sed odio. </p>
      </div>
        </div>
      <Footer />
    </>
  );
}

export default Officer_Profile