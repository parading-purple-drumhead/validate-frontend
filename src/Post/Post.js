import Comment from "../Comment/Comment";
import moment from "moment";
import ReactLoading from "react-loading";
import { useState } from "react/cjs/react.development";
import { useAuth } from "../Contexts/AuthContext";
import { Modal } from "bootstrap";
import { useLocation } from "react-router-dom";

const Post = ({ post }) => {
  const [loading, setLoading] = useState(false);
  const [titleRating, setTitleRating] = useState("");
  const [descriptionRating, setDescriptionRating] = useState("");
  const [imageRating, setImageRating] = useState("");
  const [modalComment, setModalComment] = useState("");

  const { currentUser } = useAuth();

  const { pathname } = useLocation();

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const handleComment = async (e) => {
    e.preventDefault();

    setLoading(true);

    const comment = {
      titleRating: titleRating,
      descriptionRating: descriptionRating,
      imageRating: imageRating,
      comment: modalComment.trim(),
      authorId: currentUser.uid,
      ratings: {},
      date: new Date(),
    };

    if (comment.titleRating === "" || comment.descriptionRating === "") {
      if (post.mediaUrl && comment.imageRating === "") {
        alert("Title, Description and Image Rating are necessary");
      } else {
        alert("Title and Description Rating are necessary");
      }
      setLoading(false);
      return;
    }

    if (comment.comment === "") {
      alert("Comment may not be left blank");
      setLoading(false);
      return;
    }

    if (!post.mediaUrl) {
      comment.imageRating = null;
    }

    console.log(comment);

    const newComment = await fetch(
      `http://localhost:8000/posts/${post.id}/comment/add`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          category: post.category,
        },
        body: JSON.stringify(comment),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        return data;
      })
      .catch((error) => console.log(error.message));

    post.comments.push(newComment);

    console.log(post);

    var commentModalDOM = document.getElementById("commentModal");
    var commentModal = Modal.getInstance(commentModalDOM);

    commentModal.hide();

    setLoading(false);
    setTitleRating("");
    setDescriptionRating("");
    setImageRating("");
    setModalComment("");
  };

  return (
    <div className="post">
      <div className="card shadow-sm mb-4" id={post.id}>
        <div className="card-body">
          <div className="row">
            <div className="col-2 col-lg-1 col-md-1 col-sm-2 ps-md-1 pe-md-0 ps-lg-3 pe-lg-3 px-1">
              <img
                src={post.profilePic}
                className="img-fluid"
                style={{ borderRadius: "50%" }}
                alt=""
              />
            </div>
            <div className="col-10 col-md-10 col-sm-10">
              <h5 className="mb-1">{post.author}</h5>
              <span>{moment(post.date).format("HH:mm, DD MMM 'YY")}</span>
            </div>
          </div>
          <div className="row mt-2">
            <h5>{post.title}</h5>
            <p style={{ textAlign: "justify" }}>{post.description}</p>
          </div>
          {post.mediaUrl && (
            <div className="row mb-3">
              <div className="col-xl-10 offset-xl-1">
                <img src={post.mediaUrl} className="img-fluid" alt="" />
              </div>
            </div>
          )}
          <span
            className="px-2 rounded bg-warning text-white"
            style={{ display: "inline" }}
          >
            {capitalizeFirstLetter(post.category)}
          </span>
          {pathname !== "/" && pathname !== "/myPosts" && (
            <div>
              <br />
              <button
                className="btn main-color text-white shadow-sm"
                data-bs-toggle="modal"
                data-bs-target="#commentModal" //Insert modal div name
              >
                <i className="bi bi-chat-left me-2"></i>
                Comment
              </button>
            </div>
          )}

          <div
            className="modal"
            id="commentModal"
            tabIndex="-1"
            aria-labelledby="staticBackdropLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-dialog-centered modal-xl">
              <div className="modal-content">
                <div className="modal-header">
                  <h4 className="modal-title" id="exampleModalLabel">
                    Add a Comment
                  </h4>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <form>
                    <div className="mb-3 row">
                      <div className="col-lg-4">
                        <label className="form-label">
                          Title {titleRating}
                          <span className="text-danger">*</span>
                        </label>
                        <select
                          className="form-select"
                          aria-label="Default select example"
                          value={titleRating}
                          onChange={(e) => {
                            setTitleRating(e.target.value);
                          }}
                        >
                          <option selected value="" disabled>
                            Select rating
                          </option>
                          <option value="True">True</option>
                          <option value="Partially True">Partially True</option>
                          <option value="False">False</option>
                        </select>
                      </div>
                      <div className="col-lg-4">
                        <label className="form-label">
                          Description<span className="text-danger">*</span>
                        </label>
                        <select
                          className="form-select"
                          aria-label="Default select example"
                          value={descriptionRating}
                          onChange={(e) => {
                            setDescriptionRating(e.target.value);
                          }}
                        >
                          <option selected value="" disabled>
                            Select rating
                          </option>
                          <option value="True">True</option>
                          <option value="Partially True">Partially True</option>
                          <option value="False">False</option>
                        </select>
                      </div>
                      <div className="col-lg-4">
                        <label className="form-label">
                          Image
                          {!post.mediaUrl ? (
                            ""
                          ) : (
                            <span className="text-danger">*</span>
                          )}
                        </label>
                        <select
                          className="form-select"
                          aria-label="Default select example"
                          disabled={!post.mediaUrl ? true : false}
                          value={imageRating}
                          onChange={(e) => {
                            setImageRating(e.target.value);
                          }}
                        >
                          <option selected value="" disabled>
                            Select rating
                          </option>
                          <option value="True">True</option>
                          <option value="Partially True">Partially True</option>
                          <option value="False">False</option>
                        </select>
                      </div>
                    </div>
                    <div className="row mb-3">
                      <div className="col-lg-12 ">
                        <label className="form-label">
                          Comment <span className="text-danger">*</span>
                        </label>
                        <textarea
                          type="text"
                          className="form-control"
                          value={modalComment}
                          rows="5"
                          placeholder="Explain the your ratings for each aspect"
                          onChange={(e) => {
                            setModalComment(e.target.value);
                          }}
                        />
                      </div>
                    </div>

                    <div className="row text-center">
                      <p>
                        <span
                          className="text-danger"
                          style={{ fontSize: "1.25rem" }}
                        >
                          *
                        </span>{" "}
                        - marked fields are necessary
                      </p>
                    </div>
                  </form>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>

                  {!loading ? (
                    <button
                      type="button"
                      className="btn main-color text-white"
                      onClick={(e) => {
                        handleComment(e);
                      }}
                    >
                      Add Comment
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="btn main-color text-white"
                      onClick={(e) => {
                        handleComment(e);
                      }}
                      disabled
                      style={{ width: "8rem" }}
                    >
                      <ReactLoading
                        type="spinningBubbles"
                        height="2rem"
                        width="2rem"
                        className="mx-auto"
                      />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          <hr />
          {post.comments.length === 0 && (
            <p
              className="text-center my-2"
              style={{
                color: "#535353",
                fontSize: "1.25rem",
                fontStyle: "italic",
              }}
            >
              No Commments Yet
            </p>
          )}
          {post.details === false && post.comments.length > 0 && (
            <h5 className="mb-3">Top Comment</h5>
          )}
          {post.comments &&
            post.details === false &&
            post.comments.map((comment) => {
              return (
                <Comment
                  comment={comment}
                  category={post.category}
                  rateable={false}
                />
              );
            })}
          {post.details === true && post.comments.length > 0 && (
            <h5 className="mb-3">Comments</h5>
          )}
          {post.comments &&
            post.details === true &&
            post.comments.map((comment) => {
              return (
                <Comment
                  comment={comment}
                  category={post.category}
                  post_id={post.id}
                  rateable={true}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Post;
