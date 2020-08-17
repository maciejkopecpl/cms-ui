import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import PropTypes from "prop-types";
import * as React from "react";
import { useAllImages } from "../utils/useAllImages";
import ImageWrapper from "./ImageWrapper";

export default function ImagesGallery(props) {
  const { items } = props;
  const images = useAllImages();

  return (
    <Container maxWidth={"lg"}>
      <Grid container justify="center" alignItems="center" spacing={10}>
        {items.map((item, index) => (
          <Grid item xs={6} md={2} key={index}>
            <ImageWrapper
              src={images[`image-${item.src}`]?.url}
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
