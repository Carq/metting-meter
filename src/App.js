import React, { Component } from "react";
import MettingMeter from "./containers/MettingMeter";
import Footer from "./containers/Footer";
import history from "./history";
import { addUrlProps, UrlQueryParamTypes } from "react-url-query";

const urlPropsQueryConfig = {
  startTime: { type: UrlQueryParamTypes.string },
  participants: { type: UrlQueryParamTypes.string }
};

class App extends Component {
  componentDidMount() {
    // force an update if the URL changes
    history.listen(() => this.forceUpdate());
  }

  render() {
    const { startTime, participants } = this.props;
    return (
      <React.Fragment>
        <MettingMeter
          startTime={startTime}
          initialParticipants={participants}
        />
        <Footer />
      </React.Fragment>
    );
  }
}

export default addUrlProps({ urlPropsQueryConfig })(App);
