import React, { useContext } from "react";
// import authImg from "../../assets/authImg.png";
import { auth, db } from "../../firebaseconfig";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { UserContext } from "../../context/userContext";
import { useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";

const Auth = ({ userType }) => {
  const provider = new GoogleAuthProvider();
  const [userData, dispatch] = useContext(UserContext);
  const navigate = useNavigate();

  const redirectUser = async (email) => {
    let u = await getDoc(doc(db, "users", email));
    let userInfoFromDb = null;
    if (u.exists()) {
      userInfoFromDb = u.data();
    }
    if (userType === "candidate") {
      if (userInfoFromDb) {
        if (userInfoFromDb.userType === "candidate") {
          dispatch({
            type: "SET_USER_INFO",
            payload: userInfoFromDb,
          });
          navigate("/candidate/profile");
        } else {
          alert("This id is registered as employer");
          return;
        }
      } else {
        navigate("/candidate/onboarding");
      }
    } else {
      if (userInfoFromDb) {
        if (userInfoFromDb.userType === "employer") {
          dispatch({
            type: "SET_USER_INFO",
            payload: userInfoFromDb,
          });
          navigate("/employer/profile");
        } else {
          alert("This id is registered as candidate");
          return;
        }
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
        redirectUser(email);
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
