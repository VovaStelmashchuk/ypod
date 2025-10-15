import { updateRss } from '~/server/core/generator'

export default defineEventHandler(async (event) => {
    const showSlug = getRouterParam(event, 'slug')

    try {
        await updateRss(showSlug)
        return { 
            success: true, 
            message: `RSS feed regenerated for ${showSlug}`,
            timestamp: new Date().toISOString()
        }
    } catch (error) {
        return { 
            success: false, 
            error: error.message 
        }
    }
})

