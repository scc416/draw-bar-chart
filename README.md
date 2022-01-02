# Draw Bar Chart

A library that draw bar chart. The library has one function, this function can handle bar chart with stacked (or not stacked) values, positive and/or negative values.

## Table of Content

- [Final Product](#final-product)
- [Dependencies](#dependencies)
- [Getting Started](#getting-started)
- [File Structure](#file-structure)

## Final Product

### Stacked bar graph

### Animation

### Hover

## Dependencies

- [jQuery](https://jquery.com/): library to select and manipulate elements

## Getting Started

Include jQuery in the html file.

`<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>`

Include the css and javascript file of "Draw Bar Chart".

`<script src="path_to_file/draw-bar-chart.js"></script>`  
`<link href="path_to_file/draw-bar-chart.css" rel="stylesheet" type="text/css" />`

"Draw Bar Chart" depends on jQuery, so jQuery has to come before the javascript file of Fraw Bar Chart.

## Documentation

The library has only one function, `drawBarChart(selector, data, options)`.

### selector

Type: [Selector](https://api.jquery.com/category/selectors/)  
A string representing a selector expression to find an element for the bar chart to rendered in.

### data

Type: [Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)

A set of key/value pairs that contains the values and labels of the bar chart

#### values

#### labels

Type: [Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array) of [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)  
Default: 

### options

Type: [Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)

A set of key/value pairs that configure the bar chart.


 contentType (default: 'application/x-www-form-urlencoded; charset=UTF-8')
Type: Boolean or String 