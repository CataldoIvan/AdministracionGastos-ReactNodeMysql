import axios from "axios";

export const helpRequest = () => {
  
  const getAllMovements = async (email,filterType) => {
    try {
      
      const res = await axios.get("http://localhost:3030", {
        params: { listFor: filterType, userEmail: email },
      });
      if(res.status==200 || res.statusText==="OK"){
        return res.data
      }
    } catch (error) {
      return {
        error: true,
        status: error.status || "00",
        statusText: error.statusText || "Ocurrio un error en la conexion con la Api",
      }
    }
  
  };

  const getBalance = (email) => {
    return axios
      .get("http://localhost:3030/balance", {
        params: { userEmail: email },
      })
      .then((res) => {
        console.log(res.data);
        return res.data;
      })
      .catch((error) => console.log(error));
  };
  const addNewMovement = (newMov) => {
    try {
      const res = await axios.post("http://localhost:3030", newMov);
      if (res.status == 200) {
        return res
      }       
    } catch (error) {
      return {
        error: true,
        status: error.status || "00",
        statusText: error.statusText || "Ocurrio un error en la conexion con la Api",
      }
      
    }
  };
  return { getBalance, getAllMovements,addNewMovement};
};
