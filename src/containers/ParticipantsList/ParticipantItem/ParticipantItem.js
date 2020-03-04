import React, { Component } from "react";
import PropTypes from "prop-types";
import Box from "@material-ui/core/Box";

import TextField from "@material-ui/core/TextField";

class ParticipantItem extends Component {
  nameChanged = e => {
    const { id, hourlyRate, count } = this.props;

    this.props.onChange({
      id: id,
      name: e.target.value,
      hourlyRate: hourlyRate,
      count: count
    });
  };

  hourlyRateChanged = e => {
    const { id, name, count } = this.props;
    const newHourlyRate = parseInt(e.target.value) || 0;

    this.props.onChange({
      id: id,
      name: name,
      hourlyRate: newHourlyRate >= 0 ? newHourlyRate : 0,
      count: count
    });
  };

  countChanged = e => {
    const { id, name, hourlyRate } = this.props;
    const newCount = parseInt(e.target.value) || 0;

    this.props.onChange({
      id: id,
      name: name,
      hourlyRate: hourlyRate,
      count: newCount >= 0 ? newCount : 0
    });
  };

  render() {
    const { name, hourlyRate, count } = this.props;

    return (
      <Box mx="auto">
        <TextField
          label="Participant Name"
          value={name}
          onChange={this.nameChanged}
          style={{ margin: "4px", width: "180px" }}
        />
        <TextField
          label="Hourly Rate (€)"
          type="number"
          value={hourlyRate}
          onChange={this.hourlyRateChanged}
          style={{ margin: "4px", width: "120px" }}
        />
        <TextField
          label="Count"
          type="number"
          value={count}
          onChange={this.countChanged}
          style={{ margin: "4px", width: "60px" }}
        />
      </Box>
    );
  }
}

ParticipantItem.propTypes = {
  onChange: PropTypes.func
};

export default ParticipantItem;
