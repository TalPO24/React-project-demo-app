import { Fragment, useState } from "react";

const BizCardPage = () => {
  const [bizCard, setBizCard] = useState({
    email: "",
    password: "",
  });
  const handleBizCardInput = (event) => {
    let newBizCard = JSON.parse(JSON.stringify(bizCard)); //deep copy
    newBizCard[event.target.id] = event.target.value; // set new value dynamically
    setBizCard(newBizCard); // update the state
  };

  return (
    <Fragment>
      <div className="container">
        <h1>Business Card Page Register</h1>
        <div className="form-floating mb-3">
          <input
            type="email"
            className="form-control"
            id="email"
            placeholder="name@example.com"
            value={bizCard.email}
            onChange={handleBizCardInput}
          />
          <label htmlFor="email">Email address</label>
        </div>
        <div className="form-floating">
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="Password"
            value={bizCard.password}
            onChange={handleBizCardInput}
          />
          <label htmlFor="password">Password</label>
        </div>
      </div>
    </Fragment>
  );
};

export default BizCardPage;
