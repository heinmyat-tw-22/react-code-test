import React, { useContext, useState } from "react";
import "./navbar.scss";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import BrowseGalleryOutlinedIcon from "@mui/icons-material/BrowseGalleryOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import Brightness4OutlinedIcon from "@mui/icons-material/Brightness4Outlined";
import Tooltip from "@mui/material/Tooltip";
import { NavLink, useNavigate } from "react-router-dom";
import { ThemeContext } from "../../../context/themeContext";
import { useAppDispatch } from "../../../hooks/useAppSelector";
import { filterPost } from "../../../context/PostSlice";

const Navbar = () => {
  const { toggleTheme, themeMode } = useContext(ThemeContext);
  const navigate = useNavigate();
  const [searchPostInput, setSearchPostInput] = useState("");
  const dispatch = useAppDispatch();

  const searchPost = (e: any) => {
    setSearchPostInput(e.target.value);
    dispatch(filterPost(e.target.value));
  };

  return (
    <div className="navbar">
      <div className="navbar-left" onClick={() => navigate("/")}>
        {themeMode ? (
          <img
            src="https://www.ancmedia.net/instant-blog/images/logo.png"
            alt=""
          />
        ) : (
          <img
            src="https://www.ancmedia.net/instant-blog/images/logo-dark.png"
            alt=""
          />
        )}
      </div>
      <div className="search-container">
        <input
          type="text"
          value={searchPostInput}
          placeholder="Search Post..."
          onChange={searchPost}
        />
        <SearchOutlinedIcon className="search-icon" />
      </div>
      <div className="navbar-right">
        <div className="navbar-icons">
          <Tooltip title="Home">
            <NavLink to={"/"} className="link">
              <HomeOutlinedIcon className="navbar-icon" />
            </NavLink>
          </Tooltip>
          <Tooltip title="Popular">
            <NavLink to={"/popular"} className="link">
              <FavoriteBorderOutlinedIcon className="navbar-icon" />
            </NavLink>
          </Tooltip>
          <Tooltip title="Categories">
            <NavLink to={"/categories"} className="link">
              <CategoryOutlinedIcon className="navbar-icon" />
            </NavLink>
          </Tooltip>
          <Tooltip title="Archives">
            <NavLink to={"/archives"} className="link">
              <BrowseGalleryOutlinedIcon className="navbar-icon" />
            </NavLink>
          </Tooltip>
          <Tooltip title="User">
            <NavLink to={"/user"} className="link">
              <AccountCircleOutlinedIcon className="navbar-icon" />
            </NavLink>
          </Tooltip>
          {themeMode ? (
            <div onClick={toggleTheme} style={{ height: 25 }}>
              <Brightness4OutlinedIcon className="navbar-icon" />
            </div>
          ) : (
            <div onClick={toggleTheme} style={{ height: 25 }}>
              <LightModeOutlinedIcon className="navbar-icon" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
