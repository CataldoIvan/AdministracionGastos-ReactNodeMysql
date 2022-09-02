import React, { useEffect, useState } from "react";
const axios = require("axios");
const Home = () => {
  const [list, setList] = useState([]);

  useEffect(() => {
    const getAllMovement = async () => {
      /* const response=await fetch("http://localhost:3030")
        console.log(response);
         */
      const res = await axios.get("http://localhost:3030");
      console.log(res.data);
      setList(res.data);
    };
    getAllMovement();
  }, []);

  return (
    <div>
      {list?.map((item,index) => {
       if( index<3) return (
          <>
            <ul>
              <li>{item.concept}</li>
            </ul>
          </>)
        
      })}
    </div>
  );
};

export default Home;
