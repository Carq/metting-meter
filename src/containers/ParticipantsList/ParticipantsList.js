import React, { Component } from "react";
import PropTypes from "prop-types";
import Box from "@material-ui/core/Box";
import ParticipantItem from "./ParticipantItem";
import IconButton from "@material-ui/core/IconButton";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import PersonAddDisabledIcon from "@material-ui/icons/PersonAddDisabled";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Tooltip from "@material-ui/core/Tooltip";

class ParticipantsList extends Component {
  render() {
    const {
      participants,
      canRemoveParticipant,
      canAddParticipant,
      participantOnChange,
      onAddParticipant,
      onRemoveParticipant,
    } = this.props;

    return (
      <Box display="flex" flexDirection="column" justifyContent="center" m={2}>
        <Box display="flex" flexDirection="column" justifyContent="center">
          {participants &&
            participants.map((item, index) => (
              <ParticipantItem
                key={index}
                id={index}
                name={item.name}
                hourlyRate={item.hourlyRate}
                count={item.count}
                onChange={(changedItem) => participantOnChange(changedItem)}
              />
            ))}
        </Box>
        <Box m="auto">
          <ButtonGroup>
            <Tooltip title="Add participant">
              <IconButton
                variant="contained"
                color="primary"
                disabled={!canAddParticipant}
                onClick={() => onAddParticipant && onAddParticipant()}
              >
                <PersonAddIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Remove last participant">
              <IconButton
                variant="contained"
                color="secondary"
                disabled={!canRemoveParticipant}
                onClick={() => onRemoveParticipant && onRemoveParticipant()}
              >
                <PersonAddDisabledIcon />
              </IconButton>
            </Tooltip>
          </ButtonGroup>
        </Box>
      </Box>
    );
  }
}

ParticipantsList.propTypes = {
  participants: PropTypes.array,
  canRemoveParticipant: PropTypes.bool,
  canAddParticipant: PropTypes.bool,
  participantOnChange: PropTypes.func,
  onAddParticipant: PropTypes.func,
  onRemoveParticipant: PropTypes.func,
};

export default ParticipantsList;
