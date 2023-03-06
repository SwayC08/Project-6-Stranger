import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Search } from "../components";

const Post = (props) => {
    const { posts, setPosts, setUpdateState, updateState, fetchPosts } = props;

    // const [searchState, setSearchState]= useState(false)
    // const [search, setSearch] = useState("");
    // console.log(search.length);

    useEffect(() => {
        console.log("I was ran in posts updateState");
        // setPosts(filteredPosts);
        fetchPosts();
    },[])

// Search Filter
    // let filteredPosts = posts.filter((searchPost)=> {
        // let lowercase = searchPost.title.toLowerCase();
        // return lowercase.includes(search.toLowerCase())
    //     return ((searchPost.title.toLowerCase()).includes(search.toLowerCase()))
    // });

    return(
        <div className="postPage">
            {/* <h3>All Posts</h3>
            <Search search={ search } setSearch={ setSearch } posts={ posts } setSearchState={ setSearchState } searchState={ searchState }/> */}
            <div>
                {
                    posts.length ? posts.map((onePost) => {
                        return (
                            <div key={onePost._id} className="PostsList">
                                <Link to={`/${onePost._id}`}>  { onePost.title } ({ onePost.price })</Link>
                            </div>
                        )
                    }) : "No Data available"
                }
            </div>
        </div>
    )
}

export default Post;


                    // filteredPosts.map((onePost) => {
                    //     return (
                    //         <div key={onePost._id}>
                    //             <Link to={`/${onePost._id}`}>  { onePost.title } ({ onePost.price })</Link>
                    //             <hr/>
                    //         </div>
                    //     )
                    // })