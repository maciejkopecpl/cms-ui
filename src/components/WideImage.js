import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";
import * as React from "react";
import { useInView } from "react-intersection-observer";
import { Parallax } from "react-parallax";
import { useImageSharp } from "../utils/graphQlQueries";

export default function WideImage(props) {
  const { title, imageId } = props;
  const image = useImageSharp(imageId);
  const [ref, inView] = useInView({ triggerOnce: true });

  return (
    <Container maxWidth={false} disableGutters={true} ref={ref}>
      {!inView ? (
        <Parallax
          strength={450}
          bgImage={image?.srcWebp}
          bgImageSrcSet={image?.srcSetWebp}
          bgImageSizes={image?.sizes}
        >
          <Grid
            container
            justify="center"
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
      ) : (
        <Box height={600} />
      )}
    </Container>
  );
}

WideImage.propTypes = {
  title: PropTypes.string,
  imageId: PropTypes.string.isRequired,
};
