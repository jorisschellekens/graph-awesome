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
        return Array.from({ length: k }, (_, i) => {
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
        rect.setAttribute("width", bar_width - 2);
        rect.setAttribute("height", bar_height);
        rect.setAttribute("fill", colors[index % colors.length]);
        svg.appendChild(rect);
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
function __donut_chart(xs, ys, outer_radius = 100, inner_radius = 50, margin = 10) {
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
 * Generates an SVG donut chart.
 */
function __process_dom() {
    // Select elements that specify they should be bar, pie, or donut charts
    document.querySelectorAll(".ga-bar, .ga-pie, .ga-donut").forEach(el => {
        const classList = el.className.split(" ");
        let width = 256, height = 256;
        let xs = [], ys = [];
        let chartType = "bar"; // Default to bar chart

        classList.forEach(cls => {
            // Extract xs values from ga-xs-<num>-<num>-<num>...
            if (cls.startsWith("ga-xs-")) {
                xs = cls.split("-").slice(2).map(num => parseFloat(num)).filter(n => !isNaN(n));
            }

            // Extract ys values from ga-ys-<num>-<num>-<num>...
            if (cls.startsWith("ga-ys-")) {
                ys = cls.split("-").slice(2).map(num => parseFloat(num)).filter(n => !isNaN(n));
            }

            // Detect chart type
            if (cls === "ga-donut") chartType = "donut";
            if (cls === "ga-pie") chartType = "pie";
            if (cls === "ga-bar") chartType = "bar";

            // Size settings
            if (cls === "ga-2xs") { width = 32; height = 32; }
            if (cls === "ga-xs") { width = 64; height = 64; }
            if (cls === "ga-s") { width = 128; height = 128; }
            if (cls === "ga-l") { width = 512; height = 512; }
            if (cls === "ga-xl") { width = 1024; height = 1024; }
            if (cls === "ga-2xl") { width = 2048; height = 2048; }
        });

        // Generate the appropriate chart SVG
        let new_element;
        if (chartType === "donut") {
            new_element = __donut_chart(xs, ys, (width-2*(width/10))/2, (width-2*(width/10))/4, width/10);
        } else if (chartType === "pie") {
            new_element = __pie_chart(xs, ys, (width-2*(width/10))/2, width/10);
        } else {
            new_element = __bar_chart(xs, ys, width, height, width/10);
        }

        // Replace element with the generated SVG
        el.replaceWith(new_element);
    });
}


document.addEventListener("DOMContentLoaded", __process_dom);
const observer = new MutationObserver(__process_dom);
observer.observe(document.body, {
    childList: true,
    subtree: true
});
