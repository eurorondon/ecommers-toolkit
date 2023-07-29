import React, { useState } from "react";
import NavListDrawer from "./NavListDrawer";
import {
  AppBar,
  Box,
  Button,
  Drawer,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import { ContactPhone, Help, Home, Menu, Policy } from "@mui/icons-material";

const navLinks = [
  { title: `Home`, path: `/`, icon: <Home /> },
  { title: `Contacto`, path: `/`, icon: <ContactPhone /> },
  { title: `Politicas`, path: `/`, icon: <Policy /> },
  { title: `Ayuda`, path: `/`, icon: <Help /> },
];

const session = [
  { title: `Login`, path: `/`, icon: <Home /> },
  { title: `Sign up`, path: `/`, icon: <ContactPhone /> },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            color="inherit"
            size="large"
            onClick={() => setOpen(true)}
            style={window.innerWidth >= 640 ? { display: "none" } : null}
          >
            <Menu className="" style={{ fontSize: "2rem" }} />
          </IconButton>
          <div className="flex" style={{ flexGrow: "1" }}>
            <IconButton color="inherit" sx={{ maxWidth: "70px" }}>
              <img
                src="/images/logo.png"
                alt="Descripción de la imagen"
                // style={{ maxWidth: "10px" }}
              />
            </IconButton>
            {/* <Box sx={{ display: { xs: "none", sm: "flex" } }}> */}
            <Box className="hidden sm:flex ">
              {navLinks.map((item) => (
                <Button key={item.title} color="inherit">
                  {item.title}
                </Button>
              ))}
            </Box>
          </div>
          {/* <Box sx={{ display: { xs: "none", sm: "flex", gap: "10px" }  }}> */}
          <Box className="hidden sm:flex  ">
            {session.map((item) => (
              <Button
                variant="contained"
                key={item.title}
                color="secondary"
                sx={{ margin: "0 5px" }}
              >
                {item.title}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
      {/* <NavListDrawer /> */}
      <Button variant="contained">Open</Button>
      <Drawer
        open={open}
        anchor="left"
        onClose={() => setOpen(false)}
        // sx={{ display: { xs: "flex", sm: "none" } }}
        className="sm:hidden"
      >
        <NavListDrawer navLinks={navLinks} />
      </Drawer>
    </>
  );
};

export default Navbar;
