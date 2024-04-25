import React, { useState, useEffect } from "react";
import {
  TableRow,
  TableHeaderCell,
  TableHeader,
  TableFooter,
  TableCell,
  TableBody,
  MenuItem,
  Icon,
  Menu,
  Table,
  Button,
} from "semantic-ui-react";
import ProductService from "../services/productService";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AddToCart } from "../store/actions/cartActions";
import { toast } from "react-toastify";

export default function ProductList() {
  const dispatch = useDispatch();

  const [, setProducts] = useState([]);
  const [pageSizeproducts, setPageSizeProducts] = useState([]);
  const [pageSizeValue, setPageSizeValue] = useState(10);
  const [pageNoValue, setPageNoValue] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);

  const navigator = useNavigate();

  useEffect(() => {
    getAllProductsByPage(pageNoValue, pageSizeValue);
  }, [pageNoValue, pageSizeValue]);

  useEffect(() => {
    let productService = new ProductService();
    productService.getProducts().then((result) => {
      setProducts(result.data.data);
      setTotalProducts(result.data.data.length);
    });
  }, []);

  const handleAddToCart = (product) => {
    dispatch(AddToCart(product));
    toast.success(`${product.productName} Added to cart`);
  };

  function getAllProductsByPage(pageNoValue, pageSizeValue) {
    let productService = new ProductService();
    productService
      .getProductsByPage(pageNoValue, pageSizeValue)
      .then((result) => setPageSizeProducts(result.data.data));
  }

  function handleAddNewProduct() {
    navigator("/product/add");
  }

  function handleUpdateProduct(id) {
    navigator(`/product/update/${id}`);
  }

  function handleDeleteProduct(id) {
    let productService = new ProductService();
    productService
      .deleteProduct(id)
      .then((response) => {
        const updatedProducts = pageSizeproducts.filter(
          (product) => product.id !== id
        );

        setPageSizeProducts(updatedProducts);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Menu>
          <MenuItem header>Products per page:</MenuItem>
          <MenuItem onClick={() => setPageSizeValue(10)} style={pageSizeValue === 10 ? {backgroundColor: 'black', color: 'white'} : null}>10</MenuItem>
          <MenuItem onClick={() => setPageSizeValue(50)} style={pageSizeValue === 50 ? {backgroundColor: 'black', color: 'white'} : null}>50</MenuItem>
          <MenuItem onClick={() => setPageSizeValue(100)} style={pageSizeValue === 100 ? {backgroundColor: 'black', color: 'white'} : null}>100</MenuItem>
        </Menu>
      </div>

      <Table celled>
        <TableHeader>
          <TableRow>
            <TableHeaderCell>Id</TableHeaderCell>
            <TableHeaderCell>Product Name</TableHeaderCell>
            <TableHeaderCell>Unit Price</TableHeaderCell>
            <TableHeaderCell>Units In Stock</TableHeaderCell>
            <TableHeaderCell>Description</TableHeaderCell>
            <TableHeaderCell>Category</TableHeaderCell>
            <TableHeaderCell>
              <Button
                color="green"
                onClick={handleAddNewProduct}
                style={{ width: "100px" }}
              >
                Add New Product
              </Button>
            </TableHeaderCell>
            <TableHeaderCell>Actions</TableHeaderCell>
          </TableRow>
        </TableHeader>

        <TableBody>
          {pageSizeproducts.map((product) => (
            <TableRow key={product.id}>
              <TableCell>{product.id}</TableCell>
              <TableCell>
                <Link to={`/products/${product.id}`}>
                  {product.productName}
                </Link>
              </TableCell>
              <TableCell>{product.unitPrice}</TableCell>
              <TableCell>{product.unitsInStock}</TableCell>
              <TableCell>{product.quantityPerUnit}</TableCell>
              <TableCell>{product.category.categoryName}</TableCell>
              <TableCell>
                <Button
                  primary
                  onClick={() => handleAddToCart(product)}
                  style={{ width: "100px" }}
                >
                  Add To Cart
                </Button>
              </TableCell>
              <TableCell>
                <Button
                  secondary
                  onClick={() => handleUpdateProduct(product.id)}
                  style={{ width: "100px" }}
                >
                  Update
                </Button>
                <Button
                  color="red"
                  onClick={() => handleDeleteProduct(product.id)}
                  style={{ marginTop: "10px", width: "100px" }}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableHeaderCell colSpan="8">
              <div style={{ display: "flex", justifyContent: "center" }}>
                <Menu pagination>
                  <MenuItem
                    as="a"
                    icon
                    onClick={() =>
                      pageNoValue > 1
                        ? setPageNoValue(pageNoValue - 1)
                        : setPageNoValue(pageNoValue)
                    }
                  >
                    <Icon name="chevron left" />
                  </MenuItem>
                  {[...Array(Math.ceil(totalProducts / pageSizeValue))].map(
                    (_, index) => (
                      <MenuItem
                        key={index}
                        onClick={() => setPageNoValue(index + 1)}
                        style={pageNoValue === index + 1 ? {backgroundColor: 'black', color: 'white'} : null}
                      >
                        {index + 1}
                      </MenuItem>
                    )
                  )}
                  <MenuItem
                    as="a"
                    icon
                    onClick={() => {
                      if (
                        pageNoValue !== Math.ceil(totalProducts / pageSizeValue)
                      ) {
                        setPageNoValue(pageNoValue + 1);
                      }
                    }}
                  >
                    <Icon name="chevron right" />
                  </MenuItem>
                </Menu>
              </div>
            </TableHeaderCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}
