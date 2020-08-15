import { makeStyles } from "@material-ui/core/styles"
import PropTypes from "prop-types"
import React, { useEffect, useRef } from "react"

const useStyles = makeStyles(theme => ({
  background: theme.palette.background.default
}))

export default function Image(props) {
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

Image.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string
}
