import { StyleSheet, View } from "react-native";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-native";

import Button from "./Button";
import FormikTextInput from "./FormikTextInput";
import useCreateReview from "../hooks/useCreateReview";

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
  ownerName: "",
  repositoryName: "",
  rating: "",
  text: "",
};

const validationSchema = yup.object().shape({
  ownerName: yup.string().required("Repository owner name is required"),
  repositoryName: yup.string().required("Repository name is required"),
  rating: yup.string().required("Rating is required"),
});

export const ReviewForm = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => (
        <View style={styles.container}>
          <View style={styles.fieldContainer}>
            <FormikTextInput
              name="ownerName"
              placeholder="Repository owner name"
            />
          </View>
          <View style={styles.fieldContainer}>
            <FormikTextInput
              name="repositoryName"
              placeholder="Repository name"
            />
          </View>
          <View style={styles.fieldContainer}>
            <FormikTextInput
              name="rating"
              placeholder="Rating between 0 and 100"
            />
          </View>
          <View style={styles.fieldContainer}>
            <FormikTextInput name="text" placeholder="Review" multiline />
          </View>
          <Button onPress={handleSubmit}>Create a review</Button>
        </View>
      )}
    </Formik>
  );
};

const ReviewPage = () => {
  const createReview = useCreateReview();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const { ownerName, repositoryName, rating, text } = values;
    try {
      const data = await createReview({
        ownerName,
        repositoryName,
        rating: Number(rating),
        text,
      });
      if (data && data.createReview) {
        console.log(data.createReview.repositoryId);
        navigate(`${data.createReview.repositoryId}`);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return <ReviewForm onSubmit={onSubmit} />;
};

export default ReviewPage;
