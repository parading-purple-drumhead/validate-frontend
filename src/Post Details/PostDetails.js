import { useParams } from "react-router-dom";
import { useEffect, useState } from "react/cjs/react.development";
import useFetch from "../Custom Hooks/useFetch";
import Post from "../Post/Post";
import ReactLoading from "react-loading";
import Navbar from "../Navbar/Navbar";
import { useAuth } from "../Contexts/AuthContext";

const PostDetails = () => {
  const { post_id } = useParams();
  const { currentUser } = useAuth();

  const {
    data: post,
    isLoading,
    error,
  } = useFetch(`http://localhost:8000/posts/${post_id}/`, currentUser.uid);

  return (
    <div className="post-details">
      <Navbar />
      <div style={{ overflowX: "hidden" }}>
        <div className="row mt-5">
          <div className="col-lg-10 offset-lg-1">
            <h1>Post Details</h1>
            <hr />
            {isLoading && isLoading === true && (
              <ReactLoading
                type="spinningBubbles"
                color="grey"
                className="mx-auto"
              />
            )}
            {post && <Post post={post} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetails;
