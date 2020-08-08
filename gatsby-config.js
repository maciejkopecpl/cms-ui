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
      url: "https://github.com",
    },
  },
  plugins: [
    "gatsby-plugin-material-ui",
    "gatsby-plugin-react-helmet",
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
      },
    },
    {
      resolve: "gatsby-source-graphql",
      options: {
        typeName: "Backend",
        fieldName: "backend",
        url: process.env.GATSBY_API_URL + "/graphql",
      },
    },
  ],
};
