import classNames from "classnames";
import { useRouter } from "next/router";
import React from "react";
import BackButton from "./BackButton";
import HomeButton from "./HomeButton";
import OptionsModal from "./Options/OptionsModal";
import OptionsButton from "./OptionsButton";
import RoomLink from "./RoomLink";

export const Nav = () => {
  const router = useRouter();
  const [show, setShow] = React.useState(false);

  function closeOptions() {
    console.log("close");
    setShow(false);
  }
  function openOptions() {
    setShow(true);
  }

  const roomLogin = router.pathname.includes("/login/");
  const roomPage = !router.pathname.includes("/room/");

  return (
    <>
      <OptionsModal show={show} close={closeOptions} />
      <nav
        className={classNames(
          "flex justify-between text-2xl min-h-[100px] p-2"
        )}
      >
        {roomLogin && <HomeButton />}
        {!roomPage && (
          <>
            <div className="flex grow">
              <HomeButton />
            </div>
            <div className="flex">
              <RoomLink />
              <OptionsButton onClick={openOptions} />
            </div>
          </>
        )}
      </nav>
    </>
  );
};
