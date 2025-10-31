import React, { useState, useEffect } from "react";
import { categoryType, pageSize } from "@/lib/data";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";

const FilterForm = ({
  className = "",
  // initial value from parent
  formSearch: initialForm = {
    name: "",
    category: "",
    stock: false,
    rating: 0,
    pagesize: "",
  },
  // callback to parent
  onChange, // (nextForm) => void
}) => {
  const [form, setForm] = useState(initialForm);
  useEffect(() => {
    setForm(initialForm);
  }, [initialForm]);
  // generic updater that also informs parent
  const updateForm = (next) => {
    setForm(next);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    updateForm({
      ...form,
      [name]: value,
    });
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    updateForm({
      ...form,
      [name]: checked,
    });
  };

  const handleRangeChange = (e) => {
    updateForm({
      ...form,
      rating: Number(e.target.value),
    });
  };

  const onReset = () => {
    const resetForm = {
      name: "",
      category: "",
      stock: false,
      rating: 0,
      pagesize: 10,
    };
    // update local
    setForm(resetForm);
    // emit to parent
    onChange?.(resetForm);
  };

  const onSearch = () => {
    // in this pattern, search is just "emit current form"
    onChange?.(form);
  };

  return (
    <div className={`${className} w-full`}>
      <div className="space-y-4 flex flex-row items-center justify-between w-full bg-neutral-50 dark:bg-slate-900 rounded-xl mt-3 shadow-xl border border-neutral-200 dark:border-slate-800 p-6">
        <div className="grid grid-cols-4 gap-4 w-full">
          {/* Search */}
          <div className="w-full">
            <label className="text-muted-foreground dark:text-white ">
              Search
            </label>
            <Input
              name="name"
              value={form.name}
              placeholder="Search ID or Name"
              onChange={handleInputChange}
              className="w-full mt-1 border-1 border-gray-300 bg-gray-50 dark:bg-neutral-900 border-neutral-200 dark:border-back rounded-xl p-2 text-sm"
            />
          </div>

          {/* Category */}
          <div className="w-full flex flex-col">
            <label className="text-muted-foreground dark:text-white pb-1">
              Category
            </label>
            <select
              name="category"
              value={form.category}
              onChange={handleInputChange}
              className="border-1 bg-gray-50 dark:bg-neutral-900 border-neutral-200 dark:border-back rounded-xl p-2 text-sm"
            >
              <option value="">All</option>
              {categoryType.map((category, index) => (
                <option key={index} value={category.value}>
                  {category.value}
                </option>
              ))}
            </select>
          </div>

          {/* Page size */}
          <div className="w-full flex flex-col">
            <label className="text-muted-foreground dark:text-white pb-1">
              PageSize
            </label>
            <select
              name="pagesize"
              value={form.pagesize}
              onChange={handleInputChange}
              className="border-1 bg-gray-50 dark:bg-neutral-600 border-neutral-200 dark:border-back rounded-xl p-2 text-sm"
            >
              {pageSize.map((p, index) => (
                <option key={index} value={p.value}>
                  {p.value} /page
                </option>
              ))}
            </select>
          </div>

          {/* Stock */}
          <div className="w-full">
            <label className="custom-checkbox flex gap-2 items-end mt-6">
              <input
                type="checkbox"
                name="stock"
                checked={form.stock}
                onChange={handleCheckboxChange}
                className="mt-5"
              />
              <span className="text-muted-foreground dark:text-white">
                In stock only
              </span>
            </label>
          </div>

          {/* Rating */}
          <div className="w-full flex flex-col">
            <label className="text-muted-foreground dark:text-white">
              Min rating {form.rating}
            </label>
            <input
              type="range"
              min={0}
              max={5}
              step={1}
              value={form.rating}
              onChange={handleRangeChange}
              className="w-48"
            />
          </div>
          <div className="flex gap-3">
            <Button onClick={onSearch} className="dark:bg-red-500" variant="destructive">
              Search
            </Button>
            <Button onClick={onReset} className="dark:bg-blue-500" variant="outline">
              Reset
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterForm;
