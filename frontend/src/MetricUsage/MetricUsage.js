import React, { useState, useEffect } from "react";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import "./MetricUsage.css";
import { styled } from "@mui/material/styles";
import { makeStyles } from "@material-ui/core/styles";

function MetricUsage(props) {
  const [colorProg, setColorProg] = useState("");
  let progress = (props.value * 100) / props.max;
  useEffect(() => {
    if (progress <= 25) {
      setColorProg("#47F3D0");
    } else if (progress < 50 && progress > 25) {
      setColorProg("#278EF1");
    } else if (progress < 75 && progress > 50) {
      setColorProg("#47F3D0");
    } else {
      setColorProg("#FF3E63");
    }
  }, [progress]);

  var BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 10,
    borderRadius: 5,
    width: "60%",
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor:
        theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 5,
      backgroundColor: colorProg,
    },
  }));
  // const classes = Styles();
  return (
    <div className="metric-usage">
      <p>{props.text}</p>
      <div style={{ display: "flex" }}>
        <BorderLinearProgress variant="determinate" value={progress} />
        <small style={{ marginLeft: "10px", marginTop: "-5px" }}>
          {props.value + " "}
          {props.unit}
        </small>
      </div>
    </div>
  );
}

export default MetricUsage;
