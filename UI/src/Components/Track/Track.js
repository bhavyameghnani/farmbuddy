import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Link from "@material-ui/core/Link";
import Header from "../LandingPage/Header";
import MainFeaturedPost from "../LandingPage/MainFeaturedPost";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Toolbar from "@material-ui/core/Toolbar";

const sections = [
  { title: "Warehouse" },
  { title: "City" },
  { title: "Farmer" },
];

const useStyles = makeStyles((theme) => ({
  toolbar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbarTitle: {
    flex: 1,
    color: "#A200FF",
    fontWeight: 600,
  },
  toolbarSecondary: {
    justifyContent: "space-between",
    overflowX: "auto",
    //fontSize: '15'
  },
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardMedia: {
    paddingTop: "56.25%", // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
  divHeading: {
    color: "#e57373",
  },
  subHeading: {
    color: "#115293",
    fontWeight: "600",
  },
  desc: {
    color: "#7A8C98",
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const mainFeaturedPost = {
  title: "Track Product using Blockchain",
  description:
    "All stakeholders can be benefited through a transparent & secured distributed ledger system by putting entire supply chain on Blockchain to ensure data integrity & security",
  image:
    "https://c1.wallpaperflare.com/preview/120/295/591/teamwork-team-fist-bump-collaborate.jpg",
  imgText: "main image description",
  linkText: "Continue reading…",
};

export default function Track(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const [role, setRole] = React.useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg">
        <Header title="Track Product using Blockchain" />

        <main>
          <MainFeaturedPost post={mainFeaturedPost} />

          <br />
          <Toolbar
            component="nav"
            variant="dense"
            className={classes.toolbarSecondary}
          >
            {sections.map((section) => (
              <Link
                color="inherit"
                noWrap
                key={section.title}
                variant="h4"
                href={section.url}
                onClick={() => setRole(section.title)}
                className={classes.toolbarLink}
              >
                <b>{section.title}</b>
              </Link>
            ))}
          </Toolbar>
          <br />
          <Typography variant="h5" className={classes.divHeading}>
            <b>Role: {role} </b>
          </Typography>

          <br />
          <Grid container spacing={4}>
            {cards.map((card) => (
              <Grid item key={card} xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    image={card.image}
                    title={card.title}
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h6" component="h4">
                      <center>{card.title}</center>
                    </Typography>
                    <br />
                    <Typography style={{ color: "#5F00D0" }}>
                      {card.description}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      size="large"
                      style={{ color: "#03AB30" }}
                      onClick={() => {
                        localStorage.setItem("f_title", card.title);
                        localStorage.setItem("f_description", card.description);
                        localStorage.setItem("f_image", card.image);
                        localStorage.setItem("f_points", card.points);
                        localStorage.setItem("f_status", card.status);

                        handleClickOpen();
                      }}
                    >
                      Validate & Acknowledge the Activity
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
          <br />
          <Typography variant="h5" className={classes.divHeading}>
            <b>Track Bayer Product Order</b>
          </Typography>
          <br />

          <TableContainer component={Paper}>
            <Table
              sx={{ minWidth: 650 }}
              size="small"
              aria-label="a dense table"
            >
              <TableHead>
                <TableRow>
                  <TableCell>
                    <b>Task ID</b>
                  </TableCell>
                  <TableCell align="right">
                    <b>Product Description</b>
                  </TableCell>
                  <TableCell>
                    <b>Role Title</b>
                  </TableCell>

                  <TableCell align="right">
                    <b>Role Address</b>
                  </TableCell>

                  <TableCell align="right">
                    <b>Product Price</b>
                  </TableCell>
                  <TableCell align="right">
                    <b>Validation Status</b>
                  </TableCell>
                  {/* <TableCell align="right">
                    <b>Client / Farmer Address</b>
                  </TableCell> */}
                </TableRow>
              </TableHead>
              <TableBody>
                {props.allTasks.map((row) => (
                  <TableRow
                    key={row.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="right">{row[0]}</TableCell>
                    <TableCell align="right">{row[1]}</TableCell>
                    <TableCell align="right">{row[2]}</TableCell>
                    <TableCell align="right">{row[6]}</TableCell>
                    <TableCell align="right">{row[4]}</TableCell>
                    <TableCell align="right">{row[3]}</TableCell>
                    {/* <TableCell align="right">{row[6]}</TableCell> */}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <br />
          <br />
          <Typography variant="h5" className={classes.divHeading}>
            <b>Supply Chain powered by Blockchain</b>
          </Typography>
          <Typography variant="body1" className={classes.desc}>
            FarmBuddy Blockchain - All Records on DLT
          </Typography>
          <br />

          <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            maxWidth="lg"
            onClose={handleClose}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
          >
            <DialogTitle id="alert-dialog-slide-title">
              {localStorage.getItem("f_title")}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-slide-description">
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <center>
                      <img
                        alt="fitness tip"
                        src={localStorage.getItem("f_image")}
                      />
                    </center>
                  </Grid>

                  <Grid item xs={12}>
                    <center>
                      <Typography variant="h5" className={classes.divHeading}>
                        <b> {localStorage.getItem("f_title")}</b>
                      </Typography>
                    </center>
                  </Grid>

                  <Grid item xs={6}>
                    <center>
                      <Typography variant="h5" className={classes.divHeading}>
                        <b>
                          Product Description:{" "}
                          {localStorage.getItem("f_description")}{" "}
                        </b>
                      </Typography>
                    </center>
                  </Grid>

                  <Grid item xs={6}>
                    <center>
                      <Typography variant="h5" className={classes.divHeading}>
                        <b>Product Price: {localStorage.getItem("points")} $</b>
                      </Typography>
                    </center>
                  </Grid>

                  <Grid item xs={6}>
                    <center>
                      <Button variant="contained" color="primary">
                        Read more about the product
                      </Button>
                    </center>
                  </Grid>

                  <Grid item xs={6}>
                    <center>
                      <Button variant="contained" color="primary">
                        Contact Bayer Admin / Support Team
                      </Button>
                    </center>
                  </Grid>

                  <Grid item xs={12}>
                    <center>
                      <Grid item xs={12}>
                        <center>
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={() => {
                              props.createTask(
                                localStorage.getItem("f_description"),
                                localStorage.getItem("f_title"),
                                localStorage.getItem("f_status"),
                                localStorage.getItem("f_points"),
                                role
                              );
                            }}
                          >
                            Submit Now
                          </Button>
                        </center>
                      </Grid>
                    </center>
                  </Grid>
                </Grid>
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Done
              </Button>
            </DialogActions>
          </Dialog>
        </main>
      </Container>
    </React.Fragment>
  );
}

const cards = [
  {
    title: "Chicago Bayer Product Warehouse (Source Location)",
    description: "Velum® One Insecticide",
    image:
      "https://5.imimg.com/data5/SELLER/Default/2021/3/RM/UA/CU/5111461/velum-prime-insecticide-500x500.jpg",
    points: "10",
    status: "Dispatched from Chicago Bayer Product Warehouse (Source Location)",
  },
  {
    title: "California Bayer Product Warehouse (Intermediate Location)",
    description: "Velum® One Insecticide",
    image:
      "https://5.imimg.com/data5/SELLER/Default/2021/3/RM/UA/CU/5111461/velum-prime-insecticide-500x500.jpg",
    points: "10",
    status:
      "Successfylly Recieved & now Dispatched from California Bayer Product Warehouse (Intermediate Location)",
  },
  {
    title: "Farmer's Farm (Desitnation Location)",
    description: "Velum® One Insecticide",
    image:
      "https://5.imimg.com/data5/SELLER/Default/2021/3/RM/UA/CU/5111461/velum-prime-insecticide-500x500.jpg",
    points: "10",
    status: "Successfylly Recieved at Farmer's Farm (Desitnation Location)",
  },
];
