// role : 1 admin, 2: user, 3: any
const serviceList = [
  {
    id: 1,
    name: "user",
    types: [
      {
        id: 1,
        name: "login",
        role: 3,
      },
      {
        id: 2,
        name: "getUserInfo",
        role: 2,
      },
      {
        id: 3,
        name: "loginWithMySql",
        role: 3,
      },
    ],
  },
  {
    id: 2,
    name: "product",
    types: [
      {
        id: 1,
        name: "products",
        role: 3,
      },
      {
        id: 2,
        name: "product",
        role: 3,
      },
    ],
  },
  {
    id: 3,
    name: "cart",
    types: [
      {
        id: 1,
        name: "userCart",
        role: 2,
      },
      {
        id: 2,
        name: "addUserCartProduct",
        role: 2,
      },
      {
        id: 3,
        name: "deleteUserCartProduct",
        role: 2,
      },
      {
        id: 4,
        name: "deleteUserCartProductList",
        role: 2,
      },
    ],
  },
  {
    id: 4,
    name: "order",
    types: [
      {
        id: 1,
        name: "getUserOrders",
        role: 2,
      },
      {
        id: 2,
        name: "getOrder",
        role: 2,
      },
      {
        id: 3,
        name: "getAllOrders",
        role: 1,
      },
      {
        id: 4,
        name: "addOrder",
        role: 2,
      },
      {
        id: 5,
        name: "approveOrder",
        role: 1,
      },
    ],
  },
  {
    id: 5,
    name: "notification",
    types: [
      {
        id: 1,
        name: "getUserNotification",
        role: 2,
      },
      {
        id: 2,
        name: "addNotification",
        role: 1,
      },
      {
        id: 3,
        name: "markRead",
        role: 2,
      },
      {
        id: 4,
        name: "markReadAll",
        role: 2,
      },
    ],
  },
];

module.exports = {
  serviceList,
};
