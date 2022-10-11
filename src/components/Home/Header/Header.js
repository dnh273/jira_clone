import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Header() {
    return (
        <div className="">
            <nav className="navbar navbar-expand-sm navbar-dark bg-primary">
                <NavLink className="navbar-brand" to="/">Demo React</NavLink>
                <button className="navbar-toggler d-lg-none" type="button" data-toggle="collapse" data-target="#collapsibleNavId" aria-controls="collapsibleNavId" aria-expanded="false" aria-label="Toggle navigation" />
                <div className="collapse navbar-collapse" id="collapsibleNavId">
                    <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                        <li className="nav-item">
                            <NavLink activeClassName='bg-dark' activeStyle={{color: 'pink', fontSize: '20px', borderRadius: '5px'}} className="nav-link" to="/home">Home <span className="sr-only">(current)</span></NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink activeClassName='bg-dark' activeStyle={{color: 'pink', fontSize: '20px', borderRadius: '5px'}} className="nav-link" to="/about">About</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink activeClassName='bg-dark' activeStyle={{color: 'pink', fontSize: '20px', borderRadius: '5px'}} className="nav-link" to="/contact">Contact</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink activeClassName='bg-dark' activeStyle={{color: 'pink', fontSize: '20px', borderRadius: '5px'}} className="nav-link" to="/login">Login</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink activeClassName='bg-dark' activeStyle={{color: 'pink', fontSize: '20px', borderRadius: '5px'}} className="nav-link" to="/LoginCyberBugs">LoginCyberBugs</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink activeClassName='bg-dark' activeStyle={{color: 'pink', fontSize: '20px', borderRadius: '5px'}} className="nav-link" to="/profile">Profile</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink activeClassName='bg-dark' activeStyle={{color: 'pink', fontSize: '20px', borderRadius: '5px'}} className="nav-link" to="/demohocmodal">DemoHOCModal</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink activeClassName='bg-dark' activeStyle={{color: 'pink', fontSize: '20px', borderRadius: '5px'}} className="nav-link" to="/cyberbugs">indexCyberBugs</NavLink>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" id="dropdownId" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Dropdown</a>
                            <div className="dropdown-menu" aria-labelledby="dropdownId">
                                <NavLink className="dropdown-item" to="/todolistRCC">Todolist RCC</NavLink>
                                <NavLink className="dropdown-item" to="/todolistRFC">Todolist RFC</NavLink>
                                <NavLink className="dropdown-item" to="/todolistRedux">Todolist Redux</NavLink>
                                <NavLink className="dropdown-item" to="/todolistSaga">Todolist Saga</NavLink>
                                <NavLink className="dropdown-item" to="/dragdrop">DemoDragDrop</NavLink>
                            </div>
                        </li>

                      

                    </ul>
                    <form className="form-inline my-2 my-lg-0">
                        <input className="form-control mr-sm-2" type="text" placeholder="Search" />
                        <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                    </form>
                </div>
            </nav>

        </div>
    )
}

