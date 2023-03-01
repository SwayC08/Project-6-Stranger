import { useEffect, useState } from 'react';

const Home = (props) => {

    const[data, setData] = useState({})

    const COHORT_NAME ='2301-FTB-MT-WEB-FT';
    const BASE_URL = `https://strangers-things.herokuapp.com/api/${COHORT_NAME}`;

    useEffect(()=> {
        if (localStorage.getItem("token")){
            console.log(localStorage.getItem("token"));
            props.setLoggedIn(true);
            fetchData();
        } else {
            props.setLoggedIn(false);
            console.log("No Token Exists");
        }

        async function fetchData(){
            try {
                const response = await fetch(`${BASE_URL}/users/me`, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    }
                })    
                const transData = await response.json();
                // console.log(transData); 
                setData(transData.data);
                console.log(setData(transData.data));
            } catch(error){
                console.log(error);
            }
        }
    }, [])

    return(
        <div>
            {
                props.loggedIn ? 
            <h2>Welcome to Local Listings, { data.username }</h2> : 
            // <p>This site is dedicated to serving the local community.</p>
            // <p>You do not need an account to browse postings. </p>
            <h2>Please create an account or sign in, if you would like to post a new item.</h2>
            
            }
        </div>
    )
}

export default Home; 