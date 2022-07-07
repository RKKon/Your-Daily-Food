const postData = async (url, data) => { // async делает синхронный код. Вместе с await. не блокирует код подобие синхронного кода
    const result = await fetch(url, { //! fetch it ассинхронный код он не ждёт другой код. он создаст пустую переменную и дальше сразу return, будет error
        method: "POST",
        headers: {'Content-type': 'application/json'},
        body: data
    });
    return result.json();
};

async function getResource(url) { // async делает синхронный код. Вместе с await. не блокирует код подобие синхронного кода
    const result = await fetch(url);
    // поскольку fetch не выдаёт ошибки и reject надо проверить на ошибки
    if (!result.ok) {
        throw new Error(`Could not fetch ${url}, status: ${result.status}`);
    }

    return result.json();
}

export {postData};
export {getResource};