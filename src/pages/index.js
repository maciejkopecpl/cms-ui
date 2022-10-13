import { createTheme, StyledEngineProvider } from "@mui/material";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import "@openfonts/raleway_latin-ext";
import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import { THEME_STYLES } from "../utils/constants";
import { buildComponent } from "../utils/factories";
import { graphql } from "gatsby";
import "../assets/global.css";
import { commonTheme, ThemeContext } from "../utils/Theme";
import useMediaQuery from "@mui/material/useMediaQuery";

export default function Home({ data }) {
  const {
    site: { siteMetadata },
    backend: { modules } = {},
  } = data;

  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const [style, setStyle] = useState(THEME_STYLES.light);

  const getDesignTokens = style => ({
    palette: {
      mode: style,
      ...(style === THEME_STYLES.dark
        ? {
            secondary: {
              main: "#f44336",
            },
            background: {
              default: "#303030",
              paper: "#303030",
            },
          }
        : {
            secondary: {
              main: "#f44336",
            },
          }),
    },
    ...commonTheme,
  });

  const theme = React.useMemo(
    () => createTheme(getDesignTokens(style)),
    [style]
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
    if (typeof window === `undefined`) {
      prefersDarkMode
        ? setStyle(THEME_STYLES.dark)
        : setStyle(THEME_STYLES.light);
    } else {
      const configuredStyle = window.localStorage.getItem("style");
      if (configuredStyle) {
        setStyle(configuredStyle);
      } else if (prefersDarkMode) {
        setStyle(THEME_STYLES.dark);
      } else {
        setStyle(THEME_STYLES.light);
      }
    }
  }, [prefersDarkMode]);

  return (
    <ThemeContext.Provider value={{ style, toggleStyle }}>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Container maxWidth={false} disableGutters={true}>
            <main style={{ minHeight: `${modules.length * 20}em` }}>
              {modules.map(component => buildComponent(component))}
            </main>
            <Footer
              title={siteMetadata.linkedIn.title}
              linkedIn={siteMetadata.linkedIn.url}
              github={siteMetadata.github.url}
            />
          </Container>
        </ThemeProvider>
      </StyledEngineProvider>
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
