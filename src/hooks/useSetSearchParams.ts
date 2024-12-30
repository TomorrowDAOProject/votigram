import { useSearchParams } from "react-router-dom";

function useSetSearchParams() {
  const [searchParams, setSearchParams] = useSearchParams();
  const newParams = new URLSearchParams(searchParams);

  interface ISearchParams {
    key: string; value: string;
  }

  const updateQueryParam = (params: ISearchParams | ISearchParams[]) => {
    if (Array.isArray(params)) {
      for (const { key, value } of params) {
        newParams.set(key, value);
      }
    } else {
      const { key, value } = params;
      newParams.set(key, value);
    }
    setSearchParams(newParams);
  };

  return {
    querys: newParams,
    updateQueryParam,
  };
}

export default useSetSearchParams;
