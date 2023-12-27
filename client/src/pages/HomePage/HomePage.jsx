import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { AuthState } from "../../context/AuthProvider";
import { Notify } from "../../utils";

const HomePage = () => {


  const navigate = useNavigate();
  const { auth } = AuthState();

  const fetchPrivateDate = async () => {
    try {
      const response = await fetch("/api/private", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.token}`,
        },
      });
      const data = await response.json();

      if (data.success) {}
       else {
        navigate("/login");
        return Notify("You are not authorized please login", "error");
      }
    } catch (error) {
      localStorage.removeItem("auth");
      navigate("/login");
      return Notify("Internal server error", "error");
    }
  };

  useEffect(() => {
    fetchPrivateDate();
    // eslint-disable-next-line
  }, [auth]);
  

  return <span>This is sample homepage</span>;
};

export default HomePage;
