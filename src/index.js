import { createRoot } from "react-dom/client";
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { Home, Profile, Posts, Login, Logout, CreateNewPost, Header, ViewPost, Navbar, Search } from "./components";

const Main = ()=> {
    const [posts, setPosts] = useState([]);
    console.log(posts);

    const COHORT_NAME ='2301-FTB-MT-WEB-FT';
    const BASE_URL = `https://strangers-things.herokuapp.com/api/${COHORT_NAME}`;
    // `${BASE_URL}/posts`

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
            <Header/>
            <Routes>
                <Route path ="/Login" element={ <Login/> }/>
                <Route path ="/Home" element={ <Home posts={ posts }/> }/>
                <Route path ="/Profile" element={ <Profile posts={ posts }/> }/>
                <Route path ="/" element={ <Posts posts={ posts }/> }/>

                <Route path ="/:_id" element={ <ViewPost posts={ posts } setPosts={ setPosts } /> }/>

                <Route path ="/CreateNewPost" element={ <CreateNewPost posts={ posts }/> }/>
                <Route path ="/Logout" element={ <Logout/> }/>
                {/* <Route path ="/Navbar" element={ <Navbar/> }/> */}
            </Routes>
        </BrowserRouter>
    )
}

createRoot(document.getElementById("app")).render(< Main />)

// const app = document.getElementById("app");
// let root = createRoot(app);
// root.render(<Main />)

