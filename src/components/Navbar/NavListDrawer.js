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

const navLinks = [
  { title: `Home`, path: `/`, icon: <Home /> },
  { title: `Contacto`, path: `/`, icon: <ContactPhone /> },
  { title: `Politicas`, path: `/`, icon: <Policy /> },
  { title: `Ayuda`, path: `/`, icon: <Help /> },
];

const NavListDrawer = () => {
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
              <ListItemButton key={item.title}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText>{item.title}</ListItemText>
              </ListItemButton>
            ))}
          </div>
        </List>
      </nav>
    </Box>
  );
};

export default NavListDrawer;
