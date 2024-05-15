import React from "react";
import Section from "./Section";
import { tertiaryBgColor } from "./styleConstants";
import Quote from "./Quote";
import styled from "styled-components";
import { graphql, useStaticQuery } from "gatsby";
import pythonImg from "../assets/images/skills/python.png";
import awsLogo from "../assets/images/skills/aws.svg";
import sqlLogo from "../assets/images/skills/sql.png";
import mlLogo from "../assets/images/skills/ml.png";
import kafkaLogo from "../assets/images/skills/kafka.svg";
import pytorchLogo from "../assets/images/skills/pytorch.png";
import tensorflowLogo from "../assets/images/skills/tensorflow.png";
import pandasLogo from "../assets/images/skills/pandas.png";
import chatGptLogo from "../assets/images/skills/chatgpt.png";
import aiLogo from "../assets/images/skills/ai.png";
import chatbotLogo from "../assets/images/skills/chatbot.png";
import dataScienceLogo from "../assets/images/skills/data-science.png";
import pipelineLogo from "../assets/images/skills/pipeline.png";
import datawarehouseLogo from "../assets/images/skills/data-warehouse.png";
import nlpImage from "../assets/images/skills/nlp.png";
import computerVisionImg from "../assets/images/skills/computer-vision.png";
import deepLearningImg from "../assets/images/skills/deep-learning.png";
import sklearnLogo from "../assets/images/skills/sklearn.png";

const SKILL_LIST = [
  { name: "Machine Learning", yearsOfExperience: 4, image: mlLogo, fallbackColor: "#452e7e" },
  { name: "Natural Language Processing (NLP)", yearsOfExperience: 2, image: nlpImage, fallbackColor: "#004876" },
  { name: "Artificial Intelligence (AI)", yearsOfExperience: 4, image: aiLogo, fallbackColor: "#fed800" },
  { name: "Deep Learning", yearsOfExperience: 3, image: deepLearningImg, fallbackColor: "#fed800" },
  { name: "Python", yearsOfExperience: 10, image: pythonImg, fallbackColor: "#215765" },
  { name: "Computer Vision", yearsOfExperience: 1, image: computerVisionImg, fallbackColor: "#2d5396" },
  { name: "Large Language Models (LLM)", yearsOfExperience: 1, image: chatGptLogo, fallbackColor: "#74aa9c" },
  { name: "Chatbots", yearsOfExperience: 1, image: chatbotLogo, fallbackColor: "#3cca9d" },
  { name: "Data Science", yearsOfExperience: 3, image: dataScienceLogo, fallbackColor: "#9dcb5b" },
  { name: "Data Warehousing", yearsOfExperience: 4, image: datawarehouseLogo, fallbackColor: "#7bd0a9" },
  { name: "Data Pipelines", yearsOfExperience: 3, image: pipelineLogo, fallbackColor: "#004876" },
  { name: "Tensorflow", yearsOfExperience: 1, image: tensorflowLogo, fallbackColor: "#000000" },
  { name: "Pytorch", yearsOfExperience: 2, image: pytorchLogo, fallbackColor: "#343541" },
  { name: "AWS", yearsOfExperience: 7, image: awsLogo, fallbackColor: "#232f3e" },
  { name: "SQL", yearsOfExperience: 13, image: sqlLogo, fallbackColor: "#ff6838" },
  { name: "Apache Kafka", yearsOfExperience: 2, image: kafkaLogo, fallbackColor: "#a1b8d3" },
  { name: "Pandas", yearsOfExperience: 5, image: pandasLogo, fallbackColor: "#150458" },
  { name: "Scikit learn", yearsOfExperience: 5, image: sklearnLogo, fallbackColor: "#9dcb5b" },
]

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

const Image = styled.img<{ fallbackColor: string; }>`
  margin: 0 auto;
  height: ${ImageSize};
  width: ${ImageSize};
  // Nice circle image for fallback
  clip-path: circle(calc(50% - 2px));
  background-color: ${(props) => props.fallbackColor};
`;

const ImagePlaceholder = styled.div`
  background: red;
  border-radius: 50%;
  display: inline-flex;
  height: ${ImageSize};
  margin: 0 auto;
  width: ${ImageSize};
`;

const Name = styled.span`
  text-align: center;
`

const SkillParagraph = styled.p`
  text-align: justify;
`;

const Skills = () => {

  const pageQuery = useStaticQuery(graphql`
    query {
      skills: markdownRemark(
        frontmatter: { title: { eq: "skill-paragraph" } }
      ) {
        html
      }
    }
  `);

  return (
  <Section backgroundColor={tertiaryBgColor} id="skills" title="Skills">
    <Quote
      author="Alan Turing"
      href="https://en.wikipedia.org/wiki/Alan_Turing"
    >
      Sometimes it is the people no one imagines anything of who do the things
      that no-one can imagine
    </Quote>

    <SkillParagraph dangerouslySetInnerHTML={{ __html: pageQuery.skills.html }} />

    <ImageList>
      {SKILL_LIST.map((skill) => (
        <ImageItem key={skill.name}>
          <Image src={skill.image} fallbackColor={skill.fallbackColor} />

          <Name>{skill.name}</Name>
          {/* <span>{skill.yearsOfExperience}</span> */}
        </ImageItem>
      ))}
    </ImageList>
    <h3>Other Skills</h3>
    <ul>
      {OTHER_SKILLS.map((skill) => (
          <li key={skill.name}>
            {skill.name}
            {/* <span>{skill.yearsOfExperience}</span> */}
          </li>
      ))}
    </ul>
  </Section>
  );
}

export default Skills;
