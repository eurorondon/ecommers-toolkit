import React from "react";
import Header from "../components/Header";
import Search from "../components/homeComponents/ShopSection/Search";
import GridProductList from "../components/homeComponents/ShopSection/GridProductList";
import ShopSections from "../components/homeComponents/ShopSection/ShopSection";

function SearchResults() {
  return (
    <div>
      <Header />
      <ShopSections />
    </div>
  );
}

export default SearchResults;
