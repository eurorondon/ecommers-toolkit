import React from "react";
import ShopSections from "../components/homeComponents/ShopSection/ShopSection";
import Header from "../components/Header";

// import GridProductList from "../components/homeComponents/GridProductList";

const Home = () => {
  return (
    <div className="bg-neutral-100">
      <Header />
      <ShopSections />
    </div>
  );
};

export default Home;
