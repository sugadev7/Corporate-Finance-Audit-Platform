const months = [
    "Jan","Feb","Mar","Apr","May","Jun",
    "Jul","Aug","Sep","Oct","Nov","Dec"
];

function calculateVariance() {

    let totalBudget = 0;
    let totalActual = 0;

    months.forEach(month => {

        const budget =
            Number(document.getElementById("b" + month).value) || 0;

        const actual =
            Number(document.getElementById("a" + month).value) || 0;

        const variance = actual - budget;

        const variancePct =
            budget === 0
            ? 0
            : (variance / budget) * 100;

        document.getElementById("v" + month).innerText =
            variance.toLocaleString("en-IN");

        document.getElementById("p" + month).innerText =
            variancePct.toFixed(2) + "%";

        totalBudget += budget;
        totalActual += actual;
    });

    const totalVariance =
        totalActual - totalBudget;

    const totalVariancePct =
        totalBudget === 0
        ? 0
        : (totalVariance / totalBudget) * 100;

    document.getElementById("budgetSummary").innerHTML = `
        <strong>Total Budget:</strong>
        ₹${totalBudget.toLocaleString("en-IN")}
        <br><br>

        <strong>Total Actual:</strong>
        ₹${totalActual.toLocaleString("en-IN")}
        <br><br>

        <strong>Total Variance:</strong>
        ₹${totalVariance.toLocaleString("en-IN")}
        <br><br>

        <strong>Variance %:</strong>
        ${totalVariancePct.toFixed(2)}%
    `;
}