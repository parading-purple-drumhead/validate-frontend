import StarRatings from "react-star-ratings/build/star-ratings";
import { useState } from "react/cjs/react.development";
import "./Comment.css";
import moment from "moment";
import { useAuth } from "../Contexts/AuthContext";
import { useEffect } from "react/cjs/react.production.min";

const Comment = ({ comment, category, rateable, post_id }) => {
  const [rating, setRating] = useState(comment.userRating);
  const { currentUser } = useAuth();

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const rateComment = (userRating) => {
    setRating(userRating);

    comment.ratings[currentUser.uid] = userRating;

    console.log(comment);

    fetch(`http://localhost:8000/posts/${post_id}/comment/${comment.id}/rate`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(comment),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      });
  };

  return (
    <div className="row px-2">
      <div
        className="col-lg-12 px-2 py-3 mb-3"
        style={{
          backgroundColor: "#ededed",
          borderRadius: "1rem",
        }}
      >
        <div className="row px-2">
          <div className="col-lg-10">
            <div className="row mb-2">
              <div className="col-1">
                <img
                  src={comment.profilePic}
                  alt=""
                  className="img-fluid"
                  style={{ borderRadius: "50%" }}
                />
              </div>
              <div className="col-11">
                <span className="me-2">
                  <b>{comment.author}</b>
                  {currentUser.uid === comment.authorId && " (You)"}
                </span>
                {comment.verified && (
                  <span
                    className="text-white px-2"
                    style={{
                      borderRadius: "1rem",
                      backgroundColor: "#1ca063",
                      fontSize: "0.75rem",
                    }}
                  >
                    Verified in {capitalizeFirstLetter(category)}
                  </span>
                )}

                <div className="comment-rating">
                  <StarRatings
                    rating={comment.rating}
                    starRatedColor="orange"
                    starEmptyColor="#939393"
                    numberOfStars={5}
                    starDimension="1rem"
                    starSpacing="0.05rem"
                    name="rating"
                    isSelected={true}
                  />
                  <span className="px-2">
                    <b>{comment.rating}/5</b> ({comment.numberOfRatings}){" "}
                  </span>
                </div>
              </div>
            </div>
            <div className="comment-params">
              <span>
                <b>Title - </b>
                <i>True</i>
              </span>
              &nbsp; &nbsp;
              <span>
                <b>Description - </b>
                <i>Partially True</i>
              </span>
              &nbsp; &nbsp;
              <span>
                <b>Image - </b>
                <i>False</i>
              </span>
            </div>

            <p className="m-0" style={{ textAlign: "justify" }}>
              {comment.comment}
            </p>
          </div>
          <div className="col-lg-2 row align-items-center text-center">
            {currentUser.uid !== comment.authorId && rateable && (
              <div>
                Your rating
                <StarRatings
                  rating={rating}
                  changeRating={(rating) => {
                    rateComment(rating);
                  }}
                  starRatedColor="orange"
                  starEmptyColor="#939393"
                  starHoverColor="#198754"
                  numberOfStars={5}
                  starDimension="1.25rem"
                  starSpacing="0.1rem"
                  name="rating"
                  isSelected={true}
                />
              </div>
            )}
            {!rateable && (
              <div>
                Your rating
                <StarRatings
                  rating={rating}
                  starRatedColor="orange"
                  starEmptyColor="#939393"
                  numberOfStars={5}
                  starDimension="1.25rem"
                  starSpacing="0.1rem"
                  name="rating"
                  isSelected={true}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comment;
