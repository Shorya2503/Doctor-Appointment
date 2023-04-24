//here we protect routes so that user cant direct to homepage initially
//also if he once login then login and register page shouldnt approachable again

import React from 'react'
import { Navigate } from 'react-router-dom'

export default function protectedRoutes({children}){
    if(localStorage.getItem("token")){
        return children
    }else{
        return <Navigate to="/login" />;
    }
}