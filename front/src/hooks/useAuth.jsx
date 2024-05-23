import { useContext } from "react";
import { SignInContext } from "../contexts/SignInContext";

export const useAuth = () => {
  return useContext(SignInContext);
};
