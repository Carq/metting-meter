import React from "react";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import "./styles.scss";

const Footer = () => (
  <Box className="footer">
    <Typography variant="caption" className="footer__item">
      <Link color="textSecondary" href="https://github.com/Carq/">
        github.com/Carq
      </Link>
    </Typography>
    -
    <Typography
      color="textSecondary"
      variant="caption"
      className="footer__item"
    >
      "Lost time is never found again." – Benjamin Franklin.
    </Typography>
  </Box>
);

export default Footer;
