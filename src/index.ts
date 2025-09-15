import PPMImage from "./PPMImage";
import {timed} from "./utils";

// @mlesniak cli with fancy progress bar or so...

const width = 30;
const height = 20;

let boundaries = {
    minX: -2,
    maxX: 1,
    minY: -1,
    maxY: 1,
}

let stepX = (boundaries.maxX - boundaries.minX) / width;
let stepY = (boundaries.maxY - boundaries.minY) / height;
let maxIterations = 255;

class Point {
    readonly x: number
    readonly y: number

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    isInMandelbrotSet(): boolean {
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



class Mandelbrot {
    @timed("mandelbrot execution")
    run() {
        let ppmImage = new PPMImage(width, height);
        for (let y = 0; y < height; y++) {
            // console.log(y + 1);
            let yt = y * stepY + boundaries.minY;
            for (let x = 0; x < width; x++) {
                let xt = x * stepX + boundaries.minX;
                let point = new Point(xt, yt);
                if (point.isInMandelbrotSet()) {
                    ppmImage.set(x, y);
                }
            }
        }
        ppmImage.write("output.ppm")
    }

}

let mb = new Mandelbrot();
mb.run();