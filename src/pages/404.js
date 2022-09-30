import { createTheme, StyledEngineProvider } from "@mui/material";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import { makeStyles } from "tss-react/mui";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { GitHub } from "@mui/icons-material";
import LinkedIn from "@mui/icons-material/LinkedIn";
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import "@openfonts/raleway_latin-ext";
import { graphql } from "gatsby";
import React from "react";
import { Parallax } from "react-parallax";
import "../assets/global.css";
import { useImageSharp } from "../utils/useImageSharp";
import { commonTheme } from "../utils/Theme";

const useStyles = makeStyles()(() => ({
  header: {
    color: "#fff",
  },
  overlay: {
    backgroundColor: "rgba(0,0,0,.3)",
  },
}));

export default function NotFound({ data }) {
  const {
    site: { siteMetadata },
  } = data;

  const image = useImageSharp(siteMetadata.headerImageId);

  const palletTheme = createTheme({
    ...commonTheme,
  });

  const { classes } = useStyles();

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={palletTheme}>
        <CssBaseline />
        <>
          <Container maxWidth={false} disableGutters={true}>
            <Parallax
              strength={200}
              bgImage={image?.src}
              bgImageSrcSet={image?.srcSet}
              bgImageSizes={image?.sizes}
              contentClassName={classes.overlay}
            >
              <Grid
                container
                justifyContent="center"
                alignItems="center"
                style={{ height: "100vh" }}
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
                      Page not found
                    </Typography>
                    <Typography component="h1" variant="h4" color="inherit">
                      Ups... Something went wrong.
                    </Typography>
                    <Typography
                      component="p"
                      color="inherit"
                      style={{ marginTop: "0.5em" }}
                    >
                      You can raise an issue or contact me via LinkedIn:
                      <Tooltip
                        title="GitHub repository"
                        aria-label="GitHub repository"
                        style={{ marginTop: "-0.2em" }}
                      >
                        <IconButton
                          aria-label="GitHub repository"
                          color="inherit"
                          target={"_blank"}
                          rel="noreferrer"
                          href={siteMetadata.github.url}
                          size="large"
                        >
                          <GitHub color="inherit" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip
                        title="LinkedIn - Maciej Kopeć - Software Engineer"
                        aria-label="LinkedIn - Maciej Kopeć - Software Engineer"
                        style={{ marginTop: "-0.2em" }}
                      >
                        <IconButton
                          aria-label="GitHub repository"
                          color="inherit"
                          target={"_blank"}
                          rel="noreferrer"
                          href={siteMetadata.linkedIn.url}
                          size="large"
                        >
                          <LinkedIn color="inherit" />
                        </IconButton>
                      </Tooltip>
                    </Typography>
                  </div>
                </Grid>
              </Grid>
            </Parallax>
          </Container>
        </>
      </ThemeProvider>
    </StyledEngineProvider>
  );
}

export const query = graphql`
  query {
    site {
      siteMetadata {
        title
        subTitle
        siteUrl
        linkedIn {
          title
          url
        }
        github {
          url
        }
        headerImageId
      }
    }
  }
`;

export const Head = ({ data }) => {
  const {
    site: { siteMetadata },
  } = data;

  return (
    <>
      <html lang="en" />
      <meta charSet="utf-8" />
      <title>{`404 - ${siteMetadata.title} - ${siteMetadata.subTitle}`}</title>
      <link rel="canonical" href={siteMetadata.siteUrl} />
      <meta
        name="description"
        content={`${siteMetadata.title} - ${siteMetadata.subTitle}`}
      />
    </>
  );
};
