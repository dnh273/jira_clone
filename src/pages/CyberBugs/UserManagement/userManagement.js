import React, { useEffect, useState } from 'react'
import { Table, Tag, Space, Button, Avatar, Popconfirm, Input } from 'antd';
import { FormOutlined, DeleteOutlined, CloseSquareOutlined, CaretDownOutlined } from '@ant-design/icons'

import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { GET_LIST_USER_SAGA } from '../../../redux/constants/Cyberbugs/UserConstatnts';
import FormEditUser from '../../../components/Forms/FormEditUser/FormEditUser';
import FormCreateUser from '../../../components/Forms/FormCreateUser/FormCreateUser';


export default function UserManagement(props) {
    const dispatch = useDispatch()
    const [keyWord,setKeyword] = useState('')

    useEffect(() => {
        dispatch({ type: GET_LIST_USER_SAGA })
    }, [])

    const { listUser, userLogin } = useSelector(state => state.UserLoginCyberBugsReducer);


    const [state, setState] = useState({
        filteredInfo: null,
        sortedInfo: null,
    });


    const handleChange = (pagination, filters, sorter) => {
        setState({
            filteredInfo: filters,
            sortedInfo: sorter,
        });
    };

    const columns = [
        {
            title: 'User Id',
            dataIndex: 'userId',
            key: 'userId',
            sorter: (item2, item1) => {
                if (item2 < item1) {
                    return -1;
                }
                return 1;
            },


        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',

            sorter: (item2, item1) => {
                let email1 = item1.email?.trim().toLowerCase();
                let email2 = item2.email?.trim().toLowerCase()

                if (email1 < email2) {
                    return -1;
                }
                return 1;
            },


        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',

            sorter: (item2, item1) => {
                let projectName1 = item1.projectName?.trim().toLowerCase();
                let projectName2 = item2.projectName?.trim().toLowerCase();
                if (projectName2 < projectName1) {
                    return -1;
                }
                return 1;
            },


        },
        {
            title: 'Phone Number',
            dataIndex: 'phoneNumber',
            key: 'phoneNumber',

            sorter: (item2, item1) => {
                if (item2 < item1) {
                    return -1;
                }
                return 1;
            },



        },
        {
            title: 'Action',
            dataIndex: '',
            key: 'x',
            render: (text, record, index) => {
                // console.log(record);
                return <div>
                    <button className="btn mr-2 btn-primary" onClick={() => {
                        const action = {
                            type: 'OPEN_FORM_EDIT_USER',
                            title: 'Edit Project',
                            Component: <FormEditUser />,
                        }

                        // dispatch lên reducer nội dung drawer
                        dispatch(action);
                        // dispatch dữ liệu dòng hiện tai lên reducer
                        const actionEditProject = {
                            type: 'EDIT_USER',
                            userEditModel: record
                        }
                        dispatch(actionEditProject);
                    }}>
                        <FormOutlined style={{ fontSize: 17 }} />
                    </button>
                    <Popconfirm
                        title="Are you sure to delete this User?"
                        onConfirm={() => {
                            dispatch({ type: 'DELETE_USER_SAGA', userId: record.userId })
                        }}

                        okText="Yes"
                        cancelText="No"
                    >
                        <button className="btn btn-danger">
                            <DeleteOutlined style={{ fontSize: 17 }} />
                        </button>
                    </Popconfirm>

                </div>
            },
        }
    ]
    return (
        <div className="container-fluid m-5">

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', }}>
                <h3>User Management</h3>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', }}>
                    <p style={{ marginBottom: '0' }}>Chào !, {userLogin.name} </p>
                    <img src={userLogin.avatar} style={{ width: '50px', height: '50px', borderRadius: '50%', marginLeft: '20px', marginRight: '10px' }} alt="User Management" />
                    <i><CaretDownOutlined style={{ fontSize: '50px' }} /></i>
                    {/* {console.log(userLogin)} */}
                </div>
            </div>
            <div className="mb-3 font-weight-bold" style={{ fontSize: 20, width:'150px'}} onClick={()=>{
                dispatch({
                    type:'OPEN_FORM_CREATE_USER',
                    title: 'Create User',
                    Component: <FormCreateUser/>
                })


            }}>
                <p style={{ textDecoration: 'underline', color: 'blue', cursor: 'pointer' }}>Create User +  </p>

            </div>
            <div className='mb-4'>
                <Input placeholder="Search ..." style={{ width: '20%' } } onChange={(e)=>{
                    setKeyword(e.target.value);
                }}/>
                <Button type="primary" size={'default'} style={{ width: '10%' }} className="ml-3" onClick={()=>{
                    dispatch({
                        type: 'SEARCH_USER_API',
                        keyWord:keyWord

                    })
                }}>
                    Search
                </Button>
            </div>

            <Table columns={columns} rowKey={"id"} dataSource={listUser} onChange={handleChange} />
        </div>
    )
}
