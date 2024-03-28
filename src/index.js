import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";

const App = () => {
  const [query, setQuery] = useState("");
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPage] = useState(0);
  const PER_PAGE = 20;
  const URL = process.env.URL +
  "search/photos/" +
  "?query=" +
  query +'&per_page=' + PER_PAGE +
  "&page=" + currentPage +
  "&client_id=" +
  process.env.ACCESS_KEY
  const searchImage = async () => {
    setCurrentPage(1)
    const res = await fetch(
      URL
    );
    const data = await res.json();
    console.log("Data: ", data);
    setData(data.results);
    setTotalPage(data.total_pages);
  };

  const nextPage = async () => {
    const res = await fetch(
      URL
    );
    const data = await res.json();
    setData((prv) => [...prv, ...data.results]);
  }
  const incrementPage = () => {
    setCurrentPage((prv) => prv + 1);
  }
  useEffect(() => {
    nextPage()
  }, [currentPage])
  return (
    <div className="min-h-screen w-full">
      <h1 className="m-2 text-2xl text-bold">Pixel Hunt</h1>
      <div>
        <input
          className="m-2 p-2 border"
          onChange={(e) => setQuery(e.target.value)}
          type="text"
          placeholder="Search for images"
        />
        <button className="m-2 p-2 border" onClick={searchImage}>
          Search
        </button>
      </div>
      <div className="flex flex-wrap w-full m-auto">
        {data.map((image) => (
          <div className="m-2 cursor-zoom-in border">
            <img
              className="w-full h-full object-cover"
              key={image.id}
              src={image.urls.thumb}
              alt={image.alt_description}
            />
          </div>
        ))}
        {totalPages !== 0 && totalPages > currentPage && <button onClick={incrementPage} className="w-full border p-2 m-2">Load more</button>}
      </div>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
