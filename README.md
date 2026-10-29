# ![Graph Awesome logo](img/graph_awesome_logo_64.png) Graph Awesome

**Beautiful charts, directly from HTML.**

Graph Awesome is a lightweight JavaScript library that turns simple HTML elements into interactive charts. Define your data using HTML tags, include the library, and let Graph Awesome handle the rendering.

No framework required. No chart configuration objects. Just HTML.

## Hello World

Add the following to any HTML page:

```html
<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Graph Awesome</title>
</head>
<body>
    <!-- Bar chart -->
    <barchart>
        <xs>Jan, Feb, Mar, Apr, May</xs>
        <ys>10, 25, 18, 32, 27</ys>
    </barchart>

    <!-- Pie chart -->
    <piechart>
        <xs>Chrome, Firefox, Safari, Edge</xs>
        <ys>60, 20, 15, 5</ys>
    </piechart>

    <!-- Donut chart -->
    <donutchart>
        <xs>Chrome, Firefox, Safari, Edge</xs>
        <ys>60, 20, 15, 5</ys>
    </donutchart>

    <!-- Line chart -->
    <linechart>
        <xs>Jan, Feb, Mar, Apr, May</xs>
        <ys>10, 25, 18, 32, 27</ys>
    </linechart>

    <!-- Bubble chart -->
    <bubblechart>
        <xs>10, 20, 30, 40, 50</xs>
        <ys>15, 35, 25, 45, 30</ys>
        <zs>5, 15, 10, 25, 20</zs>
    </bubblechart>

    <!-- Load Graph Awesome -->
    <script src="https://cdn.jsdelivr.net/gh/jorisschellekens/graph-awesome@main/graph_awesome.js"></script>
</body>
</html>
```

That's it. Graph Awesome discovers the chart elements and renders them automatically.

## Supported Chart Types

| Element | Description | Data |
|---|---|---|
| `<barchart>` | Bar or column chart | `<xs>`, `<ys>` |
| `<bubblechart>` | Bubble chart | `<xs>`, `<ys>`, `<zs>` |
| `<donutchart>` | Donut chart | `<xs>`, `<ys>` |
| `<linechart>` | Line chart | `<xs>`, `<ys>` |
| `<piechart>` | Pie chart | `<xs>`, `<ys>` |

Each chart uses the same declarative approach: labels and values are specified directly in HTML.

- `<xs>` defines the labels or x-values.
- `<ys>` defines the corresponding values.
- `<zs>` defines a third dimension, such as bubble size.

Values are comma-separated, and corresponding entries are matched by position.

## Configuration

Charts can be configured through HTML attributes where supported.

For example, set the chart height:

```html
<barchart height="400">
    <xs>Jan, Feb, Mar</xs>
    <ys>12, 25, 18</ys>
</barchart>
```

The goal is to keep chart configuration close to the data and avoid verbose JavaScript configuration objects.

## How It Works

1. Include `graph_awesome.js` in your page.
2. Graph Awesome discovers supported chart elements in the DOM.
3. The library reads their data from child elements such as `<xs>`, `<ys>`, and `<zs>`.
4. The chart data is validated and transformed into the format required by the rendering engine.
5. Each element is rendered as a chart.

The intended experience is automatic: write your HTML, include the script, and let Graph Awesome handle the visualization.

## Installation

### Use jsDelivr

Load Graph Awesome directly from GitHub through jsDelivr:

```html
<script src="https://cdn.jsdelivr.net/gh/jorisschellekens/graph-awesome@main/graph_awesome.js"></script>
```

For production websites, consider pinning the URL to a release or version tag instead of `main`. This prevents changes to the latest source from unexpectedly affecting your website.

### Self-host

Alternatively, download `graph_awesome.js` and serve it from your own website.

## Dependencies

Graph Awesome uses its chart-rendering engine to draw charts in the browser. Include only the Graph Awesome script in your HTML when the library is configured to load its dependencies automatically.

## License

See the repository's license file for licensing terms.
