export function timer<R>(f: (...args: any[]) => R): R {
    let start = Date.now();
    const result = f();
    let end = Date.now();
    let diff = end - start;
    console.log(diff / 1000.0);
    return result;
}