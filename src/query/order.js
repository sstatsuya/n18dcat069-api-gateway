const getUserOrdersQuery = `
query Query($userId: String) {
  getUserOrders(userId: $userId) {
    id
    userId
    date
    address
    phone
    products {
      productId
      name
      quantity
      price
      image
    }
  }
}
`;

const getOrderQuery = `
query Query($orderId: ID) {
  getOrder(id: $orderId) {
    id
    userId
    date
    address
    phone
    products {
      productId
      name
      quantity
      price
      image
    }
  }
}
`;

const addOrderMutation = `
mutation Mutation(
  $userId: String
  $address: String
  $phone: String
  $products: [ProductInput]
) {
  addOrder(
    userId: $userId
    address: $address
    phone: $phone
    products: $products
  ) {
    id
    userId
    date
    address
    phone
    products {
      productId
      name
      quantity
      price
      image
    }
  }
}
`;

module.exports = {
  getUserOrdersQuery,
  getOrderQuery,
  addOrderMutation,
};
