/* eslint-disable camelcase */
const autoprefixer = require("autoprefixer");
const path = require("path");

require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
});

module.exports = {
  siteMetadata: {
    title: "Blog example",
    description: "Blog website example created by Gatsby and Contentful",
    author: "Vasyl Khamuliak <vasyl.hamulyak@gmail.com>",
    siteUrl: process.env.SITE_URL,
  },
  plugins: [
    "gatsby-transformer-json",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "assets",
        path: `${__dirname}/src/assets`,
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "content",
        path: `${__dirname}/src/content`,
      },
    },
    "gatsby-transformer-sharp",
    "gatsby-plugin-sharp",
    "gatsby-plugin-catch-links",
    "gatsby-plugin-advanced-sitemap",
    {
      resolve: "gatsby-plugin-next-seo",
      options: {
        openGraph: {
          type: "website",
          locale: "en",
          url: process.env.SITE_URL,
          site_name: "LifeStyle",
        },
        twitter: {
          handle: "@Vasyl48506826",
          site: "@Vasyl48506826",
          cardType: "summary_large_image",
        },
      },
    },
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
      resolve: "gatsby-plugin-canonical-urls",
      options: {
        siteUrl: process.env.SITE_URL,
      },
    },
    {
      resolve: "gatsby-plugin-robots-txt",
      options: {
        host: process.env.SITE_URL,
        sitemap: process.env.SITE_URL + "/sitemap.xml",
        policy: [{ userAgent: "*", disallow: "/" }],
      },
    },
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        name: "LifeStyle",
        short_name: "LS",
        start_url: "/",
        background_color: "#18b0b0",
        theme_color: "#18b0b0",
        display: "minimal-ui",
        icon: "src/assets/favicon.png", // This path is relative to the root of the site.
      },
    },
    "gatsby-plugin-offline",
  ],
};
