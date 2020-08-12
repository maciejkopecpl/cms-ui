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
}) => {
  const result = await fetch(`${process.env.GATSBY_API_URL}/graphql`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
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

exports.onCreateNode = async ({ node, actions, store, cache }) => {
  if (node.internal.type !== "Images") {
    return;
  }

  const { createNode, createNodeField } = actions;

  const images = await node.images.map(async file => {
    const remoteFileNode = await createRemoteFileNode({
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
    });

    await createNodeField({
      node: remoteFileNode,
      name: "filename",
      value: file.filename,
    });

    return remoteFileNode;
  });

  await createNodeField({
    node,
    name: "images",
    value: images,
  });

  node.fields.images.forEach((image, i) => {
    image.localFile___NODE = images[i].id;
  });
};
