import { useNavigate } from "react-router-dom";
import { useState } from "react/cjs/react.development";
import { useAuth } from "../Contexts/AuthContext";
import "./Login.css";

const Login = () => {
  const { signInWithGoogle, currentUser } = useAuth();
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  if (currentUser) {
    navigate("/");
  }

  const handleSignUp = async () => {
    setLoading(true);
    await signInWithGoogle();
    setLoading(false);
    navigate("/");
  };

  return (
    <div className="login-page">
      <div style={{ backgroundColor: "rgba(0,0,0,0.4)" }}>
        <div className="container">
          <div className="row align-items-center" style={{ height: "100vh" }}>
            <div className="col-lg-6 text-center text-white">
              <h1>Welcome to Validate</h1>
              <h3>A crowdsourced fact-checking platform</h3>
            </div>
            <div className="col-lg-4 offset-lg-1 text-center">
              <div
                className="card"
                style={{ backgroundColor: "rgba(0,0,0,0.4)" }}
              >
                <div className="card-body">
                  <h3 className="card-title text-light mb-4">
                    Sign In To Get Started
                  </h3>
                  <div className="my-3">
                    <button
                      className="btn btn-primary shadow-sm"
                      disabled={loading}
                      onClick={handleSignUp}
                    >
                      <i className="bi bi-google me-4"></i>
                      Sign In with Google
                    </button>
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

export default Login;
