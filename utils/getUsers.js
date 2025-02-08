import config from '../config/config.json'

export const getUsers = async (lastId, limit) => {
    try {
        const response = await fetch(`${config.API_URL}/broadcast/get-users`, {
            method: 'POST',
            headers: {
                'x-api-key': config.API_KEY
            },
            body: {
                lastId, limit
            }
        })
        const data = await response.json()
        if (data?.status === 'success') {
            return data.users
        } else {
            return []
        }
    } catch (error) {
        console.error('Ошибка при получении количества пользователей:', error)
        return []
    }
}
