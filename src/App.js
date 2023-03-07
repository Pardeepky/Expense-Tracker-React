import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import Header from "./components/Header"
import VerifyUser from "./views/PrivatePages/VerifyUser";
import { authActions } from "./store/auth";

const App = () => {
  const navigate = useNavigate();
  const auth = useSelector(state => state.auth.isAuthenticated);
  const dispatch = useDispatch();

  const stayLogin = () => {
    const token = localStorage.getItem('token')
    if (!!token) {
      dispatch(authActions.login(token))
    } 
    if(!auth) {
      navigate('/');
    }
  }

  useEffect(() => {
    stayLogin();
  },[])

  return (
    <>
      <Header />
      <VerifyUser />
      <main>
        <section>
          <Outlet />
        </section>
      </main>
    </>
  );
}

export default App;
