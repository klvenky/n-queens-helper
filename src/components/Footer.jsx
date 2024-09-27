import React from "react";
import { Link } from './Link';

export const Footer = () => {
  return (
    <div className="footer">
      Crown icon by{" "}
      <Link href="https://www.freepik.com/" title="Freepik">
        Freepik
      </Link>
      &nbsp;from&nbsp;
      <Link
        href="https://www.flaticon.com/"
        title="Flaticon"
        style={{ textDecorationColor: "red", textDecoration: "none" }}
      >
        flaticon&nbsp;
      </Link>
      is licensed by&nbsp;
      <Link
        href="http://creativecommons.org/licenses/by/3.0/"
        title="Creative Commons BY 3.0"
        target="_blank"
      >
        CC 3.0 BY
      </Link>
    </div>
  );
};