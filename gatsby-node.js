require("dotenv").config({
  path: `.env.${process.env.NODE_ENV || "development"}`,
});

const fetch = require(`node-fetch`);
const { createRemoteFileNode } = require("gatsby-source-filesystem");

exports.onCreateWebpackConfig = ({ stage, actions }) => {
  if (stage.startsWith("develop")) {
    actions.setWebpackConfig({
      resolve: {
        alias: {
          "react-dom": "@hot-loader/react-dom",
        },
      },
    });
  }
};

exports.sourceNodes = async ({
  actions: { createNode },
  createContentDigest,
  store,
  cache,
}) => {
  const images = await fetch(`${process.env.GATSBY_API_URL}/graphql`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: process.env.API_KEY,
    },
    body: JSON.stringify({
      query: "{ images { image, filename, contentType } }",
    }),
  })
    .then(r => r.json())
    .then(r => r.data.images);
  console.log("Fetched images: ", images);

  createNode({
    images: images,
    id: `cms-images`,
    parent: null,
    children: [],
    internal: {
      type: `Images`,
      contentDigest: createContentDigest(images),
    },
  });

  for (const image of images) {
    console.log(`Processing image:`, image);

    await createRemoteFileNode({
      url: `${process.env.GATSBY_API_URL}/images/${image.image}`,
      httpHeaders: { Authorization: process.env.API_KEY },
      store,
      cache,
      createNode,
      createNodeId: () => `image-${image.image}`,
      contentType: image.contentType,
      ext: `.${image.filename.split(".").pop()}`,
    });
  }
};
