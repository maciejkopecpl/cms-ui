import { createTheme } from "@material-ui/core";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import ThemeProvider from "@material-ui/styles/ThemeProvider";
import "@openfonts/raleway_latin-ext";
import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import { THEME_STYLES } from "../utils/constants";
import { buildComponent } from "../utils/factories";
import { graphql } from "gatsby";
import "../assets/global.css";
import { commonTheme, ThemeContext } from "../utils/Theme";

export default function Home({ data }) {
  const {
    site: { siteMetadata },
    backend: { modules } = {},
  } = data;
  const [style, setStyle] = useState(THEME_STYLES.light);

  const palletTheme = createTheme(
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

export const Head = ({ data }) => {
  const {
    site: { siteMetadata },
  } = data;

  return (
    <>
      <html lang="en" />
      <meta charSet="utf-8" />
      <title>{`${siteMetadata.title} - ${siteMetadata.subTitle}`}</title>
      <link rel="canonical" href={siteMetadata.siteUrl} />
      <meta
        name="description"
        content={`${siteMetadata.title} - ${siteMetadata.subTitle}`}
      />
      <script type="application/ld+json">
        {`
                {
                  "@context": "https://schema.org",
                  "@type": "Organization",
                  "url": "${siteMetadata.siteUrl}",
                  "name": "${siteMetadata.title} - ${siteMetadata.subTitle}"
                }
              `}
      </script>
    </>
  );
};
