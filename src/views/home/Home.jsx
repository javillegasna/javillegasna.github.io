import React from "react";
import Introduction from "../../components/introduction/Introduction";
import About from "./Components/section_about/About";
import Services from "./Components/section_services/My_Services";
import Work from "./Components/section_work/Work";
import profile_img from "./assets/javier-01.jpg";
const Home = () => {
  return (
    <>
      <Introduction
        title={"Hi, I am"}
        title_strong={"Javier Villegas"}
        subtitle={"Full-stack developer"}
        img={profile_img}
      />
      <Services />
      <About />
      <Work />
    </>
  );
};

export default Home;
