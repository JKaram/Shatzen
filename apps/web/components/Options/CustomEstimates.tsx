import classNames from "classnames";
import React, { useContext, useEffect, useState } from "react";
import { PossibleEstimate, Config } from "../../types/aliases";
import {
  numberToNewValue,
  POSSIBLE_ESTIMATES,
  valueDescriptions,
} from "../../types/constants";
import { SocketContext } from "../provider/SocketProvider";

type Props = {
  updateConfig: (arg: Partial<Config>) => void;
};

export default function CustomEstimates({ updateConfig }: Props) {
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
    updateConfig({ possibleEstimates: newEstimates });
  }, [newEstimates]);

  return (
    <div>
      <h1 className="text-lg">Customize Estimates</h1>
      <h2 className="mb-2 text-sm text">
        Mix and match which options work best for your team
      </h2>

      <ul className="flex flex-wrap justify-center gap-2">
        {POSSIBLE_ESTIMATES.filter((e) => e >= 0).map((estimate) => (
          <li key={estimate} onClick={() => modifyPossibleEstimate(estimate)}>
            <EstimateCard
              estimate={estimate}
              onClick={modifyPossibleEstimate}
              selected={newEstimates.includes(estimate)}
            />
          </li>
        ))}
      </ul>
      <h3 className="mt-3 mb-1">Special Estimates</h3>
      <ul className="flex flex-col gap-2">
        {POSSIBLE_ESTIMATES.filter((e) => e < 0).map((estimate) => (
          <li
            key={estimate}
            onClick={() => modifyPossibleEstimate(estimate)}
            className="flex items-center"
          >
            <EstimateCard
              estimate={estimate}
              onClick={modifyPossibleEstimate}
              selected={newEstimates.includes(estimate)}
            />
            <span className="ml-2 text-sm">
              {valueDescriptions[estimate.toString()]}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function EstimateCard(props: {
  onClick: (arg: PossibleEstimate) => void;
  estimate: PossibleEstimate;
  selected: boolean;
}) {
  return (
    <div
      onClick={() => props.onClick(props.estimate)}
      className={classNames(
        " cursor-pointer w-9 h-12 rounded flex justify-center items-center border-black border",
        props.selected ? "bg-green-200" : undefined
      )}
    >
      {numberToNewValue(props.estimate)}
    </div>
  );
}
