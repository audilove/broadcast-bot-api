import config from '../config/config.json'

export const getUserCount = async () => {
    try {
        const response = await fetch(`${config.API_URL}/broadcast/get-total-user-count`, {
            method: 'GET',
            headers: {
                'x-api-key': config.API_KEY
            }
        })
        const data = await response.json()
        if (data?.status === 'success') {
            return data.totalUserCount
        } else {
            return null
        }
    } catch (error) {
        console.error('Ошибка при получении количества пользователей:', error)
        return null
    }
}
