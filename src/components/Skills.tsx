import React from "react";
import Section from "./Section";
import { tertiaryBgColor } from "./styleConstants";
import Quote from "./Quote";
import styled from "styled-components";
import { graphql, useStaticQuery } from "gatsby";
import pythonImg from "./assets/skills/python.png";
import awsLogo from "./assets/skills/aws.svg";
import sqlLogo from "./assets/skills/sql.png";
import mlLogo from "./assets/skills/ml.png";
import kafkaLogo from "./assets/skills/kafka.svg";
import pytorchLogo from "./assets/skills/pytorch.png";
import tensorflowLogo from "./assets/skills/tensorflow.png";
import pandasLogo from "./assets/skills/pandas.png";
import chatGptLogo from "./assets/skills/chatgpt.png";
import aiLogo from "./assets/skills/ai.png";
import chatbotLogo from "./assets/skills/chatbot.png";
import dataScienceLogo from "./assets/skills/data-science.png";
import pipelineLogo from "./assets/skills/pipeline.png";
import datawarehouseLogo from "./assets/skills/data-warehouse.png";
import nlpImage from "./assets/skills/nlp.png";
import computerVisionImg from "./assets/skills/computer-vision.png";
import deepLearningImg from "./assets/skills/deep-learning.png";
import sklearnLogo from "./assets/skills/sklearn.png";

const SKILL_LIST = [
  { name: "Machine Learning", yearsOfExperience: 4, image: mlLogo },
  { name: "Natural Language Processing (NLP)", yearsOfExperience: 2, image: nlpImage },
  { name: "Artificial Intelligence (AI)", yearsOfExperience: 4, image: aiLogo },
  { name: "Deep Learning", yearsOfExperience: 3, image: deepLearningImg },
  { name: "Python", yearsOfExperience: 10, image: pythonImg },
  { name: "Computer Vision", yearsOfExperience: 1, image: computerVisionImg },
  { name: "Large Language Models (LLM)", yearsOfExperience: 1, image: chatGptLogo },
  { name: "Chatbots", yearsOfExperience: 1, image: chatbotLogo },
  { name: "Data Science", yearsOfExperience: 3, image: dataScienceLogo },
  { name: "Data Warehousing", yearsOfExperience: 4, image: datawarehouseLogo },
  { name: "Data Pipelines", yearsOfExperience: 3, image: pipelineLogo },
  { name: "Tensorflow", yearsOfExperience: 1, image: tensorflowLogo },
  { name: "Pytorch", yearsOfExperience: 2, image: pytorchLogo },
  { name: "AWS", yearsOfExperience: 7, image: awsLogo },
  { name: "SQL", yearsOfExperience: 13, image: sqlLogo },
  { name: "Apache Kafka", yearsOfExperience: 2, image: kafkaLogo },
  { name: "Pandas", yearsOfExperience: 5, image: pandasLogo },
  { name: "Scikit learn", yearsOfExperience: 5, image: sklearnLogo },
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

const Image = styled.img`
  margin: 0 auto;
  max-height: ${ImageSize};
  max-width: ${ImageSize};
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
          { skill.image && <Image src={skill.image} /> }
          { !skill.image && <ImagePlaceholder /> }

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
