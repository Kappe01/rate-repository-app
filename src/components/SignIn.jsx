import { StyleSheet, View } from "react-native";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-native";

import Button from "./Button";
import FormikTextInput from "./FormikTextInput";
import useSignIn from "../hooks/useSignIn";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 15,
  },
  fieldContainer: {
    marginBottom: 15,
  },
});

const initialValues = {
  username: "",
  password: "",
};

const validationSchema = yup.object().shape({
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
});

export const SignInForm = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => (
        <View style={styles.container}>
          <View style={styles.fieldContainer}>
            <FormikTextInput name="username" placeholder="Username" />
          </View>
          <View style={styles.fieldContainer}>
            <FormikTextInput
              name="password"
              placeholder="Password"
              secureTextEntry
            />
          </View>
          <Button onPress={handleSubmit}>Sign in</Button>
        </View>
      )}
    </Formik>
  );
};

const SignIn = () => {
  const signIn = useSignIn();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      const data = await signIn({ username, password });
      if (data) {
        console.log(data);
        navigate("/");
      }
    } catch (e) {
      console.log(e);
    }
  };

  return <SignInForm onSubmit={onSubmit} />;
};

export default SignIn;
