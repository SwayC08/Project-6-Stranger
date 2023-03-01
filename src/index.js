import { createRoot } from "react-dom/client";
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import { Home, Profile, Posts, Login, Logout, CreateNewPost, Header, ViewPost, Navbar, Search, NewUser } from "./components";

const Main = ()=> {
    const [posts, setPosts] = useState([]);
    const [loggedIn, setLoggedIn] = useState(false);

    const COHORT_NAME ='2301-FTB-MT-WEB-FT';
    const BASE_URL = `https://strangers-things.herokuapp.com/api/${COHORT_NAME}`;

    async function fetchPosts(){        
        try{
            // const response = await fetch("https://strangers-things.herokuapp.com/api/2301-FTB-MT-WEB-FT/posts");
            // const transData = await response.json();
            const returned = await fetch(`${BASE_URL}/posts`);
            const transData = await returned.json();
            setPosts(transData.data.posts);
        } catch (error){
            console.log(error)
        }
    }

    useEffect(()=>{
        fetchPosts();
    }, [])
    
    return(
        <BrowserRouter>
            <Header loggedIn={ loggedIn } />
            <Routes>
                <Route path ="/Login" element={ <Login/> }/>
                <Route path ="/Home" element={ <Home posts={ posts } loggedIn={ loggedIn } setLoggedIn={ setLoggedIn } /> }/>
                <Route path ="/Profile" element={ <Profile posts={ posts } loggedIn={ loggedIn }/> }/>
                <Route path ="/" element={ <Posts posts={ posts } loggedIn={ loggedIn }/> }/>

                <Route path ="/:_id" element={ <ViewPost posts={ posts } setPosts={ setPosts } loggedIn={ loggedIn } /> }/>

                <Route path ="/CreateNewPost" element={ <CreateNewPost posts={ posts }/> }/>
                <Route path ="/Logout" element={ <Logout/> }/>
                <Route path ="/NewUser" element={ <NewUser loggedIn={ loggedIn }/> }/>
                {/* <Route path ="/Navbar" element={ <Navbar/> }/> */}
            </Routes>
        </BrowserRouter>
    )
}

createRoot(document.getElementById("app")).render(< Main />)

// const app = document.getElementById("app");
// let root = createRoot(app);
// root.render(<Main />)

