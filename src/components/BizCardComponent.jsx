import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { Link } from "react-router-dom";

// const BizCardComponent = (props) // one parameter
const BizCardComponent = ({ name, img, desc, id, onDelete }) => {
  const handleDeleteBtnClick = () => {
    onDelete(id);
  };
  return (
    <div className="col">
      <div className="card h-100">
        <img src={img} className="card-img-top" alt={name} />
        <div className="card-body">
          <h5 className="card-title">{name}</h5>
          <p className="card-text">{desc}</p>
        </div>
        <div className="card-body">
          <button
            type="button"
            className="btn btn-danger"
            onClick={handleDeleteBtnClick}
          >
            <FontAwesomeIcon icon={faTrashCan} />
            Delete
          </button>
          <Link to={`/editbizcard/${id}`} className="btn btn-warning ms-2">
            <FontAwesomeIcon icon={faPenToSquare} />
            edit
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BizCardComponent;
