import Image from "./image";
import fs from "fs";

export default class PPMImage extends Image {
    write(filename: string) {
        let image = fs.openSync(filename, "w");
        fs.writeSync(image, `P1\n${this.width} ${this.height}\n`);

        let pixels = this.pixel
            .map(b => b === undefined ? 0 : b ? 1 : 0)
        let p = pixels.join(" ");
        fs.writeSync(image, p);
        fs.writeSync(image, "\n");
        fs.closeSync(image);
    }
}