const productsQuery = `
query Products {
    products {
      id 
      name
      price 
      sale 
      splash 
      sold
    }
  }
`;

const productQuery = `
query Product($productId: ID) {
  product(id: $productId) {
    id
    name
    price
    sale
    sold
    rate
    type
    description
    splash
    images
    comments {
      id
      userID
      productID
      content
      time
    }
  }
}
`;

module.exports = {
  productsQuery,
  productQuery,
};
