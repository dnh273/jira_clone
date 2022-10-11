import React, { useState } from 'react'
import { Prompt } from 'react-router-dom'

export default function Login(props) {
    const [userLogin,setUserLogin] = useState({userName:'',password:'',status:false})

    const handleChange = (e) => {
        const {value,name} = e.target

        const newUserLogin = {
            ...userLogin,
            [name]: value
        }
        let valid = true
        for(let key in newUserLogin) {
            if(key !== 'status') {
                if(newUserLogin[key].trim() === '') {
                    valid = false;
                }
            }
        }
        if(!valid) {
            newUserLogin.status = true;
        }else{
            newUserLogin.status = false;
        }
        setUserLogin(newUserLogin)
        console.log(newUserLogin);
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if(userLogin.userName === 'admin' && userLogin.password === 'admin') {
            //về lại trang trước đó
            props.history.goBack()
            //trả về trang chỉ định
            // props.history.push('/home')
            //trả về trang chỉ định nhưng khi bấm quay về không còn về trang login nữa mà là trang trước login
            // props.history.replace('/home')

            localStorage.setItem('userLogin',JSON.stringify(userLogin))
        }else{
            alert('mật khẩu hoặc tài khoản ko đúng')
            return
        }
    }

  return (
    <form className='container' onSubmit={handleSubmit}>
        <h4 className='display-4'>Đăng Nhập</h4>
        <div className='form-group'>
            <p>UserName</p>
            <input name='userName' className='form-control' onChange={handleChange}/>
        </div>
        <div className='form-group'>
            <p>Password</p>
            <input name='password' className='form-control' onChange={handleChange}/>
        </div>
        <div className='form-group'>
            
            <button className='btn btn-primary'> Đăng Nhập</button>
        </div>
        <Prompt when={userLogin.status} message={(location) => {
            return 'Bạn có chắc muốn rời khỏi trang này ?!'
        }}/>
    </form>
  )
}
