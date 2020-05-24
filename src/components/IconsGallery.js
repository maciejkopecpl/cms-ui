import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { useTheme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import PropTypes from "prop-types";
import * as React from "react";
import { buildIcon } from "../utils/factories";

export default function IconsGallery(props) {
  const { title, items } = props;

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"), {
    defaultMatches: true,
  });

  return (
    <Container maxWidth={"lg"}>
      <Typography
        component="h2"
        variant="h2"
        color="inherit"
        gutterBottom={true}
        style={{ textTransform: "uppercase", fontWeight: 500 }}
      >
        {title}
      </Typography>
      <Grid
        container
        justify="center"
        alignItems="center"
        spacing={isMobile ? 5 : 10}
      >
        {items.map(item => (
          <Grid item xs={12} md={4} key={item.icon}>
            <Grid container justify="center" alignItems="center">
              <Grid item xs={12} md={12} style={{ textAlign: "center" }}>
                {buildIcon(item.icon)}
              </Grid>
              <Grid item xs={12} md={12}>
                <Typography
                  align={"center"}
                  component="h3"
                  variant="h5"
                  color="inherit"
                  style={{ textTransform: "uppercase" }}
                >
                  {item.title}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

const Icon = PropTypes.shape({
  title: PropTypes.string.isRequired,
  icon: PropTypes.any.isRequired,
});

IconsGallery.propTypes = {
  title: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(Icon),
};
