import React from "react";
import "./style.css";
import Spinner from "../Loading/loading";
import img from "../../images/empty.png";

function Table(props) {
  const { userData, isCommits, fetching } = props;

  const getData = () => {
    if (!fetching && userData.length == 0) {
      return (
        <>
          <div>
            <img src={img} />
          </div>
        </>
      );
    } else if (fetching) {
      return <Spinner />;
    } else {
      return <>{props.children}</>;
    }
  };

  return (
    <div>
      <div
        className={`main-data ${isCommits && !fetching ? "table-data" : ""}`}
      >
        {getData()}
      </div>
    </div>
  );
}

export default Table;
