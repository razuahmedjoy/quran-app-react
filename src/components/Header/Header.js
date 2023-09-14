import React, { useEffect } from 'react';

const Header = ({ surahs, selectedSurah, setSelectedSurah, selectedAyat, setSelectedAyat, fonts, setArabicFont }) => {



    useEffect(() => {

        const newSelected = surahs.find(surah => surah.number === 1);
        setSelectedSurah(newSelected)


    }, [surahs])


    const setSurah = (e) => {

        const id = parseInt(e.target.value)
        const newSelected = surahs.find(surah => surah.number === id);

        setSelectedSurah(newSelected);
        setSelectedAyat(1);

    }

    return (
        <header className="flex flex-wrap justify-start items-center gap-y-4 w-full  gap-x-4">
            <div className="w-full md:w-fit">
                <select onChange={setSurah} className="select w-full md:w-fit select-bordered bg-gray-800 text-white">

                    {
                        surahs ?
                            surahs.map(surah =>

                                <option className="py-2" key={surah.number} value={surah.number} selected={surah.number === selectedSurah?.number}>
                                    {surah.number}. {surah.englishName} - {surah.name}
                                </option>
                            )
                            : "no"
                    }
                </select>
            </div>
            <div className="w-full md:w-fit">
                <select onChange={(e) => setSelectedAyat(parseInt(e.target.value))} className="select w-full md:w-fit select-bordered bg-gray-800 text-white">

                    {

                        [...Array(selectedSurah?.numberOfAyahs).keys()].map(i =>
                            <option key={i} value={i + 1} selected={selectedAyat === i + 1}>Ayat {i + 1}</option>)

                    }
                </select>
            </div>


            {/* set arabic Fonts */}
            <div className="w-full md:w-fit ml-auto hidden md:block">
                <label htmlFor="font" className="text-white text-sm mr-2">Select Arabic Font</label>
                <select onChange={(e) => setArabicFont(parseInt(e.target.value))} className="select w-full md:w-fit select-bordered bg-gray-800 text-white">

                    {

                        fonts.map((font, i) =>
                            <option key={i} value={i} >{font}</option>)

                    }
                </select>
            </div>
        </header>
    );
};

export default Header;