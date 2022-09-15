import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import * as React from "react";
import { buildIcon } from "../utils/factories";

export default function IconsGallery(props) {
  const { title, items } = props;

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
      <Grid container justifyContent="center" alignItems="center" spacing={0}>
        {items.map(item => (
          <Grid item xs={12} md={4} key={item.icon} style={{ padding: "3em" }}>
            <Grid container justifyContent="center" alignItems="center">
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
