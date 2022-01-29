import React, { Component } from "react";
import PropTypes from "prop-types";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Stopwatcher from "../Stopwatcher";
import TotalMeetingCost from "../TotalMeetingCost";
import ParticipantsList from "../ParticipantsList";
import GenerateLink from "../GenerateLink";
import "./styles.scss";

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
      countPerHourlyRate: this.calculateCountPerHourlyRate(initialParticipants),
    };
  }

  participantOnChange = (changedParticipant) => {
    this.setState((state) => {
      const list = state.participants.map((item, index) => {
        if (index === changedParticipant.id) {
          return {
            name: changedParticipant.name,
            hourlyRate: changedParticipant.hourlyRate,
            count: changedParticipant.count,
          };
        } else {
          return item;
        }
      });

      return {
        participants: list,
        countPerHourlyRate: this.calculateCountPerHourlyRate(list),
      };
    });
  };

  calculateCountPerHourlyRate = (participants) => {
    let countPerHourlyRate = {};

    participants &&
      participants.map(
        (participant) =>
          (countPerHourlyRate[participant.hourlyRate] =
            participant.count +
            (countPerHourlyRate[participant.hourlyRate] || 0))
      );

    return countPerHourlyRate;
  };

  render() {
    const { participants, startTime, startDate, timePassInMs } = this.state;

    return (
      <Container className="metting-metter_container effect" maxWidth="sm">
        <Box>
          <Box>
            <TotalMeetingCost
              timeInMs={timePassInMs}
              participantsPerHourlyRate={this.state.countPerHourlyRate}
            />
            <Stopwatcher
              startTime={startTime}
              startDateOnChange={this.startDateOnChange}
              timeOnChange={(timePass) => {
                this.setState({
                  timePassInMs: timePass,
                });
              }}
            />
          </Box>
          <ParticipantsList
            participants={participants}
            participantOnChange={this.participantOnChange}
            onAddParticipant={this.addParticipantSlot}
            canAddParticipant={participants.length < 10}
            canRemoveParticipant={participants.length > 1}
            onRemoveParticipant={this.removeLastParticipantSlot}
          />
          <GenerateLink
            participants={participants}
            startDate={startDate}
          ></GenerateLink>
        </Box>
      </Container>
    );
  }

  addParticipantSlot = () => {
    const { participants } = this.state;

    participants.push({ hourlyRate: 0, count: 0 });

    this.setState(participants);
  };

  removeLastParticipantSlot = () => {
    const { participants } = this.state;

    participants.pop();
    this.setState({
      participants,
      countPerHourlyRate: this.calculateCountPerHourlyRate(participants),
    });
  };

  parseParticipants = (participantsToParse) => {
    if (!participantsToParse) {
      return new Array(3).fill({ hourlyRate: 0, count: 0 });
    }

    let participants = new Array(3);
    const splited = participantsToParse.split(",");

    let arrayIndex = 0;
    for (let i = 0; i < splited.length; i += 3) {
      participants[arrayIndex++] = {
        name: splited[i],
        hourlyRate: parseInt(splited[i + 1]) || 0,
        count: parseInt(splited[i + 2]) || 0,
      };
    }

    return participants.fill({ hourlyRate: 0, count: 0 }, arrayIndex, 3);
  };

  startDateOnChange = (newStartDate) => {
    this.setState({
      startDate: newStartDate,
    });
  };
}

MettingMeter.propTypes = {
  startTime: PropTypes.string,
};

export default MettingMeter;
