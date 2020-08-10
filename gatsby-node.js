require("dotenv").config({
  path: `.env.${process.env.NODE_ENV || "development"}`,
});

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

const fetch = require(`node-fetch`);

exports.sourceNodes = async ({
  actions: { createNode },
  createContentDigest,
}) => {
  const result = await fetch(`${process.env.GATSBY_API_URL}/graphql`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      query: "{ images { image, filename, contentType } }",
    }),
  })
    .then(r => r.json())
    .then(r => r.data.images);

  createNode({
    images: result,
    id: `cms-images`,
    parent: null,
    children: [],
    internal: {
      type: `Images`,
      contentDigest: createContentDigest(result),
    },
  });
};

const { createRemoteFileNode } = require("gatsby-source-filesystem");

exports.onCreateNode = async ({ node, actions, store, cache }) => {
  if (node.internal.type !== "Images") {
    return;
  }

  const { createNode, createNodeField } = actions;

  const images = await Promise.all(
    node.images.map(file =>
      createRemoteFileNode({
        url: `${process.env.GATSBY_API_URL}/images/${file.image}`,
        parentNodeId: node.id,
        store,
        cache,
        createNode,
        createNodeId: () => `image-${file.image}`,
        contentType: file.contentType,
        ext: `.${file.filename.split(".").pop()}`,
        internal: {
          mediaType: file.contentType,
        },
      })
    )
  );

  await createNodeField({
    node,
    name: "images",
    value: images,
  });

  node.fields.images.forEach((image, i) => {
    image.localFile___NODE = images[i].id;
  });
};
