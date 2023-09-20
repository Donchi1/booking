
import { useEffect, useState } from "react";
import axios from "axios";
import { UserType } from "../utils/types";

function useFetchSingle(url: string) {
    const [data, setData] = useState<UserType | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
  
    useEffect(() => {
      const fetchData = async () => {
        setLoading(true);
        try {
          const res = await axios.get(url);
          
          setData(res.data.user);
        } catch (err: any) {
          setError(err);
        }
        setLoading(false);
      };
      fetchData();
    }, [url]);
  
   
  
    return { data, loading, error };
  
}

export default useFetchSingle