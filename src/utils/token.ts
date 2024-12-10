/* eslint-disable @typescript-eslint/no-explicit-any */
export const toUrlEncoded = (
  data: Record<string, any>,
  prefix = ""
): string => {
  const segments: string[] = [];

  for (const key in data) {
    if (Object.prototype.hasOwnProperty.call(data, key)) {
      const value = data[key];
      const newPrefix = prefix
        ? `${prefix}[${encodeURIComponent(key)}]`
        : encodeURIComponent(key);

      if (typeof value === "object" && value !== null) {
        // Recursively format nested objects
        segments.push(toUrlEncoded(value, newPrefix));
      } else {
        // Encode key-value pair
        segments.push(`${newPrefix}=${encodeURIComponent(value)}`);
      }
    }
  }

  return segments.join("&");
};

export const fetchToken = async () => {
  try {
    const initData =
      window?.Telegram?.WebApp?.initData ||
      "user=%7B%22id%22%3A6964861250%2C%22first_name%22%3A%22Eran%22%2C%22last_name%22%3A%22Khoo%22%2C%22username%22%3A%22kea08111%22%2C%22language_code%22%3A%22en%22%2C%22allows_write_to_pm%22%3Atrue%2C%22photo_url%22%3A%22https%3A%5C%2F%5C%2Ft.me%5C%2Fi%5C%2Fuserpic%5C%2F320%5C%2Ff4ZHGhoTj1E_IzAdBfjgNbwtY8gCkjvvsiH_02VVCO2JCz3hGOaPR1xO19VL4J5_.svg%22%7D&chat_instance=8669436071748428090&chat_type=sender&auth_date=1733812346&signature=HLuRc6ySZ9bN6h4bGGFxbVhTBsbb1iAwP2ndpBtFhPz7pGwXSkmTxptaYGgHt_IkMdwdYe-HguFo1BmLZumHCw&hash=7f5fc5b38ab15e5177fb14aba03cf9c372bee0d55e311e94f119b0a27c91413a";

    // Fetch token
    const tokenResponse = await fetch(
      `${import.meta.env.VITE_BASE_URL}/connect/token`,
      {
        method: "POST",
        body: toUrlEncoded({
          grant_type: "signature",
          client_id: "TomorrowDAOServer_App",
          scope: "TomorrowDAOServer",
          login_type: "TG",
          init_data: initData,
        }),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    if (!tokenResponse.ok) throw new Error("Failed to fetch token");
    const { access_token } = (await tokenResponse.json()) || {};
    return access_token;
  } catch (error) {
    if (error instanceof Error) {
      console.error(error);
    }
  }
};
