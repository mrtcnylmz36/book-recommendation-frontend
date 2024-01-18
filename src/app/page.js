"use client";
import { useState } from "react";
import Card from "@/components/Card";

export default function Home() {
  const [userInput, setUserInput] = useState("");
  const [recommendations, setRecommendations] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  const handleSearch = async () => {
    setLoading(true);
    const response = await fetch(
      `https://book-recommendation-uk6z.onrender.com/api/book_recommendation`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_input: userInput }),
      }
    );

    const data = await response.json();
    setRecommendations(data.recommendations);
    setLoading(false);
    console.log(data);
  };

  const handleLoadMore = async () => {
    setCurrentPage(currentPage + 1);

    const response = await fetch(
      `http://localhost:8000/api/book_recommendation?page=${currentPage + 1}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_input: userInput }),
      }
    );

    const data = await response.json();
    setRecommendations((prevRecommendations) => [
      ...prevRecommendations,
      ...data.recommendations,
    ]);
  };

  return (
    <div className="min-h-screen bg-slate-700 h-full w-full pt-40">
      <h1 className="text-white text-center text-5xl tracking-widest mb-20 mx-2">
        Book Recommendation
      </h1>
      <div className="w-full flex justify-center mb-10">
        <input
          type="text"
          value={userInput}
          onChange={handleInputChange}
          className="text-white text-2xl w-1/2 bg-transparent border-none outline-none"
          style={{ borderBottom: "2px solid white" }}
          placeholder="Get Book Recommendation"
        />

        <button
          onClick={handleSearch}
          className="ml-5 bg-yellow-400 text-black p-3 text-xl"
        >
          Search
        </button>
      </div>
      {loading && (
        <div className="w-full flex justify-center">
          <div
            class="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] text-warning motion-reduce:animate-[spin_1.5s_linear_infinite] border-yellow-400"
            role="status"
          >
            <span class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)">
              Loading...
            </span>
          </div>
        </div>
      )}
      {recommendations && (
        <ul className="grid grid-cols-1 md:grid-cols-2  xl:grid-cols-4 gap-10 p-10 ">
          {recommendations.map((book, index) => {
            return <Card key={index} recommendations={book} />;
          })}
        </ul>
      )}
    </div>
  );
}
