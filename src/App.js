import logo from './logo.svg';
import './App.css';
import { Container, Spacer, Stack } from '@chakra-ui/react';
import AppBarHeader from './Components/AppBars/AppBarHeader';
import MainRoute from './Routes/MainRoute';
import AppBarFooter from './Components/AppBars/AppBarFooter';
// import { UserAuthContextProvider } from './Hook/UserAuthContext';

function App() {
  return (
   <>
   {/* <UserAuthContextProvider> */}
   <Container p='0' shadow="2xl" width="md">
    <Stack height="100vh">
      <AppBarHeader />
      <MainRoute />
      <Spacer />
      <AppBarFooter />
    </Stack>
   </Container>
   {/* </UserAuthContextProvider> */}
   </>
  );
}

export default App;
