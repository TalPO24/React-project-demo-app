import { Fragment } from "react";
import { useState } from "react";
import "../AboutUsPage/AboutUsPage.scss";

const initialCardArr = [
  {
    title: "talporis",
    img: "https://cdn.pixabay.com/photo/2017/07/18/23/23/user-2517433__340.png",
    desc: "i'm a fullstack developer",
  },
];

const AboutUsPage = () => {
  const [aboutuUsCard, setAboutUsCard] = useState(initialCardArr);
  return (
    <Fragment>
      {aboutuUsCard.map((item, idx) => (
        // <div className="card">
        //   <img src={item.img} className="card-img-top" alt={item.title} />

        //   <div className="card-body">
        //     <h1>{item.title}</h1>
        //     <p className="card-text">{item.desc}</p>
        //   </div>
        // </div>

        <div className="container" key={"div" + idx}>
          <div className="title">About Me</div>
          <img src={item.img} className="img-fluid" alt={item.title}></img>

          <p className="text">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </div>
      ))}
    </Fragment>
  );
};

export default AboutUsPage;
