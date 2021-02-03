import { useContext, useCallback } from "react";
import Context from "./context";
import draw from "./draw";

export default function Lottery() {
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
}
