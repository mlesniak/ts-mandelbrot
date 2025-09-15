#!/usr/bin/env node
import PPMImage from "./ppmimage.js";
import {timed} from "./utils.js";
import {MandelbrotPoint} from "./points.js";

class Mandelbrot {
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
        let ppmImage = new PPMImage(this.width, this.height)

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

        ppmImage.write(this.filename);
    }
}

// @mlesniak cli with fancy progress bar or so...
const args = process.argv.slice(2);
let w = parseInt(args[0] || "300");
let h = Math.round(w / 3.0 * 2.0);
let iterations = parseInt(args[1] || "50");
let filename = args[2] || "output.ppm";

let mb = new Mandelbrot(w, h, iterations, filename);
mb.run();
