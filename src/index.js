import dotenv from 'dotenv'
import cron from 'node-cron'
import PushBullet from 'pushbullet'

import { fetch } from './fetch'

const env = dotenv.config()
 
if (env.error) {
  throw env.error
}
 
console.log(env.parsed)

const pusher = new PushBullet(process.env.PUSHBULLET_URL)

const main = async () => {
    cron.schedule('* * * * *', async () => {
        let PCNBTC = await fetch('PCN/BTC')

        if (PCNBTC.bid >= '0.00000016') {
            pusher.note(
                process.env.PUSHBULLET_DEVICE_ID,
                'Peepcoin',
                `Obiect: ${JSON.stringify(PCNBTC, null, 4)}`,
                (error, response) => {
                    console.log('Sent notification')
            });
        }

        if (PCNBTC.ask <= '0.00000015') {
            pusher.note(
                process.env.PUSHBULLET_DEVICE_ID,
                'Peepcoin',
                `Obiect: ${JSON.stringify(PCNBTC, null, 4)}`,
                (error, response) => {
                    console.log('Sent notification')
            });
        }
    })
}

main()