import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";
import * as React from "react";
import { Parallax } from "react-parallax";

const API_URL = process.env.API_URL;

export default function WideImage(props) {
  const { title, src } = props;
  return (
    <Container maxWidth={false} disableGutters={true}>
      <Parallax strength={450} bgImage={API_URL + src}>
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
    </Container>
  );
}

WideImage.propTypes = {
  title: PropTypes.string,
  src: PropTypes.string.isRequired,
};
