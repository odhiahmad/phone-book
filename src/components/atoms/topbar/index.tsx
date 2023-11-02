import * as React from "react";
import Styles from "./styles";
import Image from "next/image";
import { useRouter } from "next/router";

export interface PropTypes {
  title: string;
}

function TopBar({ title = "" }: PropTypes) {
  const router = useRouter();
  const goBack = () => {
    router.back();
  };

  return (
    <>
      <Styles>
        <div className="topbar flex" onClick={goBack}>
          <Image
            src="/left_chevron.svg"
            width={20}
            height={20}
            alt="Left Chevron"
          />
        </div>
        <div className="topbar-filler"></div>
      </Styles>
    </>
  );
}

export default TopBar;
