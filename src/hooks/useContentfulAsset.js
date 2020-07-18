import { graphql, useStaticQuery } from "gatsby";

export default assetId => {
  const { allContentfulAsset } = useStaticQuery(
    graphql`
      query {
        allContentfulAsset {
          nodes {
            localFile {
              childImageSharp {
                original {
                  src
                }
              }
            }
            description
            title
            contentful_id
          }
        }
      }
    `
  );
  return allContentfulAsset.nodes.find(n => n.contentful_id === assetId);
};
