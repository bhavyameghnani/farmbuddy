import React, { Component } from "react";
import "./App.css";
import { Route, Switch, HashRouter } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";

import SignUpPage from "./Components/SignUpPage/SignUpPage";
import LoginPage from "./Components/LoginPage/LoginPage";
import Home from "./Components/LandingPage/LandingPage";
import MarketPlace from "./Components/MarketPlace/MarketPlace";
import ProductDetailPage from "./Components/AdminPage/ProductDetailPage";

import Web3 from "web3";
import { ABI, ADDRESS } from "./config";
import Track from "./Components/Track/Track";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      account: "",
      allAccounts: [],
      accountBalance: 0,
      loading: true,
      web3State: null,
      wallet: null,
      taskList: null,
      balanceAmount: null,
      owner: null,
      warehouse: null,
      city: null,
      open: false,
      receipt: null,
      taskCount: null,
      allTasks: [],
    };

    this.createTask = this.createTask.bind(this);
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
    window.location.reload();
  };

  componentWillMount() {
    this.loadBlockchainData();
  }

  async loadBlockchainData() {
    //Initialise Web3 and get Network
    const web3 = new Web3("http://127.0.0.1:7545"); // new Web3(Web3.givenProvider || "http://localhost:8545")
    this.setState({ web3State: web3 });

    const network = await web3.eth.net.getNetworkType();
    console.log("network", network);

    //Fetch Accounts & Save it in React-state
    const accounts = await web3.eth.getAccounts();
    this.setState({ account: accounts[0] });
    this.setState({ allAccounts: accounts });
    console.log("accounts", accounts);

    //Get Balance of the current account
    var balance = await web3.eth.getBalance(this.state.account);
    balance = this.state.web3State.utils.fromWei(balance, "ether");
    this.setState({ accountBalance: balance });
    console.log("Owner's Balance", balance);

    //Load Task List Smart Contract
    const taskList = new web3.eth.Contract(ABI, ADDRESS);
    this.setState({ taskList: taskList });
    console.log("TaskListContract", taskList);

    //Get Main Owner Account from Blockchain by calling owner Function()
    const owner = this.state.allAccounts[0];
    this.setState({ owner: owner });
    console.log("owner", owner);

    //Get warehouse Account from Blockchain
    const warehouse = this.state.allAccounts[1];
    this.setState({ warehouse: warehouse });
    console.log("warehouse", warehouse);

    //Get city Account from Blockchain
    const city = this.state.allAccounts[2];
    this.setState({ city: city });
    console.log("city", city);

    //Get Total number of Tasks from Task List Smart Contract Blockchain by calling taskCount Function()
    const taskCount = await taskList.methods.taskCount().call();
    this.setState({ taskCount: taskCount });
    console.log("taskCount", taskCount);

    //Get All Tasks by calling task function()
    for (var i = 1; i <= taskCount; i++) {
      var allTasks = await taskList.methods.tasks(i).call();
      this.setState({
        allTasks: [...this.state.allTasks, allTasks],
      });
    }
    console.log("All Tasks", this.state.allTasks);

    //Set the state:loading to false once we have loaded our Blockchain
    this.setState({ loading: false });
  }

  createTask(content, statement, status, price, role) {
    console.log(content, statement, price, role);
    console.log("just wait...creating task now");
    this.setState({ loading: true });
    if (role === "Warehouse") {
      this.state.taskList.methods
        .createTask(
          content,
          statement,
          status,
          parseInt(price),
          this.state.warehouse
        )
        .send({ from: this.state.account, gas: 3000000 })
        .once("receipt", (receipt) => {
          this.setState({
            loading: false,
            receipt: receipt,
            open: true,
          });
        });
    } else if (role === "City") {
      this.state.taskList.methods
        .createTask(
          content,
          statement,
          status,
          parseInt(price),
          this.state.city
        )
        .send({ from: this.state.account, gas: 3000000 })
        .once("receipt", (receipt) => {
          this.setState({
            loading: false,
            receipt: receipt,
            open: true,
          });
        });
    } else {
      this.state.taskList.methods
        .createTask(
          content,
          statement,
          status,
          parseInt(price),
          this.state.owner
        )
        .send({ from: this.state.account, gas: 3000000 })
        .once("receipt", (receipt) => {
          this.setState({
            loading: false,
            receipt: receipt,
            open: true,
          });
        });
    }
  }

  render() {
    return (
      <div className="App">
        <HashRouter>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={LoginPage} />
            <Route exact path="/signup" component={SignUpPage} />
            <Route exact path="/home" component={Home} />
            <Route exact path="/marketplace" component={MarketPlace} />

            <Route exact path="/product/:id" component={ProductDetailPage} />
            <Route
              exact
              path="/trackproduct"
              render={() => (
                <Track
                  createTask={this.createTask}
                  allTasks={this.state.allTasks}
                />
              )}
            />
          </Switch>
        </HashRouter>

        <Dialog
          open={this.state.open}
          TransitionComponent={Transition}
          keepMounted
          maxWidth="lg"
          onClose={this.handleClose}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle>
            <b>Transaction Successful : Please find the receit below.</b>
          </DialogTitle>
          <DialogContent>
            {this.state.receipt && (
              <>
                <Typography gutterBottom variant="h6">
                  <b>Transaction Hash:</b>
                  {this.state.receipt.transactionHash}
                </Typography>
                <Typography gutterBottom variant="h6">
                  <b>Block Hash:</b> {this.state.receipt.blockHash}
                </Typography>
                <Typography gutterBottom variant="h6">
                  <b>Block Number:</b> {this.state.receipt.blockNumber}
                </Typography>
                <Typography gutterBottom variant="h6">
                  <b>Sender Address:</b> {this.state.receipt.to}
                </Typography>
                <Typography gutterBottom variant="h6">
                  <b>Recepient Address:</b> {this.state.receipt.from}
                </Typography>
                <Typography gutterBottom variant="h6">
                  <b>Gas used in Transaction:</b> {this.state.receipt.gasUsed}
                </Typography>
              </>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose}>Download</Button>
            <Button onClick={this.handleClose}>Close</Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default App;
