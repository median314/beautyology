import {
  AspectRatio,
  Box,
  Button,
  Center,
  Divider,
  Heading,
  HStack,
  Image,
  ListItem,
  OrderedList,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import {
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  setDoc,
} from "firebase/firestore";
import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { IoArrowBack } from "react-icons/io5";
import { GrFavorite } from "react-icons/gr";
import { Link, useNavigate, useParams } from "react-router-dom";
import { db } from "../config/firebase";
import AuthContext from "../Hook/AuthContext";
import store from "store";
import image from "../Assets/singleCourseimage.png";

const CourseSinglePage = () => {
  const [users, setUsers] = useState();
  const [courses, setCourses] = useState();
  const [video, setVideo] = useState(
    "https://drive.google.com/file/d/1v65E5Cq9wFLK9KGVWFtRTgnKKXvAsW9w/preview"
  );
  const [dataVideo, setDataVideo] = useState();
  const param = useParams();
  const navigate = useNavigate();
  const user_data = store.get("user_data");
  const { currentUser } = useContext(AuthContext);
  const toast = useToast();

  const getCoursesData = async () => {
    try {
      const docRef = doc(db, `course/${param.id}`);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        // console.log("Document Data", docSnap.data());
        setCourses(docSnap.data());
      } else {
        console.log("No Document");
      }
    } catch (error) {
      console.log(error, "ini error");
    }
  };

  const getDataUser = async () => {
    try {
      const docRef = doc(db, "users", currentUser.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setUsers(docSnap.data());
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }

      // console.log(queryData, "data produk");
    } catch (error) {
      console.log(error, "ini error");
    }
  };

  useEffect(() => {
    getDataUser();

    return () => {};
  }, []);

  //cart
  const handleCart = async () => {
    let cartData = {};
    cartData = { ...courses };

    try {
      const ref = doc(db, "cart", currentUser.uid);
      await setDoc(
        ref,
        {
          uid: currentUser.uid,
          data: arrayUnion({ ...cartData, qty: 1 }),
          createdAt: new Date(),
        },
        { merge: true }
      );

      cartData = {};
      // loadingClose();

      toast({
        title: "Beautyology",
        description: "Berhasil menambahkan product ke cart.",
        status: "success",
      });
    } catch (error) {
      // loadingClose();
      toast({
        title: "Beautyology",
        description: error.message,
        status: "error",
      });
    }
  };

  //wishlist
  const handleWishlist = async () => {
    let firebaseData = {};
    firebaseData = { ...courses };

    // loadingShow();

    try {
      const ref = doc(db, "wishlist", currentUser.uid);
      await setDoc(
        ref,
        {
          uid: currentUser.uid,
          data: arrayUnion(firebaseData),
          createdAt: new Date(),
        },
        { merge: true }
      );

      firebaseData = {};
      // loadingClose();

      toast({
        title: "Beautyology",
        description: "Berhasil menambahkan product ke wishlist.",
        status: "success",
      });
    } catch (error) {
      // loadingClose();
      toast({
        title: "Beautyology",
        description: error.message,
        status: "error",
      });
    }
  };

  const viewVideo = (id, index) => {
    // videos adalah hasil dataVideo diambil id nya sesuai id yang di parameter
    setDataVideo(id);
    console.log(id);
    // const videos = courses?.content?.find((x) => x.id === identifier);
    setVideo(dataVideo.video);
    console.log(dataVideo.video);
    // setVideo(videos.content);
  };

  useEffect(() => {
    getCoursesData();

    return () => {
      setCourses();
    };
  }, []);

  return (
    <Box
      overflowY={"auto"}
      css={{
        "&::-webkit-scrollbar": {
          width: "0",
        },
      }}
    >
      <HStack pos={"relative"} p={4} justifyContent={"space-between"}>
        <Link to={"/course"}>
          <Box>
            <IoArrowBack size={"1.3em"} />
          </Box>
        </Link>
      </HStack>
      <Box>
        {courses ? (
          <Box>
            <Box>
              <Box
                py={3}
                bg={"brand.100"}
                pos={"sticky"}
                zIndex={1}
                color={"blackAlpha.800"}
              >
                <Text
                  textTransform={"uppercase"}
                  fontWeight={"bold"}
                  align={"center"}
                >
                  {courses.name}
                </Text>
                <Text align={"center"}>Bersama - {courses.mentor}</Text>
              </Box>
              <Image src={courses.image} />
            </Box>

            <Box p={5}>
              <Text align={"center"} fontSize={12}>
                {courses.description}
              </Text>
            </Box>
            <Divider />
            <Text
              align={"center"}
              mt={2}
              fontWeight={"bold"}
              color={"blackAlpha.600"}
            >
              Preview Course
            </Text>
            <AspectRatio width="100%" ratio={16 / 9} mt={5}>
              <iframe title="naruto" src={video} allowFullScreen />
            </AspectRatio>
          </Box>
        ) : null}

        {users?.subscription?.basic_course === true ? null : (
          <Box pt={4} align={"center"} mb={4}>
            <Button
              bg={"brand.100"}
              color="white"
              size={"sm"}
              w={"28em"}
              ml={3}
              onClick={() => handleCart()}
            >
              Add To Cart
            </Button>
          </Box>
        )}

        <Box>
          <Heading size={"sm"} align={"center"} my={5}>
            Detail Materi Video
          </Heading>
        </Box>

        <Box px={5} py={2} boxShadow={"md"}>
          <Stack
            px={4}
            py={2}
            h={250}
            overflowY={"scroll"}
            css={{
              "&::-webkit-scrollbar": {
                width: "0",
              },
            }}
          >
            {users?.subscription.basic_course === true ||
            users?.role === "admin" ? (
              <>
                {courses?.content?.map((x, i) => (
                  <>
                    {/* <AspectRatio width="100%" ratio={16 / 9} mt={5}>
                    <iframe title="naruto" src={x.source} allowFullScreen />
                  </AspectRatio> */}
                    <Box key={i} cursor="pointer">
                      <Text
                        onClick={() => viewVideo(x)}
                        color={"blackAlpha.700"}
                      >
                        {x.name}
                      </Text>
                      <Divider py={1} />
                    </Box>
                  </>
                ))}
              </>
            ) : (
              <>
                <Stack h={200}>
                  <Center>
                    <Box align={"center"} boxShadow={"md"} p={5}>
                      <Text>
                        Beli Produk ini untuk menonton penuh coursenya
                      </Text>
                      <Image boxSize={200} src={image} />
                    </Box>
                  </Center>
                </Stack>
              </>
            )}
          </Stack>
        </Box>
      </Box>
    </Box>
  );
};

export default CourseSinglePage;
