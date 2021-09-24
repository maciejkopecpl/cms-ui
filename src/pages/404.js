import { createTheme } from "@material-ui/core";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import { GitHub } from "@material-ui/icons";
import LinkedIn from "@material-ui/icons/LinkedIn";
import ThemeProvider from "@material-ui/styles/ThemeProvider";
import "@openfonts/raleway_latin-ext";
import { graphql } from "gatsby";
import React from "react";
import { Helmet } from "react-helmet";
import { Parallax } from "react-parallax";
import "../assets/global.css";
import { useImageSharp } from "../utils/useImageSharp";

const useStyles = makeStyles(theme => ({
  header: {
    color: theme.palette.common.white,
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
    typography: {
      fontFamily: "Raleway, Arial",
    },
  });

  const classes = useStyles();

  return (
    <ThemeProvider theme={palletTheme}>
      <Helmet>
        <html lang="en" />
        <meta charSet="utf-8" />
        <title>{`404 - ${siteMetadata.title} - ${siteMetadata.subTitle}`}</title>
        <link rel="canonical" href={siteMetadata.siteUrl} />
        <meta
          name="description"
          content={`${siteMetadata.title} - ${siteMetadata.subTitle}`}
        />
      </Helmet>
      <CssBaseline />
      <>
        <Container maxWidth={false} disableGutters={true}>
          <Parallax
            strength={200}
            bgImage={image?.srcWebp}
            bgImageSrcSet={image?.srcSetWebp}
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
    allImageSharp(filter: { parent: { id: { glob: "image-*" } } }) {
      edges {
        node {
          id
          parent {
            ... on File {
              id
            }
          }
          fluid(webpQuality: 100, maxWidth: 2000) {
            sizes
            srcSetWebp
            srcWebp
          }
        }
      }
    }
  }
`;
