import Grid from "@mui/material/Grid";
import { makeStyles } from "tss-react/mui";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import * as React from "react";
import { Parallax } from "react-parallax";
import { useImageSharp } from "../utils/useImageSharp";
import { useIsMobile } from "../utils/useIsMobile";

const useStyles = makeStyles()(theme => ({
  header: {
    color: theme.palette.common.white,
  },
  overlay: {
    backgroundColor: "rgba(0,0,0,.3)",
  },
}));

export default function Header(props) {
  const { classes } = useStyles();
  const { title, subTitle, imageId } = props;

  const image = useImageSharp(imageId);
  const isMobile = useIsMobile();

  return (
    <Parallax
      strength={200}
      bgImage={image?.src}
      bgImageSrcSet={image?.srcSet}
      bgImageSizes={image?.sizes}
      contentClassName={classes.overlay}
      bgImageStyle={{ marginTop: isMobile ? -100 : -200 }}
    >
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        style={{ height: "53em" }}
        className={classes.header}
      >
        <Grid item md={8}>
          <div style={{ position: "relative" }}>
            <Typography
              component="h2"
              variant="h2"
              color="inherit"
              gutterBottom={true}
              style={{ fontWeight: 400 }}
            >
              {title}
            </Typography>
            <Typography component="h1" variant="h4" color="inherit">
              {subTitle}
            </Typography>
          </div>
        </Grid>
      </Grid>
    </Parallax>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  subTitle: PropTypes.string.isRequired,
  imageId: PropTypes.string.isRequired,
};
