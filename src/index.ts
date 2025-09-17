#!/usr/bin/env node
import commandLineArgs from 'command-line-args';
import commandLineUsage from 'command-line-usage';
import {Mandelbrot} from "./mandelbrot.js";

const optionDefinition = [
    {
        name: 'width',
        alias: 'w',
        description: `Width of the image. The image's height will be computed automatically to have a 2/3 ratio.`,
        type: Number,
        defaultValue: 600
    },
    {
        name: 'iterations',
        description: `Number of iterations to perform per pixel. The higher, the more detailed the image is, but also the more computationally expensive.`,
        alias: 'i',
        type: Number,
        defaultValue: 100
    },
    {
        name: 'filename',
        description: `Output filename. Format will always be .ppm, independent of the suffix.`,
        alias: 'f',
        type: String,
        defaultValue: 'mandelbrot.ppm',
        typeLabel: '{underline filename}'
    },
    {
        name: 'help',
        description: 'Print this usage guide.',
        alias: 'h',
        type: Boolean
    }
];
const options = commandLineArgs(optionDefinition);

if (options.help) {
    const usage = commandLineUsage([
        {
            header: 'Mandelbrot generator',
            content: `Generate the typical Mandelbrot image with configurable dimensions and iteration depth and outputs it in .ppm file format.`
        },
        {
            header: 'Options',
            optionList: optionDefinition
        }
    ]);
    console.log(usage);
    process.exit(1);
}

new Mandelbrot(
    options.width,
    Math.round(options.width / 3.0 * 2.0),
    options.iterations,
    options.filename)
    .run();
