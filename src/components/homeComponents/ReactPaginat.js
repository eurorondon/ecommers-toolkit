import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setPage } from "../../features/products/productsSlice";

const ReactPaginat = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(0);
  const { pages, page } = useSelector((state) => state.products);
  const dispatch = useDispatch();

  const handlePageClick = (data) => {
    const selectedPage = data.selected;
    dispatch(setPage(selectedPage));
    setCurrentPage(selectedPage);
    navigate(`?page=${selectedPage}`);

    window.scrollTo({ top: 100, left: 0, behavior: "smooth" });
    // setTimeout(function () {
    // }, 100);
  };

  return (
    <ReactPaginate
      previousLabel={"<"}
      nextLabel={<i className="fas fa-chevron-right"></i>}
      pageCount={pages}
      pageRangeDisplayed={2}
      onPageChange={handlePageClick}
      containerClassName="flex justify-center mt-6"
      pageClassName="mr-1"
      pageLinkClassName="bg-white border border-gray-300 text-gray-500 rounded-md px-3 py-2 hover:bg-gray-100"
      activeLinkClassName="bg-gray-200"
      previousClassName="bg-white border border-gray-300 text-gray-500 rounded-md px-3 py-2 hover:bg-gray-100"
      nextClassName="bg-white border border-gray-300 text-gray-500 rounded-md px-3 py-2 hover:bg-gray-100"
      previousLinkClassName="flex items-center"
      nextLinkClassName="flex items-center"
      disabledClassName="opacity-50 cursor-not-allowed"
      forcePage={page}
    />
  );
};

export default ReactPaginat;
