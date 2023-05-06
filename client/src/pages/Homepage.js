import React,{useEffect} from 'react';
import axios from "axios";
import Layout from "../components/Layout";
const Home = () => {
  const getUserData = async ()=>{
    try {
      const res= await axios.post('/api/v1/user/getUserData',{},{
        headers:{
          Authorization : "Bearer " + localStorage.getItem("token"),
        }
      }) 
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=> {
    getUserData()
  },[])
  return (
    <Layout>
        <h1>Home Page</h1>
    </Layout>
  )
}

export default Home