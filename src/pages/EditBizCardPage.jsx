import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "./EditBizCardPage.scss";

const EditBizCardPage = () => {
  const [bizCardData, setBizCardData] = useState({
    title: "",
    subTitle: "",
    description: "",
    address: "",
    phone: "",
    url: "",
  });
  let { id } = useParams();
  useEffect(() => {
    (async () => {
      try {
        let { data } = await axios.get(`/cards/card/${id}`);
        setBizCardData({
          title: data.title,
          subTitle: data.subTitle,
          description: data.description,
          address: data.address,
          phone: data.phone,
          url: data.image.url,
        });
      } catch (error) {
        console.log("axios error", error);
        toast.error("😓 something went wrong", {
          // toastify, its shows if the user is not okay to login
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }
    })();
  }, []);

  const handleEditBizCardInputChange = (event) => {
    let bizCardInput = JSON.parse(JSON.stringify(bizCardData)); // clone deep for the original array
    if (bizCardInput.hasOwnProperty(event.target.id)) {
      bizCardInput[event.target.id] = event.target.value;
      setBizCardData(bizCardInput);
    }
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    // we need to add joi validation
    try {
      let { data } = await axios.put(`/cards/${id}`, {
        ...bizCardData,
        alt: bizCardData.title,
      });
      toast("✔ you changed the card ", {
        // toastify, its shows a massage that the user has succesfully edited the card
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <div className="form">
        <label htmlFor="titleInput" className="form-label">
          Title
        </label>
        <input
          type="text"
          className="form-control"
          id="title"
          value={bizCardData.title}
          onChange={handleEditBizCardInputChange}
        />
      </div>
      <div className="form">
        <label htmlFor="urlInput" className="form-label">
          Image URL
        </label>
        <input
          type="text"
          className="form-control"
          id="url"
          value={bizCardData.url}
          onChange={handleEditBizCardInputChange}
        />
      </div>
      <div className="form">
        <label htmlFor="subTitleInput" className="form-label">
          Sub Title
        </label>
        <input
          type="text"
          className="form-control"
          id="subTitle"
          value={bizCardData.subTitle}
          onChange={handleEditBizCardInputChange}
        />
      </div>
      <div className="form">
        <label htmlFor="descriptionInput" className="form-label">
          description
        </label>
        <input
          type="text"
          className="form-control"
          id="description"
          value={bizCardData.description}
          onChange={handleEditBizCardInputChange}
        />
      </div>
      <div className="form">
        <label htmlFor="addressInput" className="form-label">
          address
        </label>
        <input
          type="text"
          className="form-control"
          id="address"
          value={bizCardData.address}
          onChange={handleEditBizCardInputChange}
        />
      </div>
      <div className="form">
        <label htmlFor="phoneInput" className="form-label">
          phone
        </label>
        <input
          type="text"
          className="form-control"
          id="phone"
          value={bizCardData.phone}
          onChange={handleEditBizCardInputChange}
          pattern="^0\d([\d]{0,1})([-]{0,1})\d{7}$"
        />
      </div>
      <button type="submit" className="btn btn-light mt-3">
        Submit
      </button>
    </form>
  );
};

export default EditBizCardPage;
