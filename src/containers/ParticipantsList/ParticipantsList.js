import React, { Component } from "react";
import PropTypes from "prop-types";
import Box from "@material-ui/core/Box";
import ParticipantItem from "./ParticipantItem";

class ParticipantsList extends Component {
  render() {
    const { participants, participantOnChange } = this.props;

    return (
      <Box display="flex" flexDirection="column" justifyContent="center">
        {participants.map((item, index) => (
          <ParticipantItem
            key={index}
            id={index}
            name={item.name}
            hourlyRate={item.hourlyRate}
            count={item.count}
            onChange={changedItem => participantOnChange(changedItem)}
          />
        ))}
      </Box>
    );
  }
}

ParticipantsList.propTypes = {
  participants: PropTypes.array,
  participantOnChange: PropTypes.func
};

export default ParticipantsList;
