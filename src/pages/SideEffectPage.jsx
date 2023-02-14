import { useState, useEffect } from "react";

const SideEffectPage = () => {
  const [time, setTime] = useState(Date.now());
  let intervalId;
  useEffect(() => {
    setInterval(() => {
      setTime(Date.now());
      // console.log("time", time);
    }, 1000);
  }, []);
  /*
   
  if depArr is empty use Effect will wait untill this component will load, 
  then he will excute the code one time 

   */
  return time;
};

export default SideEffectPage;
