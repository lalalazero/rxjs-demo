import { Observable } from 'rxjs'


let dbIndex = 0
let searchStorage = new Map()


const random = (begin, end) => {
    return begin + Math.floor((end - begin) * Math.random()) + 1
}

export const mockHttpRequest = value => {
    return new Observable(observer => {
      let status = 'pending'
      const timer = setTimeout(() => {
        const result = {
          id: ++dbIndex, 
          text:value,
          done: false
        }
        searchStorage.set(result._id, result)
        status = 'done'
        observer.next(result)
        observer.complete()
      }, random(100, 200))
      return () => {
          clearTimeout(timer)
          if(status === 'pending'){
              console.warn('post canceled')
          }
      }
    })
  }