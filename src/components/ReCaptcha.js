import { Button, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Link from "@mui/material/Link";
import { useTheme } from "@mui/material/styles";
import makeStyles from "@mui/styles/makeStyles";
import OpenInNew from "@mui/icons-material/OpenInNew";
import clsx from "clsx";
import PropTypes from "prop-types";
import React, { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import { useIsMobile } from "../utils/useIsMobile";

import { green, pink } from "@mui/material/colors";

const useStyles = makeStyles(theme => ({
  wrapper: {
    position: "relative",
  },
  buttonSuccess: {
    backgroundColor: green[500],
    "&:hover": {
      backgroundColor: green[700],
    },
  },
  buttonMobile: {
    width: "100%",
  },
  buttonProgress: {
    color: pink[400],
    position: "absolute",
    top: "50%",
    left: "5%",
    marginTop: -12,
    marginLeft: -12,
  },
  buttonProgressMobile: {
    left: "50%",
  },
}));

export default function ReCaptcha(props) {
  const { onSubmit, label, disabled } = props;
  const classes = useStyles();

  const gRepCaptchaRef = useRef();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const theme = useTheme();
  const isMobile = useIsMobile();
  const [inViewRef, inView] = useInView({ triggerOnce: true });

  const buttonClassname = clsx({
    [classes.buttonSuccess]: success,
    [classes.buttonMobile]: isMobile,
  });

  const buttonProgressMobile = clsx({
    [classes.buttonProgress]: true,
    [classes.buttonProgressMobile]: isMobile,
  });

  const execute = () => {
    setSuccess(false);
    setLoading(true);
    gRepCaptchaRef.current
      .execute(process.env.GATSBY_RECAPTCHA_API_KEY, { action: "submit" })
      .then(onSubmit)
      .catch(e => {
        setSuccess(false);
        setLoading(false);
        console.log.error(e);
      })
      .then(() => {
        setSuccess(true);
        setLoading(false);
      });
  };

  useEffect(() => {
    if (inView && typeof window !== `undefined`) {
      const script = document.createElement("script");
      script.onload = () => (gRepCaptchaRef.current = window.grecaptcha);
      script.src = `https://www.google.com/recaptcha/api.js?render=${process.env.GATSBY_RECAPTCHA_API_KEY}`;
      script.defer = true;
      script.async = true;
      document.body.appendChild(script);
    }
  }, [inView]);

  return (
    <>
      <div
        className={classes.wrapper}
        style={{ margin: isMobile ? 0 : theme.spacing(1) }}
      >
        <Button
          ref={inViewRef}
          variant="contained"
          color="secondary"
          disabled={loading || disabled}
          className={buttonClassname}
          onClick={execute}
        >
          {label}
        </Button>
        {loading && (
          <CircularProgress size={24} className={buttonProgressMobile} />
        )}
      </div>
      <Box
        marginTop={theme.spacing(0.5)}
        marginBottom={isMobile ? theme.spacing(0.5) : 0}
      >
        <Typography color={"textSecondary"} variant={"caption"}>
          This site is protected by reCAPTCHA and the Google{" "}
          <Link
            color={"textPrimary"}
            href="https://policies.google.com/privacy"
            rel="noreferrer"
            target="_blank"
            underline="hover"
          >
            Privacy Policy <OpenInNew fontSize={"inherit"} />
          </Link>
          and
          <Link
            color={"textPrimary"}
            href="https://policies.google.com/terms"
            rel="noreferrer"
            target="_blank"
            underline="hover"
          >
            Terms of Service <OpenInNew fontSize={"inherit"} />
          </Link>
          apply.
        </Typography>
      </Box>
    </>
  );
}

ReCaptcha.defaultProps = {
  label: "Send",
  disabled: false,
};

ReCaptcha.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  label: PropTypes.string,
  disabled: PropTypes.bool,
};
