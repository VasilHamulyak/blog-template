/* eslint-disable camelcase */
const autoprefixer = require("autoprefixer");

module.exports = {
  siteMetadata: {
    title: "Blog example",
    description: "Blog website example created on Gatsby and Strapi",
    author: "Vasyl Khamuliak <vasyl.hamulyak@gmail.com>",
  },
  plugins: [
    "gatsby-plugin-react-helmet",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "assets",
        path: `${__dirname}/src/assets`,
      },
    },
    "gatsby-transformer-sharp",
    "gatsby-plugin-sharp",
    {
      resolve: "gatsby-plugin-sass",
      options: {
        includePaths: ["src/styles"],
        cssLoaderOptions: {
          camelCase: false,
        },
        postCssPlugins: [autoprefixer()],
      },
    },
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        name: "gatsby-starter-default",
        short_name: "starter",
        start_url: "/",
        background_color: "#663399",
        theme_color: "#663399",
        display: "minimal-ui",
        icon: "src/assets/gatsby-icon.png", // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    "gatsby-plugin-offline",
  ],
};
