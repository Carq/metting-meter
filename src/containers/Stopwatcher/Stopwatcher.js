import React, { Component } from "react";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";

class Stopwatch extends Component {
  constructor(props) {
    super(props);
    if (props.startTime) {
      const parsedDate = this.parseTime(props.startTime);
      if (parsedDate) {
        this.state = {
          startTime: parsedDate,
          isTicking: true
        };
        this.startInterval();
      }
    } else {
      this.state = {};
    }
  }

  render() {
    return (
      <Box display="flex" flexDirection="column">
        <Box m="auto">{this.renderTime()}</Box>
        <Box m="auto">{this.renderButtons()}</Box>
      </Box>
    );
  }

  renderTime = () => {
    const { timePass } = this.state;
    const time = this.convertMsToTime(timePass);

    return (
      <Typography variant="h3">{`${time.hours}:${time.minutes}:${time.seconds}`}</Typography>
    );
  };

  renderButtons = () => (
    <ButtonGroup variant="contained" color="primary">
      <Button onClick={this.startWatcher}>Start</Button>
      <Button onClick={this.stopWatcher}>Stop</Button>
      <Button onClick={this.resetWacher}>Reset</Button>
    </ButtonGroup>
  );

  startWatcher = () => {
    const { isTicking } = this.state;

    if (isTicking) {
      return;
    }

    this.startInterval();

    this.setState({
      isTicking: true,
      startTime: new Date()
    });
  };

  stopWatcher = () => {
    clearInterval(this.watcherInterval);
    this.setState({
      isTicking: false
    });
  };

  resetWacher = () => {
    this.setState(
      {
        startTime: new Date()
      },
      this.calculateTimePass
    );
  };

  startInterval = () => {
    this.watcherInterval = setInterval(this.calculateTimePass, 100);
  };

  parseTime = time => {
    const hour = time.split(":")[0];
    const minutes = time.split(":")[1];
    const today = new Date();

    return new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
      hour,
      minutes
    );
  };

  calculateTimePass = () => {
    const { startTime } = this.state;
    const { timeOnChange } = this.props;

    let timePass = new Date() - startTime;
    timePass = timePass > 0 ? timePass : 0;
    if (timeOnChange) {
      timeOnChange(timePass);
    }

    this.setState({
      timePass: timePass > 0 ? timePass : 0
    });
  };

  convertMsToTime = timeInMs => {
    if (!timeInMs) {
      return {
        hours: "00",
        minutes: "00",
        seconds: "00"
      };
    }

    return {
      hours: this.formatToTwoCharsNumber(
        Math.floor((timeInMs / (1000 * 60 * 60)) % 24)
      ),
      minutes: this.formatToTwoCharsNumber(
        Math.floor((timeInMs / 1000 / 60) % 60)
      ),
      seconds: this.formatToTwoCharsNumber(Math.floor((timeInMs / 1000) % 60))
    };
  };

  formatToTwoCharsNumber = number => `${number}`.padStart(2, "0");
}

Stopwatch.propTypes = {
  timeOnChange: PropTypes.func
};

export default Stopwatch;
