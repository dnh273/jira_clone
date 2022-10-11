import React, { useEffect } from 'react'
import { connect } from 'react-redux';

import { withFormik } from 'formik'
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { SIGN_UP_USER_SAGA } from '../../../redux/constants/Cyberbugs/UserConstatnts';

function FormCreateUser(props) {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch({type:'SET_SUBMIT_CREATE_USER',submitFunction: handleSubmit})

    },[])

    const {
        values,
        touched,
        errors,
        handleChange,
        handleBlur,
        handleSubmit,
    } = props;
  return (
    <form className="container" onSubmit={handleSubmit}>
    <div className="row">
        
        <div className="col-12">
            <div className="form-group">
                <p className="font-weight-bold">Email</p>
                <input value={values.email} className="form-control" name="email" onChange={handleChange} />
            </div>
            <div className="text-danger">{errors.email}</div>
        </div>
        <div className="col-12">
            <div className="form-group">
                <p className="font-weight-bold">PassWord</p>
                <input value={values.passWord} className="form-control" name="passWord" onChange={handleChange} />
            </div>
            <div className="text-danger">{errors.email}</div>
        </div>
        <div className="col-12">
            <div className="form-group">
                <p className="font-weight-bold">Phone Number</p>
                <input value={values.phoneNumber} className="form-control" name="phoneNumber" onChange={handleChange} />
            </div>
            <div className="text-danger">{errors.phoneNumber}</div>
        </div>
        <div className="col-12">
            <div className="form-group">
                <p className="font-weight-bold">User Name</p>
                <input value={values.name} className="form-control" name="name" onChange={handleChange} />
            </div>
            <div className="text-danger">{errors.name}</div>
        </div>
        
    </div>
</form >
  )
}
const CreateUserWithFormik = withFormik({
    enableReinitialize: true,
    mapPropsToValues: (props) => {
        
        return {
            
            name: '',
            email: '',
            phoneNumber: '',
            passWord:''
        }
    },
    validationSchema: Yup.object().shape({
        email: Yup.string().required('Email is required!').email('email is invalid!'),
        userName: Yup.string().min(6, 'userName must have min 6 characters').max(32, 'userName  have max 32 characters'),
        passWord: Yup.string().min(6, 'password must have min 6 characters').max(32, 'password  have max 32 characters'),
        phoneNumber: Yup.string().min(6, 'phoneNumber must have min 6 characters').max(12, 'phoneNumber  have max 12 characters')
    }),
    handleSubmit: (values, { props, setSubmitting }) => {
        // Gọi saga
      props.dispatch({
        type:SIGN_UP_USER_SAGA,
        userDetails:values
      })
      props.dispatch({type:'CLOSE_DRAWER'})  
    },
    displayName: 'Create User',
})(FormCreateUser);

export default connect()(CreateUserWithFormik);
