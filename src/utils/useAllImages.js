import { graphql, useStaticQuery } from "gatsby";

export const useAllImages = () => {
  const data = useStaticQuery(graphql`
    query {
      allFile(filter: { id: { glob: "image-*" } }) {
        edges {
          node {
            id
            publicURL
          }
        }
      }
    }
  `);

  return data.allFile?.edges.reduce(mapById, {});
};

const mapById = (accumulator, { node }) => ({
  [node.id]: { url: node.publicURL },
  ...accumulator,
});
