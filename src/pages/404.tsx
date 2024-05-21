import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import Contact from "../components/Contact";
import NotFound from "../components/NotFound";

const NotFoundPage = () => (
  <Layout>
    <NotFound />
    <Contact />
  </Layout>
);

export default NotFoundPage;
