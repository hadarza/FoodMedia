import React,{useState,useEffect, lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route , Navigate } from "react-router-dom";
import {Info} from './components/carouselLoading/JSON/Info';
import './scss/app.scss'
import { axiosInstance } from "../config";
import {QueryClientProvider,QueryClient} from 'react-query'
import {ReactQueryDevtools} from 'react-query/devtools'
import SkeletonCategory from "./components/Home/HeaderCategories/SkeletonCategory/SkeletonCategory";
const App = () => {
  const LoadingPage = lazy(() =>
  import("./components/LoadingPage/LoadingPage")
  );
  
  const Home = lazy(() =>
  import("./components/Home/Home")
  );
  
const CarouselLoading = lazy(() =>
  import("./components/carouselLoading/CarouselLoading")
);

const Register = lazy(() =>
  import("./components/Register/Register")
);
const Login = lazy(() =>
  import("./components/Login/Login")
);

const Menu = lazy(()=>
  import('./components/Menu/Menu')
);
  const [isAuthenticated,setisAuthenticated] = useState(false)
  const queryClient = new QueryClient()

  const checkAuthenticated = async () => {
      const res = await axiosInstance.post("/api/user/verify",null,{
        headers: { jwt_token: localStorage.token }})
        .then(res =>{
        const parseRes = res.data;
        parseRes === true ? setisAuthenticated(true) : setisAuthenticated(false);
      }).catch((err) =>{
        console.error(err.message);
      })
  };
 
  useEffect(() => {
    checkAuthenticated();
  }, []);

  const setAuth = (boolean)=>{
    setisAuthenticated(boolean)
  }
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Suspense fallback={<div>Load</div>}>
        <Routes>
          <Route path="/" element={<LoadingPage/>} />
          <Route path="/adver" element={<CarouselLoading obj={Info}/>}/>
          
          <Route exact path="/store" element={
          isAuthenticated ? 
            <Home/>
          :(<Navigate to="/Login" replace/>)} />

          <Route path="/Register" element={
            !isAuthenticated ? 
              <Register setAuth={setAuth}/> :(
                <Navigate to="/store" replace/>
              )}/>
          <Route path="/Login" element={ 
            !isAuthenticated ? 
              <Login setAuth={setAuth}/> :(
                <Navigate to="/store" replace/>
              )}/>
          <Route path="/store/menu/:restaruant" element={
              <Menu/>
          } />
          {/* <Route path="*" element={<NotFound />} /> */}

          </Routes>
        </Suspense>
      </Router>
      <ReactQueryDevtools initialIsOpen={false} position='bottom-right'/> 
     </QueryClientProvider> 
  );
};

export default App;
