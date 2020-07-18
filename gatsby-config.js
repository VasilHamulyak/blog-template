/* eslint-disable camelcase */
const autoprefixer = require("autoprefixer");
const path = require("path");

require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
});

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
    "gatsby-plugin-catch-links",
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
      resolve: "gatsby-plugin-root-import",
      options: {
        assets: path.join(__dirname, "src/assets"),
        components: path.join(__dirname, "src/components"),
      },
    },
    {
      resolve: `gatsby-source-contentful`,
      options: {
        spaceId: "z5tv0n7jwlkz",
        accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
        host: process.env.CONTENTFUL_HOST,
        downloadLocal: true,
      },
    },
    {
      resolve: "gatsby-plugin-prefetch-google-fonts",
      options: {
        fonts: [
          {
            family: "Poppins",
            variants: ["200", "300", "400", "500", "600", "700", "800"],
          },
        ],
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
