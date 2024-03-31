import React, { useEffect, useState } from "react";
import { Menu, MenuItem } from "semantic-ui-react";
import ProductService from "../services/productService";

export default function Categories() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    let productService = new ProductService()
    productService.getProducts().then(result => setCategories(result.data.data))
  }, [])

  return (
    <div>
      <Menu pointing vertical>
        {categories.map((category) => (
          <MenuItem key={category.category.categoryName} name={category.category.categoryName}/>
        ))}
      </Menu>
    </div>
  );
}