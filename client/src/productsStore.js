import { decorate, observable, action } from 'mobx';
import axios from 'axios';

class productstore {
  products = {
    productsArray: []
  };

  getProduct() {
    axios.get('http://localhost:3030/products').then(result => {
      this.products.productsArray = result.data.data;
    });
  }

  addProduct(row) {
    axios.post(`http://localhost:3030/products/`, {
      id: row.id,
      product: row.product,
      company: row.company,
      country: row.country,
      description: row.description,
    });
  }

  patchProduct(row) {
    const idProduct = row.id;
    axios
      .patch(`http://localhost:3030/products/${idProduct}`, {
        product: row.product,
        company: row.company,
        country: row.country,
        description: row.description,
      })  }

  deleteProduct(deletedProductId) {
    axios.delete(`http://localhost:3030/products/${deletedProductId}`);
  }
}
decorate(productstore, {
  products: observable,
  getProduct: action,
  addProduct: action,
});

export default new productstore();