#!/usr/bin/env node
import commandLineArgs from 'command-line-args';
import {Mandelbrot} from "./mandelbrot.js";

// @mlesniak --help support
const optionDefinition = [
    {name: 'width', alias: 'w', type: Number, defaultValue: 300},
    {name: 'iterations', alias: 'i', type: Number, defaultValue: 100},
    {name: 'filename', alias: 'f', type: String, defaultValue: 'output.ppm'}
];
const options = commandLineArgs(optionDefinition);

let w = options.width;
let h = Math.round(options.width / 3.0 * 2.0);
let iterations = options.iterations;
let filename = options.filename;

new Mandelbrot(w, h, iterations, filename).run();
