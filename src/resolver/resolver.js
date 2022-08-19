require("isomorphic-fetch");
var md5 = require("blueimp-md5");
const { AES_KEY } = require("../common/constant");
const { decryptAES256, isValidCommand, encryptAES256 } = require("../common/helper");
const { serviceList } = require("../common/service");

const { URL } = require("../common/URL");
const {
  userCartQuery,
  addProductMutation,
  deleteProductMutation,
  deleteUserCartProductListMutation,
} = require("../query/cart");
const {
  getUserNotificationQuery,
  addNotificationMutation,
  markReadMutation,
  markReadAllMutation,
} = require("../query/notification");
const {
  getUserOrdersQuery,
  getOrderQuery,
  addOrderMutation,
  approveOrderMutation,
  getAllOrdersQuery,
} = require("../query/order");
const { productsQuery, productQuery } = require("../query/product");
const { loginQuery, getUserInfoQuery } = require("../query/user");

const resolvers = {
  Query: {
    request: async (parent, args, context) => {
      //Kiểm tra API - check quyền
      let token;
      if (context.headers.authorization)
        token = decryptAES256(AES_KEY, context.headers.authorization);
      else token = null;
      const checkValidCommand = await isValidCommand(
        args.name,
        args.type,
        token,
        serviceList
      );
      if (checkValidCommand.isError) {
        return {
          data: checkValidCommand,
        };
      }
      if (args.name === "user") {
        switch (args.type) {
          case "login":
            return fetch(URL.USER_SERVICE, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
              },
              body: JSON.stringify({
                query: loginQuery,
                variables: {
                  username: args.variables.username,
                  password: md5(args.variables.password),
                },
              }),
            })
              .then((res) => res.json())
              .then((data) => {
                if (data.data.login.id === null)
                  return {
                    data: {
                      isError: true,
                      message: "Tài khoản không chính xác",
                    },
                  };
                else {
                  data.data.login.token = encryptAES256(
                    AES_KEY,
                    data.data.login.token
                  );
                  return {
                    data: data.data,
                  };
                }
              })
              .catch((err) => err.json());

          case "getUserInfo":
            return fetch(URL.USER_SERVICE, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
              },
              body: JSON.stringify({
                query: getUserInfoQuery,
                variables: {
                  token: token,
                },
              }),
            })
              .then((res) => res.json())
              .then((data) => {
                return {
                  data: data.data,
                };
              });

          default:
            return {
              data: {
                isError: `This type: '${args.type}' not exists`,
              },
            };
        }
      } else if (args.name === "product") {
        switch (args.type) {
          case "products":
            return fetch(URL.PRODUCT_SERVICE, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
              },
              body: JSON.stringify({
                query: productsQuery,
              }),
            })
              .then((res) => res.json())
              .then((data) => {
                return {
                  data: data.data,
                };
              })
              .catch((err) => err.json());

          case "product":
            return fetch(URL.PRODUCT_SERVICE, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
              },
              body: JSON.stringify({
                query: productQuery,
                variables: {
                  productId: args.variables.productId,
                },
              }),
            })
              .then((res) => res.json())
              .then((data) => {
                return {
                  data: data.data,
                };
              })
              .catch((err) => err.json());
          default:
            return {
              data: {
                isError: `This type: '${args.type}' not exists`,
              },
            };
        }
      } else if (args.name === "cart") {
        switch (args.type) {
          case "userCart":
            return fetch(URL.CART_SERVICE, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
              },
              body: JSON.stringify({
                query: userCartQuery,
                variables: {
                  userId: args.variables.userId,
                },
              }),
            })
              .then((res) => res.json())
              .then((data) => {
                return {
                  data: data.data,
                };
              })
              .catch((err) => err.json());

          case "addUserCartProduct":
            return fetch(URL.CART_SERVICE, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
              },
              body: JSON.stringify({
                query: addProductMutation,
                variables: {
                  userId: args.variables.userId,
                  productId: args.variables.productId,
                },
              }),
            })
              .then((res) => res.json())
              .then((data) => {
                return {
                  data: data.data,
                };
              })
              .catch((err) => err.json());

          case "deleteUserCartProduct":
            return fetch(URL.CART_SERVICE, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
              },
              body: JSON.stringify({
                query: deleteProductMutation,
                variables: {
                  deleteUserCartProductId:
                    args.variables.deleteUserCartProductId,
                },
              }),
            })
              .then((res) => res.json())
              .then((data) => {
                return {
                  data: data.data,
                };
              })
              .catch((err) => err.json());

          case "deleteUserCartProductList":
            return fetch(URL.CART_SERVICE, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
              },
              body: JSON.stringify({
                query: deleteUserCartProductListMutation,
                variables: {
                  list: args.variables.deleteUserCartProductList,
                },
              }),
            })
              .then((res) => res.json())
              .then((data) => {
                return {
                  data: data.data,
                };
              })
              .catch((err) => err.json());
          default:
            return {
              data: {
                isError: `This type: '${args.type}' not exists`,
              },
            };
        }
      } else if (args.name === "order") {
        switch (args.type) {
          case "getUserOrders":
            return fetch(URL.ORDER_SERVICE, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
              },
              body: JSON.stringify({
                query: getUserOrdersQuery,
                variables: {
                  userId: args.variables.userId,
                },
              }),
            })
              .then((res) => res.json())
              .then((data) => {
                return {
                  data: data.data,
                };
              })
              .catch((err) => err.json());

          case "getOrder":
            return fetch(URL.ORDER_SERVICE, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
              },
              body: JSON.stringify({
                query: getOrderQuery,
                variables: {
                  orderId: args.variables.orderId,
                },
              }),
            })
              .then((res) => res.json())
              .then((data) => {
                return {
                  data: data.data,
                };
              })
              .catch((err) => err.json());

          case "addOrder":
            let cartIdList = args.variables.products.reduce((res, cur) => {
              res.push(cur.id);
              return res;
            }, []);

            let products = args.variables.products.map((item) => {
              delete item.id;
              return item;
            });

            await fetch(URL.CART_SERVICE, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
              },
              body: JSON.stringify({
                query: deleteUserCartProductListMutation,
                variables: {
                  list: cartIdList,
                },
              }),
            });

            return fetch(URL.ORDER_SERVICE, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
              },
              body: JSON.stringify({
                query: addOrderMutation,
                variables: {
                  userId: args.variables.userId,
                  address: args.variables.address,
                  phone: args.variables.phone,
                  products: products,
                },
              }),
            })
              .then((res) => res.json())
              .then((data) => {
                return {
                  data: data.data,
                };
              })
              .catch((err) => err.json());

          case "getAllOrders":
            return fetch(URL.ORDER_SERVICE, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
              },
              body: JSON.stringify({
                query: getAllOrdersQuery,
                variables: {},
              }),
            })
              .then((res) => res.json())
              .then((data) => {
                return {
                  data: data.data,
                };
              })
              .catch((err) => err.json());

          case "approveOrder":
            return fetch(URL.ORDER_SERVICE, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
              },
              body: JSON.stringify({
                query: approveOrderMutation,
                variables: {
                  id: args.variables.id,
                },
              }),
            })
              .then((res) => res.json())
              .then(async (data) => {
                console.log(data.data.approveOrder.userId);
                let userId = data.data.approveOrder.userId;
                let title = "Cập nhật đơn hàng";
                let content = `Đơn hàng ${args.variables.id} của bạn đã được giao thành công`;
                return fetch(URL.NOTIFICATION_SERVICE, {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                  },
                  body: JSON.stringify({
                    query: addNotificationMutation,
                    variables: {
                      userId: userId,
                      title: title,
                      content: content,
                    },
                  }),
                })
                  .then((res) => res.json())
                  .then((data) => ({
                    data: {
                      isError: false,
                      message: "Duyệt đơn hàng thành công",
                    },
                  }))
                  .catch((err) => err.json());
              })
              .catch((err) => err.json());
        }
      } else if (args.name === "notification") {
        switch (args.type) {
          case "getUserNotification":
            return fetch(URL.NOTIFICATION_SERVICE, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
              },
              body: JSON.stringify({
                query: getUserNotificationQuery,
                variables: {
                  userId: args.variables.userId,
                },
              }),
            })
              .then((res) => res.json())
              .then((data) => {
                return {
                  data: data.data,
                };
              })
              .catch((err) => err.json());

          case "addNotification":
            return fetch(URL.NOTIFICATION_SERVICE, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
              },
              body: JSON.stringify({
                query: addNotificationMutation,
                variables: {
                  userId: args.variables.userId,
                  title: args.variables.title,
                  content: args.variables.content,
                },
              }),
            })
              .then((res) => res.json())
              .then((data) => {
                return {
                  data: data.data,
                };
              })
              .catch((err) => err.json());

          case "markRead":
            return fetch(URL.NOTIFICATION_SERVICE, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
              },
              body: JSON.stringify({
                query: markReadMutation,
                variables: {
                  notificationId: args.variables.notificationId,
                },
              }),
            })
              .then((res) => res.json())
              .then((data) => {
                return {
                  data: data.data,
                };
              })
              .catch((err) => err.json());

          case "markReadAll":
            return fetch(URL.NOTIFICATION_SERVICE, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
              },
              body: JSON.stringify({
                query: markReadAllMutation,
                variables: {
                  userId: args.variables.userId,
                },
              }),
            })
              .then((res) => res.json())
              .then((data) => {
                return {
                  data: data.data,
                };
              })
              .catch((err) => err.json());
        }
      } else {
        return {
          data: {
            isError: "Service name not exists",
          },
        };
      }
    },
  },
};

module.exports = resolvers;
