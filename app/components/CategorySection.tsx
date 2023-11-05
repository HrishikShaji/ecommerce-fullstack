"use client";

import { FormEvent, useState } from "react";

type payload = {
  name: string;
};

export const CategorySection = () => {
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);

  const addCategory = async (e: FormEvent, payload: payload) => {
    e.preventDefault();
    try {
      setLoading(true);
      await fetch("/api/category", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    } catch (error) {
      console.log(error);
    } finally {
      setCategory("");
      setLoading(false);
    }
  };
  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-xl font-semibold">Add Categories</h1>
      <form
        className="flex gap-2"
        onSubmit={(e) => addCategory(e, { name: category })}
      >
        <input
          value={category}
          className="p-2 text-black focus:outline-none placeholder-gray-800"
          placeholder="eg : shoes"
          onChange={(e) => setCategory(e.target.value)}
        />
        <button className="px-3 py-2 border-white border-2">
          {loading ? "Adding..." : "Add"}
        </button>
      </form>
    </div>
  );
};
