import React from "react";
import Header from "../components/Header";
import Search from "../components/homeComponents/ShopSection/Search";
import GridProductList from "../components/homeComponents/ShopSection/GridProductList";
import ShopSections from "../components/homeComponents/ShopSection/ShopSection";
import Categorias from "../components/homeComponents/Categorias";
import Footer from "../components/Footer";

function SearchResults() {
  return (
    <>
      <div
        className="pb-5"
        style={{ backgroundColor: "#d8eaf2", height: " 100%" }}
      >
        <Header />
        <Categorias />
        <ShopSections />
      </div>
      <Footer />
    </>
  );
}

export default SearchResults;
