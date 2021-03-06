import { useStaticQuery, graphql } from "gatsby";

export const useImageSharp = id => {
  const data = useStaticQuery(graphql`
    query {
      allImageSharp(filter: { parent: { id: { glob: "image-*" } } }) {
        edges {
          node {
            id
            parent {
              ... on File {
                id
              }
            }
            fluid(webpQuality: 100, maxWidth: 2000) {
              sizes
              srcSetWebp
              srcWebp
            }
          }
        }
      }
    }
  `);

  return data.allImageSharp.edges.find(
    item => item.node.parent.id === `image-${id}`
  )?.node.fluid;
};
