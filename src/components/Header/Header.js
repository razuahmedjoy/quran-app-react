import React, { useEffect, useState } from 'react';
import useSurahs from '../../hooks/useSurahs';

const Header = ({surahs,selectedSurah,setSelectedSurah,selectedAyat,setSelectedAyat}) => {

    




    useEffect(() => {

        const newSelected = surahs.find(surah => surah.id === 1);

        setSelectedSurah(newSelected)


    }, [surahs])


    const setSurah = (e) => {

        const id = parseInt(e.target.value)
        const newSelected = surahs.find(surah => surah.id === id);

        setSelectedSurah(newSelected);
        setSelectedAyat(1);

    }

    // console.log(selectedSurah)
    return (
        <header className="flex flex-wrap justify-start items-center gap-y-4 w-full md:w-1/2 gap-x-4">
            <div className="w-full md:w-fit">
                <select onChange={setSurah} className="select w-full md:w-fit select-bordered bg-gray-800 text-white">

                    {
                        surahs ?
                            surahs.map(surah =>

                                <option className="py-2" key={surah.id} value={surah.id} selected={surah.id === selectedSurah?.id}>
                                    {surah.id}. {surah.name_en} - {surah.name}
                                </option>
                            )
                            : "no"
                    }
                </select>
            </div>
            <div className="w-full md:w-fit">
                <select onChange={(e)=>setSelectedAyat(parseInt(e.target.value))} className="select w-full md:w-fit select-bordered bg-gray-800 text-white">

                    {

                        [...Array(selectedSurah?.number_of_ayahs).keys()].map(i => 
                        <option key={i} value={i + 1} selected={selectedAyat === i+1}>Ayat {i + 1}</option>)

                    }
                </select>
            </div>
        </header>
    );
};

export default Header;