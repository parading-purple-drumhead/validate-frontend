import { Route, Routes } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import PostDetails from "../Post Details/PostDetails";
import PostList from "../Post List/PostList";

const Home = () => {
  return (
    <div className="home-page">
      <Navbar />
      <PostList />
    </div>
  );
};

export default Home;
