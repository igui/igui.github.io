import { graphql, useStaticQuery } from "gatsby";
import React from "react";
import styled from "styled-components";
import Quote from "./Quote";
import Section from "./Section";
import aiLogo from "./assets/skills/ai.png";
import awsLogo from "./assets/skills/aws.svg";
import chatbotLogo from "./assets/skills/chatbot.png";
import chatGptLogo from "./assets/skills/chatgpt.png";
import computerVisionImg from "./assets/skills/computer-vision.png";
import dataScienceLogo from "./assets/skills/data-science.png";
import datawarehouseLogo from "./assets/skills/data-warehouse.png";
import deepLearningImg from "./assets/skills/deep-learning.png";
import kafkaLogo from "./assets/skills/kafka.svg";
import mlLogo from "./assets/skills/ml.png";
import nlpImage from "./assets/skills/nlp.png";
import pandasLogo from "./assets/skills/pandas.png";
import pipelineLogo from "./assets/skills/pipeline.png";
import pythonImg from "./assets/skills/python.png";
import pytorchLogo from "./assets/skills/pytorch.png";
import sklearnLogo from "./assets/skills/sklearn.png";
import sqlLogo from "./assets/skills/sql.png";
import tensorflowLogo from "./assets/skills/tensorflow.png";
import { tertiaryBgColor } from "./styleConstants";

const SKILL_LIST = [
  {
    name: "Machine Learning",
    yearsOfExperience: 4,
    image: mlLogo,
    bgcolor: "#452e7e",
  },
  {
    name: "Natural Language Processing (NLP)",
    yearsOfExperience: 2,
    image: nlpImage,
    bgcolor: "#004876",
  },
  {
    name: "Artificial Intelligence (AI)",
    yearsOfExperience: 4,
    image: aiLogo,
    bgcolor: "#fed800",
  },
  {
    name: "Deep Learning",
    yearsOfExperience: 3,
    image: deepLearningImg,
    bgcolor: "#fed800",
  },
  {
    name: "Python",
    yearsOfExperience: 10,
    image: pythonImg,
    bgcolor: "#215765",
  },
  {
    name: "Computer Vision",
    yearsOfExperience: 1,
    image: computerVisionImg,
    bgcolor: "#2d5396",
  },
  {
    name: "Large Language Models (LLM)",
    yearsOfExperience: 1,
    image: chatGptLogo,
    bgcolor: "#74aa9c",
  },
  {
    name: "Chatbots",
    yearsOfExperience: 1,
    image: chatbotLogo,
    bgcolor: "#3cca9d",
  },
  {
    name: "Data Science",
    yearsOfExperience: 3,
    image: dataScienceLogo,
    bgcolor: "#9dcb5b",
  },
  {
    name: "Data Warehousing",
    yearsOfExperience: 4,
    image: datawarehouseLogo,
    bgcolor: "#7bd0a9",
  },
  {
    name: "Data Pipelines",
    yearsOfExperience: 3,
    image: pipelineLogo,
    bgcolor: "#004876",
  },
  {
    name: "Tensorflow",
    yearsOfExperience: 1,
    image: tensorflowLogo,
    bgcolor: "#000000",
  },
  {
    name: "Pytorch",
    yearsOfExperience: 2,
    image: pytorchLogo,
    bgcolor: "#343541",
  },
  {
    name: "AWS",
    yearsOfExperience: 7,
    image: awsLogo,
    bgcolor: "#232f3e",
  },
  {
    name: "SQL",
    yearsOfExperience: 13,
    image: sqlLogo,
    bgcolor: "#ff6838",
  },
  {
    name: "Apache Kafka",
    yearsOfExperience: 2,
    image: kafkaLogo,
    bgcolor: "#a1b8d3",
  },
  {
    name: "Pandas",
    yearsOfExperience: 5,
    image: pandasLogo,
    bgcolor: "#150458",
  },
  {
    name: "Scikit learn",
    yearsOfExperience: 5,
    image: sklearnLogo,
    bgcolor: "#9dcb5b",
  },
];

const OTHER_SKILLS = [
  { name: "E-Commerce", yearsOfExperience: 5 },
  { name: "JSON", yearsOfExperience: 10 },
  { name: "Github", yearsOfExperience: 10 },
  { name: "Web Development", yearsOfExperience: 13 },
  { name: "Distributed Systems", yearsOfExperience: 5 },
  { name: "Node.js", yearsOfExperience: 8 },
  { name: "Git", yearsOfExperience: 10 },
  { name: "REST", yearsOfExperience: 10 },
  { name: "AWS Lambda", yearsOfExperience: 1 },
  { name: "Typescript", yearsOfExperience: 3 },
  { name: "Redux", yearsOfExperience: 1 },
  { name: "Javascript", yearsOfExperience: 10 },
  { name: "Linux", yearsOfExperience: 14 },
  { name: "React", yearsOfExperience: 3 },
  { name: "React native", yearsOfExperience: 3 },
  { name: "HTML", yearsOfExperience: 10 },
  { name: "Docker", yearsOfExperience: 3 },
];

const ImageList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  justify-content: space-evenly;
  align-items: center;
  padding: 0;
`;

const ImageItem = styled.li`
  display: flex;
  flex-basis: 150px;
  flex-direction: column;
  gap: 10px;
  justify-content: space-around;
  margin-bottom: 20px;
`;

const ImageSize = "120px";

const Image = styled.img<{ bgcolor: string }>`
  margin: 0 auto;
  height: ${ImageSize};
  width: ${ImageSize};
  // Nice circle image for fallback
  clip-path: circle(calc(50% - 2px));
  background-color: ${(props) => props.bgcolor};
`;

const Name = styled.span`
  text-align: center;
`;

const SkillParagraph = styled.p`
  text-align: justify;
`;

const Skills = () => {
  const pageQuery = useStaticQuery(graphql`
    query {
      skills: markdownRemark(frontmatter: { path: { eq: "/skills-heading" } }) {
        html
      }
    }
  `);

  return (
    <Section bgcolor={tertiaryBgColor} id="skills" title="Skills">
      <Quote
        author="Dejan Stojanović"
        href="https://www.dejanstojanovic.info/bio.html"
        content="The most complicated one is to be simple."
      />

      <SkillParagraph
        dangerouslySetInnerHTML={{ __html: pageQuery.skills.html }}
      />

      <ImageList>
        {SKILL_LIST.map((skill) => (
          <ImageItem key={skill.name}>
            <Image src={skill.image} bgcolor={skill.bgcolor} />

            <Name>{skill.name}</Name>
            {/* <span>{skill.yearsOfExperience}</span> */}
          </ImageItem>
        ))}
      </ImageList>
    </Section>
  );
};

export default Skills;
