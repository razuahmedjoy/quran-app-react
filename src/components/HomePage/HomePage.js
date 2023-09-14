import React, { useEffect, useState } from 'react';
import useSurahs from '../../hooks/useSurahs';
import Header from '../Header/Header';

import { AiOutlineArrowRight, AiOutlineArrowLeft } from 'react-icons/ai';

const fonts = ['noorEHidayat', 'saleemQuran'];

const HomePage = () => {
    const [allSurahs, setAllSurahs] = useState([]);
    const { surahs } = useSurahs();
    const [selectedSurah, setSelectedSurah] = useState({});
    const [selectedAyat, setSelectedAyat] = useState(1);
    const [ayatDetails, setAyatDetails] = useState({});
    const [selectedQuari, setSelectedQuari] = useState(6);
    const [loading, setLoading] = useState(false)

    const [arabicFont, setArabicFont] = useState(0);



    const [quari, setQuari] = useState([]);



    useEffect(() => {
        const fetchQuari = async () => {
            const res = await fetch("http://api.alquran.cloud/v1/edition?format=audio&language=ar");
            const data = await res.json();
 
            setQuari(data.data)

        }

        fetchQuari();
        const createData = async ()=>{
            const res = await fetch("http://api.alquran.cloud/v1/quran/ar.alafasy");
            const data1 = await res.json();
            const enData = data1.data.surahs;

            const res2 = await fetch("http://api.alquran.cloud/v1/quran/bn.bengali");
            const data2 = await res2.json();
            const bnData = data2.data.surahs;

            const res3 = await fetch("http://api.alquran.cloud/v1/quran/en.ahmedali");
            const data3 = await res3.json();
            const qData = data3.data.surahs;

            const newData = enData.map((surah, index) => {
                return {
                    ...surah,
                    ayahs: surah.ayahs.map((ayah, i) => {
                        return {
                            ...ayah,
                            bnText: bnData[index].ayahs[i].text,
                            enText: qData[index].ayahs[i].text
                        }
                    })
                }
            })
            setAllSurahs(newData)
            console.log(newData)

        }
        createData()


    }, [])



    useEffect(() => {

        if (selectedSurah !== undefined && selectedAyat && selectedQuari) {

            setLoading(true);

            const url = `http://api.alquran.cloud/v1/ayah/${selectedSurah?.number}:${selectedAyat}/${quari[selectedQuari]?.identifier}`;


            const fetchAyatDetails = async () => {
                const res = await fetch(url);
                const data = await res.json();
                setAyatDetails(data.data);
        
                setLoading(false);

            }
            fetchAyatDetails()

        }


    }, [selectedSurah, selectedAyat, selectedQuari])

 

    const quariHandler = (e) => {

        const { value } = e.target;

        setSelectedQuari(parseInt(value))

    }


    const playPrev = () => {

        if (ayatDetails.numberInSurah > 1) {
            setSelectedAyat(ayatDetails.numberInSurah - 1)
        } else {
            if(selectedSurah.number >1){
                setSelectedSurah(surahs[selectedSurah?.number-2]);
                console.log("done")
            }else{
                setSelectedSurah(surahs[113]);
            }
            setSelectedAyat(1)
        }
 


    }
    const playNext = () => {


        if (ayatDetails.numberInSurah < ayatDetails.surah.numberOfAyahs) {
            setSelectedAyat(ayatDetails.numberInSurah + 1)
        } else {
            if(selectedSurah?.number < 114){
                setSelectedSurah(surahs[selectedSurah?.number]);
            }else{
                setSelectedSurah(surahs[0]);
            }
            setSelectedAyat(1)
        }



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
                            {allSurahs[selectedSurah?.number-1]?.ayahs[selectedAyat-1].text}
                            </h2>
                            <h2 className="text-center text-md md:text-3xl text-white my-6">
                                {allSurahs[selectedSurah?.number-1]?.ayahs[selectedAyat-1]?.bnText}
                            </h2>
                            <h4 className="text-center text-sm md:text-lg text-white">
                            {allSurahs[selectedSurah?.number-1]?.ayahs[selectedAyat-1]?.enText}
                            </h4>

                        </div>

                        : <div className="flex items-center justify-center ">
                            <div className="w-16 h-16 border-b-2 border-white rounded-full animate-spin"></div>
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
                        <select value={selectedQuari} onChange={quariHandler} className="select w-full select-bordered bg-gray-800 text-white" >
                            {
                                quari && quari.length > 0 ?
                                    (
                                        quari.map((quari, i) => <option value={i + 1} key={i}>{i + 1}. {quari.englishName}</option>)
                                    )
                                    :
                                    <option>Loading</option>
                            }
                        </select>
                    </div>
                    <div>
                        {
                            ayatDetails?.audio &&
                            <audio onEnded={playNext} id="main-player" src={ayatDetails?.audio} autoPlay={true} controls="controls"></audio>
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