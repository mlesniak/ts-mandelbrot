abstract class ComputablePoint {
    readonly x: number
    readonly y: number

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    abstract inSet(...items: any[]): boolean;

}

export class MandelbrotPoint extends ComputablePoint {
    inSet(maxIterations: number): boolean {
        let zReal = 0;
        let zImaginary = 0;
        let iteration = 0;

        while (zReal * zReal + zImaginary * zImaginary <= 4 && iteration < maxIterations) {
            const tempReal = zReal * zReal - zImaginary * zImaginary + this.x;
            zImaginary = 2 * zReal * zImaginary + this.y;
            zReal = tempReal;
            iteration++;
        }

        return iteration === maxIterations;
    }
}