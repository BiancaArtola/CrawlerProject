import React from "react";
import PropTypes from "prop-types";
import key from "weak-key";
import HeaderComponentWaitPage from "./../ReactComponents/HeaderComponentWaitPage";

const WaitPage = ({ data2 }) =>
  !data2.length ? (
    <p>Nothing to show</p>
  ) : (
    <div className="column">
    	  <HeaderComponentWaitPage />
    </div>
);

WaitPage.propTypes = {
  data2: PropTypes.array.isRequired
};

export default WaitPage;
      