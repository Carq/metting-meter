import React, { Component } from "react";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Header from "./containers/Header";
import Stopwatcher from "./containers/Stopwatcher";
import TotalMeetingCost from "./containers/TotalMeetingCost";
import ParticipantsList from "./containers/ParticipantsList";

class App extends Component {
  constructor(props) {
    super(props);

    const initialParticipants = [
      {
        name: "Senior Dev",
        hourlyRate: 30,
        count: 3
      },
      {
        name: "Medium Dev",
        hourlyRate: 20,
        count: 4
      },
      {
        name: "Team Leader",
        hourlyRate: 35,
        count: 1
      }
    ];

    this.state = {
      timePassInMs: 0,
      startTime: null,
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

    participants.map(
      participant =>
        (countPerHourlyRate[participant.hourlyRate] =
          participant.count + (countPerHourlyRate[participant.hourlyRate] || 0))
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
}
export default App;
