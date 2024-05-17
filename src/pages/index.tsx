import React from "react";
import Layout from "../components/Layout";
import Header from "../components/Header";
import About from "../components/About";
import Contact from "../components/Contact";
import Skills from "../components/Skills";
import Projects from "../components/Projects";
import Experiences from "../components/Experiences";
import Publications from "../components/Publications";

const IndexPage = () => (
  <Layout>
    <Header />
    <About />
    <Skills />
    <Projects />
    <Experiences />
    <Publications />
    <Contact />
  </Layout>
);

export default IndexPage;
