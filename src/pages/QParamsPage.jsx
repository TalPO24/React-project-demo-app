import { useLocation } from "react-router-dom/cjs/react-router-dom";
const QParamsPage = () => {
  const location = useLocation(); // not necessary for our project for now.
  const qparams = new URLSearchParams(location.search);
  console.log({ location });
  return (
    <h1>qparams {qparams.has("a") ? qparams.get("a") : "a not exist"} </h1> // in qparams if we added info to "a" it will show the info, if "a" doesn't exist he will show that "a doesn't exist".
  );
};

export default QParamsPage;
