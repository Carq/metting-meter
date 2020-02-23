import React, { Component } from "react";
import PropTypes from "prop-types";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import ProffessionSingleItem from "./ProffessionSingleItem/";

class ProffessionsList extends Component {
  state = {
    proffessions: [
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
    ]
  };

  render() {
    const { proffessions } = this.state;

    return (
      <Box display="flex" flexDirection="column" justifyContent="center">
        {proffessions.map((item, index) => (
          <ProffessionSingleItem
            key={index}
            id={index}
            name={item.name}
            hourlyRate={item.hourlyRate}
            count={item.count}
            onChange={this.proffesionChange}
          />
        ))}
        <Button>Add</Button>
      </Box>
    );
  }

  proffesionChange = changedProffession => {
    this.setState(state => {
      const list = state.proffessions.map((item, index) => {
        if (index === changedProffession.id) {
          return {
            name: changedProffession.name,
            hourlyRate: changedProffession.hourlyRate,
            count: changedProffession.count
          };
        } else {
          return item;
        }
      });

      return { proffessions: list };
    }, this.merge);
  };

  merge = () => {
    const { proffessions } = this.state;
    const { calculationOnChange } = this.props;
    let participantsPerHourlyRate = {};

    proffessions.map(
      proffession =>
        (participantsPerHourlyRate[proffession.hourlyRate] =
          proffession.count +
          (participantsPerHourlyRate[proffession.hourlyRate] || 0))
    );

    if (calculationOnChange) {
      calculationOnChange(participantsPerHourlyRate);
    }
  };
}

ProffessionsList.propTypes = {
  calculationOnChange: PropTypes.func
};

export default ProffessionsList;
