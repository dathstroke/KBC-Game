import { useEffect, useState } from "react";

export default function SetTimer({setstop,questionnumber}) {
  const [timer, settimer] = useState(30);

  useEffect(() => {
    if(timer===0){
      return setstop(true);
    }
    const interval = setInterval(() => {
      settimer((prev) => prev - 1);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [setstop,timer]);
  useEffect(() => {
   settimer(1000);
  }, [questionnumber]);
  

  return timer;
}


