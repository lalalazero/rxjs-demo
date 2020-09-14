import { of, Observable } from 'rxjs'
import { map, first, switchMap } from 'rxjs/operators'


export const demo1 =() => {
    console.log('operator --- demo1 ---')
    map(x => x * x)(of(1,2,3)).subscribe(x => console.log(x))
    first()(of(1,2,3)).subscribe(x => console.log('first value: ' + x))
}

export const demo2 = () => {
    console.log('operator --- demo2 ---')
    map(x => x * x)(first()(of(1,2,3))).subscribe(x => console.log('嵌套运算符 output: ' + x))

    // 用 pipe 的写法
    const observable = new Observable(subscribe => {
        subscribe.next(1)
        subscribe.next(2)
        subscribe.next(3)
    })
    observable.pipe(
        map(x => x * x),
        first()
    ).subscribe(x => console.log('pipe 运算符 output: ' + x))

    of(1,2,3).pipe(
        map(x => x * x),
        first()
    ).subscribe(x => console.log('pipe 运算符 output2: ' + x))
}


export const demo3 = () => {
    console.log('operator --- demo3： 自定义操作符 ---')
    function discardEven(){
        return observable => new Observable(observer => {
            const subscription = observable.subscribe({
                next(value){
                    if(value % 2 !== 0){
                        observer.next(value)
                    }
                },
                error(err){
                    observer.error(err)
                },
                complete(){
                    observer.complete()
                }
            })

            return () => {
                subscription.unsubscribe()
            }
        })
    }

    discardEven()(of(1,2,3,4,5,6,7,8)).subscribe(x => console.log(x))
}

export const demo4 = () => {
    console.log('operator ---demo4: switchMap ---')
    const switched = of(1,2,3).pipe(switchMap(x => of(x, x ** 2, x ** 3)))
    switched.subscribe(x => console.log(x))
}

