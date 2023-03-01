import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Search } from "../components";


const Post = (props) => {
    const { posts } = props;

    const [search, setSearch] = useState("");

    let filteredPosts = posts.filter((searchPost)=> {
        // let lowercase = singlePost.title.toLowerCase();
        // return lowercase.includes(search.toLowerCase())
        return ((searchPost.title.toLowerCase()).includes(search.toLowerCase()))
    })

    return(
        <div>
            <h3>All Posts</h3>
            <Search search={ search } setSearch={ setSearch } posts={ posts } />
            <hr/>
            <div>
                {
                    filteredPosts.length ? filteredPosts.map((onePost) => {
                        return (
                            <div key={onePost._id}>
                                <Link to={`/${onePost._id}`}> POST: { onePost.title } ({ onePost.price })</Link>
                                <hr/>
                            </div>
                        )
                    }) : <div>No Data Available</div>
                }
            </div>
        </div>
    )
}

export default Post;