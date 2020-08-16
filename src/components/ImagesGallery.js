import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { useStaticQuery, graphql } from "gatsby";
import PropTypes from "prop-types";
import * as React from "react";
import ImageWrapper from "./ImageWrapper";

const mapById = (accumulator, { node }) => ({
  [node.id]: { url: node.publicURL },
  ...accumulator,
});

export default function ImagesGallery(props) {
  const { items } = props;

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
  `)?.allFile?.edges.reduce(mapById, {});

  return (
    <Container maxWidth={"lg"}>
      <Grid container justify="center" alignItems="center" spacing={10}>
        {items.map((item, index) => (
          <Grid item xs={6} md={2} key={index}>
            <ImageWrapper src={data[`image-${item.src}`]?.url} alt={item.alt} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

const ImageItem = PropTypes.shape({
  src: PropTypes.string.isRequired,
});

ImagesGallery.propTypes = {
  items: PropTypes.arrayOf(ImageItem),
};
