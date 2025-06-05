import React from "react";
import Introduction from "../../components/introduction/Introduction";
import About from "./Components/section_about/About";
import Services from "./Components/section_services/My_Services";
import Work from "./Components/section_work/Work";
import Contact from "./Components/section_contact/Contact";
import profile_img from "./assets/javier-01.jpg";
const Home = () => {
  return (
    <>
      <Introduction
        title={"Hi, I am"}
        title_strong={"Javier Villegas"}
        subtitle={"Full-stack developer"}
        image={profile_img}
        alt={"Picture of Javier VIllegas"}
      />
      <Services />
      <About />
      <Work />
      <Contact />
    </>
  );
};

export default Home;
