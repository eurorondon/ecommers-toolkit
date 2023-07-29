import React from "react";
import Categorias from "../components/homeComponents/Categorias";
import Header from "../components/Header";
import ShopSections from "../components/homeComponents/ShopSection/ShopSection";
import CategoryList from "../components/homeComponents/ShopSection/CategoryList ";
import Footer from "../components/Footer";

function CategoriesResult() {
  return (
    <>
      <div
        className="pb-5"
        style={{ backgroundColor: "#d8eaf2", height: " 100%" }}
      >
        <Header />
        <Categorias />
        <div className="container my-5">
          <CategoryList />
        </div>
        {/* <ShopSections /> */}
      </div>
      <Footer />
    </>
  );
}

export default CategoriesResult;
