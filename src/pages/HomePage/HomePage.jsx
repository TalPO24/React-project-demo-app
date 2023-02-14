import { Fragment, useState, useEffect } from "react";
import AnimalCardComponent from "../../components/AnimalCardRoute";
import "../HomePage/HomePage.scss";
// import "./PanelPage.scss";

const initialAnimalCardArray = [
  {
    title: "Business 1",
    img: "https://i.pinimg.com/736x/fb/03/11/fb03110ad4c04c7506faa5ec9d708160.jpg",
    desc: "Lorem ipsum dolor sit amet. Non magnam nostrum vel enim ullam nam voluptate.",
    id: 1,
  },
  {
    title: "Business 2",
    img: "http://unblast.com/wp-content/uploads/2020/03/Business-Card-Template.jpg",
    desc: "Lorem ipsum dolor sit amet. Non magnam nostrum vel enim ullam nam voluptate.",
    id: 2,
  },
  {
    title: "Business 3",
    img: "https://static.vecteezy.com/system/resources/previews/000/250/387/original/abstract-stylish-wave-business-card-template-design-vector.jpg",
    desc: "Lorem ipsum dolor sit amet. Non magnam nostrum vel enim ullam nam voluptate.",
    id: 3,
  },
  {
    title: "Business 4",
    img: "https://static.vecteezy.com/system/resources/previews/004/896/396/non_2x/modern-red-business-card-template-creative-and-simple-business-card-corporate-business-card-template-clean-professional-business-card-template-visiting-card-business-card-template-free-vector.jpg",
    desc: "Lorem ipsum dolor sit amet. Non magnam nostrum vel enim ullam nam voluptate.",
    id: 4,
  },
  {
    title: "Business 5",
    img: "http://unblast.com/wp-content/uploads/2020/03/Business-Card-Template.jpg",
    desc: "Lorem ipsum dolor sit amet. Non magnam nostrum vel enim ullam nam voluptate.",
    id: 5,
  },
  {
    title: "Business 6",
    img: "https://static.vecteezy.com/system/resources/previews/004/896/424/non_2x/modern-blue-business-card-design-template-creative-and-professional-business-card-business-card-design-template-corporate-business-card-design-free-vector.jpg",
    desc: "Lorem ipsum dolor sit amet. Non magnam nostrum vel enim ullam nam voluptate.",
    id: 6,
  },
  {
    title: "Business 7",
    img: "https://wowandprint.com/wp-content/uploads/2020/02/carte-visite.jpg",
    desc: "Lorem ipsum dolor sit amet. Non magnam nostrum vel enim ullam nam voluptate.",
    id: 7,
  },
  {
    title: "Business 8",
    img: "https://img.lovepik.com/desgin_photo/40045/0418_detail.jpg!wh650",
    desc: "Lorem ipsum dolor sit amet. Non magnam nostrum vel enim ullam nam voluptate.",
    id: 8,
  },
  {
    title: "Business 9",
    img: "https://img.freepik.com/free-psd/modern-clean-professional-business-card-template_501970-93.jpg?w=2000",
    desc: "Lorem ipsum dolor sit amet. Non magnam nostrum vel enim ullam nam voluptate.",
    id: 9,
  },
];
// filter for the cards the long way
const HomePage = () => {
  const [findInput, setFindInput] = useState("");
  const [animalCardArray, setAnimalCardArray] = useState(
    initialAnimalCardArray
  );

  useEffect(() => {
    let regex = RegExp(findInput, "i"); // create regex template that will try to find the value and ignore cases
    let animalCardArrayCopy = JSON.parse(
      JSON.stringify(initialAnimalCardArray)
    ); // clone deep we cant change the array directly so then we must do clone deep
    animalCardArrayCopy = animalCardArrayCopy.filter((item) =>
      regex.test(item.title)
    ); // filter the Array - regex tests the item.title and occording to this it filters the cards
    setAnimalCardArray(animalCardArrayCopy);
  }, [findInput]);

  const hadnleFindInput_long = (event) => {
    setFindInput(event.target.value); // update the state by the input value
  };

  // filter for the cards the short way
  const handleFindInput = (event) => {
    setFindInput(event.target.value);
    let regex = RegExp(event.target.value, "i");
    setAnimalCardArray((prevAnimalCardArray) =>
      initialAnimalCardArray.filter((item) => regex.test(item.title))
    );
  };
  return (
    <Fragment>
      <div className="container">
        <h1>Welcome </h1>
        <h4>Here you can find any business that you're looking for</h4>

        <div className="form-floating ">
          <h3>Search the right business for you</h3>
          <input
            type="text"
            className="form-control"
            id="floatingInput"
            placeholder="search"
            value={findInput}
            onChange={handleFindInput}
          />
          <label className="mt-5" htmlFor="floatingInput">
            search
          </label>
        </div>
        <div className="row row-cols-1 row-cols-md-3 g-4 ">
          {animalCardArray.map((item, idx) => (
            <AnimalCardComponent
              key={"BizCard" + item.id}
              title={item.title}
              img={item.img}
              desc={item.desc}
              id={item.id}
            />
          ))}
        </div>
      </div>
    </Fragment>
  );
};

export default HomePage;
