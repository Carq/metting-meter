import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";
import Box from "@material-ui/core/Box";

class TotalMeetingCost extends Component {
  state = {
    avgHourlyRate: 0,
  };

  render() {
    return (
      <Box display="flex" flexDirection="column">
        <Box m="auto">{this.renderTotalCost()}</Box>
      </Box>
    );
  }

  renderTotalCost = () => {
    return (
      <Typography
        m={5}
        variant="h2"
      >{`€${this.calculateTotalCost()}`}</Typography>
    );
  };

  calculateTotalCost = () => {
    const { timeInMs, participantsPerHourlyRate } = this.props;
    const msInOneHour = 3600000;
    let avgHourlyRate = 0;

    for (var hourlyRateKey in participantsPerHourlyRate) {
      avgHourlyRate +=
        (participantsPerHourlyRate[hourlyRateKey] || 0) * (hourlyRateKey || 0);
    }

    return ((avgHourlyRate / msInOneHour) * timeInMs).toFixed(2);
  };
}

TotalMeetingCost.propTypes = {
  timeInMs: PropTypes.number,
  participantsPerHourlyRate: PropTypes.object,
};

export default TotalMeetingCost;
