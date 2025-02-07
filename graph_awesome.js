/**
 * Generates an SVG legend for a chart without specifying width and height.
 * It dynamically adjusts to fit all labels while maintaining a balanced layout.
 * @param {Array<string>} labels - Labels for the legend items.
 * @param {Array<string>} colors - Corresponding colors for each label.
 * @param {number} [itemSize=20] - The size of each legend item (both square and text height).
 * @param {number} [padding=10] - The padding between legend items.
 * @returns {SVGElement} An SVG element containing the legend.
 */
function __generate_legend(labels, colors, item_size = 20, padding = 10) {
    const golden_ratio = 1.618;
    const item_count = labels.length;

    // Calculate optimal columns and rows using the golden ratio
    const cols = Math.ceil(Math.sqrt(item_count * golden_ratio));
    const rows = Math.ceil(item_count / cols);

    const longest_label_length = Math.max(...labels.map(s => s.length));
    const cell_width = item_size + item_size * longest_label_length * 0.500 + item_size * 0.250; // Enough space for the label text
    const cell_height = item_size + padding;

    const width = cols * cell_width;
    const height = rows * cell_height;

    const svgNS = "http://www.w3.org/2000/svg";
    const legend = document.createElementNS(svgNS, "svg");
    legend.setAttribute("width", width);
    legend.setAttribute("height", height);

    labels.forEach((label, index) => {
        const col = index % cols;
        const row = Math.floor(index / cols);
        const x = col * cell_width + padding;
        const y = row * cell_height + padding;

        const group = document.createElementNS(svgNS, "g");

        const rect = document.createElementNS(svgNS, "rect");
        rect.setAttribute("x", x);
        rect.setAttribute("y", y);
        rect.setAttribute("rx", item_size / 20);
        rect.setAttribute("ry", item_size / 20);
        rect.setAttribute("width", item_size);
        rect.setAttribute("height", item_size);
        rect.setAttribute("fill", colors[index % colors.length]);

        const text = document.createElementNS(svgNS, "text");
        text.setAttribute("x", x + item_size + item_size * 0.250); // add 1 space character's worth of padding
        text.setAttribute("y", y + item_size); // text is placed on th bottom
        text.setAttribute("font-size", item_size);
        text.setAttribute("fill", "#000");
        text.textContent = label;

        group.appendChild(rect);
        group.appendChild(text);
        legend.appendChild(group);
    });

    return legend;
}



/**
 * Generates an array of `k` colors evenly distributed over the HSV spectrum.
 * @param {number} k - The number of colors to generate.
 * @returns {string[]} An array of `k` HSL color strings.
 */
function __generate_HSV_colors(k) {
    if (k === 3) {
        return ["#f6511d", "#ffb400", "#00a6ed"];
    } else if (k === 4) {
        return ["#219ebc", "#023047", "#ffb703", "#fb8500"];
    } else if (k == 5) {
        return ['#55dde0', '#33658a', '#2f4858', '#f6ae2d', '#f26419'];
    } else {
        return Array.from({
            length: k
        }, (_, i) => {
            const hue = (i * 360) / k;
            return `hsl(${hue}, 100%, 50%)`;
        });
    }
}

/**
 * Generates an SVG bar chart.
 * @param {Array} xs - Labels for the bars.
 * @param {Array<number>} ys - The values representing the heights of the bars.
 * @param {number} [width=400] - The width of the SVG canvas.
 * @param {number} [height=200] - The height of the SVG canvas.
 * @returns {SVGElement} An SVG element containing the bar chart.
 */
function __bar_chart(xs, ys, width = 100, height = 100, margin = 10) {
    const max_value = Math.max(...ys);
    const bar_width = (width - 2 * margin) / ys.length;
    const colors = __generate_HSV_colors(ys.length);

    const svgNS = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("width", width);
    svg.setAttribute("height", height);

    ys.forEach((value, index) => {
        const bar_height = (value / max_value) * (height - margin);
        const rect = document.createElementNS(svgNS, "rect");
        rect.setAttribute("x", index * bar_width + margin);
        rect.setAttribute("y", height - bar_height);
        rect.setAttribute("rx", bar_width / 20);
        rect.setAttribute("ry", bar_width / 20);
        rect.setAttribute("width", bar_width - 2);
        rect.setAttribute("height", bar_height);
        rect.setAttribute("fill", colors[index % colors.length]);
        svg.appendChild(rect);
    });

    return svg;
}

/**
 * Generates an SVG bubble chart.
 * @param {Array<number>} xs - X-axis positions of bubbles.
 * @param {Array<number>} ys - Y-axis positions of bubbles.
 * @param {Array<number>} zs - Sizes of the bubbles.
 * @param {number} [width=400] - The width of the SVG canvas.
 * @param {number} [height=200] - The height of the SVG canvas.
 * @returns {SVGElement} An SVG element containing the bubble chart.
 */
function __bubble_chart(xs, ys, zs, width = 400, height = 200, margin = 40) {
    const max_size = Math.max(...zs);
    const min_x = Math.min(...xs);
    const max_x = Math.max(...xs);
    const min_y = Math.min(...ys);
    const max_y = Math.max(...ys);
    const colors = __generate_HSV_colors(xs.length);
    const svgNS = "http://www.w3.org/2000/svg";

    const svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("width", width);
    svg.setAttribute("height", height);
    svg.setAttribute("viewBox", `0 0 ${width} ${height}`);

    xs.forEach((x_value, index) => {
        const x = margin + ((x_value - min_x) / (max_x - min_x)) * (width - 2 * margin);
        const y = height - margin - ((ys[index] - min_y) / (max_y - min_y)) * (height - 2 * margin);
        const r = (zs[index] / max_size) * 5 + 1;

        const circle = document.createElementNS(svgNS, "circle");
        circle.setAttribute("cx", x);
        circle.setAttribute("cy", y);
        circle.setAttribute("r", r);
        circle.setAttribute("fill", colors[index % colors.length]);
        circle.setAttribute("opacity", "0.6");
        svg.appendChild(circle);
    });

    return svg;
}

/**
 * Generates an SVG donut chart.
 * @param {Array} xs - Unused parameter (for future extensions).
 * @param {Array<number>} ys - The values representing the donut slices.
 * @param {number} [outerRadius=100] - The outer radius of the donut.
 * @param {number} [innerRadius=50] - The inner radius of the donut (hole size).
 * @returns {SVGElement} An SVG element containing the donut chart.
 */
function __donut_chart(xs, ys, outer_radius = 40, inner_radius = 20, margin = 10) {
    const total = ys.reduce((sum, value) => sum + value, 0);
    let cumulative_angle = 0;
    const center_x = outer_radius + margin;
    const center_y = outer_radius + margin;
    const colors = __generate_HSV_colors(ys.length);

    const svgNS = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("width", `${2 * (outer_radius + margin)}`);
    svg.setAttribute("height", `${2 * (outer_radius + margin)}`);

    ys.forEach((value, index) => {
        const angle = (value / total) * 2 * Math.PI;
        const x1 = center_x + outer_radius * Math.cos(cumulative_angle);
        const y1 = center_y + outer_radius * Math.sin(cumulative_angle);
        const x1_inner = center_x + inner_radius * Math.cos(cumulative_angle);
        const y1_inner = center_y + inner_radius * Math.sin(cumulative_angle);

        cumulative_angle += angle;

        const x2 = center_x + outer_radius * Math.cos(cumulative_angle);
        const y2 = center_y + outer_radius * Math.sin(cumulative_angle);
        const x2_inner = center_x + inner_radius * Math.cos(cumulative_angle);
        const y2_inner = center_y + inner_radius * Math.sin(cumulative_angle);

        const large_arc_flag = angle > Math.PI ? 1 : 0;
        const path = document.createElementNS(svgNS, "path");
        const d = `M ${x1_inner} ${y1_inner} L ${x1} ${y1} A ${outer_radius} ${outer_radius} 0 ${large_arc_flag} 1 ${x2} ${y2} L ${x2_inner} ${y2_inner} A ${inner_radius} ${inner_radius} 0 ${large_arc_flag} 0 ${x1_inner} ${y1_inner} Z`;

        path.setAttribute("d", d);
        path.setAttribute("fill", colors[index % colors.length]);
        svg.appendChild(path);
    });

    return svg;
}

/**
 * Generates an SVG line chart.
 * @param {Array} xs - Labels for the x-axis.
 * @param {Array<number>} ys - The values representing the y-axis points.
 * @param {number} [width=400] - The width of the SVG canvas.
 * @param {number} [height=200] - The height of the SVG canvas.
 * @returns {SVGElement} An SVG element containing the line chart.
 */
function __line_chart(xs, ys, width = 100, height = 100, margin = 10) {
    const max_value = Math.max(...ys);
    const min_value = Math.min(...ys);
    const colors = __generate_HSV_colors(3);
    const svgNS = "http://www.w3.org/2000/svg";

    const svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("width", width);
    svg.setAttribute("height", height);
    svg.setAttribute("viewBox", `0 0 ${width} ${height}`);

    const x_step = (width - 2 * margin) / (xs.length - 1);
    const y_scale = (height - 2 * margin) / (max_value - min_value);

    let path_d = "M";
    ys.forEach((value, index) => {
        const x = margin + index * x_step;
        const y = height - margin - (value - min_value) * y_scale;
        path_d += `${x},${y} `;
    });

    const path = document.createElementNS(svgNS, "path");
    path.setAttribute("d", path_d.trim());
    path.setAttribute("stroke", colors[0]);
    path.setAttribute("stroke-width", "2");
    path.setAttribute("fill", "none");
    svg.appendChild(path);

    ys.forEach((value, index) => {
        const x = margin + index * x_step;
        const y = height - margin - (value - min_value) * y_scale;
        const circle = document.createElementNS(svgNS, "circle");
        circle.setAttribute("cx", x);
        circle.setAttribute("cy", y);
        circle.setAttribute("r", 4);
        circle.setAttribute("fill", colors[1]);
        svg.appendChild(circle);
    });

    return svg;
}


/**
 * Generates an SVG pie chart.
 * @param {Array} xs - Unused parameter (for future extensions).
 * @param {Array<number>} ys - The values representing the pie slices.
 * @returns {SVGElement} An SVG element containing the pie chart.
 */
function __pie_chart(xs, ys, radius = 100, margin = 10) {
    const total = ys.reduce((sum, value) => sum + value, 0);
    let cumulative_angle = 0;
    const center_x = radius + margin;
    const center_y = radius + margin;
    const colors = __generate_HSV_colors(ys.length);

    const svgNS = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("width", `${2 * (radius + margin)}`);
    svg.setAttribute("height", `${2 * (radius + margin)}`);

    ys.forEach((value, index) => {
        const angle = (value / total) * 2 * Math.PI;
        const x1 = center_x + radius * Math.cos(cumulative_angle);
        const y1 = center_y + radius * Math.sin(cumulative_angle);
        cumulative_angle += angle;
        const x2 = center_x + radius * Math.cos(cumulative_angle);
        const y2 = center_y + radius * Math.sin(cumulative_angle);

        const large_arc_flag = angle > Math.PI ? 1 : 0;
        const path = document.createElementNS(svgNS, "path");
        const d = `M ${center_x} ${center_y} L ${x1} ${y1} A ${radius} ${radius} 0 ${large_arc_flag} 1 ${x2} ${y2} Z`;

        path.setAttribute("d", d);
        path.setAttribute("fill", colors[index % colors.length]);
        svg.appendChild(path);
    });

    return svg;
}

/**
 * Processes the DOM to generate and replace elements with corresponding SVG charts.
 * It identifies elements with specific class names (`ga-bar`, `ga-bubble`, `ga-donut`,
 * `ga-line`, `ga-pie`), extracts numerical data from class names, and generates
 * the appropriate chart.
 *
 * Supported chart types:
 * - Bar chart (`ga-bar`)
 * - Bubble chart (`ga-bubble`)
 * - Donut chart (`ga-donut`)
 * - Line chart (`ga-line`)
 * - Pie chart (`ga-pie`)
 *
 * Class-based parameters:
 * - `ga-xs-*` for x-axis values
 * - `ga-ys-*` for y-axis values
 * - `ga-zs-*` for bubble sizes (only for `ga-bubble`)
 * - `ga-<size>` for adjusting chart dimensions (`ga-xs`, `ga-l`, etc.)
 *
 * This function runs on DOMContentLoaded and listens for DOM changes to dynamically
 * update charts when elements are added or modified.
 */
function __process_dom() {
    // Select elements that specify they should be bar, pie, or donut charts
    document.querySelectorAll(".ga-bar, .ga-bubble, .ga-donut, .ga-line, .ga-pie").forEach(el => {
        const classList = el.className.split(" ");
        let width = 256,
            height = 256;
        let xs = [],
            ys = [],
            zs = [];
        let chartType = "bar"; // Default to bar chart
        let has_legend = false;

        classList.forEach(cls => {
            // Extract xs values from ga-xs-<num>-<num>-<num>...
            if (cls.startsWith("ga-xs-")) {
                xs = cls.split("-").slice(2);
            }

            // Extract ys values from ga-ys-<num>-<num>-<num>...
            if (cls.startsWith("ga-ys-")) {
                ys = cls.split("-").slice(2).map(num => parseFloat(num)).filter(n => !isNaN(n));
            }

            // Extract ys values from ga-zs-<num>-<num>-<num>...
            if (cls.startsWith("ga-zs-")) {
                zs = cls.split("-").slice(2).map(num => parseFloat(num)).filter(n => !isNaN(n));
            }

            // Extract xs values from ga-xs-<num>-<num>-<num>...
            if (cls.startsWith("ga-legend")) {
                has_legend = true;
            }

            // Detect chart type
            if (cls === "ga-bar") chartType = "bar";
            if (cls === "ga-bubble") chartType = "bubble";
            if (cls === "ga-donut") chartType = "donut";
            if (cls === "ga-line") chartType = "line";
            if (cls === "ga-pie") chartType = "pie";

            // Size settings
            if (cls === "ga-2xs") {
                width = 32;
                height = 32;
            }
            if (cls === "ga-xs") {
                width = 64;
                height = 64;
            }
            if (cls === "ga-s") {
                width = 128;
                height = 128;
            }
            if (cls === "ga-l") {
                width = 512;
                height = 512;
            }
            if (cls === "ga-xl") {
                width = 1024;
                height = 1024;
            }
            if (cls === "ga-2xl") {
                width = 2048;
                height = 2048;
            }
        });

        // Generate the appropriate chart SVG
        let new_element;
        if (chartType === "bubble") {
            ys = ys.map(num => parseFloat(num)).filter(n => !isNaN(n));
            new_element = __bubble_chart(xs, ys, zs, width, height, width / 10);
            has_legend = false;
        } else if (chartType === "donut") {
            new_element = __donut_chart(xs, ys, (width - 2 * (width / 10)) / 2, (width - 2 * (width / 10)) / 4, width / 10);
        } else if (chartType === "line") {
            has_legend = false;
            ys = ys.map(num => parseFloat(num)).filter(n => !isNaN(n));
            new_element = __line_chart(xs, ys, width, height, width / 10);
        } else if (chartType === "pie") {
            new_element = __pie_chart(xs, ys, (width - 2 * (width / 10)) / 2, width / 10);
        } else {
            new_element = __bar_chart(xs, ys, width, height, width / 10);
        }

        // Replace element with the generated SVG
        el.replaceWith(new_element);

        // Add legend if needed (and possible)
        if (has_legend) {
            new_element.parentNode.insertBefore(__generate_legend(xs, __generate_HSV_colors(xs.length), width / 10, width / 20), new_element.nextSibling);
        }

    });
}


document.addEventListener("DOMContentLoaded", __process_dom);
const observer = new MutationObserver(__process_dom);
observer.observe(document.body, {
    childList: true,
    subtree: true
});
