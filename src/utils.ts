// export function timer<R>(f: (...args: any[]) => R): R {
//     let start = Date.now();
//     const result = f();
//     let end = Date.now();
//     let diff = end - start;
//     console.log(diff / 1000.0);
//     return result;
// }


export function timed(label?: string): MethodDecorator {
    return (_target, key, descriptor: PropertyDescriptor) => {
        const func = descriptor.value as (...args: any[]) => any;
        descriptor.value = function(...args: any[]) {
            const start = Date.now();
            const result = func.apply(this, args);
            const end = Date.now();
            const diff = end - start;

            console.log(`${label ?? String(key)}: ${diff / 1000.0}`)
            return result;
        }
        return descriptor;
    };
}