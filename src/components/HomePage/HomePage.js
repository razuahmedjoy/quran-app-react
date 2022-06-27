import React, { useEffect, useState } from 'react';
import useSurahs from '../../hooks/useSurahs';
import Header from '../Header/Header';

import { AiOutlineArrowRight, AiOutlineArrowLeft } from 'react-icons/ai';

const fonts = ['noorEHidayat', 'saleemQuran'];

const HomePage = () => {
    const { surahs } = useSurahs();
    const [selectedSurah, setSelectedSurah] = useState({});
    const [selectedAyat, setSelectedAyat] = useState(1);
    const [ayatDetails, setAyatDetails] = useState({});
    const [selectedQuari, setSelectedQuari] = useState(1);
    const [loading, setLoading] = useState(false)

    const [arabicFont, setArabicFont] = useState(0);



    const [quari, setQuari] = useState([]);


    useEffect(() => {
        const fetchQuari = async () => {
            const res = await fetch("https://api.quranref.com/api/quaries");
            const data = await res.json();
            setQuari(data.quaries);
        }

        fetchQuari();
    }, [])

    useEffect(() => {

        if (selectedSurah !== undefined && selectedAyat && selectedQuari) {

            setLoading(true);

            const url = `https://api.quranref.com/api/${selectedSurah?.id}/${selectedAyat}?audio_version=${selectedQuari}`;
            // console.log(url);

            const fetchAyatDetails = async () => {
                const res = await fetch(url);
                const data = await res.json();
                setAyatDetails(data.data);
                setLoading(false);

            }
            fetchAyatDetails()

        }


    }, [selectedSurah, selectedAyat, selectedQuari])

    // console.log(ayatDetails);

    const quariHandler = (e) => {

        const { value } = e.target;
        // console.log(value)
        setSelectedQuari(parseInt(value))

    }
    // console.log(ayatDetails)

    const playPrev = () => {
        if (ayatDetails.prev_surah !== selectedSurah.id) {
            const newSelectedSurah = surahs.find(surah => surah.id === ayatDetails.prev_surah);
            setSelectedSurah(newSelectedSurah);
            setSelectedAyat(ayatDetails.prev_ayah)
        }
        else {
            setSelectedAyat(ayatDetails.prev_ayah)
        }


        // console.log(selectedSurah,selectedAyat)


    }
    const playNext = () => {
        if (ayatDetails.next_surah !== selectedSurah.id) {
            const newSelectedSurah = surahs.find(surah => surah.id === ayatDetails.next_surah);
            setSelectedSurah(newSelectedSurah);
            setSelectedAyat(1)
        }
        else {
            setSelectedAyat(ayatDetails.next_ayah)
        }


        // console.log(selectedSurah,selectedAyat)


    }

    return (
        <div className="min-h-screen bg-blend-overlay bg-mainBg bg-cover bg-no-repeat opacity-90 bg-gray-900 py-5 px-2 md:px-10 flex flex-col justify-between">


            <Header
                surahs={surahs}
                selectedSurah={selectedSurah}
                setSelectedSurah={setSelectedSurah}
                selectedAyat={selectedAyat}
                setSelectedAyat={setSelectedAyat}
                fonts={fonts}
                setArabicFont={setArabicFont}

            />


            <main className="flex justify-between items-center px-1 md:px-5 gap-x-2 gap-y-8 py-3 md:py-2">
                <div>
                    <div onClick={playPrev} className="w-[30px] h-[30px] rounded-full bg-gray-800 flex justify-center items-center">
                        <AiOutlineArrowLeft color='white' size={20} className='cursor-pointer' />
                    </div>
                </div>

                {
                    !loading ?

                        <div className="p-1 md:p-5">
                            <h2 className={`text-center text-md md:text-4xl text-white ${!arabicFont ? `font-noorEHidayat` : `font-${fonts[arabicFont]}`}`}>
                                {ayatDetails?.ayah?.text}
                            </h2>
                            <h2 className="text-center text-md md:text-3xl text-white my-6">
                                {ayatDetails?.ayah?.text_bn}
                            </h2>
                            <h4 className="text-center text-sm md:text-lg text-white">
                                {ayatDetails?.ayah?.text_en}
                            </h4>

                        </div>

                        : <div class="flex items-center justify-center ">
                            <div class="w-16 h-16 border-b-2 border-white rounded-full animate-spin"></div>
                        </div>
                }

                <div>
                    <div onClick={playNext} className="w-[30px] h-[30px] rounded-full bg-gray-800 flex justify-center items-center">

                        <AiOutlineArrowRight color='white' size={20} className='cursor-pointer' />
                    </div>
                </div>
            </main>

            <div>

                <div className="w-full flex flex-wrap gap-y-5 justify-center items-center gap-x-4">

                    <div>
                        <select onChange={quariHandler} className="select w-full select-bordered bg-gray-800 text-white">
                            {
                                quari && quari.length > 0 ?
                                    (
                                        quari.map((quari, i) => <option value={quari.id} key={quari.id}>{i + 1}. {quari.name}</option>)
                                    )
                                    :
                                    <option>Loading</option>
                            }
                        </select>
                    </div>
                    <div>
                        {
                            ayatDetails?.ayah?.audio &&
                            <audio onEnded={playNext} id="main-player" src={ayatDetails?.ayah?.audio} autoPlay="true" controls="controls"></audio>
                        }
                    </div>


                </div>

                <div className="mt-3">
                    <h2 className="text-center md:text-end text-white text-base">Developed By Razu Ahmed Joy</h2>
                </div>

            </div>


        </div>
    );
};

export default HomePage;