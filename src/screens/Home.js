import React from "react";
import ShopSections from "../components/homeComponents/ShopSection/ShopSection";
import Header from "../components/Header";
import Categorias from "../components/homeComponents/Categorias";
import NewProducts from "../components/homeComponents/NewProducts/NewProducts";
import Destacados from "../components/homeComponents/Destacados/Destacados";
import Ofertas from "../components/homeComponents/Ofertas/Ofertas";
import { useSelector } from "react-redux";

// import GridProductList from "../components/homeComponents/GridProductList";

const Home = () => {
  const { isLoading } = useSelector((state) => state.products);

  return (
    <div className="bg-neutral-100">
      <Header />
      <Categorias />
      {isLoading ? null : (
        <>
          <NewProducts />
          <Destacados />
          <Ofertas />
        </>
      )}
      <ShopSections />
    </div>
  );
};

export default Home;
