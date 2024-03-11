import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";

function ProtectedRoute(props) {
  const loginData = useSelector((state) => state.user);
  const location = useLocation().pathname;
  const navigate = useNavigate();
  useEffect(() => {
    if (!loginData.userName) {
      navigate("/");
    }
    if (loginData.type === "user" && location === "/admin") {
      navigate("/user");
    }
    if (loginData.type === "admin" && location === "/user") {
      navigate("/admin");
    }
  }, [loginData, location]);

  return props.children;
}

export default ProtectedRoute;
