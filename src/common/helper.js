require("isomorphic-fetch");
var CryptoJS = require("crypto-js");
const { getUserRole } = require("../query/user");
const { AES_KEY } = require("./constant");
const { URL } = require("./URL");

const encryptAES256 = (originKey = AES_KEY, plaintext) => {
  let text = CryptoJS.enc.Utf8.parse(plaintext);
  let key = CryptoJS.enc.Utf8.parse(originKey);
  var encrypted = CryptoJS.AES.encrypt(text, key, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.ZeroPadding,
  });
  encrypted = encrypted.ciphertext.toString(CryptoJS.enc.Hex);
  return encrypted;
};

const decryptAES256 = (originKey = AES_KEY, encrypted) => {
  let key = CryptoJS.enc.Utf8.parse(originKey);
  var decrypted = CryptoJS.AES.decrypt(
    { ciphertext: CryptoJS.enc.Hex.parse(encrypted) },
    key,
    { mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.ZeroPadding }
  ).toString(CryptoJS.enc.Utf8);
  return decrypted;
};

const isValidCommand = async (
  serviceName = "",
  serviceType = "",
  token = null,
  serviceList = []
) => {
  var service = serviceList.find((item, index) => {
    return item.name === serviceName;
  });

  if (!service)
    return {
      isError: true,
      message: `Service name "${serviceName}" not exists`,
    };

  var type = service.types.find((item) => item.name === serviceType);

  if (!type)
    return {
      isError: true,
      message: `Service type "${serviceType}" not exists`,
    };

  // Nếu quyền cho phép của hành động này lớn hơn 3 (any) thì cho phép
  if (type.role >= 3) {
    return {
      isError: false,
      message: "This is a valid command",
    };
  }

  if (type.role < 3 && !token) {
    return {
      isError: true,
      message: "User does not have permission",
    };
  }

  const response = await fetch(URL.USER_SERVICE, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      query: getUserRole,
      variables: {
        token: token,
      },
    }),
  });

  const data = await response.json();
  if (!data.data.getUserInfo) {
    return {
      isError: true,
      message: "Token is invalid",
    };
  }
  const role = data.data.getUserInfo.role;
  if (role > type.role) {
    return {
      isError: true,
      message: `You are not authorized to perform this action`,
    };
  }

  return {
    isError: false,
    message: "This is a valid command",
  };
};

module.exports = {
  encryptAES256,
  decryptAES256,
  isValidCommand,
};
