import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";
import * as React from "react";
import SkillBar from "./SkillBar";

const useStyles = makeStyles(theme => ({
  header: {
    textTransform: "uppercase",
    ...theme.underscore,
  },
}));

export default function Skills(props) {
  const { items, title } = props;
  const classes = useStyles();

  return (
    <Container maxWidth={"lg"}>
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
      <Grid container justify="center" alignItems="center" spacing={5}>
        {items.map(item => (
          <Grid item xs={12} key={item.name}>
            <Grid container justify="center" alignItems="center">
              <Grid item xs={12} md={6}>
                <Typography gutterBottom>{item.name}</Typography>
              </Grid>
              <Grid item xs={12} md={6} style={{ textAlign: "right" }}>
                <Typography gutterBottom>{item.value * 100}%</Typography>
              </Grid>
              <Grid item xs={12}>
                <SkillBar skillValue={item.value} />
              </Grid>
            </Grid>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

const Skill = PropTypes.shape({
  name: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
});

Skills.propTypes = {
  title: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(Skill),
};
