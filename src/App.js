import React, { Component } from "react";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Header from "./containers/Header";
import Stopwatcher from "./containers/Stopwatcher";
import TotalMeetingCost from "./containers/TotalMeetingCost";
import ProffessionsList from "./containers/ProffessionsList";

class App extends Component {
  state = {
    timePassInMs: 0,
    participantsPerHourlyRate: {}
  };

  render() {
    return (
      <Container>
        <Header />
        <Box>
          <TotalMeetingCost
            timeInMs={this.state.timePassInMs}
            participantsPerHourlyRate={this.state.participantsPerHourlyRate}
          />
          <Stopwatcher
            timeOnChange={timePass => {
              this.setState({
                timePassInMs: timePass
              });
            }}
          />
          <ProffessionsList
            calculationOnChange={participantsPerHourlyRate =>
              this.setState({
                participantsPerHourlyRate: participantsPerHourlyRate
              })
            }
          />
        </Box>
      </Container>
    );
  }
}
export default App;
