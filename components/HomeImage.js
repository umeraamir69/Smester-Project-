const HomeImage = () => {
  return (
    <div>
    <div className="relative flex  items-center ">
        <img
          src="./images/image3.png"
          alt="swiper"
          className="w-full md:h-full h-[250px]"
        />
        <div className="absolute left-4 sm:left-10 text-white text-xl font-bold">
          <div className="text-2xl sm:text-3xl lg:text-5xl lg:space-y-2 w-2/3">
            <p>Live stream of PPV and sporting events in HD</p>
            <div className="text-[16px] sm:text-xl lg:text-2xl sm:pt-2 lg:pt-5 bg-gradient-to-br from-magenta to-purple text-transparent bg-clip-text pb-4"></div>

            <button className="text-lg sm:text-xl lg:text-2xl rounded-md  shadow-white font-bold bg-gradient-to-tr from-red-600 to-yellow-400 px-2 sm:px-5 py-1 sm:py-2 ">
              Try Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeImage;
