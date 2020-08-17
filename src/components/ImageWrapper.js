import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import Image from "material-ui-image";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

const useStyles = makeStyles(theme => ({
  background: theme.palette.background.default,
}));

export default function ImageWrapper(props) {
  const { src, alt } = props;
  const classes = useStyles();
  const [loaded, setLoaded] = useState(false);
  const [ref, inViewport] = useInView({ triggerOnce: true });

  useEffect(() => {
    if (inViewport) {
      setLoaded(true);
    }
  }, [inViewport]);

  return (
    <div ref={ref}>
      {loaded ? (
        <Image
          src={src}
          color={classes.background}
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
