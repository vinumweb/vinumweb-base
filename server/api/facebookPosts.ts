export default defineEventHandler(async (event) => {
    const query = getQuery(event)
    const { facebookAccessToken, facebookPageId } = useRuntimeConfig(event)
    
    if (!facebookAccessToken) {
      throw createError({
        statusCode: 500,
        statusMessage: 'ENV varaible NUXT_FACEBOOK_ACCESS_TOKEN needs to be set, to use this route',
      })
    } else if (!facebookPageId) {
      throw createError({
        statusCode: 500,
        statusMessage: 'ENV varaible NUXT_FACEBOOK_PAGE_ID needs to be set, to use this route',
      })
    }

    const offset= Number(query.offset) ? Number(query.offset) : 0
    const limit = 3
    const nextOffset = 3 + offset
    const posts = await $fetch(`https://graph.facebook.com/v20.0/${facebookPageId}/feed?fields=message,id,full_picture,created_time&offset=${offset}&limit=${limit}&access_token=${facebookAccessToken}`, { method: 'GET' });

    return {
        posts: posts.data,
        nextOffset
    }
  })
