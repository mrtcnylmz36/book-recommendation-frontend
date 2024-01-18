"use client";
import { useState } from "react";
import Card from "@/components/Card";

export default function Home() {
  const [userInput, setUserInput] = useState("");
  const [recommendations, setRecommendations] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  const handleSearch = async () => {
    // Kullanıcının girdiği verilere göre FastAPI'ye istek yap
    // Axios veya fetch gibi bir kütüphane kullanabilirsiniz
    // Burada kullanılan örnek, gerçek bir örnek değildir.
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
    console.log(data);
  };

  const handleLoadMore = async () => {
    // Kullanıcının taleplerine göre sayfayı artır
    setCurrentPage(currentPage + 1);

    // Axios veya fetch gibi bir kütüphane kullanabilirsiniz
    // Burada kullanılan örnek, gerçek bir örnek değildir.
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
