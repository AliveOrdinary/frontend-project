import React from "react";
import Cards from "../common/Cards";
import IconOne from "../../assets/IconOne.png";
import IconTwo from "../../assets/IconTwo.png";
import IconThree from "../../assets/IconThree.png";
import IconFour from "../../assets/IconFour.png";
import IconFive from "../../assets/IconFive.png";
import IconSix from "../../assets/IconSix.png";
import IconSeven from "../../assets/IconSeven.png";
import IconEight from "../../assets/IconEight.png";

const data = [
  {
    title: "Marketing & Communication",
    subtitle: "237 Jobs Available",
    icon: IconOne,
  },
  {
    title: "Design & Development",
    subtitle: "237 Jobs Available",
    icon: IconTwo,
  },
  {
    title: "Human Research & Development",
    subtitle: "237 Jobs Available",
    icon: IconThree,
  },
  {
    title: "Finance Management",
    subtitle: "237 Jobs Available",
    icon: IconFour,
  },
  {
    title: "Goverment Jobs",
    subtitle: "237 Jobs Available",
    icon: IconFive,
  },
  {
    title: "Business & Consulting",
    subtitle: "237 Jobs Available",
    icon: IconSix,
  },
  {
    title: "Customer Support Care",
    subtitle: "237 Jobs Available",
    icon: IconSeven,
  },
  {
    title: "Project Management",
    subtitle: "237 Jobs Available",
    icon: IconEight,
  },
];

const OnePlatform = () => {
  return (
    <div className="one-platform-container">
      <h1>
        One Platform Many <span>Solutions</span>
      </h1>
      <div className="all-cards-container">
        {data.map((item, index) => {
          return (
            <Cards
              title={item.title}
              subtitle={item.subtitle}
              icon={item.icon}
              key={index}
            />
          );
        })}
      </div>
    </div>
  );
};

export default OnePlatform;
