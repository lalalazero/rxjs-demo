
let dbIndex = 0

const counterService = {
    async add(count){
        const { success } = await mockHttpService(count)
        if(success){
            return {
                id: dbIndex++,
                value: count
            }
        }
    },
    async minus(count){
        const { success } = await mockHttpService(count)
        if(success){
            return {
                id: dbIndex++,
                value: count
            }
        }
    }
}
const mockHttpService = (payload) => {
    return new Promise((resolve, reject) => {
        let n = Math.floor(Math.random() * 3 + 1)
        setTimeout(() => {
            resolve({
                success: true
            })
        }, n * 1000)
    })
}

export { counterService }
export default mockHttpService