export function timed(label?: string): MethodDecorator {
    const showTiming = process.env.TIMING ?? false;

    return (_target, key, descriptor: PropertyDescriptor) => {
        const func = descriptor.value as (...args: any[]) => any;
        descriptor.value = function(...args: any[]) {
            const start = Date.now();
            const result = func.apply(this, args);
            const end = Date.now();
            const diff = end - start;

            if (showTiming) {
                console.log(`${label ?? String(key)}: ${diff / 1000.0}`);
            }
            return result;
        }
        return descriptor;
    };
}