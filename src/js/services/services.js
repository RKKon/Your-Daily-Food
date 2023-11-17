const postData = async (url, data) => {
  // async делает синхронный код. Вместе с await. не блокирует код подобие синхронного кода
  const result = await fetch(url, {
    //! fetch it ассинхронный код он не ждёт другой код. он создаст пустую переменную и дальше сразу return, будет error
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: data,
  });
  return await result.json();
};

async function getResource(url = "./db.json") {
  const result = await fetch(url);
  if (!result.ok) {
    throw new Error(`Could not fetch ${url}, status: ${result.status}`);
  }

  return await result.json();
}

export const checkIfJSONServerOn = (fn, noJSONServer) => {
  const http = require("http");

  const options = {
    hostname: "localhost",
    port: 3000,
    path: "/",
    method: "GET",
  };

  const req = http.request(options, (res) => {
    if (res.statusCode === 200) {
      fn();
    }
  });

  req.on("error", (error) => {
    noJSONServer();
  });

  req.end();
};

export { postData };
export { getResource };
