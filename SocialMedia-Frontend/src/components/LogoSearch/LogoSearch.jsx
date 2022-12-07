import React, { useState, useEffect } from "react";
import Logo from "../../img/logo1-removebg-preview.png";
import { UilSearch } from "@iconscout/react-unicons";
import "./LogoSearch.css";
import { search } from "../../api/UserRequest";

const LogoSearch = () => {
  const [query, setQuery] = useState("");
  const [data, setData] = useState([]);
  const [openSearch, setOpenSearch] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      const res = await search(query);
      console.log(res, "dataa");
      setData(res.data);
    };
    if (query.length === 0 || query.length > 2) fetchData();
  }, [query]);
  return (
    <div className="LogoSearch">
      <img width={"47px"} height={"42px"} src={Logo} alt="" />
      <div className="Search">
        <input
          type="text"
          placeholder="#Explore"
          onChange={(e) => setQuery(e.target.value.toLowerCase())}
        />
        <div className="s-icon">
          <UilSearch onClick={() => setOpenSearch((prev) => !prev)} />
        </div>
      </div>
    </div>
  );
};

export default LogoSearch;
