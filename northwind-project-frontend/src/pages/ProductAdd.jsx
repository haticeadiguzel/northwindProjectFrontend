import { Form, Formik } from "formik";
import React from "react";
import { Button } from "semantic-ui-react";
import * as Yup from "yup";
import HaticeTextInput from "../utilities/customFormControls/HaticeTextInput";

export default function ProductAdd() {
  const initialValues = { productName: "", unitPrice: 10 };
  const schema = Yup.object({
    productName: Yup.string().required("Product name required"),
    unitPrice: Yup.number().required("Product price required"),
  });
  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={schema}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        <Form className="ui form">
          <HaticeTextInput name="productName" placeholder="Product name" />
          <HaticeTextInput name="unitPrice" placeholder="Product price" />
          <Button color="green" type="submit">
            Add
          </Button>
        </Form>
      </Formik>
    </div>
  );
}
