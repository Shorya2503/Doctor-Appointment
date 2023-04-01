import React from 'react';
import {Form} from 'antd';
import "../styles/RegisterStyle.css";
import {Link} from "react-router-dom";



const login = () => {
  //form handler
  const onFinishHandler=(values)=>{
    console.log(values);
  }
  return (
    <>
      <div className="form-container">
      <Form layout="vertical" onFinish={onFinishHandler}
       className="register-form">

      <h3 className='text-centre '>Login Form</h3>

        <Form.Item label="Email" name="email">
          <input type='email' required className='input-form'/>
        </Form.Item>

        <Form.Item label="Password" name="password">
          <input type='password' required className='input-form'/>
        </Form.Item>

         <Link to="/register" className="m-2">
         Not a user? Register here.
         </Link>
        <button className="btn btn-primary" type='submit'>Login</button>
      </Form>
      </div>
    </>
  )
}

export default login