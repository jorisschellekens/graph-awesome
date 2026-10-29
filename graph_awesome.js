
(function () {
    "use strict";

    const GOOGLE_CHARTS_URL = "https://www.gstatic.com/charts/loader.js";

    let googleChartsPromise = null;

    function loadGoogleCharts() {
        if (googleChartsPromise) {
            return googleChartsPromise;
        }

        googleChartsPromise = new Promise((resolve, reject) => {
            if (window.google?.charts) {
                window.google.charts.load("current", {
                    packages: ["corechart"]
                });
                window.google.charts.setOnLoadCallback(resolve);
                return;
            }

            const script = document.createElement("script");
            script.src = GOOGLE_CHARTS_URL;
            script.onload = () => {
                window.google.charts.load("current", {
                    packages: ["corechart"]
                });
                window.google.charts.setOnLoadCallback(resolve);
            };
            script.onerror = () => reject(
                new Error("Could not load Google Charts.")
            );

            document.head.appendChild(script);
        });

        return googleChartsPromise;
    }

    function parseList(element) {
        if (!element) {
            return [];
        }

        return element.textContent
            .split(",")
            .map(value => value.trim())
            .filter(value => value.length > 0);
    }

    async function renderBarChart(element) {
        const xs = parseList(element.querySelector("xs"));
        const ys = parseList(element.querySelector("ys"))
            .map(Number);

        if (xs.length === 0 || xs.length !== ys.length) {
            console.error(
                "barchart: <xs> and <ys> must contain equally sized lists.",
                element
            );
            return;
        }

        if (ys.some(value => !Number.isFinite(value))) {
            console.error(
                "barchart: <ys> must contain only numeric values.",
                element
            );
            return;
        }

        await loadGoogleCharts();

        const data = new window.google.visualization.DataTable();
        data.addColumn("string", "Label");
        data.addColumn("number", "Value");

        data.addRows(xs.map((x, i) => [x, ys[i]]));

        // Replace the custom element's contents with the chart.
        element.replaceChildren();

        const chart = new window.google.visualization.ColumnChart(element);

        chart.draw(data, {
            legend: { position: "none" },
            height: Number(element.getAttribute("height")) || 300,
            chartArea: { width: "80%", height: "75%" },
            vAxis: { minValue: 0 }
        });
    }

    async function renderAll() {
        const charts = document.querySelectorAll("barchart");

        await Promise.all(
            Array.from(charts).map(element => renderBarChart(element))
        );
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", renderAll);
    } else {
        renderAll();
    }
})();
