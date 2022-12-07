import "./App.css";
import Home from "./pages/home/Home";
import Profile from "./pages/Profile/Profile";
// import Auth from "./pages/Auth/Auth";
import Login from "./pages/Login/Login";
import SignUp from "./pages/SignUp/SignUp";
import Verify from "./pages/verify/verify";
import Chat from "./pages/Chat/Chat";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Admin from "./pages/Admin/Admin";
import UserManagement from "./pages/UserManagement/UserManagement";
import Followers from "./pages/Followers/Followers";
import PostManagement from "./pages/PostManagement/PostManagement";
import Reported from "./components/Reported/Reported";
function App() {
  const user = useSelector((state) => state.authReducer.authData);
  console.log(user, "verifyyyy");
  let admin = false;
  if (user) {
    admin = user.user.isAdmin;
    console.log(admin);
    // admin=false
  }
  var token = user?.user?.verified.email || user?.user?.verified.mobile;
  console.log(token, "token");
  let isRegistered = user ? true : false;
  console.log(isRegistered, "registertrue");
  let isloggedIn = token ? true : false;
  console.log(isloggedIn, "logintrue");

  return (
    <div className="App">
      <div className="blur" style={{ top: "-18%", right: "0" }}></div>
      <div className="blur" style={{ top: "36%", left: "-8rem" }}></div>
      <Routes>
        <Route
          path="/"
          element={
            isRegistered ? (
              isloggedIn ? (
                admin ? (
                  <Navigate to="../admin" />
                ) : (
                  <Navigate to="home" />
                )
              ) : (
                <Navigate to="/verify" />
              )
            ) : (
              <Navigate to="auth" />
            )
          }
        />
        <Route
          path="/verify"
          element={
            isRegistered ? (
              isloggedIn ? (
                <Navigate to="/home" />
              ) : (
                <Verify />
              )
            ) : (
              <Navigate to="../auth" />
            )
          }
        />
        <Route
          path="/home"
          element={
            isRegistered ? (
              isloggedIn ? (
                admin ? (
                  <Admin />
                ) : (
                  <Home />
                )
              ) : (
                <Navigate to="/verify" />
              )
            ) : (
              <Navigate to="../auth" />
            )
          }
        />
        <Route
          path="/auth"
          element={
            isRegistered ? (
              isloggedIn ? (
                admin ? (
                  <Navigate to="../admin" />
                ) : (
                  <Navigate to="../home" />
                )
              ) : (
                <Navigate to="/verify" />
              )
            ) : (
              <Login />
            )
          }
        />
        <Route
          path="/signup"
          element={
            isRegistered ? (
              isloggedIn ? (
                <Navigate to="../home" />
              ) : (
                <Navigate to="/verify" />
              )
            ) : (
              <SignUp />
            )
          }
        />
        <Route
          path="/profile/:id"
          element={isRegistered ? <Profile /> : <Navigate to="../auth" />}
        />
        <Route
          path="/followers"
          element={isRegistered ? <Followers /> : <Navigate to="../auth" />}
        />
        <Route
          path="/chat"
          element={isloggedIn ? <Chat /> : <Navigate to="../auth" />}
        />
        <Route
          path="/admin"
          element={admin ? <Admin /> : <Navigate to="../auth" />}
        />
        <Route path="/admin/users" element={<UserManagement />} />
        <Route path="/admin/posts" element={<PostManagement />} />
        <Route path="/admin/rposts" element={<Reported />} />
      </Routes>
    </div>
  );
}

export default App;
