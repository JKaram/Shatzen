import classNames from "classnames";
import React, { useContext, useEffect, useState } from "react";
import useIsFirstRender from "../../hooks/useIsFirstRender";
import { PossibleEstimate } from "../../types/aliases";
import { POSSIBLE_ESTIMATES } from "../../types/constants";
import { SocketContext } from "../Provider/SocketProvider";

type Props = {
  updateOptions: (arg) => void;
};

export default function CustomEstimates({ updateOptions }: Props) {
  const { estimateOptions } = useContext(SocketContext);
  const [newEstimates, setNewEstimate] = useState(estimateOptions);

  function modifyPossibleEstimate(estimate: PossibleEstimate) {
    if (newEstimates.includes(estimate)) {
      setNewEstimate(newEstimates.filter((e) => e !== estimate));
    } else {
      setNewEstimate([...newEstimates, estimate]);
    }
  }

  useEffect(() => {
    updateOptions({ estimateOptions: newEstimates });
  }, [newEstimates]);

  return (
    <div>
      <h1>Customize</h1>
      <ul className="flex space-x-2 justify-center">
        {POSSIBLE_ESTIMATES.map((estimate) => (
          <li
            key={estimate}
            onClick={() => modifyPossibleEstimate(estimate)}
            className={classNames(
              "p-2 border-2 rounded",
              newEstimates.includes(estimate) ? "bg-sky-300" : undefined
            )}
          >
            {estimate}
          </li>
        ))}
      </ul>
    </div>
  );
}
