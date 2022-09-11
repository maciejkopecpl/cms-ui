import grey from "@material-ui/core/colors/grey";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";
import { useContext } from "react";
import * as React from "react";
import { useInView } from "react-intersection-observer";
import { Parallax } from "react-parallax";
import { THEME_STYLES } from "../utils/constants";
import { useImageSharp } from "../utils/useImageSharp";
import { ThemeContext } from "../utils/Theme";

export default function WideImage(props) {
  const { title, imageId } = props;
  const image = useImageSharp(imageId);
  const [inViewRef, inView] = useInView({ triggerOnce: true });
  const { style } = useContext(ThemeContext);

  return (
    <Container
      maxWidth={false}
      disableGutters={true}
      ref={inViewRef}
      style={{
        background: style === THEME_STYLES.dark ? grey[900] : grey[300],
        minHeight: 600,
        paddingTop: 0,
        marginTop: "5em",
      }}
    >
      {inView && (
        <Parallax
          strength={450}
          bgImage={image?.srcWebp}
          bgImageSrcSet={image?.srcSetWebp}
          bgImageSizes={image?.sizes}
        >
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            style={{ height: 600, color: "white" }}
          >
            <Grid item>
              <Typography
                align={"center"}
                component="h3"
                variant="h3"
                color={"inherit"}
              >
                {title}
              </Typography>
            </Grid>
          </Grid>
        </Parallax>
      )}
    </Container>
  );
}

WideImage.propTypes = {
  title: PropTypes.string,
  imageId: PropTypes.string.isRequired,
};
