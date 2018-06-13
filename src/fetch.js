import ccxt from 'ccxt'

export const fetch = async (pair) => {

    const price = await new ccxt.coinexchange().fetchTicker(pair)

    return {
        bid: price.info.BidPrice,
        ask: price.info.AskPrice,
        datetime: price.datetime
    }
}