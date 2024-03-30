import React, { Suspense, useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
// const ImageCard = React.lazy(() => import('./components/ImageCard'))
import ImageCard from "./components/ImageCard";
import ProfileCard from "./components/profileCard";

const App = () => {
  const [query, setQuery] = useState("");
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPage] = useState(0);
  const [userDetails, setUserDetails] = useState({});
  const [showModal, setShowModal] = useState(false);
  const PER_PAGE = 18;
  const URL = process.env.URL +
  "search/photos/" +
  "?query=" +
  query +'&per_page=' + PER_PAGE +
  "&page=" + currentPage +
  "&client_id=" +
  process.env.ACCESS_KEY
  const searchImage = async () => {
    setCurrentPage(1)
    try {
      const res = await fetch(
        URL
      );
      console.log("Status: ", res.status)
      if (res.status === 403) {
        alert("API rate exceeded, please try again later");
        return;
      } else if (res.status === 200) {
      const data = await res.json();
      console.log("Data: ", data);
      setData(data.results);
      setTotalPage(data.total_pages);
      }
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  const getUserDetails = async (img) => {
    const res = await fetch(img.user.links.self, {
      method: 'GET',
      headers: {
        Authorization: `Client-ID ${process.env.ACCESS_KEY}`, 
      }
    });
    const data = await res.json();
    console.log("User Details: ", data)
    setUserDetails(data)
    setShowModal(true)
  }


  const nextPage = async () => {
    try{
    const res = await fetch(
      URL
    );
    console.log("Status: ", res.status)
      if (res.status === 403) {
        alert("API rate exceeded, please try again later");
        return;
      } else if (res.status === 200) {
    const data = await res.json();
    setData((prv) => [...prv, ...data.results]);
      }
    } catch(error){
      console.error("Error: ", error);
    }
  }
  const incrementPage = () => {
    setCurrentPage((prv) => prv + 1);
  }
  useEffect(() => {
    nextPage()
  }, [currentPage])
  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-top-color to-bottom-color">
      <h1 className="p-2 text-2xl text-bold">Pixel Hunt</h1>
      <div>
        <input
          className="m-2 p-2 border"
          onChange={(e) => setQuery(e.target.value)}
          type="text"
          placeholder="Search for images"
        />
        <button className="m-2 p-2 border bg-button rounded-md" onClick={searchImage}>
          Search
        </button>
      </div>
      <div className="flex flex-wrap border justify-center">
        {data.map((image) => (
          <Suspense key={image.id} fallback={<div>Loading...</div>}>
            <ImageCard key={image.id} image={image} onUserClick={getUserDetails}/>
          </Suspense>
        ))}
        {totalPages !== 0 && totalPages > currentPage && <button onClick={incrementPage} className="w-full border p-2 m-2 bg-button">Load more</button>}
      </div>
      {/* Modal */}
      {showModal && <div onClick={() => setShowModal(false)} className="fixed top-0 bottom-0 right-0 left-0 w-screen h-screen z-20 flex item-center bg-slate-200 justify-center">
          <div onClick={(e) => e.stopPropagation()} className="w-full lg:w-4/5 mt-24 lg:m-24 overflow-auto whitespace-normal z-50 bg-white">
            <ProfileCard profile={userDetails}/>
          </div>
      </div>}
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
