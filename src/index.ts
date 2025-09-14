import fs from "fs";

const width = 300;
const height = 200;

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

        return !(iteration === maxIterations);
    }
}

let image = fs.openSync("output.ppm", "w");
fs.writeSync(image, `P1
${width} ${height}
`);

let start = Date.now();
for (let y = 0; y < height; y++) {
    console.log(y);
    let yt = y * stepY + boundaries.minY;
    let row = []

    for (let x = 0; x < width; x++) {
        let xt = x * stepX + boundaries.minX;

        let point = new Point(xt, yt);
        let mb = point.isInMandelbrotSet() ? 1 : 0;
        row.push(mb);
    }

    let fileRow = row.join(" ") + "\n";
    fs.writeSync(image, fileRow);
}
let end = Date.now();
let diff = end - start;
console.log(diff / 1000.0);
console.log(width * height / Math.pow(10,6));

fs.closeSync(image);