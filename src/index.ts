import PPMImage from "./PPMImage";
import {timed} from "./utils";
import {MandelbrotPoint} from "./points";

// @mlesniak cli with fancy progress bar or so...


class Mandelbrot {
    private readonly width: number;
    private readonly height: number;
    private readonly iterations: number;

    private readonly boundaries = {
        minX: -2,
        maxX: 1,
        minY: -1,
        maxY: 1,
    }

    constructor(width: number, height: number, iterations: number) {
        this.width = width;
        this.height = height;
        this.iterations = iterations;
    }

    @timed("mandelbrot execution")
    run() {
        let ppmImage = new PPMImage(this.width, this.height);

        let stepX = (this.boundaries.maxX - this.boundaries.minX) / this.width;
        let stepY = (this.boundaries.maxY - this.boundaries.minY) / this.height;
        for (let y = 0; y < this.height; y++) {
            // @mlesniak add progress bar here.
            let yt = y * stepY + this.boundaries.minY;
            for (let x = 0; x < this.width; x++) {
                let xt = x * stepX + this.boundaries.minX;
                let point = new MandelbrotPoint(xt, yt);
                if (point.inSet(this.iterations)) {
                    ppmImage.set(x, y);
                }
            }
        }

        ppmImage.write("output.ppm")
    }
}

let mb = new Mandelbrot(320, 200, 50);
mb.run();