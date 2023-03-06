import { Outlet } from "react-router-dom";
import Header from "./components/Header"
import VerifyUser from "./views/PrivatePages/VerifyUser";

const App = () => {

  return (
    <>
      <Header />
      <VerifyUser />
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default App;
