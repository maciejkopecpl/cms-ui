import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import { useStaticQuery, graphql } from "gatsby";
import Image from "material-ui-image";
import PropTypes from "prop-types";
import * as React from "react";

const useStyles = makeStyles(theme => ({
  background: theme.palette.background.default,
}));

const mapById = (accumulator, { node }) => ({
  [node.id]: { url: node.publicURL },
  ...accumulator,
});

export default function ImagesGallery(props) {
  const { items } = props;
  const classes = useStyles();

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
            <Image
              src={data[`image-${item.src}`]?.url}
              color={classes.background}
              imageStyle={{ height: "100%" }}
              alt={item.alt}
              title={item.alt}
            />
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
