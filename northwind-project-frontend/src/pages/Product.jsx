import React from "react";
import { Button, Form, FormField } from "semantic-ui-react";
import { Formik } from "formik";
import HaticeTextInput from "../utilities/customFormControls/HaticeTextInput";
import * as Yup from "yup";
import HaticeNumberInput from "../utilities/customFormControls/HaticeNumberInput";
import ProductService from "../services/productService";
import { useNavigate, useParams } from "react-router-dom";

const schema = Yup.object({
  productName: Yup.string().required("Product name required"),
  unitPrice: Yup.number().required("Product price required"),
  unitsInStock: Yup.number().required("Units in stock required"),
  quantityPerUnit: Yup.string().required("Quantity per unit required"),
  category: Yup.object().shape({
    id: Yup.number().required("Category ID required"),
    categoryName: Yup.string().required("Category name required"),
  }),
});

export default function Product() {
  const navigator = useNavigate();
  const { id } = useParams();

  function pageTitle() {
    if (id) {
      return <h2 className="text-center">Update Product</h2>;
    } else {
      return <h2 className="text-center">Add Product</h2>;
    }
  }

  function saveOrUpdateProduct(values) {
    console.log(values);

    if (id) {
      let productService = new ProductService();
      productService.updateProduct(id, values).then((response) => {
        console.log(response.data);
        navigator("/products");
      }).catch(error => {
        console.error(error);
      });
    } else {
      let productService = new ProductService();
      productService.createProduct(values).then((response) => {
        console.log(response.data);
        navigator("/products");
      }).catch(error => {
        console.error(error);
      });
    }
  }

  return (
    <div>
      {pageTitle()}
      <Formik
        initialValues={{
          productName: "",
          unitPrice: 0,
          unitsInStock: 0,
          quantityPerUnit: "",
          category: {
            id: 0,
            categoryName: " ",
          },
        }}
        validationSchema={schema}
        onSubmit={saveOrUpdateProduct}
      >
        {({ handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <FormField>
              <label>Product Name:</label>
              <HaticeTextInput name="productName" placeholder="Product Name" />
            </FormField>
            <FormField>
              <label>Unit Price:</label>
              <HaticeNumberInput name="unitPrice" placeholder="Unit Price" />
            </FormField>
            <FormField>
              <label>Units In Stock:</label>
              <HaticeNumberInput
                name="unitsInStock"
                placeholder="Units In Stock"
              />
            </FormField>
            <FormField>
              <label>Quantity Per Unit:</label>
              <HaticeTextInput
                name="quantityPerUnit"
                placeholder="Quantity Per Unit"
              />
            </FormField>
            <FormField>
              <label>Category ID:</label>
              <HaticeNumberInput name="category.id" placeholder="Category Id" />
            </FormField>
            {/* <FormField>
              <label>Category Name:</label>
              <HaticeTextInput
                name="category.categoryName"
                placeholder="Category Name"
              />
            </FormField> */}
            <Button primary type="submit">
              Submit
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
