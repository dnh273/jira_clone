import React, { Fragment, useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import ReactHtmlParser from "react-html-parser";
import { GET_ALL_STATUS_SAGA } from '../../../redux/constants/Cyberbugs/StatusConstant';
import { GET_ALL_PRIORITY_SAGA } from '../../../redux/constants/Cyberbugs/PriorityConstants';
import { CHANGE_ASSIGNESS, CHANGE_TASK_MODAL, HANDLE_CHANGE_POST_API_SAGA, REMOVE_USER_ASSIGN, UPDATE_STATUS_TASK_SAGA } from '../../../redux/constants/Cyberbugs/TaskConstants';
import { GET_ALL_TASK_TYPE_SAGA } from '../../../redux/constants/Cyberbugs/TaskTypeConstants';
import { Editor } from '@tinymce/tinymce-react'
import { Select } from 'antd';
import { DELETE_COMMENT, DELETE_COMMENT_SAGA, GET_ALL_COMMENTS, GET_ALL_COMMENTS_SAGA, INSERT_COMMENT_SAGA, UPDATE_COMMENT_SAGA } from '../../../redux/constants/Cyberbugs/CommentConstans';

const { Option } = Select;


export default function ModalCyberBugs(props) {

    const { taskDetailModal } = useSelector(state => state.TaskReducer);
    const { arrStatus } = useSelector(state => state.StatusReducer);
    const { arrPriority } = useSelector(state => state.PriorityReducer);
    const { arrTaskType } = useSelector(state => state.TaskTypeReducer);
    const { userLogin } = useSelector(state => state.UserLoginCyberBugsReducer);
    const { listComment } = useSelector(state => state.CommentReducer);
    // console.log('listComment', listComment);

    const { projectDetail } = useSelector(state => state.ProjectReducer)

    const [visibleEditor, setVisibleEditor] = useState(false);
    const [visibleInputComment, setvisibleInputComment] = useState(false);
    const [visibleEditComment, setvisibleEditComment] = useState(false);
    const [comment, setcomment] = useState('');
    const [editComment, setEditComment] = useState('');
    const [editCommentContent, setEditCommentContent] = useState('');

    const [flag, setFlag] = useState(true);

    const [historyContent, setHistoryContent] = useState(taskDetailModal.description);
    const [content, setContent] = useState(taskDetailModal.description);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({ type: GET_ALL_STATUS_SAGA });
        dispatch({ type: GET_ALL_PRIORITY_SAGA });
        dispatch({ type: GET_ALL_TASK_TYPE_SAGA });
        // dispatch({ type: GET_ALL_COMMENTS});

    }, [])
    useEffect(() => {
        dispatch({ type: GET_ALL_COMMENTS_SAGA, taskId: taskDetailModal.taskId });
    }, [visibleInputComment, flag])

    // console.log('taskDetailModal', taskDetailModal)


    const renderDescription = () => {
        const jsxDescription = ReactHtmlParser(taskDetailModal.description);
        // console.log('renderDescription', jsxDescription);
        return <div>
            {visibleEditor ? <div> <Editor
                name="description"
                initialValue={taskDetailModal.description}
                init={{
                    selector: 'textarea#myTextArea',
                    height: 500,
                    menubar: false,
                    plugins: [
                        'advlist autolink lists link image charmap print preview anchor',
                        'searchreplace visualblocks code fullscreen',
                        'insertdatetime media table paste code help wordcount'
                    ],
                    toolbar:
                        'undo redo | formatselect | bold italic backcolor | \
                            alignleft aligncenter alignright alignjustify | \
                            bullist numlist outdent indent | removeformat | help'
                }}
                onEditorChange={(content, editor) => {
                    setContent(content);
                }}
            />

                <button className="btn btn-primary m-2" onClick={() => {
                    dispatch({
                        type: HANDLE_CHANGE_POST_API_SAGA,
                        actionType: CHANGE_TASK_MODAL,
                        name: 'description',
                        value: content
                    })
                    setVisibleEditor(false);
                }}>Save</button>
                <button className="btn btn-primary m-2" onClick={() => {
                    dispatch({
                        type: HANDLE_CHANGE_POST_API_SAGA,
                        actionType: CHANGE_TASK_MODAL,
                        name: 'description',
                        value: historyContent
                    })

                    //    dispatch({
                    //         type: CHANGE_TASK_MODAL,
                    //         name: 'description',
                    //         value: historyContent
                    //     })
                    setVisibleEditor(false)
                }}>Close</button>
            </div> : <div onClick={() => {

                setHistoryContent(taskDetailModal.description);
                setVisibleEditor(!visibleEditor);

            }}>{jsxDescription}</div>}


        </div>
    }

    const renderImputComment = () => {
        return <div>
            {visibleInputComment ? <div>
                <Editor
                    name="inputcomment"
                    initialValue=''
                    outputFormat='text'
                    init={{
                        selector: 'textarea#myTextArea',
                        height: 100,
                        menubar: false,


                        toolbar: ''

                    }}
                    onEditorChange={(content, editor) => {

                        setcomment(editor.getContent({ format: 'text' }));
                    }}
                />

                <button className="btn btn-primary m-2" onClick={() => {
                    dispatch({
                        type: INSERT_COMMENT_SAGA,
                        newComment: {
                            taskId: taskDetailModal.taskId,
                            contentComment: comment
                        }
                    })
                    dispatch({ type: GET_ALL_COMMENTS_SAGA, taskId: taskDetailModal.taskId });
                    setvisibleInputComment(false);
                }}>Save</button>
                <button className="btn btn-primary m-2" onClick={() => {


                    setvisibleInputComment(false)
                }}>Close</button>
            </div> :
                <div onClick={() => {

                    setvisibleInputComment(!visibleInputComment);

                }}><input type="text" placeholder="Add a comment ..." /></div>}


        </div>
    }
    const handleChange = (e) => {
        const { name, value } = e.target;


        dispatch({
            type: HANDLE_CHANGE_POST_API_SAGA,
            actionType: CHANGE_TASK_MODAL,
            name,
            value
        })

        // dispatch({
        //     type: CHANGE_TASK_MODAL,
        //     name,
        //     value
        // });


    }
    const renderTimeTracking = () => {

        const { timeTrackingSpent, timeTrackingRemaining } = taskDetailModal;

        const max = Number(timeTrackingSpent) + Number(timeTrackingRemaining);
        const percent = Math.round(Number(timeTrackingSpent) / max * 100)

        return <div>
            <div style={{ display: 'flex' }}>
                <i className="fa fa-clock" />
                <div style={{ width: '100%' }}>

                    <div className="progress">
                        <div className="progress-bar" role="progressbar" style={{ width: `${percent}%` }} aria-valuenow={Number(timeTrackingSpent)} aria-valuemin={Number(timeTrackingRemaining)} aria-valuemax={max} />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <p className="logged">{Number(timeTrackingSpent)}h logged</p>
                        <p className="estimate-time">{Number(timeTrackingRemaining)}h remaining</p>
                    </div>
                </div>


            </div>
            <div className="row">

                <div className="col-6">
                    <input className="form-control" name="timeTrackingSpent" onChange={handleChange} />
                </div>
                <div className="col-6">
                    <input className="form-control" name="timeTrackingRemaining" onChange={handleChange} />
                </div>
            </div>
        </div>
    }
    const renderEditComment = (comment) => {
        return <div>
            {(visibleEditComment === true  && comment.contentComment === editComment ) ? <div>
                <Editor
                    name="editcomment"
                    initialValue={editComment}
                    outputFormat='text'
                    init={{
                        selector: 'textarea#myTextArea',
                        height: 100,
                        menubar: false,
                        toolbar: ''

                    }}
                    onEditorChange={(content, editor) => {

                        setEditCommentContent(editor.getContent({ format: 'text' }));
                        // setEditComment(content);
                        console.log(comment);
                    }}
                />

                <button className="btn btn-primary m-2" onClick={() => {
                    dispatch({
                        type: UPDATE_COMMENT_SAGA,
                        commentId: comment.id,
                        taskId: comment.taskId,
                        commentContent: editCommentContent
                    })
                    setvisibleEditComment(false);
                }}>Save</button>
                <button className="btn btn-primary m-2" onClick={() => {

                    setvisibleEditComment(false)
                }}>Close</button>
            </div> :
                <div>
                    <p style={{ marginBottom: 5 }}>
                        {comment.contentComment}
                    </p>
                    <div>
                        <button style={{ color: '#929398', border: "none", outline: "none", backgroundColor: "transparent", color: "blueviolet" }} onClick={() => {
                            setvisibleEditComment(true)
                            setEditComment(comment.contentComment)
                        }}>Edit</button>
                        •
                        <button style={{ color: '#929398', border: "none", outline: "none", backgroundColor: "transparent", color: "red" }} onClick={() => {
                            dispatch({ type: DELETE_COMMENT_SAGA, commentId: comment.id, taskId: taskDetailModal.taskId })
                            setFlag(!flag)

                        }}>Delete</button>
                    </div>
                </div>

            }

        </div>
    }
    const renderListComment = () => {
        return listComment.map((comment, index) => {
            return <div key={index} className="comment-item">
                <div className="display-comment" style={{ display: 'flex', marginBottom: '15px' }}>
                    <div className="avatar">
                        <img src={comment.user.avatar} alt='xyz' />
                    </div>
                    <div style={{ backgroundColor: '#ecedf0', width: '100%', padding: '10px', borderRadius: '10px' }}>
                        <p style={{ marginBottom: 5, fontWeight: 'bold' }}>
                            {comment.user.name} <span style={{ fontWeight: 'normal' }}>a month ago</span>
                        </p>
                        {renderEditComment(comment)}
                        
                    </div>
                </div>
            </div>
        }).reverse()
    }



    return (
        <div className="modal fade" id="infoModal" tabIndex={-1} role="dialog" aria-labelledby="infoModal" aria-hidden="true">
            <div className="modal-dialog modal-info">
                <div className="modal-content">
                    <div className="modal-header">
                        <div className="task-title">
                            <i className="fa fa-bookmark" />
                            <select name="typeId" value={taskDetailModal.typeId} onChange={handleChange}>
                                {arrTaskType.map((tp, index) => {
                                    return <option value={tp.id}>{tp.taskType}</option>
                                })}
                            </select>

                            <span>{taskDetailModal.taskName}</span>
                        </div>
                        <div style={{ display: 'flex' }} className="task-click">
                            <div>
                                <i className="fab fa-telegram-plane" />
                                <span style={{ paddingRight: 20 }}>Give feedback</span>
                            </div>
                            <div>
                                <i className="fa fa-link" />
                                <span style={{ paddingRight: 20 }}>Copy link</span>
                            </div>
                            <i className="fa fa-trash-alt='xyz'" style={{ cursor: 'pointer' }} />
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                    </div>
                    <div className="modal-body">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-8">
                                    <p className="issue">This is an issue of type: {taskDetailModal.taskName}</p>
                                    <div className="description">
                                        <p>Description</p>
                                        {renderDescription()}
                                    </div>
                                    <div className="comment">
                                        <h6>Comment</h6>
                                        <div className="block-comment" style={{ display: 'flex' }}>
                                            <div className="avatar">
                                                <img src={userLogin.avatar} alt='xyz' />
                                            </div>
                                            <div className="input-comment">
                                                {renderImputComment()}
                                                <p>
                                                    <span style={{ fontWeight: 500, color: 'gray' }}>Protip:</span>
                                                    <span>press
                                                        <span style={{ fontWeight: 'bold', background: '#ecedf0', color: '#b4bac6' }}> M </span>
                                                        to comment</span>
                                                </p>
                                            </div>
                                        </div>
                                        <div className="lastest-comment">
                                            {renderListComment()}
                                        </div>
                                    </div>
                                </div>
                                <div className="col-4">
                                    <div className="status">
                                        <h6>STATUS</h6>
                                        <select name="statusId" className="custom-select" value={taskDetailModal.statusId} onChange={(e) => {

                                            handleChange(e)


                                        }}>
                                            {arrStatus.map((status, index) => {
                                                return <option value={status.statusId} key={index}>{status.statusName}</option>
                                            })}
                                        </select>
                                    </div>
                                    <div className="assignees">
                                        <h6>ASSIGNEES</h6>
                                        <div className="row">
                                            {
                                                taskDetailModal.assigness?.map((user, index) => {
                                                    return <div className="col-6  mt-2 mb-2">
                                                        <div key={index} style={{ display: 'flex' }} className="item">


                                                            <div className="avatar">
                                                                <img src={user.avatar} alt={user.avatar} />
                                                            </div>
                                                            <p className="name mt-1 ml-1">
                                                                {user.name}
                                                                <i className="fa fa-times" style={{ marginLeft: 5, cursor: 'pointer' }} onClick={() => {

                                                                    dispatch({
                                                                        type: HANDLE_CHANGE_POST_API_SAGA,
                                                                        actionType: REMOVE_USER_ASSIGN,
                                                                        userId: user.id
                                                                    })

                                                                }} />
                                                            </p>
                                                        </div>
                                                    </div>
                                                })
                                            }

                                            <div className="col-6  mt-2 mb-2">

                                                <Select
                                                    options={projectDetail.members?.filter(mem => {
                                                        let index = taskDetailModal.assigness?.findIndex(us => us.id === mem.userId);
                                                        if (index !== -1) {
                                                            return false;
                                                        }
                                                        return true;
                                                    }).map((mem, index) => {
                                                        return { value: mem.userId, label: mem.name };
                                                    })}
                                                    optionFilterProp="label"
                                                    style={{ width: '100%' }}
                                                    name="lstUser"
                                                    value="+ Add more"
                                                    className="form-control"
                                                    onSelect={(value) => {
                                                        if (value == '0') {
                                                            return;
                                                        }
                                                        let userSelected = projectDetail.members.find(mem => mem.userId == value);
                                                        userSelected = { ...userSelected, id: userSelected.userId };

                                                        dispatch({
                                                            type: HANDLE_CHANGE_POST_API_SAGA,
                                                            actionType: CHANGE_ASSIGNESS,
                                                            userSelected
                                                        })

                                                        //dispatchReducer
                                                        // dispatch({
                                                        //     type: CHANGE_ASSIGNESS,
                                                        //     userSelected
                                                        // })
                                                    }}>


                                                </Select>
                                            </div>
                                        </div>
                                    </div>
                                    {/* <div className="reporter">
                                        <h6>REPORTER</h6>
                                        <div style={{ display: 'flex' }} className="item">
                                            <div className="avatar">
                                                <img src={require("../../../assets/img/download (1).jfif")} alt='xyz' />
                                            </div>
                                            <p className="name">
                                                Pickle Rick
                    <i className="fa fa-times" style={{ marginLeft: 5 }} />
                                            </p>
                                        </div>
                                    </div> */}
                                    <div className="priority" style={{ marginBottom: 20 }}>
                                        <h6>PRIORITY</h6>
                                        <select name="priorityId" className="form-control" value={taskDetailModal.priorityId} onChange={(e) => {
                                            handleChange(e);
                                        }}>
                                            {arrPriority.map((item, index) => {
                                                return <option key={index} value={item.priorityId}>{item.priority}</option>
                                            })}


                                        </select>
                                    </div>
                                    <div className="estimate">
                                        <h6>ORIGINAL ESTIMATE (HOURS)</h6>
                                        <input name="originalEstimate" type="text" className="estimate-hours" value={taskDetailModal.originalEstimate} onChange={(e) => {
                                            handleChange(e);
                                        }} />
                                    </div>
                                    <div className="time-tracking">
                                        <h6>TIME TRACKING</h6>
                                        {
                                            renderTimeTracking()
                                        }

                                    </div>
                                    <div style={{ color: '#929398' }}>Create at a month ago</div>
                                    <div style={{ color: '#929398' }}>Update at a few seconds ago</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}