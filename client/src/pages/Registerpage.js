import React from 'react';
import {Form} from 'antd';
import "../styles/RegisterStyle.css";
import {Link} from "react-router-dom";

const register = () => {
  //form handler
  const onFinishHandler=(values)=>{
    console.log(values);
  }
  return (
    <>
      <div className="form-container">
      <Form layout="vertical" onFinish={onFinishHandler}
       className="register-form">

      <h3 className='text-centre '>Register Form</h3>

        <Form.Item label="Name" name="name">
          <input type='text' required className='input-form'/>
        </Form.Item>

        <Form.Item label="Email" name="email">
          <input type='email' required className='input-form'/>
        </Form.Item>

        <Form.Item label="Password" name="password">
          <input type='password' required className='input-form'/>
        </Form.Item>

         <Link to="/login" className="m-2">
         Already registered? Login here.
         </Link>
        <button className="btn btn-primary" type='submit'>Register</button>
      </Form>
      </div>
    </>
  )
}

export default register