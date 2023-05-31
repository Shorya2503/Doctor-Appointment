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
import Notificationpage from "./pages/Notificationpage";
import Users from "./pages/admin/Users";
import Doctors from "./pages/admin/Doctors";
import Profile from "./pages/doctor/Profile";
import BookingPage from "./pages/BookingPage";
import Appointments from "./pages/Appointments";

function App() {
  const {loading} = useSelector(state => state.alerts)
  return (
    <>
      <BrowserRouter>
      {loading ? (

      <Spinner/>) : 
      (
      <Routes>
        <Route path="/apply-doctor" 
          element={
            <ProtectedRoutes>
              <ApplyDoctor />
            </ProtectedRoutes>
          } 
        /> 
        <Route path="/admin/doctors" 
          element={
            <ProtectedRoutes>
              <Doctors />
            </ProtectedRoutes>
          } 
        /> 
        <Route path="/admin/users" 
          element={
            <ProtectedRoutes> 
              <Users /> 
            </ProtectedRoutes>
          } 
        />
        <Route path="/notification" 
          element={
            <ProtectedRoutes>
              <Notificationpage />
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
        <Route path="/doctor/profile/:id"
           element={
            <ProtectedRoutes>
             <Profile />
            </ProtectedRoutes>
          }
        /> 
        <Route path="/doctor/book-appointment/:doctorId"
           element={
            <ProtectedRoutes>
             <BookingPage />
            </ProtectedRoutes>
          }
        />
         <Route path="/appointments"
           element={
            <ProtectedRoutes>
             <Appointments />
            </ProtectedRoutes>
          }
        /> 
         <Route path="/" 
          element={
            <ProtectedRoutes>
              <HomePage />
            </ProtectedRoutes>
          } 
        /> 
        </Routes>
      )}
      </BrowserRouter>
    </>
  );
}

export default App;