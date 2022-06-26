import React from 'react';

const HomePage = () => {
    return (
        <div className="h-screen bg-blend-overlay bg-mainBg bg-cover bg-no-repeat opacity-90 bg-gray-900 py-5 px-2 md:px-10 flex flex-col justify-between">

            <header className="flex w-full md:w-1/2 gap-x-4">
                <div className="w-full">
                    <select class="select w-full select-bordered bg-gray-800 text-white">
                        <option disabled selected>Select Surah</option>
                        <option>Han Solo</option>
                        <option>Greedo</option>
                    </select>
                </div>
                <div className="w-full">
                    <select class="select w-fit select-bordered bg-gray-800 text-white">
                        <option disabled selected>Select Ayah</option>
                        <option>Han Solo</option>
                        <option>Greedo</option>
                    </select>
                </div>
            </header>

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

            <div className="w-full flex justify-center items-center gap-x-4">

                <div>
                    <select class="select w-full select-bordered bg-gray-800 text-white">
                        <option disabled selected>Select Quari</option>
                        <option>Han Solo</option>
                        <option>Greedo</option>
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