import { useToast } from "@chakra-ui/react";
import { async } from "@firebase/util";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../config/firebase";
import store from "store";
import AuthContext from "./AuthContext";

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();
  const [subscriptionUser, setSubscriptionUser] = useState();
  const [loading, setLoading] = useState(true);
  const [productWishlist, setProductWishlist] = useState([]);
  const [cartList, setCartList] = useState([]);
  const navigate = useNavigate();
  const toast = useToast();

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password)
      .then(async (response) => {
        try {
          const docRef = doc(db, "users", response.user.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            store.set("user_data", docSnap.data());
          } else {
            console.log("No Document");
          }
        } catch (error) {
          console.log(error, "ini error");
        }

        toast({
          title: "Success Login",
          description: `Success Login account ${response.user.displayName} `,
          status: "success",
          duration: 10000,
          isClosable: true,
          position: "top-right",
        });

        return navigate("/");
      })
      .catch((error) => {
        toast({
          title: "Something wrong !",
          description: error.message,
          status: "error",
          duration: 10000,
          isClosable: true,
          position: "top-right",
        });
      });
  };

  const signOut = () => {
    return auth.signOut();
  };

  const getSubscription = async () => {
    try {
      const docRef = doc(db, "users", currentUser.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setSubscriptionUser(docSnap.data());
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      console.log(error, "ini error");
    }

    return subscriptionUser;
  };

  const getUserStorage = () => {
    return store.get("user_data");
  };

  const signUp = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const getUser = () => {
    return auth.currentUser;
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    getDataCart();
    getDataWishlist();

    return () => {};
  }, [currentUser]);

  //cart
  const getDataCart = () => {
    if (currentUser) {
      try {
        onSnapshot(doc(db, "cart", currentUser.uid), (doc) => {
          // console.log(doc.data(), "ini data cart");
          setCartList(doc.data());
        });
      } catch (error) {
        console.log(error, "ini error");
      }
    }
  };

  //wishlist
  const getDataWishlist = () => {
    if (currentUser) {
      try {
        onSnapshot(doc(db, "wishlist", currentUser.uid), (doc) => {
          // console.log(doc.data(), "ini data wishlist");
          setProductWishlist(doc.data());
        });
      } catch (error) {
        console.log(error, "ini error");
      }
    }
  };

  const value = {
    currentUser,
    productWishlist,
    cartList,
    // tokenId,
    getUser,
    login,
    signOut,
    signUp,
    getSubscription,
    getUserStorage,
    getDataWishlist,
    getDataCart,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
