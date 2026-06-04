function calculateDCF() {

    const revenue = Number(document.getElementById("revenue").value) || 0;
    const growth = Number(document.getElementById("growth").value) || 0;
    const margin = Number(document.getElementById("margin").value) || 0;
    const tax = Number(document.getElementById("tax").value) || 0;
    const wacc = Number(document.getElementById("wacc").value) || 0;
    const terminal = Number(document.getElementById("terminal").value) || 0;

    const projectedRevenue =
        revenue * (1 + growth / 100);

    const ebitda =
        projectedRevenue * (margin / 100);

    const fcf =
        ebitda * (1 - tax / 100);

    let terminalValue = 0;

    if (wacc > terminal) {
        terminalValue =
            (fcf * (1 + terminal / 100))
            /
            ((wacc / 100) - (terminal / 100));
    }

    const enterpriseValue =
        fcf + terminalValue;
        localStorage.setItem(
    "dcfData",
    JSON.stringify({
        enterpriseValue,
        terminalValue,
        fcf,
        projectedRevenue
    })
);

    document.getElementById("evCard").innerText =
        "₹" + Math.round(enterpriseValue).toLocaleString("en-IN");

    document.getElementById("fcfCard").innerText =
        "₹" + Math.round(fcf).toLocaleString("en-IN");

    document.getElementById("tvCard").innerText =
        "₹" + Math.round(terminalValue).toLocaleString("en-IN");

    document.getElementById("valueCard").innerText =
        "₹" + Math.round(enterpriseValue).toLocaleString("en-IN");

    document.getElementById("dcfSummary").innerHTML =
        "<strong>Projected Revenue:</strong> ₹" +
        Math.round(projectedRevenue).toLocaleString("en-IN") +
        "<br><br>" +
        "<strong>EBITDA:</strong> ₹" +
        Math.round(ebitda).toLocaleString("en-IN") +
        "<br><br>" +
        "<strong>Free Cash Flow:</strong> ₹" +
        Math.round(fcf).toLocaleString("en-IN") +
        "<br><br>" +
        "<strong>Terminal Value:</strong> ₹" +
        Math.round(terminalValue).toLocaleString("en-IN");
}