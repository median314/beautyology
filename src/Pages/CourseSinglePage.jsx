import {
  AspectRatio,
  Box,
  Button,
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
  doc,
  getDoc,
  onSnapshot,
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

const CourseSinglePage = () => {
  const [courses, setCourses] = useState();
  const [video, setVideo] = useState(
    "https://www.youtube.com/embed/QhBnZ6NPOY0"
  );
  const param = useParams();
  const navigate = useNavigate();
  const user_data = store.get("user_data");
  const { currentUser } = useContext(AuthContext);
  const toast = useToast();

  const dataVideo = [
    {
      id: 1,
      name: "Kenali Tipe Skin milikmu",
      source: "https://www.youtube.com/embed/kI0viSKCRCA",
    },
    {
      id: 2,
      name: "Kenali Tipe Jerawat",
      source: "https://www.youtube.com/embed/kI0viSKCRCA",
    },
    {
      id: 3,
      name: "Apa aku miskin?",
      source: "https://www.youtube.com/embed/kI0viSKCRCA",
    },
    {
      id: 4,
      name: "Apa aku lorem ipsum?",
      source: "https://www.youtube.com/embed/kI0viSKCRCA",
    },
    {
      id: 5,
      name: "Kesuksesan kulit cantik",
      source: "https://www.youtube.com/embed/kI0viSKCRCA",
    },
  ];

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

  const viewVideo = (identifier, index) => {
    // videos adalah hasil dataVideo diambil id nya sesuai id yang di parameter
    const videos = dataVideo.find((x) => x.id === identifier);
    // console.log(videos.source);
    setVideo(videos.source);
  };

  useEffect(() => {
    getCoursesData();

    return () => {
      setCourses();
    };
  }, []);

  return (
    <Box overflowY={"auto"}>
      <HStack pos={"relative"} p={4} justifyContent={"space-between"}>
        <Link to={"/course"}>
          <Box>
            <IoArrowBack size={"1.3em"} />
          </Box>
        </Link>
        <Box
          onClick={() => handleWishlist()}
          cursor={"pointer"}
          align={"right"}
        >
          <GrFavorite size={"2em"} />
        </Box>
      </HStack>
      <Box>
        {courses ? (
          <Box>
            <Box>
              <Box
                pl="5"
                bg={"black"}
                pos={"sticky"}
                zIndex={1}
                color={"white"}
              >
                <Text textTransform={"uppercase"} fontWeight={"bold"}>
                  {courses.name}
                </Text>
                <Text>Bersama - {courses.mentor}</Text>
              </Box>
              <Image src={courses.image} />
            </Box>

            <Box p={5}>
              <Text align={"center"} fontSize={12}>
                In this program, you will Officia tempor et nostrud quis
                consectetur ea minim velit proident cillum incididunt. Ea
                deserunt aliqua duis fugiat ad ea fugiat velit occaecat est ea
                ea enim. Ea excepteur minim officia nostrud tempor eu culpa id.{" "}
              </Text>
            </Box>
            <Divider />
            <Text align={"center"} mt={2} fontWeight={"bold"}>
              Preview Course
            </Text>
            <AspectRatio width="100%" ratio={16 / 9} mt={5}>
              <iframe title="naruto" src={video} allowFullScreen />
            </AspectRatio>
          </Box>
        ) : null}
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

        <Box>
          <Heading size={"sm"} align={"center"} mb={2}>
            Detail Materi Video
          </Heading>

          <Stack justify={"center"} px={5} py={2}>
            {dataVideo?.map((x, i) => (
              <>
                {/* <AspectRatio width="100%" ratio={16 / 9} mt={5}>
                  <iframe title="naruto" src={x.source} allowFullScreen />
                </AspectRatio> */}
                <Box key={i} cursor="pointer">
                  <Text onClick={() => viewVideo(x.id, i)}>{x.name}</Text>
                  <Divider py={1} />
                </Box>
              </>
            ))}
            {/* <OrderedList listStyleType={"none"}>
              <ListItem py={2}>Part 1 - Kenali Tipe Skin milikmu</ListItem>
              <ListItem py={2}>Part 2 - Kenali Tipe Jerawat</ListItem>
              <ListItem py={2}>Part 3 - Apa aku miskin?</ListItem>
              <ListItem py={2}>Part 4 - Apa aku lorem ipsum?</ListItem>
              <ListItem py={2}>Part 5 - Kesuksesan kulit cantik</ListItem>
            </OrderedList> */}
          </Stack>
        </Box>
      </Box>
    </Box>
  );
};

export default CourseSinglePage;
