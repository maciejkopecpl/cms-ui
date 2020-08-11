import { createMuiTheme } from "@material-ui/core";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import ThemeProvider from "@material-ui/styles/ThemeProvider";
import "@openfonts/raleway_latin-ext";
import React, { createContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import Footer from "../components/Footer";
import { THEME_STYLES } from "../utils/constants";
import { buildComponent } from "../utils/factories";
import { graphql } from "gatsby";
import "../assets/global.css";

const commonTheme = {
  overrides: {
    MuiCssBaseline: {
      "@global": {
        "main > div:not(:first-child)": {
          marginTop: "5em",
        },
      },
    },
  },
  underscore: {
    textAlign: "center",
    position: "relative",
    "&::after": {
      content: "''",
      position: "absolute",
      left: "50%",
      bottom: 0,
      width: 50,
      height: 1,
      marginLeft: -25,
      backgroundColor: "#d65050",
    },
  },
};

const initialContext = {
  style: THEME_STYLES.light,
  toggleStyle: () => {},
};
export const ThemeContext = createContext(initialContext);

export default function Home({ data }) {
  const {
    site: { siteMetadata },
    backend: { modules } = {},
  } = data;
  const [style, setStyle] = useState(THEME_STYLES.light);

  const palletTheme = createMuiTheme(
    {
      palette: {
        type: style,
      },
      typography: {
        fontFamily: "Raleway, Arial",
      },
    },
    commonTheme
  );

  const toggleStyle = () => {
    const newStyle =
      style === THEME_STYLES.light ? THEME_STYLES.dark : THEME_STYLES.light;
    setStyle(newStyle);
    if (typeof window !== `undefined`) {
      window.localStorage.setItem("style", newStyle);
    }
  };

  useEffect(() => {
    if (typeof window !== `undefined`) {
      setStyle(window.localStorage.getItem("style") || THEME_STYLES.light);
    }
  }, []);

  return (
    <ThemeContext.Provider value={{ style, toggleStyle }}>
      <ThemeProvider theme={palletTheme}>
        <Helmet>
          <html lang="en" />
          <meta charSet="utf-8" />
          <title>{`${siteMetadata.title} - ${siteMetadata.subTitle}`}</title>
          <link rel="canonical" href={siteMetadata.siteUrl} />
          <meta
            name="description"
            content={`${siteMetadata.title} - ${siteMetadata.subTitle}`}
          />
        </Helmet>
        <CssBaseline />
        <Container maxWidth={false} disableGutters={true}>
          <main>{modules.map(component => buildComponent(component))}</main>
          <Footer
            title={siteMetadata.linkedIn.title}
            linkedIn={siteMetadata.linkedIn.url}
            github={siteMetadata.github.url}
          />
        </Container>
      </ThemeProvider>
    </ThemeContext.Provider>
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
      }
    }
    backend {
      modules {
        data
        id
        title
        type
      }
    }
  }
`;
