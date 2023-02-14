import { Fragment, useState } from "react";

const cardsArrInitial = [
  {
    name: "asdfg",
  },
  {
    name: "asdfg",
  },
  {
    name: "asdfgh",
  },
];

const PanelPage = () => {
  const [showArray, setShowArray] = useState(true);
  const handleBtnChange = () => {
    setShowArray(!showArray);
  };
  return (
    <Fragment>
      {showArray && <h1>your array</h1>}

      <button onClick={handleBtnChange}>toggle showArray</button>
    </Fragment>
  );
};

export default PanelPage;
