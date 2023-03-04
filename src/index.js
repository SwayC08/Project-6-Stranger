import { createRoot } from "react-dom/client";
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import { Home, Profile, Posts, Login, Logout, Header, ViewPost, NewUser} from "./components";

const Main = ()=> {
    const [posts, setPosts] = useState([]);
    const [loggedIn, setLoggedIn] = useState(false);

// Update Post state 
    const [updateState, setUpdateState] = useState(false); 


    const COHORT_NAME ='2301-ftb-mt-web-ft';
    const BASE_URL = `https://strangers-things.herokuapp.com/api/${COHORT_NAME}`;

    async function fetchPosts(){        
        try{
            // const response = await fetch("https://strangers-things.herokuapp.com/api/2301-FTB-MT-WEB-FT/posts");
            // const transData = await response.json();
            const response = await fetch(`${BASE_URL}/posts`);
            const transData = await response.json();
            setPosts(transData.data.posts);
            
        } catch (error){
            console.log(error)
        }
    }

    useEffect(()=>{
        fetchPosts();
        console.log("I was ran in Index")
}, [])
    
    return(
        <BrowserRouter>
            <Header loggedIn={ loggedIn } />
            <Routes>
                <Route path ="/Login" element={ <Login/> }/>
                <Route path ="/Home" element={ <Home posts={ posts } loggedIn={ loggedIn } setLoggedIn={ setLoggedIn } /> }/>

                <Route path ="/Profile" element={ <Profile posts={ posts } setPosts={ setPosts } loggedIn={ loggedIn } setLoggedIn={ setLoggedIn } fetchPosts={ fetchPosts } /> }/>
                
                <Route path ="/" element={ <Posts posts={ posts } setPosts={ setPosts } updateState={ updateState } setUpdateState={ setUpdateState }  fetchPosts={ fetchPosts } /> }/>

                <Route path ="/:_id" element={ <ViewPost posts={ posts } setPosts={ setPosts } loggedIn={ loggedIn } updateState={ updateState } setUpdateState={ setUpdateState } fetchPosts={ fetchPosts }/> }/>

                
                <Route path ="/Logout" element={ <Logout loggedIn={loggedIn} setLoggedIn={ setLoggedIn } posts={posts} /> }/>
                <Route path ="/NewUser" element={ <NewUser loggedIn={ loggedIn }  /> }/>
                {/* <Route path ="/Reply" element={ <Reply posts={ posts } /> }/>    */}
                {/* <Route path ="/Navbar" element={ <Navbar/> }/> */} 
            </Routes>
        </BrowserRouter>
    )
}

createRoot(document.getElementById("app")).render(< Main />)

// const app = document.getElementById("app");
// let root = createRoot(app);
// root.render(<Main />)


