import { doc, getDoc } from "firebase/firestore";
import React, { useState, useEffect, useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { db } from "../config/firebase";
import AuthContext from "../Hook/AuthContext";

function ProtectedRoutes({ children }) {
  const [role, setRole] = useState("");
  const { currentUser } = useContext(AuthContext);
  const location = useLocation();

  const getAdmin = async () => {
    try {
      const docRef = doc(db, "users", currentUser.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setRole(docSnap.data().role);
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      console.log(error, "ini erropr");
    }
  };

  useEffect(() => {
    getAdmin();
  }, []);

  if (!currentUser) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  if (!currentUser && !role === "user") {
    return <Navigate to="/error404" state={{ from: location }} replace />;
  }
  //   if (currentUser && role === "user") {
  //     return <Navigate to="/error404" state={{ from: location }} replace />;
  //   }
  if (currentUser) return children;
}

export default ProtectedRoutes;
