import React from "react";
const CSRFToken = props => {
  const csrftoken = getCookie("csrftoken");

  return <input type="hidden" name="csrfmiddlewaretoken" value={csrftoken} />;
};

export default CSRFToken;
