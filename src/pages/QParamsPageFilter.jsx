import { useState, useEffect, Fragment } from "react";
import { useLocation, useHistory } from "react-router-dom";

const originalArr = [
  //we created an array
  "kenny",
  "john",
  "rick",
  "morty",
  "tom",
  "jerry",
  "garfield",
];
const QParamsPageFilter = () => {
  // main function
  const [filteredArr, setFilteredArr] = useState(originalArr); // set the states
  const [filterInput, setFilterInput] = useState(""); // set the states for the inputs
  const location = useLocation(); // uselocation for qparams
  const history = useHistory();
  useEffect(() => {
    const qParmas = new URLSearchParams(location.search);
    let newFilteredArr = undefined;
    if (qParmas.has("filter")) {
      let filter = qParmas.get("filter");
      let regex = new RegExp(filter, "i");
      newFilteredArr = JSON.parse(JSON.stringify(originalArr));
      newFilteredArr = newFilteredArr.filter((item) => regex.test(item));
      if (filter !== filterInput) {
        setFilterInput(filter);
      }
    }
    if (qParmas.has("sort")) {
      if (!newFilteredArr) {
        newFilteredArr = JSON.parse(JSON.stringify(filteredArr));
      }
      if (qParmas.get("sort") === "asc") {
        newFilteredArr.sort();
      }
      if (qParmas.get("sort") === "desc") {
        newFilteredArr.sort((a, b) => {
          if (a > b) return -1;
          if (a < b) return 1;
          return 0;
        });
      }
    }
    if (newFilteredArr) setFilteredArr(newFilteredArr);
  }, [location]);
  const handleInputKeyUp = (ev) => {
    if (ev.code === "Enter") {
      let qParmas = new URLSearchParams(location.search);
      qParmas.set("filter", filterInput);
      history.push(`/qparamsfilter?${qParmas.toString()}`);
    }
  };
  const handleInputChange = (ev) => {
    setFilterInput(ev.target.value);
  };
  const handleSortASCClick = () => {
    let qParmas = new URLSearchParams(location.search);
    qParmas.set("sort", "asc");
    history.push(`/qparamsfilter?${qParmas.toString()}`);
  };
  const handleSortDESCClick = () => {
    let qParmas = new URLSearchParams(location.search);
    qParmas.set("sort", "desc");
    history.push(`/qparamsfilter?${qParmas.toString()}`);
  };
  return (
    <Fragment>
      <div className="input-group mb-3">
        <span className="input-group-text" id="basic-addon1">
          @
        </span>
        <input
          type="text"
          className="form-control"
          placeholder="Username"
          aria-label="Username"
          aria-describedby="basic-addon1"
          onKeyUp={handleInputKeyUp} // when the user press enter it will filter the cards.
          onChange={handleInputChange}
          value={filterInput}
        />
      </div>
      <div>
        <button
          type="button"
          className="btn btn-info"
          onClick={handleSortASCClick}
        >
          ↑
        </button>
        <button
          type="button"
          className="btn btn-info"
          onClick={handleSortDESCClick}
        >
          ↓
        </button>
      </div>
      {filteredArr.map((item, idx) => {
        return <h1 key={idx}>{item}</h1>;
      })}
    </Fragment>
  );
};

export default QParamsPageFilter;
