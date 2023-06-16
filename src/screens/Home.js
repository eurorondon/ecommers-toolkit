import React from "react";
import ShopSections from "../components/homeComponents/ShopSection/ShopSection";
import Header from "../components/Header";
import NewProducts from "../components/homeComponents/Newproducts";
import Categorias from "../components/homeComponents/Categorias";

// import GridProductList from "../components/homeComponents/GridProductList";

const Home = () => {
  return (
    <div className="bg-neutral-100">
      <Header />
      <Categorias />
      <NewProducts />
      <ShopSections />
    </div>
  );
};

export default Home;
