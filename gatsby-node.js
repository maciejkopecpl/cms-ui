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
  actions: { createNode, createNodeField },
  createContentDigest, node, store, cache
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
  console.log("Fetched images");
  console.log(result);

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

  for (const data of result){
    console.log("Processing image");
    console.log(data);
    const {image} = data;
    const remoteFileNode = await createRemoteFileNode({
      url: `${process.env.GATSBY_API_URL}/images/${image.image}`,
      parentNodeId: node.id,
      store,
      cache,
      createNode,
      createNodeId: () => `image-${image.image}`,
      contentType: image.contentType,
      ext: `.${image.filename.split(".").pop()}`,
      internal: {
        mediaType: image.contentType,
      },
    });

    image.localFile___NODE = image.id;

    await createNodeField({
      node: remoteFileNode,
      name: "filename",
      value: image.filename,
    });
  }

  await createNodeField({
    node,
    name: "images",
    value: result,
  });

};
