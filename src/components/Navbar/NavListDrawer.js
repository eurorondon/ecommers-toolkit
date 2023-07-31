import {
  Box,
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import React from "react";
import {
  ContactPhone,
  Height,
  Help,
  Home,
  Menu,
  Policy,
} from "@mui/icons-material";
import { Link } from "react-router-dom";

import { Link as LinkScroll } from "react-scroll";
import { useSelector } from "react-redux";

const navLinks = [
  { title: `Home`, path: `/`, icon: <Home /> },
  { title: `Categorias`, path: `/categorias`, icon: <ContactPhone /> },
  { title: `Mis ordernes`, path: `/misordenes`, icon: <Policy /> },
  { title: `Mi perfil`, path: `/miperfil`, icon: <Help /> },
];

const NavListDrawer = ({ setOpen }) => {
  return (
    <Box sx={{ width: "250px", backgroundColor: "#f2f2f2", height: "100%" }}>
      <nav>
        <List>
          <div className="">
            <div
              className="my-3 mx-3 "
              style={{ maxWidth: "120px", backgroundColor: "" }}
            >
              <img alt="logo" src="/images/logo.png" className="img-fluid" />
            </div>

            {navLinks?.map((item) => (
              <Link
                to={item.path}
                spy={true}
                smooth={true}
                offset={-150}
                duration={100}
                onClick={() => setOpen(false)}
              >
                <ListItemButton key={item.title}>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText>{item.title}</ListItemText>
                </ListItemButton>
              </Link>
            ))}
          </div>
        </List>
      </nav>
    </Box>
  );
};

export default NavListDrawer;
