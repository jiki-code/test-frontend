import React, { useEffect, useState } from "react";
import Header from "@/components/header";
import FilterForm from "@/components/filterForm";
import TaskList from "@/components/taskList";

import { mockItems } from "../lib/table";
function HomePage() {
  const [taskBuffer, setTaskBuffer] = useState([]);
  const [filter, setFilter] = useState({
    name: "",
    category: "",
    stock: 0,
    rating: 0,
    pagesize: 5,
  });
  useEffect(() => {
    const filtered = mockItems.filter((item) => {
      const matchName = filter.name
        ? item.name.toLowerCase().includes(filter.name.toLowerCase()) ||
          item.id.toString().includes(filter.name.toLowerCase())
        : true;

      const matchCategory = filter.category
        ? item.category === filter.category
        : true;

      const matchStock = filter.stock ? item.stock > 0 : true;
      const matchRating = item.rating >= filter.rating;

      return matchName && matchCategory && matchStock && matchRating;
    });

    // handle pagesize (string → number)

    setTaskBuffer(filtered);
  }, [filter]);

  return (
    <div className="min-h-screen w-full bg-indigo-50 relative">
      <Header className="pb-3 px-3" />
      <FilterForm
        className="p-3"
        formSearch={filter}
        onChange={(next) => {
          setFilter(next);
          // here you can re-fetch or filter local data
        }}
      />
      <TaskList
        className="p-3"
        listData={taskBuffer}
        pageSize={filter.pagesize}
      />
    </div>
  );
}

export default HomePage;
