import * as React from "react";

export const Footer: React.FC = () => {
  return (
    <React.Fragment>
      <hr />
      <div className="mt-8 px-6 flex justify-center">
        <div>
          Trailers |{" "}
          <a className="hover:text-green-600" href="www.samsonemes.me">
            samsonemes
          </a>
        </div>
      </div>
      <div className="py-6 px-6 flex justify-center">
        <div>&copy; 2021</div>
      </div>
    </React.Fragment>
  );
};

export default Footer;
