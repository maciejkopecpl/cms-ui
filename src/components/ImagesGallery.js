import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Image from "material-ui-image";
import PropTypes from "prop-types";
import * as React from "react";

const API_URL = process.env.GATSBY_API_URL;

const useStyles = makeStyles(theme => ({
  background: theme.palette.background.default,
}));

export default function ImagesGallery(props) {
  const { items } = props;
  const classes = useStyles();

  return (
    <Container maxWidth={"lg"}>
      <Grid container justify="center" alignItems="center" spacing={10}>
        {items.map((item, index) => (
          <Grid item xs={6} md={2} key={index}>
            <Image
              src={API_URL + item.src}
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
