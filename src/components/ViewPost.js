import { useParams, useNavigate } from "react-router-dom"
import { useState } from "react";

const ViewPost = (props) => {

    const { _id } = useParams();
    console.log(useParams())

    let filterPosts;

    filterPosts = props.posts.filter((onePost) => {
        return onePost._id == _id
    })
    console.log(filterPosts)



    return(
        <div>ViewPost
            <h3>Post Details {filterPosts[0]._id} </h3>
            {
                filterPosts.length ? (
                    <div>
                        <h4>Title: {filterPosts[0].title} </h4>
                        <div>Description: {filterPosts[0].description}</div>
                        <div>Price: {filterPosts[0].price}</div>
                        <div>Created On: {filterPosts[0].createdAt}</div>
                    </div>
                ) : ""
            }
        </div>
    )
}

export default ViewPost;