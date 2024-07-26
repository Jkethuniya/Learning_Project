import React, { useEffect, useState } from "react";

import { Routes, Route, useNavigate } from "react-router-dom"; 
import Login from "./components/Login";
import Home from "./components/Home";
import {
  getAuth,
  GoogleAuthProvider,
  inMemoryPersistence,
  signInWithPopup,
} from "firebase/auth";


// import {
//   Dashboard,
//   Home,
//   Loader,
//   Login,
//   MusicPlayer,
//   UserProfile,
// } from "./components";
import { app } from "./config/firebase.config";
// import { getAllSongs, validateUser } from "./api";


// import { useStateValue } from "./Context/StateProvider";
// import { actionType } from "./Context/reducer";
// import { motion, AnimatePresence } from "framer-motion";
import "./App.css";
const App = () => {

  const firebaseAuth = getAuth(app);
  const navigate = useNavigate();
  // const [{ user, allSongs, song, isSongPlaying, miniPlayer }, dispatch] =
  //   useStateValue();
  // const [isLoading, setIsLoading] = useState(false);

  const [auth, setAuth] = useState(
    false || window.localStorage.getItem("auth") === "true"
  )


  useEffect(() => {
    // setIsLoading(true);
    firebaseAuth.onAuthStateChanged((userCred) => {
      if (userCred) {
        userCred.getIdToken().then((token) => {
          console.log(token);
          window.localStorage.setItem("auth", "true");
          // validateUser(token).then((data) => {
            // dispatch({
            //   type: actionType.SET_USER,
            //   user: data,
            // });
          // });
        });
        // setIsLoading(false);
      } else {
        setAuth(false);
        // dispatch({
        //   type: actionType.SET_USER,
        //   user: null,
        // });
        // setIsLoading(false);
        window.localStorage.setItem("auth", "false");
        navigate("/login");
      }
    });
  }, []); 
  return (
    <div>
       <Routes>
          <Route path="/login" element={<Login setAuth={setAuth}/>} />
          <Route path="/*" element={<Home />} />
          {/* <Route path="/dashboard/*" element={<Dashboard />} />
          <Route path="/userProfile" element={<UserProfile />} /> */}
        </Routes>
    </div>
  )
}

export default App;
