require("dotenv").config({
  path: `.env.${process.env.NODE_ENV || "development"}`,
});

module.exports = {
  siteMetadata: {
    title: "Maciej Kopeć",
    subTitle: "Software Engineer",
    siteUrl: "https://maciejkopec.pl",
    linkedIn: {
      title: "Find me on LinkedIn",
      url: "https://linkedin.com/in/maciejkopec/",
    },
    github: {
      url: "https://github.com/maciejkopecpl/cms-ui",
    },
    headerImageId: "5f320a230bdf871d18542799",
  },
  plugins: [
    "gatsby-plugin-material-ui",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    "gatsby-plugin-sitemap",
    {
      resolve: "gatsby-plugin-robots-txt",
      options: {
        policy: [{ userAgent: "*", allow: "/" }],
      },
    },
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        name: "Maciej Kopeć - Software Engineer",
        short_name: "MaciejKopec.pl",
        start_url: "/",
        background_color: "#212121",
        theme_color: "#f50057",
        display: "standalone",
        icon: "src/assets/favicon.png",
        icon_options: {
          purpose: `any maskable`,
        },
        cache_busting_mode: "none",
      },
    },
    {
      resolve: "gatsby-source-graphql",
      options: {
        typeName: "Backend",
        fieldName: "backend",
        url: process.env.GATSBY_API_URL + "/graphql",
        headers: {
          Authorization: process.env.API_KEY,
        },
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: `assets`,
        path: `${__dirname}/src/assets/`,
      },
    },
    {
      resolve: "gatsby-plugin-sharp",
      options: {
        useMozJpeg: false,
        stripMetadata: true,
        defaultQuality: 100,
      },
    },
    {
      resolve: `gatsby-plugin-offline`,
      options: {
        precachePages: [`/`, `/404`],
        workboxConfig: {
          globPatterns: ["**/favicon*"],
        },
      },
    },
  ],
};
