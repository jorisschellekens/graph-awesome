(function() {
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



async function renderLineChart(element) {
    const xs = parseList(element.querySelector("xs"));
    const ys = parseList(element.querySelector("ys"))
        .map(Number);

    if (xs.length === 0 || xs.length !== ys.length) {
        console.error(
            "linechart: <xs> and <ys> must contain equally sized lists.",
            element
        );
        return;
    }

    if (ys.some(value => !Number.isFinite(value))) {
        console.error(
            "linechart: <ys> must contain only numeric values.",
            element
        );
        return;
    }

    await loadGoogleCharts();

    const data = new window.google.visualization.DataTable();
    data.addColumn("string", "Label");
    data.addColumn("number", "Value");
    data.addRows(xs.map((x, i) => [x, ys[i]]));

    element.replaceChildren();

    const chart = new window.google.visualization.LineChart(element);

    chart.draw(data, {
        legend: { position: "none" },
        height: Number(element.getAttribute("height")) || 300,
        chartArea: { width: "80%", height: "75%" },
        vAxis: { minValue: 0 }
    });
}

	
async function renderBubbleChart(element) {
    const xs = parseList(element.querySelector("xs")).map(Number);
    const ys = parseList(element.querySelector("ys")).map(Number);
    const zs = parseList(element.querySelector("zs")).map(Number);

    if (
        xs.length === 0 ||
        xs.length !== ys.length ||
        xs.length !== zs.length
    ) {
        console.error(
            "bubblechart: <xs>, <ys>, and <zs> must contain equally sized lists.",
            element
        );
        return;
    }

    if (
        [...xs, ...ys, ...zs].some(value => !Number.isFinite(value)) ||
        zs.some(value => value < 0)
    ) {
        console.error(
            "bubblechart: coordinates and sizes must be numeric, and sizes must be non-negative.",
            element
        );
        return;
    }

    await loadGoogleCharts();

    const data = new window.google.visualization.DataTable();
    data.addColumn("number", "X");
    data.addColumn("number", "Y");
    data.addColumn("string", "Series");
    data.addColumn("number", "Size");

    data.addRows(xs.map((x, i) => [x, ys[i], "Values", zs[i]]));

    element.replaceChildren();

    const chart = new window.google.visualization.BubbleChart(element);

    chart.draw(data, {
        height: Number(element.getAttribute("height")) || 300,
        chartArea: { width: "80%", height: "75%" },
        legend: { position: "none" },
        hAxis: { title: "X" },
        vAxis: { title: "Y" },
        bubble: { textStyle: { fontSize: 0 } }
    });
}

	
	async function renderPieChart(element, donut = false) {
		const xs = parseList(element.querySelector("xs"));
		const ys = parseList(element.querySelector("ys"))
			.map(Number);

		if (
			xs.length === 0 ||
			xs.length !== ys.length ||
			ys.some(value => !Number.isFinite(value) || value < 0)
		) {
			console.error(
				"piechart: <xs> and <ys> must contain equally sized lists of non-negative numbers.",
				element
			);
			return;
		}

		await loadGoogleCharts();

		const data = new window.google.visualization.DataTable();
		data.addColumn("string", "Label");
		data.addColumn("number", "Value");
		data.addRows(xs.map((x, i) => [x, ys[i]]));

		element.replaceChildren();

		const chart = new window.google.visualization.PieChart(element);

		chart.draw(data, {
			height: Number(element.getAttribute("height")) || 300,
			chartArea: {
				width: "90%",
				height: "85%"
			},
			pieHole: donut ? 0.45 : 0,
			legend: {
				position: "right"
			}
		});
	}

	async function renderDonutChart(element) {
		await renderPieChart(element, true);
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
			legend: {
				position: "none"
			},
			height: Number(element.getAttribute("height")) || 300,
			chartArea: {
				width: "80%",
				height: "75%"
			},
			vAxis: {
				minValue: 0
			}
		});
	}

async function renderAll() {
    const tasks = [
        ...Array.from(document.querySelectorAll("barchart"))
            .map(element => renderBarChart(element)),
        ...Array.from(document.querySelectorAll("piechart"))
            .map(element => renderPieChart(element)),
        ...Array.from(document.querySelectorAll("donutchart"))
            .map(element => renderDonutChart(element))
...Array.from(document.querySelectorAll("linechart"))
    .map(element => renderLineChart(element)),
...Array.from(document.querySelectorAll("bubblechart"))
    .map(element => renderBubbleChart(element))		
    ];

    await Promise.all(tasks);
}

	if (document.readyState === "loading") {
		document.addEventListener("DOMContentLoaded", renderAll);
	} else {
		renderAll();
	}
})();
