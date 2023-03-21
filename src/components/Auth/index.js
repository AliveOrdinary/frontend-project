import React, { useContext } from "react";
// import authImg from "../../assets/authImg.png";
import { auth } from "../../firebaseconfig";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { UserContext } from "../../context/userContext";
import { useNavigate } from "react-router-dom";

const Auth = ({ userType }) => {
  const provider = new GoogleAuthProvider();
  const [userData, dispatch] = useContext(UserContext);
  const navigate = useNavigate();

  const redirectUser = () => {
    if (userType === "candidate") {
      if (
        //user exists in database
        false
      ) {
        navigate("/candidate/profile");
      } else {
        navigate("/candidate/onboarding");
      }
    } else {
      if (false) {
        navigate("/employer/profile");
      } else {
        navigate("/employer/onboarding");
      }
    }
  };
  const signIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API
        // console.log(result);
        const { user } = result;
        const { displayName, email, photoURL } = user;
        dispatch({
          type: "LOGIN",
          payload: {
            displayName,
            email,
            photoURL,
          },
        });
        console.log(userData);
        redirectUser();
      })
      .catch((error) => {
        // Handle Errors here.
        console.log(error);
      });
  };

  return (
    <div className="auth-container">
      <h1>Welcome {userType}</h1>
      <h3>Please Sign In</h3>
      <div>
        <button onClick={signIn}>Sign In with Google</button>
      </div>
    </div>
  );
};

export default Auth;
