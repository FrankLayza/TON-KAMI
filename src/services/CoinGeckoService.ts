const CG_URL = import.meta.env.VITE_COINGECKO_URL
const CG_API = import.meta.env.VITE_COINGECKO_API

export type CoinGeckoTypes ={
    usd: number;
    change24h : number;
}
const header = {
    'x-cg-demo-api-key' : `${CG_API}`,
    'Content-Type' : 'application/json'
}

if(!CG_API || !CG_URL){
    throw new Error('Missing the CoinGecko env vars')
}

export async function getPriceEquivalent(coin: string): Promise<CoinGeckoTypes>{
    const res = await fetch(`${CG_URL}/coins/${coin}`, {
        headers: header
    })
    if(!res.ok){
        throw new Error(`No response returned, ${res.statusText}`)
    }
    const data = await res.json()
    const usd =  data?.market_data?.current_price?.usd
    const change24h = data?.market_data?.market_cap_change_percentage_24h_in_currency?.usd
    return {usd, change24h}
}