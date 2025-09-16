import {timed} from "./utils.js";
import cliProgress from "cli-progress";
import PPMImage from "./ppmimage.js";
import {MandelbrotPoint} from "./points.js";

export class Mandelbrot {
    private readonly width: number;
    private readonly height: number;
    private readonly iterations: number;
    private readonly filename: string;

    private readonly boundaries = {
        minX: -2,
        maxX: 1,
        minY: -1,
        maxY: 1,
    }

    constructor(width: number, height: number, iterations: number, filename: string) {
        this.width = width;
        this.height = height;
        this.iterations = iterations;
        this.filename = filename;
    }

    @timed("mandelbrot execution")
    run() {
        let progress = new cliProgress.SingleBar({}, cliProgress.Presets.shades_grey);
        progress.start(this.height, 0);
        let ppmImage = new PPMImage(this.width, this.height)

        let stepX = (this.boundaries.maxX - this.boundaries.minX) / this.width;
        let stepY = (this.boundaries.maxY - this.boundaries.minY) / this.height;
        for (let y = 0; y < this.height; y++) {
            progress.update(y + 1);
            let yt = y * stepY + this.boundaries.minY;
            for (let x = 0; x < this.width; x++) {
                let xt = x * stepX + this.boundaries.minX;
                let point = new MandelbrotPoint(xt, yt);
                if (point.inSet(this.iterations)) {
                    ppmImage.set(x, y);
                }
            }
        }

        ppmImage.write(this.filename);
        progress.stop();
    }
}