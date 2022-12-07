const { gql } = require("apollo-server-express");
const { GraphQLJSON, GraphQLJSONObject } = require("graphql-type-json");

const typeDefs = gql`
  scalar JSON
  scalar JSONObject
  # định nghĩa một trường dữ liệu
  type Request {
    name: String
    type: String
    variables: JSONObject
    data: JSONObject
  }

  #Root Type
  type Query { # định nghĩa yêu cầu truy xuất dữ liệu
    request(name: String, type: String, variables: JSONObject): Request
  }
`;
module.exports = typeDefs;
