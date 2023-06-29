export const getUserQuery = `
query User ($email: String!) {
  user(email: $email) {
    name
    id
    email
    avatarUrl
    description
    gitHubUrl
    linkedInUrl
  }
}
`;

export const createUserQuery = `
mutation UserCreate ($input: UserCreateInput!) {
  userCreate (input: $input) {
    user {
      id
      name
      email
      avatarUrl
      description
      gitHubUrl
      linkedInUrl
    }
  }
}
`;
