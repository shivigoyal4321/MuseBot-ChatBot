import React from "react";

const Blog = () => {
  return (
    <div className="blog text-black flex flex-col justify-center items-center m-2 border-4 rounded-2xl bg-red-50 border-cyan-300">
      <h1 className="text-5xl font-bold m-4">THE MUSEUM</h1>
      <div className="flex  items-center justify-center flex-col">
        <ul className="font-bold text-2xl m-5 w-[80%]  text-center">
          <li>
            The City Palace Museum in Jaipur is a magnificent testament to the
            rich history and culture of Rajasthan. Nestled within the heart of
            the Pink City, it is part of the larger City Palace complex, which
            served as the royal residence of the Maharajas of Jaipur. Built
            between 1727 and 1732 by Maharaja Sawai Jai Singh II, the City
            Palace blends Rajput, Mughal, and European architectural styles,
            making it a unique and impressive structure.
          </li>
        </ul>
        <ul className="font-semibold text-4xl m-5 w-[80%]  text-center">
        <li>Highlights of the City Palace Museum:</li>

        </ul>
        <ul className="font-semibold  md:text-lg 2xl:text-2xl flex m-5 w-[90%] 2xl:w-[80%] md:gap-8 2xl:gap-4">
          <li className="card1 border-2 bg-white bg-opacity-30 shadow-black shadow-lg text-black  md:pl-2 md:pr-2 2xl:p-4 rounded-2xl flex felx-col items-center justify-center text-center">

            Mubarak Mahal: This palace, constructed in the late 19th century by
            Maharaja Madho Singh II, houses a textile museum that displays royal
            costumes, embroidered shawls, Kashmiri pashmina, and delicate silks.
            Visitors can glimpse the intricate craftsmanship and luxury enjoyed
            by the Rajasthani royals.
          </li>
          <li className="card2 border-2  bg-black bg-opacity-50 shadow-black shadow-lg  text-white md:pl-2 md:pr-2 2xl:p-4 rounded-2xl flex felx-col items-center justify-center text-center">
            Chandra Mahal: The seven-storeyed building, part of which is still
            the residence of the Jaipur royal family, showcases royal artifacts
            and stunning views of Jaipur. The museum exhibits a wide collection
            of paintings, manuscripts, and weapons.
          </li>
          <li className="card3 border-2 bg-white bg-opacity-50 shadow-black  shadow-2xl md:pl-2 md:pr-2 2xl:p-4 rounded-2xl flex felx-col items-center justify-center text-center">
            Pritam Niwas Chowk: The courtyard features four intricately designed
            gates, each symbolizing a season. The Peacock Gate, for example,
            represents autumn and is decorated with vibrant peacock motifs.
          </li>
          <li className="card4 border-2 bg-opacity-50 bg-black shadow-black text-white  shadow-2xl md:pl-2 md:pr-2 2xl:p-4 rounded-2xl flex felx-col items-center justify-center text-center">
            Sileh Khana: Also known as the Armoury, this section exhibits an
            extensive array of weapons used by the royal family, including
            swords, shields, and other historical weaponry, giving insight into
            the martial heritage of the region.
          </li>
          
        </ul>
      </div>
    </div>
  );
};

export default Blog;
