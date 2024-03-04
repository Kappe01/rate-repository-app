import { useEffect } from "react";
import { useApolloClient } from "@apollo/client";
import useAuthStorage from "../hooks/useAuthStorage";
import { useNavigate } from "react-router-native";

const SignOut = () => {
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();
  const navigate = useNavigate();

  useEffect(() => {
    const signOut = async () => {
      await authStorage.removeAccessToken();
      apolloClient.resetStore();
      navigate("/");
    };

    signOut();
  }, []);

  return null;
};

export default SignOut;
