const userCartQuery = `
query Query($userId: String) {
  userCart(userId: $userId) {
    id
    userId
    productId
    data
  }
}
`;

const addProductMutation = `
mutation Mutation($userId: String, $productId: String) {
  addUserCartProduct(userId: $userId, productId: $productId) {
    id
    userId
    productId
    data
  }
}
`;

const deleteProductMutation = `
mutation Mutation($deleteUserCartProductId: String) {
  deleteUserCartProduct(id: $deleteUserCartProductId) {
    data
  }
}
`;

const deleteUserCartProductListMutation = `
mutation Mutation($list: [ID]) {
  deleteUserCartProductList(list: $list) {
    data
  }
}
`;

module.exports = {
  userCartQuery,
  addProductMutation,
  deleteProductMutation,
  deleteUserCartProductListMutation
};
