import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Image from "material-ui-image";
import PropTypes from "prop-types";
import * as React from "react";

const API_URL = process.env.GATSBY_API_URL;

export default function ImagesGallery(props) {
  const { items } = props;
  return (
    <Container maxWidth={"md"}>
      <Grid container justify="center" alignItems="center" spacing={5}>
        {items.map((item, index) => (
          <Grid item xs={6} md={4} key={index}>
            <Image
              src={API_URL + item.src}
              color={"#fafafa"}
              imageStyle={{ height: "auto" }}
              alt={item.alt}
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
