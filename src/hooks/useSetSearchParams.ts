import { useSearchParams } from "react-router-dom";

function useSetSearchParams() {
  const [searchParams, setSearchParams] = useSearchParams();
  const newParams = new URLSearchParams(searchParams);

  const updateQueryParam = (key: string, value: string) => {
    newParams.set(key, value);
    setSearchParams(newParams);
  };

  return {
    querys: newParams,
    updateQueryParam,
  };
}

export default useSetSearchParams;
