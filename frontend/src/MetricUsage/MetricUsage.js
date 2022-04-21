import React from "react";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import "./MetricUsage.css";
import { styled } from "@mui/material/styles";

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,

  width: "60%",
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor:
      theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === "light" ? "#1a90ff" : "#308fe8",
  },
}));

function MetricUsage(props) {
  return (
    <div className="metric-usage">
      <p>{props.text}</p>
      <div style={{ display: "flex" }}>
        <BorderLinearProgress variant="determinate" value={40} />
        <small style={{ marginLeft: "10px", marginTop: "-5px" }}>
          {props.value}
          {props.unit}
        </small>
      </div>
    </div>
  );
}

export default MetricUsage;
