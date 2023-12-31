import axios from 'axios';
const url="http://localhost:5000/employees";


export const getData = async () => {
    try {
      const { data } = await axios.get(url);
      return data;
    } catch (error) {
      console.log('error', error.message);
      throw error; // Rethrow the error to propagate it to the caller
    }
  };
  
export const postData = async (postdata) => {
    try {
      const { data } = await axios.post(url+"/create",postdata);
      return data;
    } catch (error) {
      console.log('error', error.message);
      throw error; // Rethrow the error to propagate it to the caller
    }
  };
  
  
  
export const updateData = async (id) => {
    try {
      const { data } = await axios.post(url+"/update", id );
      return data;
    } catch (error) {
      console.log('error', error.message);
      throw error; // Rethrow the error to propagate it to the caller
    }
  };
export const deleteData = async (id) => {
  let obj={id:id}
    try {
      const { data } = await axios.post(url+"/delete",obj);
      return data;
    } catch (error) {
      console.log('error', error.message);
      throw error; // Rethrow the error to propagate it to the caller
    }
  };
  