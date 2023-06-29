import { GraphQLClient } from "graphql-request";
import { getUserQuery } from "@/graphql";

const isProduction = process.env.NODE_ENV === "production";

const apiUrl = isProduction
  ? process.env.NEXT_PUBLIC_GRAFBASE_API_URL || ""
  : "http://127.0.0.1:4000/graphql";

const apiKey = isProduction
  ? process.env.NEXT_PUBLIC_GRAFBASE_API_KEY || ""
  : "letmein";

const client = new GraphQLClient(apiUrl);

const makeGraphQLRequest = async (
  query: string,
  variables = {}
) => {
  try {
    //client request
    const data = await client.request(query, variables);
    if (!data) return;
    return data;
  } catch (error) {
    throw error;
  }
};

export const getUserData = (email: string) => {
  return makeGraphQLRequest(getUserQuery, { email });
};
