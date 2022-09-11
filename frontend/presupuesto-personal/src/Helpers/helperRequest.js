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
      if(res.status==200){
        return res.data;
      }else{
        return {
          error: true,
          status: res.status || "00",
          statusText: res.response.data.error || "Ocurrio un error en la conexion con la Api",
        }
      }
        
      })
      .catch((error) => (error));
  };
  const addNewMovement = async(newMov) => {
    try {
      const res = await axios.post("http://localhost:3030", newMov);
      if (res.status == 200) {
        return res
      }       
    } catch (error) {
      return {
        error: true,
        status: error.status || "00",
        statusText: error.response.data.error || "Ocurrio un error en la conexion con la Api",
      }
      
    }
  };
  const editMovement= async(id,movement)=>{
    try {
      const res = await axios.put(`http://localhost:3030/edit/${id}`, movement);
      console.log(res);
      if(res.status==200){
        return res
     }      
    } catch (error) {
      console.log(error);

      return {
        error: true,
        status: error.status || "00",
        statusText: error.response.data.error || "Ocurrio un error en la conexion con la Api",
      }
    }
  }
  const deleteMovement=async(id)=>{
    try {
      const res = await axios.delete(`http://localhost:3030/${id}`);
      
      if(res.status==200){
        return res
     }      
    } catch (error) {
      return {
        error: true,
        status: error.status || "00",
        statusText: error.statusText || "Ocurrio un error en la conexion con la Api",
      }
    }
  }
  return { getBalance, getAllMovements,addNewMovement,editMovement,deleteMovement};
};
