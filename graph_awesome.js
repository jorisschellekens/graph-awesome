function __generate_normal_distribution_SVG(mean, std_dev, width = 80, height = 80, color = "black", line_width = 2, mark = null) {
    const svgNS = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("width", width);
    svg.setAttribute("height", height);
    svg.setAttribute("viewBox", `0 0 ${width} ${height}`);

    const numPoints = 100;
    const minX = mean - 4 * std_dev;
    const maxX = mean + 4 * std_dev;

    function __normal_PDF(x, mean, std_dev) {
        return (1 / (std_dev * Math.sqrt(2 * Math.PI))) *
            Math.exp(-0.5 * Math.pow((x - mean) / std_dev, 2));
    }

    let pathData = "M";
    let markX = null,
        markY = null;

    for (let i = 0; i <= numPoints; i++) {
        let x = minX + (i / numPoints) * (maxX - minX);
        let y = __normal_PDF(x, mean, std_dev);
        let svgX = ((x - minX) / (maxX - minX)) * width;
        let svgY = height - (y * height * 10);
        pathData += `${svgX},${svgY} `;

        // Find the point to mark
        if (mark !== null && Math.abs(x - mark) < (maxX - minX) / numPoints) {
            markX = svgX;
            markY = svgY;
        }
    }

    const path = document.createElementNS(svgNS, "path");
    path.setAttribute("d", pathData.trim());
    path.setAttribute("stroke", color);
    path.setAttribute("fill", "none");
    path.setAttribute("stroke-width", line_width);
    svg.appendChild(path);

    // Draw the mark if specified
    if (markX !== null && markY !== null) {
        // Line from the circle to the bottom
        const line = document.createElementNS(svgNS, "line");
        line.setAttribute("x1", markX);
        line.setAttribute("y1", markY);
        line.setAttribute("x2", markX);
        line.setAttribute("y2", height);
        line.setAttribute("stroke", "red");
        line.setAttribute("stroke-width", line_width);
        svg.appendChild(line);

        // Circle at the mark point
        const circle = document.createElementNS(svgNS, "circle");
        circle.setAttribute("cx", markX);
        circle.setAttribute("cy", markY);
        circle.setAttribute("r", line_width * 2 + 1);
        circle.setAttribute("fill", "white"); // Make it hollow
        circle.setAttribute("stroke", "red"); // Set stroke color
        circle.setAttribute("stroke-width", line_width);
        svg.appendChild(circle);
    }

    return svg;
}

function __process_dom() {
    document.querySelectorAll(".ga-normal-distribution").forEach(el => {
        const classList = el.className.split(" ");
        let mean = 50,
            std_dev = 15,
            mark = null;
        let width = 8,
            height = 8;

        classList.forEach(cls => {
            // avg
            if (cls.startsWith("ga-avg-")) mean = parseFloat(cls.split("-")[2]);

            // std-dev
            if (cls.startsWith("ga-std-dev-")) std_dev = parseFloat(cls.split("-")[3]);

            // mark
            if (cls.startsWith("ga-mark-")) mark = parseFloat(cls.split("-")[2]);

            // size
            if (cls === "ga-2xs") {
                width = 1;
                height = 1;
            }
            if (cls === "ga-xs") {
                width = 2;
                height = 2;
            }
            if (cls === "ga-s") {
                width = 4;
                height = 4;
            }
            if (cls === "ga-l") {
                width = 16;
                height = 16;
            }
            if (cls === "ga-xl") {
                width = 32;
                height = 32;
            }
            if (cls === "ga-2xl") {
                width = 64;
                height = 64;
            }
        });

        // Get the computed color from the original element
        let color = window.getComputedStyle(el).color;

        // Replace element with the generated SVG
        el.replaceWith(__generate_normal_distribution_SVG(mean, std_dev, width * 10, height * 10, color, 2, mark));
    });
}

document.addEventListener("DOMContentLoaded", __process_dom);
const observer = new MutationObserver(__process_dom);
observer.observe(document.body, {
    childList: true,
    subtree: true
});
