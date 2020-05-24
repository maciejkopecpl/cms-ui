import LinearProgress from "@material-ui/core/LinearProgress";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

const useStyles = makeStyles({
  customTransition: {
    transition: "transform 1.5s cubic-bezier(0.57, 0.02, 1, 1)",
  },
});

export default function SkillBar(props) {
  const { skillValue } = props;
  const classes = useStyles();
  const [ref, inView] = useInView({ triggerOnce: true });
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (inView) {
      setProgress(skillValue * 100);
    }
  }, [inView, skillValue]);

  return (
    <>
      <LinearProgress
        classes={{ bar1Determinate: classes.customTransition }}
        ref={ref}
        variant="determinate"
        value={progress}
        color="secondary"
        style={{ height: 10 }}
      />
    </>
  );
}

SkillBar.propTypes = {
  skillValue: PropTypes.number.isRequired,
};
