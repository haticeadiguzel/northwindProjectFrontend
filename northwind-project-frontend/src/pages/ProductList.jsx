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
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AddToCart } from "../store/actions/cartActions";
import { toast } from "react-toastify";

export default function ProductList() {
  const dispatch = useDispatch(); //bir aksiyon cagirmak icin kullanilir

  const [products, setProducts] = useState([]);
  const [pageSizeproducts, setPageSizeProducts] = useState([]);
  const [pageSizeValue, setPageSizeValue] = useState("10");
  const [pageNoValue, setPageNoValue] = useState("1");

  useEffect(() => {
    let productService = new ProductService();
    productService
      .getProductByPage(pageNoValue, pageSizeValue)
      .then((result) => setPageSizeProducts(result.data.data));
  }, [pageSizeValue, pageNoValue]);

  useEffect(() => {
    let productService = new ProductService();
    productService
      .getProducts()
      .then((result) => setProducts(result.data.data));
  }, []);

  const handleAddToCart = (product) => {
    dispatch(AddToCart(product));
    toast.success(`${product.productName} Added to cart`);
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Menu>
          <MenuItem header>Products per page:</MenuItem>
          <MenuItem onClick={() => setPageSizeValue("10")}>10</MenuItem>
          <MenuItem onClick={() => setPageSizeValue("50")}>50</MenuItem>
          <MenuItem onClick={() => setPageSizeValue("100")}>100</MenuItem>
        </Menu>
      </div>

      <Table celled>
        <TableHeader>
          <TableRow>
            <TableHeaderCell>Product Name</TableHeaderCell>
            <TableHeaderCell>Unit Price</TableHeaderCell>
            <TableHeaderCell>Units In Stock</TableHeaderCell>
            <TableHeaderCell>Description</TableHeaderCell>
            <TableHeaderCell>Category</TableHeaderCell>
            <TableHeaderCell></TableHeaderCell>
          </TableRow>
        </TableHeader>

        <TableBody>
          {pageSizeproducts.map((product) => (
            <TableRow key={product.id}>
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
                <Button primary onClick={() => handleAddToCart(product)}>
                  Add To Cart
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>

        <TableFooter>
          <TableRow>
            <TableHeaderCell colSpan="6">
              <div style={{ display: "flex", justifyContent: "center" }}>
                <Menu pagination>
                  <MenuItem as="a" icon>
                    <Icon name="chevron left" />
                  </MenuItem>
                  <MenuItem onClick={() => setPageNoValue("1")}>1</MenuItem>
                  <MenuItem onClick={() => setPageNoValue("2")}>2</MenuItem>
                  <MenuItem as="a" icon>
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
