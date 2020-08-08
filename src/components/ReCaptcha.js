import { Button, Typography } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import CircularProgress from "@material-ui/core/CircularProgress";
import green from "@material-ui/core/colors/green";
import pink from "@material-ui/core/colors/pink";
import Link from "@material-ui/core/Link";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import OpenInNew from "@material-ui/icons/OpenInNew";
import clsx from "clsx";
import PropTypes from "prop-types";
import React, { useEffect, useRef, useState } from "react";

const useStyles = makeStyles(theme => ({
  wrapper: {
    margin: theme.spacing(1),
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
  const isMobile = useMediaQuery(theme.breakpoints.down("md"), {
    defaultMatches: true,
  });

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
      .catch(() => {
        setSuccess(false);
        setLoading(false);
      })
      .then(() => {
        setSuccess(true);
        setLoading(false);
      });
  };

  useEffect(() => {
    if (typeof window !== `undefined`) {
      const script = document.createElement("script");
      script.onload = () => (gRepCaptchaRef.current = window.grecaptcha);
      script.src = `https://www.google.com/recaptcha/api.js?render=${process.env.GATSBY_RECAPTCHA_API_KEY}`;
      script.defer = true;
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  return (
    <>
      <div className={classes.wrapper}>
        <Button
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
      <Box marginTop={theme.spacing(0.5)}>
        <Typography color={"textSecondary"} variant={"caption"}>
          This site is protected by reCAPTCHA and the Google{" "}
          <Link
            color={"textPrimary"}
            href="https://policies.google.com/privacy"
            rel="noreferrer"
            target="_blank"
          >
            Privacy Policy <OpenInNew fontSize={"inherit"} />
          </Link>{" "}
          and{" "}
          <Link
            color={"textPrimary"}
            href="https://policies.google.com/terms"
            rel="noreferrer"
            target="_blank"
          >
            Terms of Service <OpenInNew fontSize={"inherit"} />
          </Link>{" "}
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
