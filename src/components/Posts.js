import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Search } from "../components";


const Post = (props) => {
    const { posts } = props;

    const [search, setSearch] = useState("");
    
    return(
        <div>
            <h3>All Posts</h3>
            <Search search={ search } setSearch={ setSearch } />
            <div>
                {
                    props.posts.length ? props.posts.map((onePost) => {
                        return (
                            <div key={onePost._id}>
                                <Link to={`/${onePost._id}`}> POST: { onePost.title }</Link>
                            </div>
                        )
                    }) : <div>No Data Available</div>
                }
            </div>
        </div>
    )
}

export default Post;