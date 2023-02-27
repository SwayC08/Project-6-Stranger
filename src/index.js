import { createRoot } from "react-dom/client";
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { Home, Profile, Posts, Login, Logout, CreateNewPost, Header, ViewPost, Navbar } from "./components";

const Main = ()=> {

    return(
        <BrowserRouter>
        <Header/>
        <Routes>
            <Route path ="/Login" element={ <Login/> }/>
            <Route path ="/" element={ <Home/> }/>
            <Route path ="/Profile" element={ <Profile/> }/>
            <Route path ="/Posts" element={ <Posts/> }/>
            <Route path ="/CreateNewPost" element={ <CreateNewPost/> }/>
            <Route path ="/Logout" element={ <Logout/> }/>
            <Route path ="/Navbar" element={ <Navbar/> }/>
        </Routes>
    </BrowserRouter>
    )
}

const app = document.getElementById("app");
let root = createRoot(app);
root.render(<Main />)