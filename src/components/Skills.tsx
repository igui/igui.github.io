"use client";

import styled from "styled-components";
import Quote from "./Quote";
import Section from "./Section";
import { tertiaryBgColor } from "./styleConstants";

const SKILL_LIST = [
  { name: "Machine Learning", image: "/assets/skills/ml.png", bgcolor: "#452e7e" },
  { name: "Natural Language Processing (NLP)", image: "/assets/skills/nlp.png", bgcolor: "#004876" },
  { name: "Artificial Intelligence (AI)", image: "/assets/skills/ai.png", bgcolor: "#fed800" },
  { name: "Deep Learning", image: "/assets/skills/deep-learning.png", bgcolor: "#fed800" },
  { name: "Python", image: "/assets/skills/python.png", bgcolor: "#215765" },
  { name: "Computer Vision", image: "/assets/skills/computer-vision.png", bgcolor: "#2d5396" },
  { name: "Large Language Models (LLM)", image: "/assets/skills/chatgpt.png", bgcolor: "#74aa9c" },
  { name: "Chatbots", image: "/assets/skills/chatbot.png", bgcolor: "#3cca9d" },
  { name: "Data Science", image: "/assets/skills/data-science.png", bgcolor: "#9dcb5b" },
  { name: "Data Warehousing", image: "/assets/skills/data-warehouse.png", bgcolor: "#7bd0a9" },
  { name: "Data Pipelines", image: "/assets/skills/pipeline.png", bgcolor: "#004876" },
  { name: "Tensorflow", image: "/assets/skills/tensorflow.png", bgcolor: "#000000" },
  { name: "Pytorch", image: "/assets/skills/pytorch.png", bgcolor: "#343541" },
  { name: "AWS", image: "/assets/skills/aws.svg", bgcolor: "#232f3e" },
  { name: "SQL", image: "/assets/skills/sql.png", bgcolor: "#ff6838" },
  { name: "Apache Kafka", image: "/assets/skills/kafka.svg", bgcolor: "#a1b8d3" },
  { name: "Pandas", image: "/assets/skills/pandas.png", bgcolor: "#150458" },
  { name: "Scikit learn", image: "/assets/skills/sklearn.png", bgcolor: "#9dcb5b" },
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

const Image = styled.img<{ $bgcolor: string }>`
  margin: 0 auto;
  height: ${ImageSize};
  width: ${ImageSize};
  clip-path: circle(calc(50% - 2px));
  background-color: ${(props) => props.$bgcolor};
`;

const Name = styled.span`
  text-align: center;
`;

const SkillParagraph = styled.p`
  text-align: justify;
`;

interface SkillsProps {
  headingHtml: string;
}

const Skills = ({ headingHtml }: SkillsProps) => (
  <Section bgcolor={tertiaryBgColor} id="skills" title="Skills">
    <Quote
      author="Dejan Stojanović"
      href="https://www.dejanstojanovic.info/bio.html"
      content="The most complicated one is to be simple."
    />

    <SkillParagraph dangerouslySetInnerHTML={{ __html: headingHtml }} />

    <ImageList>
      {SKILL_LIST.map((skill) => (
        <ImageItem key={skill.name}>
          <Image src={skill.image} $bgcolor={skill.bgcolor} alt={skill.name} />
          <Name>{skill.name}</Name>
        </ImageItem>
      ))}
    </ImageList>
  </Section>
);

export default Skills;
