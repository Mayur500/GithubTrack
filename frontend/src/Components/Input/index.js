import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import axios from "axios";
import "./style.css";

function Input(props) {
  const [active, setActive] = useState((props.locked && props.active) || false);
  const [value, setValue] = useState(props.value || "");

  const changeValue = (event) => {
    const value = event.target.value;
    setValue(value);
  };

  const fetchDetails = async () => {
    props.setCommits(false);
    if (value) {
      props.setFetching(true);
      const userRepos = await axios.get(
        `/users/userinfo/${value}`
      );
      props.setuserData(userRepos.data);
      props.setFetching(false);
    }
  };
  const { locked } = props;
  const fieldClassName = `field ${
    (locked ? active : active || value) && "active"
  } ${locked && !active && "locked"}`;

  return (
    <div className={fieldClassName}>
      <input
        id={1}
        type="text"
        value={value}
        placeholder="Github Username"
        onChange={changeValue}
        onFocus={() => !locked && setActive(true)}
        onBlur={() => !locked && setActive(false)}
      />
      <label htmlFor={1}>Github Username</label>
      <FaSearch
        style={{ color: "black", cursor: "pointer" }}
        onClick={fetchDetails}
      />
    </div>
  );
}

export default Input;
