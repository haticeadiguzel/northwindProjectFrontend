import axios from "axios";

const BASE_URL = "http://localhost:8080/api/products/";

export default class ProductService {
  getProducts() {
    return axios.get(`${BASE_URL}getall`);
  }

  getProductById(id) {
    return axios.get(`${BASE_URL}getById?id=${id}`);
  }

  getProductsByPage(pageNo, pageSize) {
    return axios.get(
      `${BASE_URL}getAllByPage?pageNo=${pageNo}&pageSize=${pageSize}`
    );
  }

  getProductsByCategoryName(categoryName) {
    return axios.get(
      `${BASE_URL}getByCategoryName?categoryName=${categoryName}`
    )
  }

  createProduct(product) {
    return axios.post(`${BASE_URL}add`, product);
  }

  updateProduct(id, product) {
    return axios.put(`${BASE_URL}update?id=${id}`, product);
  }

  deleteProduct(id) {
    return axios.delete(`${BASE_URL}delete?id=${id}`);
  }
}
