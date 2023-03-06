import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Header from "./components/Header"
import VerifyUser from "./views/PrivatePages/VerifyUser";

const App = () => {
  const navigate = useNavigate();

  const stayLogin = () => {
    const token = localStorage.getItem('token')
    const isLoggedIn = !!token
    if (!isLoggedIn) {
      navigate('/');
    }
  }

  useEffect(() => {
    stayLogin();
  })

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
