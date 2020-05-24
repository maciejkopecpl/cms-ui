import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Snackbar from "@material-ui/core/Snackbar";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Alert from "@material-ui/lab/Alert";
import AlertTitle from "@material-ui/lab/AlertTitle";
import PropTypes from "prop-types";
import * as React from "react";
import { useEffect, useState } from "react";
import { postData } from "../utils/http";
import Map from "./Map";
import ReCaptcha from "./ReCaptcha";

const useStyles = makeStyles(theme => ({
  header: {
    textTransform: "uppercase",
    ...theme.underscore,
  },
}));

const emptyMessage = {
  name: "",
  from: "",
  message: "",
};
const validFormState = {
  name: true,
  from: true,
  message: true,
};

const sendMail = ({ name, from, message }, token) =>
  postData("/mailer", {
    name: name,
    from: from,
    message: message,
    token: token,
  });

const isValid = value => value !== null && value.length !== 0;

const hasInvalidInput = message =>
  Object.values(message).some(value => value.length === 0);

export default function ContactForm(props) {
  const {
    title,
    successTitle,
    successMessage,
    errorTitle,
    errorMessage,
    latitude,
    longitude,
  } = props;
  const classes = useStyles();

  const [message, setMessage] = useState(emptyMessage);
  const [formState, setFormState] = useState(validFormState);
  const [success, setSuccess] = useState(false);
  const [failure, setFailure] = useState(false);
  const [enableSendButton, setEnableSendButton] = useState(false);

  useEffect(() => setEnableSendButton(hasInvalidInput(message)), [message]);

  const onFieldChange = event => {
    setFormState({
      ...formState,
      [event.target.name]: isValid(event.target.value),
    });
    setMessage({ ...message, [event.target.name]: event.target.value });
  };

  return (
    <Container maxWidth={"lg"}>
      <Grid container justify="center" alignItems="stretch" spacing={5}>
        <Grid item xs={12} md={7}>
          <form noValidate>
            <Typography
              component="h2"
              variant="h4"
              color="inherit"
              gutterBottom
              className={classes.header}
              style={{ fontWeight: 600 }}
            >
              {title}
            </Typography>
            <TextField
              id="name"
              name="name"
              label="Name"
              placeholder="Name"
              fullWidth
              required
              margin="normal"
              autoComplete="name"
              value={message.name}
              error={!formState.name}
              onChange={onFieldChange}
            />
            <TextField
              id="email"
              name="from"
              label="E-mail"
              placeholder="E-mail"
              fullWidth
              required
              margin="normal"
              autoComplete="email"
              value={message.from}
              error={!formState.from}
              onChange={onFieldChange}
            />
            <TextField
              id="message"
              name="message"
              label="Message"
              multiline
              rows={4}
              fullWidth
              required
              placeholder="Message"
              margin="normal"
              value={message.message}
              error={!formState.message}
              onChange={onFieldChange}
            />
            <ReCaptcha
              disabled={enableSendButton}
              onSubmit={token => {
                return sendMail(message, token).then(response => {
                  if (response.ok) {
                    setSuccess(true);
                  } else {
                    setFailure(true);
                  }
                  setMessage({ ...emptyMessage });
                });
              }}
            />
          </form>
        </Grid>
        <Grid item xs={12} md={5} style={{ minHeight: 400 }}>
          <Map latitude={latitude} longitude={longitude} />
        </Grid>
      </Grid>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={success}
        autoHideDuration={5000}
        onClose={() => setSuccess(false)}
        onClick={() => setSuccess(false)}
      >
        <Alert severity="success">
          <AlertTitle>{successTitle}</AlertTitle>
          {successMessage}
        </Alert>
      </Snackbar>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={failure}
        autoHideDuration={5000}
        onClose={() => setFailure(false)}
        onClick={() => setFailure(false)}
      >
        <Alert severity="error">
          <AlertTitle>{errorTitle}</AlertTitle>
          {errorMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
}

ContactForm.defaultProps = {
  title: "Contact me",
  successTitle: "Hooray!",
  successMessage:
    "Thanks for contacting me. I'll get back to you as soon as possible.",
  errorTitle: "Ups...",
  errorMessage: "Sorry, but your email wasn't sent. Something went wrong :(",
};

ContactForm.propTypes = {
  title: PropTypes.string,
  successTitle: PropTypes.string,
  successMessage: PropTypes.string,
  errorTitle: PropTypes.string,
  errorMessage: PropTypes.string,
  latitude: PropTypes.number.isRequired,
  longitude: PropTypes.number.isRequired,
};
