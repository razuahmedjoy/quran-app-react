import React, { useEffect, useState } from 'react';
import Header from '../Header/Header';


const HomePage = () => {

    const [quari,setQuari] = useState([]);


    useEffect(() => {
        const fetchQuari = async () =>{
            const res = await fetch("https://mp3quran.net/api/_english.php");
            const data = await res.json();
            setQuari(data.reciters)
        }

        fetchQuari();
    },[])

    const quariHandler = (e)=>{

       const {value} = e.target;
       console.log(value)

    }
    return (
        <div className="h-screen bg-blend-overlay bg-mainBg bg-cover bg-no-repeat opacity-90 bg-gray-900 py-5 px-2 md:px-10 flex flex-col justify-between">


        <Header/>


            <main className="flex flex-col justify-center items-center px-5 gap-y-8">

                <h2 className="text-center text-lg md:text-3xl text-white">
                    إِنَّ فِى ٱخْتِلَٰفِ ٱلَّيْلِ وَٱلنَّهَارِ وَمَا خَلَقَ ٱللَّهُ فِى ٱلسَّمَٰوَٰتِ وَٱلْأَرْضِ لَءَايَٰتٍۢ لِّقَوْمٍۢ يَتَّقُونَ
                </h2>
                <h2 className="text-center text-lg md:text-3xl text-white">
                    নিশ্চয়ই রাত-দিনের পরিবর্তনের মাঝে এবং যা কিছু তিনি সৃষ্টি করেছেন আসমান ও যমীনে, সবই হল নিদর্শন সেসব লোকের জন্য যারা ভয় করে।
                </h2>
                <h4 className="text-center text-sm md:text-lg text-white">
                    for, verily, in the alternating of night and day, and in all that God has created in the heavens and on earth there are messages indeed for people who are conscious of Him!
                </h4>
            </main>
        

            <div className="w-full flex flex-wrap gap-y-5 justify-center items-center gap-x-4">

                <div>
                    <select onChange={quariHandler} className="select w-full select-bordered bg-gray-800 text-white">
                        {
                            quari && quari.length > 0 ?
                            (
                                quari.map((quari,i)=><option value={quari.id} key={quari.id}>{i+1}. {quari.name}</option>)
                            )
                            :
                            <option>Loading</option>
                        }
                    </select>
                </div>
                <div>
                    <audio id="main-player" src="https://cdn.islamic.network/quran/audio/128/ar.mahermuaiqly/1370.mp3" controls="controls"></audio>
                </div>

            </div>

        </div>
    );
};

export default HomePage;