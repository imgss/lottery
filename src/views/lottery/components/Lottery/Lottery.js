import React, { useContext, useCallback } from "react";
import Context from "../../context";
import draw from "./draw";

export default React.memo(function Lottery() {
  const { users } = useContext(Context);
  const ref = useCallback(
    (canvas) => {
      if (canvas) {
        draw(canvas, users);
      }
    },
    [users]
  );

  return <canvas ref={ref}></canvas>;
});
