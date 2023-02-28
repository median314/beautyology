import {
  Box,
  Button,
  HStack,
  Image,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";
import { collection, doc, getDocs, query } from "firebase/firestore";
import React, { useEffect } from "react";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { db } from "../config/firebase";

const CoursesPage = () => {
  const [courses, setCourses] = useState();

  const getDataCourses = async () => {
    try {
      const q = query(collection(db, "course"));
      const querySnapshot = await getDocs(q);
      const queryData = [];

      querySnapshot.forEach((doc) => {
        let forData = doc.data();
        forData.id = doc.id;
        queryData.push(forData);
      });

      setCourses(queryData);
      // console.log(queryData, "data produk");
    } catch (error) {
      console.log(error, "ini error");
    }
  };

  useEffect(() => {
    getDataCourses();

    return () => {
      setCourses();
    };
  }, []);

  return (
    <Box overflow={"auto"}>
      <Box>
        <Image src="https://neilpatel.com/wp-content/uploads/fly-images/99366/skincare-marketing-1200x675-c.jpg" />
      </Box>
      <Box p={2}>
        <Text fontWeight={"bold"} align={"center"}>
          List of Course
        </Text>
        <SimpleGrid spacing={5} p={5}>
          {courses?.length > 0
            ? courses.map((course, i) => (
                <Link key={i} to={`/course/${course.id}`}>
                  <Box borderRadius={5} overflow={"hidden"} boxShadow={"md"}>
                    <Image src={course.image} />
                    <Stack justifyContent={"center"}>
                      <Text
                        justifyContent={"center"}
                        align={"center"}
                        fontSize={15}
                        fontWeight={"bold"}
                      >
                        {course.name}
                      </Text>
                      <HStack justifyContent={"center"}>
                        <Text
                          w={50}
                          align={"center"}
                          color={"white"}
                          bg={"#a18dca"}
                          fontSize={10}
                          fontWeight={"bold"}
                          p={0.5}
                          borderRadius={"3"}
                        >
                          {course.category.first}
                        </Text>
                        <Text
                          w={75}
                          align={"center"}
                          color={"white"}
                          bg={"#a18dca"}
                          fontSize={10}
                          fontWeight={"bold"}
                          p={0.5}
                          borderRadius={"3"}
                        >
                          {course.category.second}
                        </Text>
                      </HStack>
                    </Stack>
                    {/* <Text fontSize={13}>Rp {course.price}</Text> */}
                    <Text fontSize={13} align={"center"} py={1}>
                      Speaker : {course.mentor}
                    </Text>
                    <Box align={"center"} mb={3}>
                      <Button
                        size={"xs"}
                        bg={"brand.100"}
                        color={"white"}
                        w={"20em"}
                      >
                        Details
                      </Button>
                    </Box>
                  </Box>
                </Link>
              ))
            : null}
        </SimpleGrid>
      </Box>
    </Box>
  );
};

export default CoursesPage;
