import { Observable } from 'rxjs'

export const demo1 = () => {
    console.log('observer --- demo1 ---')
    const observable = new Observable(subscriber => {
        subscriber.next(1)
        subscriber.next(2)
        subscriber.next(3)
        subscriber.complete()
    })

    const observer = {
        next(value){
            console.log('receive value: ', value)
        },
        error(err){
            console.log('receive error: ', err)
        },
        complete(){
            console.log('complete')
        }
    }
    observable.subscribe(observer)
}