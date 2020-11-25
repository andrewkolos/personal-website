import React from "react"
import Layout from "../components/layout/layout"

const IndexPage = ({ data }: { data: any }) => (
  <Layout>
    <h2>My own projects</h2>
    <p>Stuff I have created.</p>
    <h3>Libraries</h3>
    <h3>Tools/Utilities</h3>
    <h3>Fun Stuff</h3>
    <h2>OSS I have contributed to</h2>
  </Layout>
)

export default IndexPage;
