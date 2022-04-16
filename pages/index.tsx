import React, { useContext, useState } from "react";
import UserModal from "../components/StartupModal";
import { SocketContext, useSockets } from "../components/provider/SocketProvider";
import { useCheckUser } from "../hooks/useCheckForUser";
import { possibleEstimates } from "../types/constants";
import { userEstimate } from "../utils/helpers";
import { Status } from "../types/aliases";
import { UserCard } from "../components/UserCard";
import { EstimateCard } from "../components/EstimateCard";
const App = () => {
  const { users, estimates, average, user, status } = useContext(SocketContext);
  const { addEstimate, reveal, estimateMode } = useSockets();
  const isExistingUser = useCheckUser();
  const [show, setShow] = useState(!isExistingUser);

  // TODO Check user
  if (!user) return "No user";

  return (
    <div className="min-h-screen min-w-full bg-slate-100 border-8">
      <UserModal show={show} toggle={() => setShow(false)} />
      {/* Nav Component */}
      <h1>Shatzen</h1>
      <div className="flex flex-col justify-center">
        {/* UserPanel Component */}
        <div className="flex flex-col items-center">
          <h1 title={`Socket id : ${user.id}`}>{user.name}</h1>
          <div className="flex flex-col items-center">
            <span>Make an estimate</span>
            <div className="flex flex-wrap my-2 space-x-1">
              {possibleEstimates.map((estimate) => {
                const hasEstimated = userEstimate(user.id, estimates);
                const whichNumber = hasEstimated !== false ? hasEstimated : undefined;
                return (
                  <EstimateCard
                    isSelected={whichNumber === estimate}
                    onClick={() => addEstimate(estimate)}
                    key={estimate}
                  >
                    {estimate}
                  </EstimateCard>
                );
              })}
            </div>
          </div>
        </div>
        {/* Reveal Component */}
        <div className="flex flex-col items-center my-6">
          {status === "estimating" ? (
            <button disabled={estimates.length === 0} className="border-2 disabled:opacity-50" onClick={reveal}>
              Reveal
            </button>
          ) : (
            <>
              <h1 className="text-xl">{average}</h1>
              <span className="text-xs text-gray-600 cursor-pointer hover:text-black" onClick={estimateMode}>
                Estimate again
              </span>
            </>
          )}
        </div>
        {/* User Guesses Component */}
        <div className="flex justify-center space-x-4 items-center">
          {users
            .filter((fileredUser) => fileredUser.id !== user.id)
            .map((user) => {
              return <UserCard key={user.id} user={user} />;
            })}
        </div>
      </div>
    </div>
  );
};

export default App;
