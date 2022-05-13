import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { Link } from "react-router-dom";
import { useState } from "react/cjs/react.development";
import { storage } from "../Firebase/config";
import Navbar from "../Navbar/Navbar";
import "./CreatePost.css";
import { useAuth } from "../Contexts/AuthContext";
import ReactLoading from "react-loading";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const [postSuccess, setPostSuccess] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [showUploadProgress, setShowUploadProgress] = useState(false);
  const { currentUser } = useAuth();

  async function uploadTaskPromise(file) {
    return new Promise(function (resolve, reject) {
      const storageRef = ref(storage, `/images/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        function (snapshot) {
          var progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setUploadProgress(progress);
          console.log("Upload is " + progress + "% done");
        },
        function error(err) {
          console.log("error", err);
          reject();
        },
        function complete() {
          getDownloadURL(uploadTask.snapshot.ref).then(function (downloadURL) {
            resolve(downloadURL);
          });
        }
      );
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    var post = {
      title: title.trim(),
      description: description.trim(),
      mediaUrl: null,
      category: category.trim(),
      authorId: currentUser.uid,
      date: new Date(),
    };

    if (file) {
      if (file["type"].split("/")[0] !== "image") {
        alert("Please select an image file to upload");
        setLoading(false);
        return false;
      }

      setShowUploadProgress(true);
      const storageUrl = await uploadTaskPromise(file);
      post["mediaUrl"] = storageUrl;
    }

    if (post.title === "" || post.description === "" || post.category === "") {
      alert("Title, Description and Category are necessary fields");
      setLoading(false);
      return;
    }

    if (post.category.split(" ").length !== 1) {
      alert("Please enter a single-word category");
      setLoading(false);
      return;
    }

    console.log(post);

    fetch("http://localhost:8000/posts/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(post),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setPostSuccess(true);
        setTitle("");
        setDescription("");
        setFile(null);
        setCategory("");
        setLoading(false);
      })
      .catch((error) => {
        console.log(error.message);
        setLoading(false);
      });
  };

  return (
    <div className="create-post">
      <Navbar />
      <div className="container my-5">
        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-body">
                <h1 className="card-title">Create A New Post</h1>
                <hr />
                {postSuccess && (
                  <div
                    className="alert alert-success text-center"
                    style={{ fontSize: "1.15rem" }}
                    role="alert"
                  >
                    Post created successfully! Go to the{" "}
                    <Link to="/">Homepage</Link> to view it
                  </div>
                )}
                <form
                  onSubmit={(e) => {
                    handleSubmit(e);
                  }}
                >
                  <div className="mb-3 row">
                    <div className="col-lg-1 text-center">
                      {title === "" ? (
                        <i className="bi bi-circle check-icon" />
                      ) : (
                        <i className="bi bi-check-circle-fill check-icon success" />
                      )}
                    </div>
                    <div className="col-lg-1 pt-1">
                      <label className="form-label">
                        Title<span className="text-danger">*</span>
                      </label>
                    </div>
                    <div className="col-lg-10">
                      <input
                        type="text"
                        className="form-control"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Give the post an apt title"
                      />
                    </div>
                  </div>
                  <div className="mb-3 row">
                    <div className="col-lg-1 text-center">
                      {description === "" ? (
                        <i className="bi bi-circle check-icon" />
                      ) : (
                        <i className="bi bi-check-circle-fill check-icon success" />
                      )}
                    </div>
                    <div className="col-lg-1 pt-1">
                      <label className="form-label">
                        Description<span className="text-danger">*</span>
                      </label>
                    </div>
                    <div className="col-lg-10">
                      <textarea
                        type="text"
                        className="form-control"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Describe the information in detail"
                      />
                    </div>
                  </div>
                  <div className="mb-3 row">
                    <div className="col-lg-1 text-center">
                      {file === null ? (
                        <i className="bi bi-circle check-icon" />
                      ) : (
                        <i className="bi bi-check-circle-fill check-icon success" />
                      )}
                    </div>
                    <div className="col-lg-1 pt-1">
                      <label className="form-label">Image</label>
                    </div>
                    <div className="col-lg-10">
                      <input
                        type="file"
                        accept="image/*"
                        className="form-control"
                        onChange={(e) => {
                          setFile(e.target.files[0]);
                        }}
                      />
                      {showUploadProgress && (
                        <div className="progress mt-2">
                          <div
                            className="progress-bar progress-bar-striped progress-bar-animated"
                            role="progressbar"
                            style={{
                              width: `${uploadProgress}%`,
                              backgroundColor: "#00b900",
                            }}
                          >
                            {uploadProgress}%
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="mb-3 row">
                    <div className="col-lg-1 text-center">
                      {category === "" ? (
                        <i className="bi bi-circle check-icon" />
                      ) : (
                        <i className="bi bi-check-circle-fill check-icon success" />
                      )}
                    </div>
                    <div className="col-lg-1 pt-1">
                      <label className="form-label">
                        Category<span className="text-danger">*</span>
                      </label>
                    </div>
                    <div className="col-lg-10">
                      <input
                        type="text"
                        className="form-control"
                        value={category}
                        onChange={(e) => {
                          setCategory(e.target.value);
                        }}
                        placeholder="Specify a one-word category the information falls under"
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
                  <div className="row my-2">
                    <div className="col-lg-2 offset-lg-5">
                      <button
                        type="submit"
                        className="btn main-color text-white"
                        disabled={loading}
                        style={{ width: "100%" }}
                      >
                        {loading ? (
                          <ReactLoading
                            type="spinningBubbles"
                            color="white"
                            height="2rem"
                            width="2rem"
                            className="mx-auto mb-1"
                          ></ReactLoading>
                        ) : (
                          "Submit"
                        )}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
