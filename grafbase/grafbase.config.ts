import { g, auth, config } from "@grafbase/sdk";

// Welcome to Grafbase!
// Define your data models, integrate auth, permission rules, custom resolvers, search, and more with Grafbase.
// Integrate Auth
// https://grafbase.com/docs/auth
//
// const authProvider = auth.OpenIDConnect({
//   issuer: process.env.ISSUER_URL ?? ''
// })
//
// Define Data Models
// https://grafbase.com/docs/database

const Project = g
  .model("Project", {
    title: g.string().length({ min: 3 }),
    description: g.string(),
    image: g.url(),
    liveSiteUrl: g.url().optional(),
    gitHubUrl: g.url(),
    category: g.string().search(),
    createdBy: g.relation(() => User),
  })
  .search();

const User = g.model("User", {
  name: g.string().length({ min: 2, max: 20 }),
  email: g.email().unique(),
  avatarUrl: g.string().optional(),
  description: g.string().optional(),
  gitHubUrl: g.url().optional(),
  linkedInUrl: g.url().optional(),
  project: g
    .relation(() => Project)
    .list()
    .optional(),

  // Extend models with resolvers
  // https://grafbase.com/docs/edge-gateway/resolvers
  // gravatar: g.url().resolver('user/gravatar')
});

export default config({
  schema: g,
  // Integrate Auth
  // https://grafbase.com/docs/auth
  // auth: {
  //   providers: [authProvider],
  //   rules: (rules) => {
  //     rules.private()
  //   }
  // }
});
