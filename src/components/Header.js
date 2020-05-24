import Grid from "@material-ui/core/Grid";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import PropTypes from "prop-types";
import * as React from "react";
import { Parallax } from "react-parallax";

const useStyles = makeStyles(theme => ({
  header: {
    color: theme.palette.common.white,
  },
  overlay: {
    backgroundColor: "rgba(0,0,0,.3)",
  },
}));

export default function Header(props) {
  const classes = useStyles();
  const { title, subTitle, bgImage } = props;

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"), {
    defaultMatches: true,
  });

  return (
    <Parallax
      strength={200}
      bgImage={bgImage}
      contentClassName={classes.overlay}
      bgImageStyle={{ marginTop: isMobile ? -100 : -200 }}
    >
      <Grid
        container
        justify="center"
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
  bgImage: PropTypes.string.isRequired,
};
