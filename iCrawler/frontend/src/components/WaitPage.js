import React from "react";
import PropTypes from "prop-types";
import key from "weak-key";


const WaitPage = ({ data2 }) =>
  !data2.length ? (
    <p>Nothing to show</p>
  ) : (
    <div className="column">
    	<h10>Estoy esperando q cargue la pagina</h10>
    </div>
  );

WaitPage.propTypes = {
  data2: PropTypes.array.isRequired
};
export default WaitPage;
      