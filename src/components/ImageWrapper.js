import Box from "@mui/material/Box";
import { makeStyles } from "tss-react/mui";
import Image from "material-ui-image";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

const useStyles = makeStyles()(theme => ({
  image: {
    background: theme.palette.background.default,
  },
}));

export default function ImageWrapper(props) {
  const { src, alt } = props;
  const { classes } = useStyles();
  const [loaded, setLoaded] = useState(false);
  const [inViewRef, inViewport] = useInView({ triggerOnce: true });

  useEffect(() => {
    if (inViewport) {
      setLoaded(true);
    }
  }, [inViewport]);

  return (
    <div ref={inViewRef}>
      {loaded ? (
        <Image
          src={src}
          className={classes.image}
          style={{ background: classes.image.background }}
          imageStyle={{ height: "100%" }}
          alt={alt}
          title={alt}
        />
      ) : (
        <Box height={140} />
      )}
    </div>
  );
}

ImageWrapper.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string,
};
