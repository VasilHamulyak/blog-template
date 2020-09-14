const path = require("path");
const { slugify } = require("./src/shared/slugify");
const { paginate } = require("gatsby-awesome-pagination");

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

    const posts = res.data.allContentfulArticle.nodes;

    // created an object with each category count
    const categoriesPostCount = Object.entries(
      posts.reduce((categories, { category }) => {
        categories[category] = categories[category] || 0;
        categories[category] = categories[category] + 1;
        return categories;
      }, {})
    ).map(([label, count]) => ({ label, count }));

    // sorted posts by category
    const postSortByCategory = posts.reduce((acc, { id, category }) => {
      acc[category] = acc[category] || [];
      acc[category] = acc[category].concat(id);
      return acc;
    }, {});

    // create paginated pages for each category
    Object.keys(postSortByCategory).forEach(category =>
      paginate({
        createPage,
        items: postSortByCategory[category],
        itemsPerPage: 10,
        pathPrefix: `/category/${slugify(category)}`,
        component: path.resolve("src/templates/Category.js"),
        context: {
          category,
          categoriesPostCount,
        },
      })
    );

    // create paginated pages for blog
    paginate({
      createPage,
      items: posts,
      itemsPerPage: 10,
      pathPrefix: "/blog",
      component: path.resolve("src/templates/Blog.js"),
      context: {
        categoriesPostCount,
      },
    });

    // created pages for each article
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
