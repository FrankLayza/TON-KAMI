// x-cg-demo-api-key - Header for CoinGECKO
const COINGECKO_URL = import.meta.env.VITE_COIN_GECKO_URL
const COINGECKO_API_KEY = import.meta.env.VITE_COIN_GECKO_API_KEY

const header = {
    'x-cg-demo-api-key' : `${COINGECKO_API_KEY}`,
    'Content-Type' : 'application/json'
}

export const getTonPrice = async (coin) => {
    const res = await fetch(`${COINGECKO_URL}?ids=${coin}&vs_currencies=usd`, {
        headers: header
    })
    if(!res.ok){
        throw new Error('error getting the coin price')
    }
    const data = await res.json()
    return data[coin]?.usd
} 