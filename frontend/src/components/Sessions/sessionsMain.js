import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { useParams, Link } from "react-router-dom";

const drawerWidth = 280;

const Styles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  hide: {
    display: "none",
  },
  drawerPaper: {
    marginTop: 55,
    width: drawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
    [theme.breakpoints.down("md")]: {
      marginLeft: -drawerWidth,
    },
  },
  emailicon: {
    display: "flex",
    alignItems: "left",
    flexWrap: "wrap",
    width: "50%",
  },
  userInfo: {
    display: "grid",
    gridTemplateColumns: "auto auto",
  },
  paper1: {
    padding: theme.spacing(2),
    marginTop: 20,
    color: theme.palette.text.secondary,
    height: 200,
  },
  paper2: {
    padding: theme.spacing(2),
    marginTop: 20,
    color: theme.palette.text.secondary,
    height: 130,
  },
  paper3: {
    padding: theme.spacing(2),
    marginTop: 20,
    color: theme.palette.text.secondary,
    height: 500,
  },
  paper4: {
    padding: theme.spacing(2),
    marginTop: 20,
    color: theme.palette.text.secondary,
    height: 150,
  },

  grids: {
    display: "flex",
    flexGrow: 1,
    "& div": {
      width: "100%",
    },
    [theme.breakpoints.down("md")]: {
      display: "block",
    },
  },
  dialog: {
    width: 800,
    height: 900,
  },
}));

export default function SessionsMaincomp({ open }) {
  let params = useParams();
  const classes = Styles();

  const [openForm, setOpenForm] = React.useState(false);
  const [openMetric, setOpenMetric] = React.useState(false);
  const anchorRef = React.useRef(null);
  const [cpuUsage, setcpuUsage] = React.useState(" ")
  const [Result, setResult] = React.useState([])
  const [deviceId, setdeviceId] = React.useState("")
  const [deviceName, setdeviceName] = React.useState("")
  const [androidVersion, setandroidVersion] = React.useState("")
  const [versionName, setversionName] = React.useState("")
  const [appName, setappName] = React.useState("")
  const persons1 = { "appname": "com.android.chrome", "id": "1", "token": "ffjjifd" }  
  
  // setTimeout(() => {
  const GetBasic = () => {
    const myJSON1 = JSON.stringify(persons1);
    window.backend.basiconfo(myJSON1).then((result) => {
      const data = JSON.parse(result)
      data.data.map((e) => {
        setdeviceId(e.device_id)
        setdeviceName(e.device_name)
        setandroidVersion(e.android_version)
        setversionName(e.version_name)
        setappName(e.app_name)
      })
      setResult(data.data)
    })
  }
  // }, 1000);

  setTimeout(() => {
    window.backend.cpumetric("com.android.chrome").then((result) => {
      // var cpudata = JSON.parse(result)
      setcpuUsage(result)
      // alert(result)
    })
  }, 1000);


  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpenMetric(false);
    } else if (event.key === "Escape") {
      setOpenMetric(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(openMetric);
  React.useEffect(() => {
    if (prevOpen.current === true && openMetric === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = openMetric;
  }, [openMetric]);

  const handleClickOpen = () => {
    setOpenForm(true);
  };

  const handleClose = () => {
    setOpenForm(false);
  };


  return (
    <>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
      
        <div className={classes.drawerHeader} />
       
        <div className={classes.grids}>
          <div>
          <button className="btn btn-primary" onClick={GetBasic} >GetBasic</button>
            <Grid container spacing={2} direction="column">
              <Grid item xs={12} md={12}>
                <Paper className={classes.paper1}>
                  <h3 align="left"></h3>
                  <p align="left">
                    <h6>Version:{versionName} </h6>
                  </p>
                  <p align="left">
                    <h6>AppName:{appName}</h6>
                  </p>
                  <p align="left">
                    <h6>Android version: {androidVersion}</h6>
                  </p>
                  <p align="left">
                    <h6>DeviceId:{deviceId} </h6>
                  </p>
                  <p align="left">
                    <h6>deviceName: {deviceName} </h6>
                  </p>
                </Paper>
              </Grid>
            </Grid>
          </div>
        </div>

        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Paper className={classes.paper2}>
              <p align="left">CPU Usage</p>
              {cpuUsage && <p>{cpuUsage}</p>}
            </Paper>
          </Grid>

        </Grid>
      </main>
    </>
  );
}
