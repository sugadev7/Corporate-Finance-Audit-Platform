let revenueChart;

function initializeChart() {

    const canvas = document.getElementById("revenueChart");

    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    revenueChart = new Chart(ctx, {
        type: "line",
        data: {
            labels: [
                "Jan","Feb","Mar","Apr","May","Jun",
                "Jul","Aug","Sep","Oct","Nov","Dec"
            ],
            datasets: [{
                label: "Revenue Forecast",
                data: [0,0,0,0,0,0,0,0,0,0,0,0],
                tension: 0.4,
                fill: false
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    });

}

function updateDashboard() {

    const jan = Number(document.getElementById("jan").value) || 0;
    const feb = Number(document.getElementById("feb").value) || 0;
    const mar = Number(document.getElementById("mar").value) || 0;
    const apr = Number(document.getElementById("apr").value) || 0;
    const may = Number(document.getElementById("may").value) || 0;
    const jun = Number(document.getElementById("jun").value) || 0;

    const jul = Number(document.getElementById("jul").value) || 0;
    const aug = Number(document.getElementById("aug").value) || 0;
    const sep = Number(document.getElementById("sep").value) || 0;
    const oct = Number(document.getElementById("oct").value) || 0;
    const nov = Number(document.getElementById("nov").value) || 0;
    const dec = Number(document.getElementById("dec").value) || 0;

    const totalRevenue =
        jan + feb + mar + apr + may + jun +
        jul + aug + sep + oct + nov + dec;

    const ebitda = Math.round(totalRevenue * 0.18);

    const margin =
        totalRevenue === 0
            ? 0
            : (ebitda / totalRevenue) * 100;

    const cashFlow =
        Math.round(ebitda * 0.85);

    document.getElementById("revenueCard").innerText =
        "₹" + totalRevenue.toLocaleString("en-IN");

    document.getElementById("ebitdaCard").innerText =
        "₹" + ebitda.toLocaleString("en-IN");

    document.getElementById("marginCard").innerText =
        margin.toFixed(2) + "%";

    document.getElementById("cashflowCard").innerText =
        "₹" + cashFlow.toLocaleString("en-IN");

    document.getElementById("summaryBox").innerHTML = `
        <strong>Total Revenue:</strong>
        ₹${totalRevenue.toLocaleString("en-IN")}
        <br><br>

        <strong>EBITDA:</strong>
        ₹${ebitda.toLocaleString("en-IN")}
        <br><br>

        <strong>EBITDA Margin:</strong>
        ${margin.toFixed(2)}%
        <br><br>

        <strong>Cash Flow:</strong>
        ₹${cashFlow.toLocaleString("en-IN")}
    `;

    if (revenueChart) {

        revenueChart.data.datasets[0].data = [
            jan,feb,mar,apr,may,jun,
            jul,aug,sep,oct,nov,dec
        ];

        revenueChart.update();
    }

    localStorage.setItem(
        "dashboardData",
        JSON.stringify({
            jan,feb,mar,apr,may,jun,
            jul,aug,sep,oct,nov,dec
        })
    );

}

function loadSavedData() {

    const saved =
        localStorage.getItem("dashboardData");

    if (!saved) return;

    const data = JSON.parse(saved);

    document.getElementById("jan").value = data.jan || "";
    document.getElementById("feb").value = data.feb || "";
    document.getElementById("mar").value = data.mar || "";
    document.getElementById("apr").value = data.apr || "";
    document.getElementById("may").value = data.may || "";
    document.getElementById("jun").value = data.jun || "";

    document.getElementById("jul").value = data.jul || "";
    document.getElementById("aug").value = data.aug || "";
    document.getElementById("sep").value = data.sep || "";
    document.getElementById("oct").value = data.oct || "";
    document.getElementById("nov").value = data.nov || "";
    document.getElementById("dec").value = data.dec || "";

    updateDashboard();

}

window.onload = function () {

    initializeChart();

    loadSavedData();

};