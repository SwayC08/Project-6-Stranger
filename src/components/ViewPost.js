import { useParams, useNavigate } from "react-router-dom"
import { useState } from "react";

const ViewPost = (props) => {

    const { _id } = useParams();

    let filterPosts;

    filterPosts = props.posts.filter((onePost) => {
        return onePost._id == _id
    })
    console.log(filterPosts)



    return(
        <div>ViewPost
            <h3>Details:</h3>
            {
                filterPosts.length ? (
                    <div>
                        <div>Title: {filterPosts[0].title} </div>
                        <div>Description: </div>
                    </div>
                ) : ""
            }
        </div>
    )
}

export default ViewPost;