import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  CardMeta,
  CardHeader,
  CardDescription,
  CardContent,
  Button,
  Card,
} from "semantic-ui-react";
import ProductService from "../services/productService";

export default function ProductDetail() {
  let { id } = useParams();

  const [product, setProduct] = useState([]);

  useEffect(() => {
    let productService = new ProductService();
    productService
      .getProductById(id)
      .then((result) => setProduct(result.data.data));
  }, [id]);

  return (
    <div>
      <Card fluid>
        <CardContent>
          <div>
            <CardHeader>{product.productName}</CardHeader>
            <CardMeta>categoryName Error</CardMeta>
            <CardDescription>{product.quantityPerUnit}</CardDescription>
            <CardDescription>
              <strong>Price: {product.unitPrice}</strong>
            </CardDescription>
          </div>
        </CardContent>
        <CardContent extra>
          <div className="ui two buttons">
            <Button basic color="green">
              Approve
            </Button>
            <Button basic color="red">
              Decline
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
