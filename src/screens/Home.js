import React from "react";
import ShopSections from "../components/homeComponents/ShopSection/ShopSection";
import Header from "../components/Header";
import Categorias from "../components/homeComponents/Categorias";
import Carousel from "../components/homeComponents/Carousel";

// import GridProductList from "../components/homeComponents/GridProductList";

const Home = () => {
  return (
    <div className="bg-neutral-100">
      <Header />
      <Carousel />
      <Categorias />

      <ShopSections />
    </div>
  );
};

export default Home;
