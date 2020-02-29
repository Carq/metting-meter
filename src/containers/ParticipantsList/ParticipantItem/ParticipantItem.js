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

    this.props.onChange({
      id: id,
      name: name,
      hourlyRate: parseInt(e.target.value),
      count: count
    });
  };

  countChanged = e => {
    const { id, name, hourlyRate } = this.props;

    this.props.onChange({
      id: id,
      name: name,
      hourlyRate: hourlyRate,
      count: parseInt(e.target.value)
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
          style={{ margin: "4px", width: "160px" }}
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
          style={{ margin: "4px", width: "100px" }}
        />
      </Box>
    );
  }
}

ParticipantItem.propTypes = {
  onChange: PropTypes.func
};

export default ParticipantItem;
