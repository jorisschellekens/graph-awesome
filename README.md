# ![graph awesome logo](img/graph_awesome_logo_64.png) Graph Awesome

This library provides functions to generate various types of SVG charts dynamically based on data provided through HTML class names.

## Hello World

```html
<!doctype html>
<html>
    <head> </head>
    <body>
        <!-- bar chart -->
        <barchart>
            <xs>Jan, Feb, Mar, Apr, May</xs>
            <ys>10, 25, 18, 32, 27</ys>
        </barchart>

        <!-- bubble chart -->
        <bubblechart>
            <xs>10, 20, 30, 40, 50</xs>
            <ys>15, 35, 25, 45, 30</ys>
            <zs>5, 15, 10, 25, 20</zs>
        </bubblechart>

        <!-- line chart -->
        <linechart>
            <xs>1, 2, 3, 4, 5</xs>
            <ys>10, 25, 18, 32, 27</ys>
        </linechart>

        <!-- load graph-awesome.js -->
        <script src="https://cdn.jsdelivr.net/gh/jorisschellekens/graph-awesome@main/graph_awesome.js"></script>
    </body>
</html>
```

## Supported Chart Types

The library supports the following chart types:

- **Bar Chart** (`ga-bar`)
- **Box Chart** (`ga-box`)
- **Bubble Chart** (`ga-bubble`)
- **Donut Chart** (`ga-donut`)
- **Line Chart** (`ga-line`)
- **Pie Chart** (`ga-pie`)

Each chart is generated automatically by adding the corresponding class to an HTML element and specifying data through additional classes.

---

## How It Works

1. The script scans the DOM for elements with supported chart class names.
2. It extracts the data from class names and processes the values.
3. It generates an SVG chart and replaces the original element with the generated chart.

The script automatically runs on `DOMContentLoaded` and listens for changes to update dynamically.

---

