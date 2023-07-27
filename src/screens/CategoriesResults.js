import React from "react";
import Categorias from "../components/homeComponents/Categorias";
import Header from "../components/Header";
import ShopSections from "../components/homeComponents/ShopSection/ShopSection";
import CategoryList from "../components/homeComponents/ShopSection/CategoryList ";

function CategoriesResult() {
  return (
    <div>
      <Header />
      <Categorias />
      <div className="container my-5">
        <CategoryList />
      </div>
      {/* <ShopSections /> */}
    </div>
  );
}

export default CategoriesResult;
