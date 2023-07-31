import React, { useEffect } from "react";
import ShopSections from "../components/homeComponents/ShopSection/ShopSection";
import Header from "../components/Header";
import Categorias from "../components/homeComponents/Categorias";
import NewProducts from "../components/homeComponents/NewProducts/NewProducts";
import Destacados from "../components/homeComponents/Destacados/Destacados";
import Ofertas from "../components/homeComponents/Ofertas/Ofertas";
import { useSelector } from "react-redux";
import Portada from "../components/homeComponents/Portada";
import Whatsapp from "../components/homeComponents/Whatsapp";
import { withAuthenticator } from "@aws-amplify/ui-react";
import NavListDrawer from "../components/Navbar/NavListDrawer";

// import GridProductList from "../components/homeComponents/GridProductList";

const CategoriaScreen = () => {
  const { isLoading } = useSelector((state) => state.products);

  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  return (
    <div
      className="pb-5"
      style={{ backgroundColor: "#d8eaf2", height: " 100%" }}
    >
      <Header />
      <Categorias />
      <NewProducts />
      <Ofertas />
      <Destacados />
      {isLoading ? null : <></>}
      <ShopSections />
      <Whatsapp />
    </div>
  );
};

export default CategoriaScreen;
