const path = require("path");
const { slugify } = require("./src/shared/slugify");

exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions;

  return graphql(`
    {
      allContentfulArticle {
        totalCount
        nodes {
          id
          URL
          category
        }
      }
    }
  `).then(res => {
    if (res.errors) return Promise.reject(res.errors);

    const articlesCount = res.data.allContentfulArticle.totalCount;

    const posts = res.data.allContentfulArticle.nodes;

    const categories = posts.map(({ category }) => category);

    const categoriesPostCount = Object.entries(
      categories.reduce((categories, category) => {
        categories[category] = categories[category] || 0;
        categories[category] = categories[category] + 1;
        return categories;
      }, {})
    ).map(([label, count]) => ({ label, count }));

    categories.forEach(category =>
      createPage({
        path: `/category/${slugify(category)}/`,
        component: path.resolve("src/templates/Category.js"),
        context: {
          category,
          categoriesPostCount,
        },
      })
    );

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
          categoriesPostCount,
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
