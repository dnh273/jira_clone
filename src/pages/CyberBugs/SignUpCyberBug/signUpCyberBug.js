import React from 'react'
import { Button, Input } from 'antd';
import { UserOutlined, LockOutlined,PhoneOutlined, MailOutlined} from '@ant-design/icons';

import { withFormik } from 'formik'
import * as Yup from 'yup';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { SIGN_UP_USER_SAGA } from '../../../redux/constants/Cyberbugs/UserConstatnts';


function signUpCyberBug(props) {
    const {
        values,
        touched,
        errors,
        handleChange,
        handleBlur,
        handleSubmit,
    } = props;

  return (
    <form onSubmit={handleSubmit} className="container" style={{ height: window.innerHeight }} >
    <div className="d-flex flex-column justify-content-center align-items-center" style={{ height: window.innerHeight }} >
        <h3 className="text-center" style={{ fontWeight: 600, fontSize: 30 }}>SIGN UP CYBERBUG</h3>
        <div className="d-flex mt-3" >
            <Input onChange={handleChange} style={{ width: '100%', minWidth: 300 }} name="email" size="large" placeholder="email" prefix={<MailOutlined />} />
        </div>
        <div className="text-danger">{errors.email}</div>
        <div className="d-flex mt-3">
            <Input onChange={handleChange} style={{ width: '100%', minWidth: 300 }} type="password" name="password" size="large" placeholder="password" prefix={<LockOutlined />} />
        </div>
        <div className="text-danger">{errors.password}</div>
        <div className="d-flex mt-3">
            <Input onChange={handleChange} style={{ width: '100%', minWidth: 300 }} type="phoneNumber" name="phoneNumber" size="large" placeholder="Phone Number" prefix={<PhoneOutlined />} />
        </div>
        <div className="text-danger">{errors.phoneNumber}</div>
        <div className="d-flex mt-3">
            <Input onChange={handleChange} style={{ width: '100%', minWidth: 300 }} type="name" name="name" size="large" placeholder="Name" prefix={<UserOutlined />} />
        </div>
        <div className="text-danger">{errors.name}</div>

        <Button htmlType="submit" size="large" style={{ minWidth: 300, backgroundColor: 'rgb(102,117,223)', color: '#fff' }} className="mt-5">Sign Up</Button>

        <div className='pt-3'>

            <p>If you have an account 
            <NavLink activeClassName='' activeStyle={{}} style={{fontWeight: 'bold'}} to="/logincyberbug"> Login</NavLink>
                </p>
        </div>
        
    </div>

</form>
  )
}

const SignUpCyberBugsWithFormik = withFormik({
    mapPropsToValues: () => ({
        email: '',
        password: '',
        phoneNumber:'',
        name:'',

    }),
    validationSchema: Yup.object().shape({
        email: Yup.string().required('Email is required!').email('email is invalid!'),
        password: Yup.string().min(6, 'password must have min 6 characters').max(32, 'password  have max 32 characters'),
        phoneNumber: Yup.string().max(11, 'Phone number  have max 11 characters'),
        name: Yup.string().min(1, 'Name must have min 1 characters').max(32, 'Name have max 32 characters'),

    }),
    

    handleSubmit: ({ email, password, phoneNumber, name }, { props, setSubmitting }) => {
    
        props.dispatch({
            type:SIGN_UP_USER_SAGA,
            userDetails:{
                email,
                password,
                phoneNumber,
                name,
            }
        });



    },
    displayName: 'Signup CyberBugs',
})(signUpCyberBug);

export default connect()(SignUpCyberBugsWithFormik);