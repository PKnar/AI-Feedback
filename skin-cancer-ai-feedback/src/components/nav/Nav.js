import React, { useState } from "react";
import "../../styles/Nav.scss";
import { Link, useNavigate } from "react-router-dom";
import { BrainCircuit, DatabaseZap, Upload } from "lucide-react";

const MENU_LINKS = [
  {
    path: "/",
    name: "AI Skin Cancer Detector ",
  },
  {
    path: "/upload",
    name: "Upload",
    icon: <Upload size={18} />,
  },
];

function Nav() {
  const [active, setActive] = useState("upload");
  const navigate = useNavigate();

  return (
    <div className="nav">
      <h4> AI Skin Cancer Detector</h4>

      <button onClick={(e) => navigate("/")}>
        {" "}
        <Upload size={15} style={{ marginRight: "1rem" }} /> Upload
      </button>
      {/* <ul>
        {MENU_LINKS.map(({ path, name, icon }) => {
          return (
            <li
              className={`${name.toLowerCase() === active ? "active" : ""}`}
              onClick={(e) => {
                navigate(path);
                setActive(name.toLowerCase());
              }}
            >
              {icon && icon}
              {name}
            </li>
          );
        })}
      </ul> */}
    </div>
  );
}

export default Nav;
