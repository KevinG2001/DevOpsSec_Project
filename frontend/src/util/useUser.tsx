import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { DecodedToken } from "../util/types";

function useUser() {
  const [userId, setUserId] = useState<number | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const decoded: DecodedToken = jwtDecode<DecodedToken>(token);
        setUserId(decoded.userID);
        setIsAdmin(decoded.isAdmin);
      } catch (err) {
        console.error("Invalid token", err);
        setUserId(null);
        setIsAdmin(false);
      }
    }
  }, []);

  return { userId, isAdmin };
}

export default useUser;
