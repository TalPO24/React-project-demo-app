import axios from "axios";
import { Fragment, useState, useEffect } from "react";
import { toast } from "react-toastify";
import BizCardComponent from "../../components/BizCardComponent";
import "./PanelPage.scss";

let initialBizCardArray = [];
const PanelPage = () => {
  const [findInput, setFindInput] = useState("");
  const [bizCardArr, setBizCardArr] = useState(initialBizCardArray);

  useEffect(() => {
    (async () => {
      try {
        let { data } = await axios.get("/cards/my-cards");
        initialBizCardArray = data;
        setBizCardArr(initialBizCardArray);
      } catch (err) {
        toast.error("😭 Something went wrong", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    })();
  }, []);

  useEffect(() => {
    let regex = new RegExp(findInput, "i"); //create regex tamplate that will try to find the value and wil ignore case
    let bizCardArrCopy = JSON.parse(JSON.stringify(initialBizCardArray)); //cloneDeep
    // you cant change the array directly from the state, so we must do cloneDeep
    bizCardArrCopy = bizCardArrCopy.filter((item) => regex.test(item.title));
    setBizCardArr(bizCardArrCopy);
  }, [findInput]);

  const handleFindInputChange = (ev) => {
    setFindInput(ev.target.value);
  };

  const handleBizCardDelete = (id) => {
    initialBizCardArray = initialBizCardArray.filter((item) => item._id !== id);
    setBizCardArr(initialBizCardArray);
  };

  return (
    <Fragment>
      <div className="form-floating mt-3">
        <input
          type="text"
          className="form-control"
          id="floatingInput"
          placeholder="name@example.com"
          value={findInput}
          onChange={handleFindInputChange}
        />
        <label htmlFor="floatingInput">Search</label>
        <h1>My Cards</h1>
      </div>
      <div className="row row-cols-1 row-cols-md-2 g-4">
        {bizCardArr.map((item) => (
          <BizCardComponent
            key={"biz" + item._id}
            name={item.title}
            img={item.image.url}
            desc={item.description}
            id={item._id}
            onDelete={handleBizCardDelete}
          />
        ))}
      </div>
    </Fragment>
  );
};

export default PanelPage;
