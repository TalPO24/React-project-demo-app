import { useEffect, useState } from "react";
import axios from "axios";
import BizCardComponent from "../components/BizCardComponent";
import { useParams } from "react-router-dom";

const MoreInfoBizCardPage = () => {
  const [bizCard, setBizCard] = useState(null);
  let { id } = useParams();
  useEffect(() => {
    (async () => {
      try {
        let { data } = await axios.get(`/cards/card/${id}`);
        setBizCard(data);
      } catch (error) {}
    })();
  }, []);
  return (
    bizCard && (
      <BizCardComponent
        name={bizCard.title}
        img={bizCard.image.url}
        desc={bizCard.description}
        id={bizCard._id}
      ></BizCardComponent>
    )
  );
};

export default MoreInfoBizCardPage;
