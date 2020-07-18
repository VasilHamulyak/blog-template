const path = require("path");

exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions;

  return graphql(`
    {
      allContentfulArticle {
        totalCount
        nodes {
          id
          URL
        }
      }
    }
  `).then(res => {
    if (res.errors) return Promise.reject(res.errors);

    const articlesCount = res.data.allContentfulArticle.totalCount;

    const posts = res.data.allContentfulArticle.nodes;

    const pageCount = Math.ceil(articlesCount / 4);

    Array.from({ length: pageCount }).forEach((_, i) => {
      return createPage({
        path: i === 0 ? "/blog/" : `/blog/${i + 1}/`,
        component: path.resolve("src/templates/Blog.js"),
        context: {
          skip: 4 * i,
          limit: 4,
          pageCount,
          currentPage: i + 1,
        },
      });
    });

    posts.forEach(({ id, URL }) =>
      createPage({
        path: `/blog/${URL}/`,
        component: path.resolve("src/templates/Post.js"),
        context: {
          postId: id,
        },
      })
    );
  });
};
