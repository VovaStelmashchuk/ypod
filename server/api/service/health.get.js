import { defineEventHandler } from 'h3'
import { checkMongoHealth } from '~~/server/db/mongo'

export default defineEventHandler(async (event) => {
    try {
        const mongoHealthy = await checkMongoHealth()
        
        if (!mongoHealthy) {
            setResponseStatus(event, 503)
            return { status: 'unhealthy' }
        }
        
        return { status: 'healthy' }
        
    } catch (error) {
        setResponseStatus(event, 503)
        return { status: 'unhealthy' }
    }
})
