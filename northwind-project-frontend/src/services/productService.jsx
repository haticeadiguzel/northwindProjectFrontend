import axios from "axios";

export default class ProductService {
  getProducts() {
    return axios.get("http://localhost:8080/api/products/getall");
  }

  getProductById(id) {
    return axios.get("http://localhost:8080/api/products/getById?id=" + id);
  }

  getProductByPage(pageNo, pageSize) {
    return axios.get(
      "http://localhost:8080/api/products/getAllByPage?pageNo=" +
        pageNo +
        "&pageSize=" +
        pageSize
    );
  }
}
