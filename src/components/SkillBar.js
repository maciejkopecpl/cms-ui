import LinearProgress from "@mui/material/LinearProgress";
import { makeStyles } from "tss-react/mui";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

const useStyles = makeStyles()({
  customTransition: {
    transition: "transform 1.5s cubic-bezier(0.57, 0.02, 1, 1)",
  },
});

export default function SkillBar(props) {
  const { skillValue } = props;
  const { classes } = useStyles();
  const [inViewRef, inView] = useInView({ triggerOnce: true });
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
        ref={inViewRef}
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
