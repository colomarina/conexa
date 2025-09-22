import React from "react";

import { StateMessageType } from "types/components/molecules/StateMessageType";

const StateMessage = ({
  title,
  message,
  type = "default",
  titleClassName = "",
  messageClassName = "",
}: StateMessageType) => {
  const isPlaceholder = type === "loading";

  return (
    <div className="card-body">
      <h5
        className={`card-title text-light mb-4 text-center ${
          isPlaceholder ? "placeholder-glow" : ""
        } ${titleClassName}`}
      >
        {isPlaceholder ? <span className="placeholder col-6"></span> : title}
      </h5>
      <p
        className={`text-light ${
          isPlaceholder ? "placeholder-glow" : ""
        } ${messageClassName}`}
      >
        {isPlaceholder ? (
          <>
            <span className="placeholder col-7"></span>
            <span className="placeholder col-4"></span>
            <span className="placeholder col-8"></span>
          </>
        ) : (
          message
        )}
      </p>
    </div>
  );
};

export default StateMessage;
