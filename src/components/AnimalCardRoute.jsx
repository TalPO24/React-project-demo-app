const AnimalCardComponent = ({ title, img, desc, id }) => {
  return (
    <div className="col">
      <div className="card h-100">
        <img src={img} className="card-img-top" alt={title} />
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{desc}</p>
        </div>
      </div>
    </div>
  );
};

export default AnimalCardComponent;
