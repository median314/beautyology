import {
  Box,
  Center,
  Divider,
  Heading,
  HStack,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";
import moment from "moment";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { db } from "../config/firebase";
import AuthContext from "../Hook/AuthContext";

const Invoice = () => {
  const [invoice, setInvoice] = useState([]);
  const { currentUser } = useContext(AuthContext);

  const getDataInvoices = async (uid) => {
    try {
      const q = query(collection(db, "invoices"));
      const querySnapshot = await getDocs(q);
      const queryData = [];

      querySnapshot.forEach((doc) => {
        let forData = doc.data();
        forData.id = doc.id;
        queryData.push(forData);
      });

      console.log(queryData);
      setInvoice(queryData);
    } catch (error) {
      console.log(error, "ini error");
    }
  };

  useEffect(() => {
    getDataInvoices();

    return () => {};
  }, []);

  return (
    <Box overflow={"auto"}>
      <Stack p={4} spacing={3}>
        {invoice.length > 0 ? (
          invoice.map((x, i) => (
            <Box
              // border={"1px"}
              p={3}
              borderRadius={"md"}
              boxShadow={"md"}
              bg={"#f2f6ff"}
            >
              <Heading size={"md"} align={"center"} py={"2"}>
                Invoice {x.receiver}
              </Heading>
              <Text fontSize={14} align={"center"} pb={3}>
                {moment(x.createdAt.date).format("dddd, MMMM Do, YYYY")}
              </Text>
              <SimpleGrid spacing={2} columns={(1, null, 2)}>
                <Stack spacing={5}>
                  <Box>
                    <Text fontWeight={"bold"}>Alamat</Text>
                    <Text fontSize={14}>
                      {x.street}, {x.city}
                    </Text>
                  </Box>
                  <Box fontSize={14}>
                    <Text fontWeight={"bold"}>Item</Text>
                    {x?.data?.length > 0
                      ? x.data.map((item, i) => (
                          <Box>
                            <Text>{item.name}</Text>
                          </Box>
                        ))
                      : null}
                    {/* <Divider my={2} /> */}
                  </Box>
                </Stack>
                <Stack spacing={5}>
                  <Box>
                    <Text fontWeight={"bold"}>Penerima: {x.receiver}</Text>
                    <Text fontSize={14}>Telpon: {x.phoneNumber}</Text>
                  </Box>
                  <Center py={30}>
                    <Text
                      color={"#a18dca"}
                      fontSize={"2xl"}
                      fontWeight={"bold"}
                    >
                      Rp
                      {Intl.NumberFormat("en-ID", {
                        maximumSignificantDigits: 3,
                      }).format(x.totalPrice)}
                    </Text>
                  </Center>
                </Stack>
              </SimpleGrid>
            </Box>
          ))
        ) : (
          <Box>Tidak ada invoice</Box>
        )}
      </Stack>
    </Box>
  );
};

export default Invoice;
