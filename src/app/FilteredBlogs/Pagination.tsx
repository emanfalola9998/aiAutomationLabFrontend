import React, { useState } from "react";
import data from "./data.json"; // your local JSON
import { useDispatch } from "react-redux";

const Pagination = ({ totalItems, itemsPerPage, currentPage, onPageChange }) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <div className="flex items-center gap-2 mt-4">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
      >
        Previous
      </button>

      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-3 py-1 rounded ${
            currentPage === page
              ? "bg-blue-500 text-white"
              : "bg-gray-100 hover:bg-gray-300"
          }`}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
};

type PaginatedListProps = {
    filteredBlogs: Blog[]
}

const PaginatedList = ({filteredBlogs} : PaginatedListProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2; // customize this

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredBlogs.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-3">Paginated Items</h1>

      <ul>
        {currentItems.map((item, i) => (
          <li key={i} className="border-b py-2">
            {item.title}
          </li>
        ))}
      </ul>

      <Pagination
        totalItems={filteredBlogs.length}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default PaginatedList;
