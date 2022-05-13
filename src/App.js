import { Route, Routes } from "react-router-dom";
import Login from "./Login/Login";
import logo from "./logo.svg";
import PostDetails from "./Post Details/PostDetails";
import { AuthProvider } from "./Contexts/AuthContext";
import Home from "./Home/Home";
import PrivateRoute from "./Private Routes/PrivateRoutes";
import CreatePost from "./New Post/CreatePost";
import MyPosts from "./My Posts/MyPosts";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Routes>
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route
            path="/post/:post_id"
            element={
              <PrivateRoute>
                <PostDetails />
              </PrivateRoute>
            }
          />
          <Route
            path="/newPost"
            element={
              <PrivateRoute>
                <CreatePost />
              </PrivateRoute>
            }
          />
          <Route
            path="/myPosts"
            element={
              <PrivateRoute>
                <MyPosts />
              </PrivateRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
