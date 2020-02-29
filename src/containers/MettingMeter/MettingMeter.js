import React, { Component } from "react";
import PropTypes from "prop-types";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Header from "../Header";
import Stopwatcher from "../Stopwatcher";
import TotalMeetingCost from "../TotalMeetingCost";
import ParticipantsList from "../ParticipantsList";

class MettingMeter extends Component {
  constructor(props) {
    super(props);

    const initialParticipants = this.parseParticipants(
      props.initialParticipants
    );

    this.state = {
      timePassInMs: 0,
      startTime: props.startTime,
      participants: initialParticipants,
      countPerHourlyRate: this.calculateCountPerHourlyRate(initialParticipants)
    };
  }

  participantOnChange = changedParticipant => {
    this.setState(state => {
      const list = state.participants.map((item, index) => {
        if (index === changedParticipant.id) {
          return {
            name: changedParticipant.name,
            hourlyRate: changedParticipant.hourlyRate || 0,
            count: changedParticipant.count
          };
        } else {
          return item;
        }
      });

      return {
        participants: list,
        countPerHourlyRate: this.calculateCountPerHourlyRate(list)
      };
    });
  };

  calculateCountPerHourlyRate = participants => {
    let countPerHourlyRate = {};

    participants &&
      participants.map(
        participant =>
          (countPerHourlyRate[participant.hourlyRate] =
            participant.count +
            (countPerHourlyRate[participant.hourlyRate] || 0))
      );

    return countPerHourlyRate;
  };

  render() {
    const { participants, startTime, timePassInMs } = this.state;

    return (
      <Container>
        <Header />
        <Box>
          <TotalMeetingCost
            timeInMs={timePassInMs}
            participantsPerHourlyRate={this.state.countPerHourlyRate}
          />
          <Stopwatcher
            startTime={startTime}
            timeOnChange={timePass => {
              this.setState({
                timePassInMs: timePass
              });
            }}
          />
          <ParticipantsList
            participants={participants}
            participantOnChange={this.participantOnChange}
          />
        </Box>
      </Container>
    );
  }

  parseParticipants = participantsToParse => {
    if (!participantsToParse) {
      return [];
    }

    let participants = [];
    const splited = participantsToParse.split(",");

    for (let i = 0; i < splited.length; i += 3) {
      participants.push({
        name: splited[i],
        hourlyRate: parseInt(splited[i + 1]) || 0,
        count: parseInt(splited[i + 2]) || 0
      });
    }

    return participants;
  };
}

MettingMeter.propTypes = {
  startTime: PropTypes.string
};

export default MettingMeter;
