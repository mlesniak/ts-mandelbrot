export default abstract class Image {
    // We only support black and white images.
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
        this.pixel[this.width * y + x] = true;
    }

    abstract write(filename: string): void;
}