import React, { useEffect, useState } from "react";
import { Menu, MenuItem } from "semantic-ui-react";
import CategoryService from "../services/categoryService";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [activeItem, setActiveItem] = useState("");
  const handleItemClick = (e, { name }) => setActiveItem(name);

  useEffect(() => {
    let categoryService = new CategoryService();
    categoryService
      .getCategories()
      .then((result) => setCategories(result.data.data));
  }, []);

  return (
    <div className="categories">
      <Menu pointing vertical>
        {categories.map((category) => (
          <MenuItem
            key={category.id}
            active={activeItem === `${category.categoryName}`}
            onClick={() => handleItemClick}
            style={
              activeItem === `${category.categoryName}`
                ? { backgroundColor: "black", color: "white" }
                : null
            }
          >
            {category.categoryName}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}
