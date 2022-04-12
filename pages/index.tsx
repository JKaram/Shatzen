import React, { useContext, useEffect, useState } from "react";
import UserModal from "../components/Modal";
import { SocketContext, useSockets } from "../components/provider/SocketProvider";
import { useCheckUser } from "../hooks/useCheckForUser";
import { possibleEstimates } from "../types/constants";
import { userEstimate } from "../utils/helpers";

const App = () => {
  const { users, estimates, average, id } = useContext(SocketContext);
  const { addEstimate, reveal } = useSockets();
  const isExistingUser = useCheckUser();
  const [show, setShow] = useState(!isExistingUser);

  return (
    <div className="min-h-screen min-w-full bg-slate-100">
      <UserModal show={show} toggle={() => setShow(false)} />
      <div style={{ border: "1px solid blue" }}>
        <h1 className="text-lg font-bold">Users</h1>
        <ul>
          {users.map((user) => {
            const hasEstimated = userEstimate(user.id, estimates);
            return (
              <li key={user.id} className={`${hasEstimated !== false ? "text-green-800" : ""}`}>
                {user.name}
              </li>
            );
          })}
        </ul>
      </div>
      <div style={{ border: "1px solid red" }}>
        <h1 className="text-lg font-bold">Estimates</h1>

        <ul>
          {estimates.map((estimates) => (
            <li key={estimates.id}>{estimates.estimate}</li>
          ))}
        </ul>
      </div>
      <div>
        <h1 className="text-lg font-bold">Buttons</h1>

        {possibleEstimates.map((estimate) => {
          const hasEstimated = userEstimate(id, estimates);
          const whichNumber = hasEstimated !== false ? hasEstimated : undefined;

          return (
            <button
              className={`${whichNumber === estimate ? "bg-emerald-200" : ""}`}
              key={estimate}
              onClick={() => addEstimate(estimate)}
            >
              {estimate}
            </button>
          );
        })}
      </div>
      <div style={{ border: "1px solid green" }}>
        <h1 className="text-lg font-bold">Total</h1>
        <p>{average}</p> <button onClick={() => reveal()}>Reveal</button>
      </div>
    </div>
  );
};

export default App;
