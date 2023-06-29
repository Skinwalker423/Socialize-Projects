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
