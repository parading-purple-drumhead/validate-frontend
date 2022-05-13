import useFetch from "../Custom Hooks/useFetch";
import Navbar from "../Navbar/Navbar";
import Post from "../Post/Post";
import ReactLoading from "react-loading";
import { Link } from "react-router-dom";
import { useAuth } from "../Contexts/AuthContext";
import moment from "moment";

const MyPosts = () => {
  const { currentUser } = useAuth();

  const {
    data: posts,
    isLoading,
    error,
  } = useFetch("http://localhost:8000/posts/?my_posts=true", currentUser.uid);

  const date = Date(currentUser.metadata.createdAt);

  console.log(date);

  return (
    <div className="my-posts">
      <Navbar />
      <div className="container mt-5">
        <div className="row">
          <div className="col-lg-8">
            <div className="row">
              <h1 className="m-0">My Posts</h1>
            </div>
            <hr />
            {isLoading && isLoading === true && (
              <ReactLoading type="spinningBubbles" color="grey" />
            )}
            {posts &&
              posts.map((post) => {
                return (
                  <div
                    id={post.id}
                    className="clickable"
                    key={"div_" + post.id}
                  >
                    <Link to={`/post/` + post.id}>
                      <Post post={post} key={post.id} />
                    </Link>
                  </div>
                );
              })}
            {posts && posts.length === 0 && (
              <p
                className="text-center my-5"
                style={{
                  color: "#8d8d8d",
                  fontSize: "2rem",
                  fontStyle: "italic",
                }}
              >
                <i className="bi bi-dash-circle me-3"></i>
                No Posts From {currentUser.displayName} Yet
              </p>
            )}
          </div>
          <div className="col-lg-4">
            <div className="card">
              <div className="card-body">
                <div className="row align-items-center mb-4">
                  <div className="col-3">
                    <img
                      src={currentUser.photoURL}
                      className="img-fluid"
                      style={{ borderRadius: "50%" }}
                    />
                  </div>
                  <div className="col-9">
                    <h3 className="card-title">{currentUser.displayName}</h3>
                  </div>
                </div>
                <div className="row">
                  <div className="col-5">
                    <p>
                      <b>Email:</b>{" "}
                    </p>
                  </div>
                  <div className="col-7">
                    <p>{currentUser.email}</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-5">
                    <p>
                      <b>Number of Posts:</b>
                    </p>
                  </div>
                  <div className="col-7">
                    <p>{posts && posts.length}</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-5">
                    <p>
                      <b>Member Since:</b>
                    </p>
                  </div>
                  <div className="col-7">
                    <p>{moment(date).format("DD MMM, YYYY")}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyPosts;
