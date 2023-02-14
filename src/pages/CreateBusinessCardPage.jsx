import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "./CreateBusinessCardPage.scss";

const CreateBusinessCard = (id) => {
  const [bizCardInput, setBizCardInput] = useState({
    title: "",
    subTitle: "",
    description: "",
    address: "",
    phone: "",
    url: "",
  });

  const handleCreateBizCardInput = (event) => {
    let newUserInput = JSON.parse(JSON.stringify(bizCardInput));
    newUserInput[event.target.id] = event.target.value;
    setBizCardInput(newUserInput);
  };
  const handleFormSubmit = (event) => {
    event.preventDefault();
  };

  const handleCreateCardClick = () => {
    return axios
      .post("/cards/", {
        title: bizCardInput.title,
        subTitle: bizCardInput.subTitle,
        description: bizCardInput.description,
        address: bizCardInput.address,
        phone: bizCardInput.phone,
        url: bizCardInput.url,
      })
      .then((res) => {
        // console.log("res", res);
        toast("you have successfuly created a new business card 😀", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      })
      .catch((err) => {
        console.log("err", err);
        toast.error("somthing went wrong 😓", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      });
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <h1>Create your business card</h1>
      <div className="mb-1">
        <label htmlFor="titleInput" className="form-label">
          Title
        </label>
        <input
          type="text"
          className="form-control"
          id="title"
          value={bizCardInput.title}
          onChange={handleCreateBizCardInput}
        />
      </div>
      <div className="mb-1">
        <label htmlFor="subTitleInput" className="form-label">
          Sub Title
        </label>
        <input
          type="text"
          className="form-control"
          id="subTitle"
          value={bizCardInput.subTitle}
          onChange={handleCreateBizCardInput}
        />
      </div>
      <div className="mb-1">
        <label htmlFor="descriptionInput" className="form-label">
          description
        </label>
        <input
          type="text"
          className="form-control"
          id="description"
          value={bizCardInput.description}
          onChange={handleCreateBizCardInput}
        />
      </div>
      <div className="mb-1">
        <label htmlFor="addressInput" className="form-label">
          address
        </label>
        <input
          type="text"
          className="form-control"
          id="address"
          value={bizCardInput.address}
          onChange={handleCreateBizCardInput}
        />
      </div>
      <div className="mb-1">
        <label htmlFor="phoneInput" className="form-label">
          phone
        </label>
        <input
          type="text"
          className="form-control"
          id="phone"
          value={bizCardInput.phone}
          onChange={handleCreateBizCardInput}
          pattern="^0\d([\d]{0,1})([-]{0,1})\d{7}$"
        />
      </div>
      <div className="mb-1">
        <label htmlFor="urlInput" className="form-label">
          Image URL
        </label>
        <input
          type="text"
          className="form-control"
          id="url"
          value={bizCardInput.url}
          onChange={handleCreateBizCardInput}
        />
      </div>
      <button
        type="submit"
        className="btn btn-success mt-3"
        onClick={handleCreateCardClick}
      >
        Create card
      </button>
    </form>
  );
};

export default CreateBusinessCard;
