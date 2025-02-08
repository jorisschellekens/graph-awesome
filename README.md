# ![graph awesome logo](img/graph_awesome_logo_64.png) Graph Awesome

This library provides functions to generate various types of SVG charts dynamically based on data provided through HTML class names.

## Hello World

```html
<!DOCTYPE html>
<html>
  <head>
  </head>
  <body>
    <!-- bar chart -->
    <div class="ga-bar ga-xs-apple-banana-cherry-durian ga-ys-10-20-15-25 ga-s ga-legend"></div>

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

## Parameters

Each chart type supports specific parameters that are set using class names.

### General Parameters

| Parameter     | Description                      | Accepted Values                                  |
|---------------|----------------------------------|--------------------------------------------------|
| `ga-xs-*`     | X-axis values (if applicable)    | Numbers separated by `-` (e.g., `ga-xs-1-2-3-4`) |
| `ga-ys-*`     | Y-axis values                    | Numbers separated by `-`                         |
| `ga-zs-*`     | Bubble sizes (for `ga-bubble`)   | Numbers separated by `-`                         |
| `ga-<size>`   | Chart dimensions                 | `ga-xs`, `ga-s`, `ga-l`, `ga-xl`, etc.           |
| `ga-legend`   | If present, a legend is added    | N.A.                                             |

### Chart-Specific Parameters

| Chart Type   | Required Parameters             | Optional Parameters      |
|--------------|---------------------------------|--------------------------|
| Bar Chart    | `ga-xs-*`, `ga-ys-*`            | `ga-<size>`, `ga-legend` |
| Box Chart    | `ga-xs-*`                       |                          |
| Bubble Chart | `ga-xs-*`, `ga-ys-*`, `ga-zs-*` | `ga-<size>`              |
| Donut Chart  | `ga-xs-*`, `ga-ys-*`            | `ga-<size>`, `ga-legend` |
| Line Chart   | `ga-xs-*`, `ga-ys-*`            | `ga-<size>`              |
| Pie Chart    | `ga-xs-*`, `ga-ys-*`            | `ga-<size>`, `ga-legend` |

---

## Usage Examples

### Bar Chart
```html
<div class="ga-bar ga-xs-apple-banana-cherry-durian ga-ys-10-20-15-25 ga-s"></div>
```

### Bubble Chart
```html
<div class="ga-bubble ga-xs-10-20-30 ga-ys-5-15-25 ga-zs-8-16-24 ga-l"></div>
```

### Donut Chart
```html
<div class="ga-donut ga-xs-apple-banana-cherry-durian ga-ys-30-50-20 ga-m"></div>
```

### Line Chart
```html
<div class="ga-line ga-xs-1-2-3-4-5 ga-ys-5-10-15-10-5 ga-m"></div>
```

### Pie Chart
```html
<div class="ga-pie ga-xs-apple-banana-cherry-durian ga-ys-40-30-20-10 ga-l"></div>
```

---

## How It Works

1. The script scans the DOM for elements with supported chart class names.
2. It extracts the data from class names and processes the values.
3. It generates an SVG chart and replaces the original element with the generated chart.

The script automatically runs on `DOMContentLoaded` and listens for changes to update dynamically.

---

