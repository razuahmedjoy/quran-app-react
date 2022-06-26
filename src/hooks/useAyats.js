import { useState } from "react"
import axios from 'axios';

const useAyats = () => {

    const [ayats,setAyats] = useState([]);
    const [loading,setLoading] = useState(false);

    const getAyats = async () => {
        const res = await axios.get()
    }

}

export default useAyats