import React, { Component } from "react";
import PropTypes from "prop-types";
import Box from "@material-ui/core/Box";
import LinkIcon from "@material-ui/icons/Link";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import copy from "copy-to-clipboard";

class GenerateLink extends Component {
  state = {
    link: null
  };

  render() {
    const { link } = this.state;

    return (
      <Box display="flex" flexDirection="row" alignItems="baseline">
        <Button
          size="small"
          variant="outlined"
          onClick={this.generateLink}
          startIcon={<LinkIcon />}
          color="primary"
          style={{ marginRight: "4px" }}
        >
          Generate Link
        </Button>
        {link && (
          <Typography size="small" color="secondary">
            Link has been copied to clipboard.
          </Typography>
        )}
      </Box>
    );
  }

  generateLink = () => {
    const { participants, startDate } = this.props;

    let newLink = "?";

    if (startDate) {
      const date = new Date(startDate);
      newLink += `startTime=${date.getHours()}:${date.getMinutes()}&`;
    }

    if (participants) {
      newLink += `participants=${participants.map(
        item => `${item.name || ""},${item.hourlyRate},${item.count}`
      )}`;
    }

    copy(window.location.origin + "/metting-meter" + newLink);

    this.setState({
      link: newLink
    });
  };
}

GenerateLink.propTypes = {
  participants: PropTypes.array,
  startDate: PropTypes.instanceOf(Date)
};

export default GenerateLink;
