import fs from "fs";

// @mlesniak cli with fancy progress bar or so...

const width = 100;
const height = 73;

let boundaries = {
    minX: -2,
    maxX: 1,
    minY: -1,
    maxY: 1,
}

let stepX = (boundaries.maxX - boundaries.minX) / width;
let stepY = (boundaries.maxY - boundaries.minY) / height;
let maxIterations = 255;

abstract class Image {
    protected pixel: boolean[];
    readonly width: number;
    readonly height: number;

    constructor(width: number, height: number) {
        this.width = width;
        this.height = height;
        this.pixel = Array(width * height);
        this.pixel.fill(false);
    }

    set(x: number, y: number) {
        this.pixel[width * y + x] = true;
    }

    abstract write(filename: string): void;
}

class PPMImage extends Image {
    write(filename: string) {
        let image = fs.openSync(filename, "w");
        fs.writeSync(image, `P1\n${width} ${height}\n`);

        let pixels = this.pixel
            .map(b => b === undefined ? 0 : b ? 1 : 0)
        let p = pixels.join(" ");
        fs.writeSync(image, p);
        fs.writeSync(image, "\n");
        fs.closeSync(image);
    }
}

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

let ppmImage: Image = new PPMImage(width, height);

let start = Date.now();
for (let y = 0; y < height; y++) {
    console.log(y);
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

let end = Date.now();
let diff = end - start;
console.log(diff / 1000.0);
console.log(width * height / Math.pow(10, 6));
