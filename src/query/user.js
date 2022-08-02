const loginQuery = `
query($username: String, $password: String) {
  login (username: $username, password: $password) {
    id
    name
    phone
    address
    avatar
    token
    role
  }
}
`;

const getUserInfoQuery = `
query($token: String){
  getUserInfo(token: $token) {
    id
    name
    address
    phone
    avatar
    role
  }
}
`;

module.exports = {
  loginQuery,
  getUserInfoQuery
};
