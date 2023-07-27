import React from "react";
import Header from "../components/Header";
import Search from "../components/homeComponents/ShopSection/Search";
import GridProductList from "../components/homeComponents/ShopSection/GridProductList";
import ShopSections from "../components/homeComponents/ShopSection/ShopSection";
import Categorias from "../components/homeComponents/Categorias";

function SearchResults() {
  return (
    <div>
      <Header />
      <Categorias />
      <ShopSections />
    </div>
  );
}

export default SearchResults;
