import {
  createBrowserRouter,
  createRoutesFromElements,
  Outlet,
  Route,
  Navigate,
} from "react-router";
import AppLayout from "../Layout/AppLayout";
import AppHomePage from "../pages/AppHomePage";
import AppMoviesLetter from "../pages/AppMoviesLetter";
import AppMovie from "../pages/AppMovie";
import ScrollToTop from "../components/ScrollToTop";
import SignUp from "../pages/SignUpUI";
import LoginUI from "../pages/LoginUI";
import AppProfile from "../pages/AppProfile";
import AppAccount from "../pages/AppAccount";
import { useContext } from "react";
import SessionContext from "../context/SessionContext";
import { getMovieId } from "../utils/fetch";

function ProtectedRoutes() {
  const session = useContext(SessionContext);

  if (!session) {
    return <Navigate to={"/"} />;
  }
  return <Outlet />;
}

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<AppLayout />}>
      <Route path="/" element={<AppHomePage />} />
      <Route path="/movies/:letter" element={<AppMoviesLetter />} />
      <Route path="/movie/:title/:id" element={<AppMovie />} loader={getMovieId} />
      <Route path="/login" element={<LoginUI />} />
      <Route path="/signUp" element={<SignUp />} />
      <Route element={<ProtectedRoutes />}>
        <Route path="/profile" element={<AppProfile />} />
        <Route path="/settings" element={<AppAccount />} />
      </Route>
    </Route>
  )
);

export default router;
