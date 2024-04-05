import React, { useEffect, useState } from "react";
import { Menu, MenuItem } from "semantic-ui-react";
import CategoryService from "../services/categoryService";

export default function Categories() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    let categoryService = new CategoryService();
    categoryService
      .getCategories()
      .then((result) => setCategories(result.data.data));
  }, []);

  return (
    <div>
      <Menu pointing vertical>
        {categories.map((category) => (
          <MenuItem key={category.id}>{category.categoryName}</MenuItem>
        ))}
      </Menu>
    </div>
  );
}
