import React from "react";
import ShopSections from "../components/homeComponents/ShopSection/ShopSection";
import Header from "../components/Header";
import Categorias from "../components/homeComponents/Categorias";
import NewProducts from "../components/homeComponents/NewProducts/NewProducts";
import Destacados from "../components/homeComponents/Destacados/Destacados";
import Ofertas from "../components/homeComponents/Ofertas/Ofertas";

// import GridProductList from "../components/homeComponents/GridProductList";

const Home = () => {
  return (
    <div className="bg-neutral-100">
      <Header />
      <Categorias />
      <NewProducts />
      <Destacados />
      <Ofertas />

      <ShopSections />
    </div>
  );
};

export default Home;
