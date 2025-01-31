import { Redis } from '@upstash/redis'

const client = new Redis({
    url: process.env.REDIS_HOST,
    token: process.env.REDIS_PASSWORD,
})

export default client