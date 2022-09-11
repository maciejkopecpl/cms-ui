import {useStaticQuery, graphql} from "gatsby";

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
            gatsbyImageData(layout: CONSTRAINED, quality: 100, formats: [WEBP])
          }
        }
      }
    }
  `);

    return data.allImageSharp.edges.find(
        item => item.node.parent.id === `image-${id}`
    )?.node.gatsbyImageData.images.fallback;
};
