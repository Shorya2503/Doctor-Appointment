import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/Homepage";
import Login from "./pages/Loginpage";
import Register from "./pages/Registerpage";
import React from "react";
import { useSelector } from "react-redux";
import Spinner from "./components/spinner";
import ProtectedRoutes from "./components/protectedRoutes";
import PublicRoutes from "./components/publicRoutes";
import ApplyDoctor from "./pages/ApplyDoctor";

function App() {
  const {loading} = useSelector(state => state.alerts)
  return (
    <>
      <BrowserRouter>
      {loading ? (

      <Spinner/>) : 
      (
      <Routes>
          <Route path="/" 
          element={
            <ProtectedRoutes>
              <HomePage />
            </ProtectedRoutes>
          } 
        /> 
        <Route path="/apply-doctor" 
          element={
            <ProtectedRoutes>
              <ApplyDoctor />
            </ProtectedRoutes>
          } 
        />
          <Route path="/login" 
          element={
            <PublicRoutes>
            <Login />
            </PublicRoutes>
          } 
        />
          <Route path="/register"
           element={
            <PublicRoutes>
             <Register />
            </PublicRoutes>
          }
        />
        </Routes>
      )}
      </BrowserRouter>
    </>
  );
}

export default App;