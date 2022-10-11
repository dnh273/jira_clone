import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Switch, useHistory } from "react-router-dom";
import Header from "./components/Home/Header/Header";
import Modal from "./HOC/Modal/Modal";
import About from "./pages/About/About";
import Contact from "./pages/Contact/Contact";
import LoginCyberBugs from "./pages/CyberBugs/LoginCyberBugs/LoginCyberBugs";
import DemoHOCModal from "./pages/DemoHOCModal/DemoHOCModal";
import Detail from "./pages/Detail/Detail";
import LoadingComponent from "./pages/GlobalSetting/LoadingComponent/LoadingComponent";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Profile from "./pages/Profile/Profile";
import TodolistRCC from "./pages/Todolist/TodolistRCC";
import ToDoListRedux from "./pages/Todolist/TodolistRedux";
import TodolistRFC from "./pages/Todolist/TodolistRFC";
import BaiTapToDoListSaga from "./pages/ToDoListSaga/BaiTapToDoListSaga";
import { HomeTemplate } from "./templates/HomeTemplate/HomeTemplate";
import { UserLoginTemplate } from "./templates/HomeTemplate/UserLoginTemplate";
import { useDispatch } from 'react-redux';
import { CyberbugsTemplate } from './templates/HomeTemplate/CyberbugsTemplate';
import indexCyberBugs from './pages/CyberBugs/ProjectDetail/indexCyberBugs';
import CreateProject from './pages/CyberBugs/CreateProject/CreateProject';
import ProjectManagement from './pages/CyberBugs/ProjectManagement/ProjectManagement';
import DrawerCyberBugs from './HOC/CyberbugsHOC/DrawerCyberBugs';
import DemoDragDrop from './pages/DemoDragDrop/DemoDragDrop';
import DragAndDropDnD from './pages/DragAndDropDnD/DragAndDropDnD';
import signUpCyberBug from './pages/CyberBugs/SignUpCyberBug/signUpCyberBug';
import userManagement from './pages/CyberBugs/UserManagement/userManagement';

function App() {

  const history = useHistory();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: 'ADD_HISTORY', history: history });
  }, [])


  return (
    <>
      <Modal />
      <DrawerCyberBugs />
      {/* <Header /> */}
      <LoadingComponent />
      <Switch>
        <HomeTemplate exact path='/home' Component={Home} />
        <HomeTemplate exact path='/about' Component={About} />

        <HomeTemplate exact path='/dragdrop' Component={DemoDragDrop} />
        <HomeTemplate exact path='/dragdropdnd' Component={DragAndDropDnD} />

        <HomeTemplate exact path='/contact' Component={Contact} />
        <HomeTemplate exact path='/Login' Component={Login} />
        <HomeTemplate exact path='/detail/:id' Component={Detail} />
        <HomeTemplate exact path='/profile' Component={Profile} />
        <HomeTemplate exact path='/todolistRFC' Component={TodolistRFC} />
        <HomeTemplate exact path='/todolistRCC' Component={TodolistRCC} />
        <HomeTemplate exact path='/todolistRedux' Component={ToDoListRedux} />
        <HomeTemplate exact path='/todolistSaga' Component={BaiTapToDoListSaga} />
        <HomeTemplate exact path='/demohocmodal' Component={DemoHOCModal} />

        <UserLoginTemplate exact path='/LoginCyberBugs' Component={LoginCyberBugs} />
        <UserLoginTemplate exact path='/signupcyberbug' Component={signUpCyberBug} />
        
        <CyberbugsTemplate exact path='/cyberbugs' Component={indexCyberBugs} />
        <CyberbugsTemplate exact path='/createproject' Component={CreateProject} />
        <CyberbugsTemplate exact path='/projectmanagement' Component={ProjectManagement} />
        <CyberbugsTemplate exact path='/usermanagement' Component={userManagement} />
        <CyberbugsTemplate exact path='/projectdetail/:projectId' Component={indexCyberBugs} />


        <UserLoginTemplate exact path='/' Component={LoginCyberBugs} />
        <UserLoginTemplate path='*' Component={LoginCyberBugs} />
      </Switch>

    </>
  );
}

export default App;
