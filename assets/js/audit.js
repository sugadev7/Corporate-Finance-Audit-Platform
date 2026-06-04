let observations = [];

window.onload = function () {
    loadObservations();
};

function addObservation() {

    const auditDate = document.getElementById("auditDate").value;
    const category = document.getElementById("category").value;
    const observation = document.getElementById("observation").value.trim();
    const branch = document.getElementById("branch").value.trim();
    const risk = document.getElementById("risk").value;
    const status = document.getElementById("status").value;

    if (
        auditDate === "" ||
        observation === "" ||
        branch === ""
    ) {
        alert("Please complete all required fields.");
        return;
    }

    const record = {
        id: "AUD-" + Date.now(),
        date: auditDate,
        category: category,
        observation: observation,
        branch: branch,
        risk: risk,
        status: status
    };

    observations.push(record);

    saveObservations();
    renderTable();
    updateSummary();
    clearForm();
}

function renderTable() {

    const table = document.getElementById("auditTable");

    table.innerHTML = "";

    observations.forEach(item => {

        let riskClass = "";

        if (item.risk === "High") {
            riskClass = "negative";
        } else if (item.risk === "Low") {
            riskClass = "positive";
        }

        const row = `
            <tr>
                <td>${item.id}</td>
                <td>${item.date}</td>
                <td>${item.category}</td>
                <td>${item.observation}</td>
                <td>${item.branch}</td>
                <td class="${riskClass}">
                    ${item.risk}
                </td>
                <td>${item.status}</td>
            </tr>
        `;

        table.innerHTML += row;
    });
}

function updateSummary() {

    const total = observations.length;

    const high = observations.filter(
        x => x.risk === "High"
    ).length;

    const medium = observations.filter(
        x => x.risk === "Medium"
    ).length;

    const low = observations.filter(
        x => x.risk === "Low"
    ).length;

    const open = observations.filter(
        x => x.status === "Open"
    ).length;

    const closed = observations.filter(
        x => x.status === "Closed"
    ).length;

    document.getElementById("auditSummary").innerHTML = `
        <strong>Total Observations:</strong> ${total}
        <br><br>

        <strong>High Risk:</strong> ${high}
        <br><br>

        <strong>Medium Risk:</strong> ${medium}
        <br><br>

        <strong>Low Risk:</strong> ${low}
        <br><br>

        <strong>Open Items:</strong> ${open}
        <br><br>

        <strong>Closed Items:</strong> ${closed}
    `;
}

function clearForm() {

    document.getElementById("auditDate").value = "";
    document.getElementById("category").value = "KYC";
    document.getElementById("observation").value = "";
    document.getElementById("branch").value = "";
    document.getElementById("risk").value = "Low";
    document.getElementById("status").value = "Open";
}

function saveObservations() {

    localStorage.setItem(
        "auditObservations",
        JSON.stringify(observations)
    );
}

function loadObservations() {

    const data = localStorage.getItem(
        "auditObservations"
    );

    if (!data) return;

    observations = JSON.parse(data);

    renderTable();
    updateSummary();
}