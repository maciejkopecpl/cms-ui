import { makeStyles } from "@material-ui/core/styles"
import Image from "material-ui-image"
import PropTypes from "prop-types"
import React, { useEffect, useRef } from "react"

const useStyles = makeStyles(theme => ({
  background: theme.palette.background.default
}))

export default function ImageWrapper(props) {
  const { src, alt } = props
  const classes = useStyles()
  const imageRef = useRef(null)
  useEffect(() => {
    if (!imageRef.current.state.imageLoaded) {
      imageRef.current.handleLoadImage()
    }
  }, [imageRef])

  return (
    <>
      <Image
        src={src}
        color={classes.background}
        imageStyle={{ height: "100%" }}
        alt={alt}
        title={alt}
        ref={imageRef}
      />
    </>
  )
}

ImageWrapper.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string
}
