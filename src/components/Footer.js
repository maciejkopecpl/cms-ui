import { Container } from "@mui/material";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Link from "@mui/material/Link";
import { useTheme } from "@mui/material/styles";
import { makeStyles } from "tss-react/mui";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { Brightness4, Brightness7, GitHub } from "@mui/icons-material";
import LinkedIn from "@mui/icons-material/LinkedIn";
import PropTypes from "prop-types";
import * as React from "react";
import { useContext } from "react";
import { THEME_STYLES } from "../utils/constants";
import { useIsMobile } from "../utils/useIsMobile";
import { ThemeContext } from "../utils/Theme";
import { grey } from "@mui/material/colors";

const useStyles = makeStyles()(theme => ({
  footer: {
    backgroundColor: theme.palette.secondary.main,
    color: "white",
  },
  secondFooter: {
    backgroundColor: grey[900],
    color: grey[600],
    padding: 20,
  },
}));

export default function Footer(props) {
  const { classes } = useStyles();
  const { title, linkedIn, github } = props;
  const { style, toggleStyle } = useContext(ThemeContext);
  const isMobile = useIsMobile();
  const theme = useTheme();

  return (
    <footer
      className={classes.footer}
      style={{ marginTop: theme.spacing(isMobile ? 0 : 8) }}
    >
      <Grid container>
        <Grid item xs={12} align={"center"} style={{ padding: 100 }}>
          <Typography variant="h5" gutterBottom={true}>
            {title}
          </Typography>
          <Link
            style={{ textTransform: "uppercase" }}
            href={linkedIn}
            target="_blank"
            rel="noopener"
            color="inherit"
            aria-label="LinkedIn - Maciej Kopeć - Software Engineer"
            underline="hover"
          >
            <LinkedIn style={{ fontSize: 100 }} />
          </Link>
        </Grid>
        <Grid item xs={12} className={classes.secondFooter}>
          <Container maxWidth={"lg"}>
            <Grid container alignItems="center">
              <Grid item xs={6}>
                <Typography color="secondary">Powered by Gatsby.</Typography>
              </Grid>
              <Grid item xs={6} style={{ textAlign: "right" }}>
                <Tooltip
                  title="Toggle light/dark mode"
                  aria-label="Toggle light/dark mode"
                >
                  <IconButton
                    aria-label="Toggle light/dark mode"
                    color="secondary"
                    onClick={toggleStyle}
                    size="large"
                  >
                    {style === THEME_STYLES.dark ? (
                      <Brightness7 />
                    ) : (
                      <Brightness4 />
                    )}
                  </IconButton>
                </Tooltip>
                <Tooltip
                  title="GitHub repository"
                  aria-label="GitHub repository"
                >
                  <IconButton
                    aria-label="GitHub repository"
                    color="secondary"
                    target={"_blank"}
                    rel="noreferrer"
                    href={github}
                    size="large"
                  >
                    <GitHub color="secondary" />
                  </IconButton>
                </Tooltip>
              </Grid>
            </Grid>
          </Container>
        </Grid>
      </Grid>
    </footer>
  );
}

Footer.propTypes = {
  title: PropTypes.string.isRequired,
  linkedIn: PropTypes.string.isRequired,
  github: PropTypes.string.isRequired,
};
