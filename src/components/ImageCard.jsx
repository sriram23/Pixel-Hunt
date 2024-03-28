const ImageCard = ({ image }) => {
  return (
    <div
      className="relative m-2 w-full md:w-1/3 xl:w-1/4 cursor-zoom-in border p-auto rounded-md"
      title={image.alt_description}
      style={{ background: image.color }}
    >
      <img
        className="w-full h-full object-contain"
        key={image.id}
        src={image.urls.small}
        alt={image.alt_description}
      />
      <div className="absolute top-0 opacity-0  hover:opacity-80 hover:shadow-inner  w-full h-full flex flex-col justify-end z-30 transition-shadow">
        <div className="flex justify-between items-center p-2 bg-slate-200">
          <div className="flex items-center cursor-pointer">
            <img
              className="rounded-full h-10 w-10 m-2"
              src={image.user.profile_image.small}
              alt={image.user.first_name + "'s profile"}
            />
            <div>
              <h2 className="text-2xl">{image.user.first_name}</h2>
            </div>
          </div>
          <div>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => window.open(image.links.download)}>Download</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageCard;
