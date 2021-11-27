import React from "react";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

function TotalMeetingCostHook(props) {
  return (
    <Box display="flex" flexDirection="column">
      <Box m="auto">{renderTotalCost(props)}</Box>
    </Box>
  );
}

function renderTotalCost(avgHourlyRate, props) {
  return (
    <Typography m={5} variant="h2">{`€${calculateTotalCost(
      avgHourlyRate,
      props
    )}`}</Typography>
  );
}

function calculateTotalCost(props) {
  const { timeInMs, participantsPerHourlyRate } = props;
  const msInOneHour = 3600000;
  let avgHourlyRate = 0;

  for (var hourlyRateKey in participantsPerHourlyRate) {
    avgHourlyRate +=
      (participantsPerHourlyRate[hourlyRateKey] || 0) * (hourlyRateKey || 0);
  }

  return ((avgHourlyRate / msInOneHour) * timeInMs).toFixed(2);
}

export default TotalMeetingCostHook;
