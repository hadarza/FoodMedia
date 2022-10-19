import React,{useState,useEffect} from "react";
import { BrowserRouter, Routes, Route , Navigate } from "react-router-dom";
import LoadingPage from "./components/LoadingPage/LoadingPage";
import Home from './components/Home/Home';
import CarouselLoading from './components/carouselLoading/CarouselLoading';
import {Info} from './components/carouselLoading/JSON/Info';
import './scss/app.scss'
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import { axiosInstance } from "../config";
const App = () => {

  const [isAuthenticated,setisAuthenticated] = useState(false)


  const checkAuthenticated = async () => {
      const res = await axiosInstance.post("/api/user/verify",null,{
        headers: { jwt_token: localStorage.token }})
        .then(res =>{
          console.log(res)
      const parseRes = res.data;
      console.log(parseRes)
      parseRes === true ? setisAuthenticated(true) : setisAuthenticated(false);
    }).catch((err) =>{
      console.error(err.message);
    })
  };
 
  useEffect(() => {
    checkAuthenticated();
    console.log("check")
  }, []);

  const setAuth = (boolean)=>{
    setisAuthenticated(boolean)
  }
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoadingPage/>} />
        <Route path="/adver" element={<CarouselLoading obj={Info}/>}/>
        <Route path="/store"  element={
        isAuthenticated ? 
        <Home setAuth={setAuth}/> :
        (
          <Navigate to="/Login" replace/>
        )} />
        <Route path="/Register" element={
          !isAuthenticated ? 
            <Register setAuth={setAuth}/> :(
              <Navigate to="/store" replace/>
            )} />
        <Route path="/Login" element={ 
          !isAuthenticated ? 
            <Login setAuth={setAuth}/> :(
              <Navigate to="/store" replace/>
            )} />

      </Routes>
    </BrowserRouter>
  );
};

export default App;
