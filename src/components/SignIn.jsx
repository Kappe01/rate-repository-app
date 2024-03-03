import { View, Text, TextInput, Pressable } from "react-native";
import { useFormik } from "formik";
import * as yup from "yup";

const initialValues = {
  username: "",
  password: "",
};

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .min(1, "Username is required")
    .max(30, "Username is too long")
    .required("Username is required"),
  password: yup
    .string()
    .min(5, "Password need to be more than 5 characters")
    .max(50, "Password is too long")
    .required("Password is required"),
});

const styles = {
  constainer: {
    backgroundColor: "white",
    padding: 15,
  },
  input: {
    marginBottom: 10,
    padding: 10,
    border: "solid",
    borderWidth: 1,
    borderColor: "grey",
    borderRadius: 5,
  },
  button: {
    textAlign: "center",
    padding: 15,
    backgroundColor: "blue",
    color: "white",
    borderRadius: 5,
  },
};

const SignInForm = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <View style={styles.constainer}>
      <TextInput
        style={styles.input}
        onChangeText={formik.handleChange("username")}
        value={formik.values.username}
        placeholder="Username"
      />
      {formik.touched.username && formik.errors.username && (
        <Text style={{ color: "red" }}>{formik.errors.username}</Text>
      )}
      <TextInput
        style={styles.input}
        onChangeText={formik.handleChange("password")}
        value={formik.values.password}
        placeholder="Password"
        secureTextEntry
      />
      {formik.touched.password && formik.errors.password && (
        <Text style={{ color: "red" }}>{formik.errors.password}</Text>
      )}
      <Pressable style={styles.button} onPress={formik.handleSubmit}>
        <Text>Sign In</Text>
      </Pressable>
    </View>
  );
};

const SignIn = () => {
  const onSubmit = (values) => {
    console.log(values);
  };

  return (
    <View>
      <SignInForm onSubmit={onSubmit} />
    </View>
  );
};

export default SignIn;
