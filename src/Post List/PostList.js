import moment from "moment";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react/cjs/react.development";
import useFetch from "../Custom Hooks/useFetch";
import Post from "../Post/Post";
import "./PostList.css";
import ReactLoading from "react-loading";
import { useAuth } from "../Contexts/AuthContext";

const PostList = () => {
  const { currentUser } = useAuth();

  const [pageTitle, setPageTitle] = useState("Most Recent Posts");
  const [searchTerm, setSearchTerm] = useState("");
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [posts, setPosts] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8000/posts", {
      headers: { uid: currentUser.uid },
    })
      .then((response) => {
        if (!response.ok) {
          throw Error("Data could not be fetched");
        }
        return response.json();
      })
      .then((data) => {
        setPosts(data);
        setIsLoading(false);
        setError(null);
      })
      .catch((err) => {
        setPosts(null);
        setIsLoading(false);
        setError(err.message);
      });
  }, []);

  function search() {
    const newPosts = posts.filter(
      (post) =>
        post.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    console.log(newPosts);
    setPosts(newPosts);
    setPageTitle("Search Results");
    setShowSearchResults(true);
  }

  return (
    <div className="post-list container my-5">
      <div className="row">
        <div className="col-xl-10 offset-xl-1">
          <div className="row">
            <div className="col-xl-4">
              <h1 className="m-0">{pageTitle}</h1>
            </div>
            <div className="col-xl-6 offset-xl-2 py-1">
              <form
                className="d-flex"
                onSubmit={(e) => {
                  e.preventDefault();
                  search();
                }}
              >
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  value={searchTerm}
                  onChange={(e) => {
                    if (e.target.value === "") {
                      setShowSearchResults(false);
                    }
                    setSearchTerm(e.target.value);
                  }}
                />
                <button className="btn main-color text-light" type="submit">
                  Search
                </button>
              </form>
            </div>
          </div>
          <hr />
          {showSearchResults && (
            <div className="row mb-3">
              <div
                className="col-6 text-truncate pe-0"
                style={{ fontSize: "1.25rem" }}
              >
                Search results for <i>{searchTerm}</i>
              </div>
            </div>
          )}

          {isLoading && isLoading === true && (
            <ReactLoading
              type="spinningBubbles"
              color="grey"
              className="mx-auto my-auto"
            />
          )}
          {posts &&
            posts.map((post) => {
              return (
                <div id={post.id} className="clickable" key={"div_" + post.id}>
                  <Link to={`/post/` + post.id}>
                    <Post post={post} key={post.id} />
                  </Link>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default PostList;
