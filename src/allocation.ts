export {};

const canvas = document.querySelector<HTMLCanvasElement>("#allocation-canvas")!;
const ctx = canvas.getContext("2d")!;
const readout = document.querySelector<HTMLParagraphElement>(
  "#allocation-readout",
)!;

const totalResidents = 6;
let supply_crew = 2;

type ShiftResults = {
  supply_crew: number;
  totalResidents: number;
  production: number;
  consumption: number;
  balance: number;
};

type ReportRow = {
  label: string;
  value: number;
  color: string;
};

function calculateShiftResults(assignedToSupplies: number): ShiftResults {
  const production = assignedToSupplies * 3;
  const consumption = totalResidents;
  const balance = production - consumption;
  return {
    supply_crew: assignedToSupplies,
    totalResidents,
    production,
    consumption,
    balance,
  };
}

function drawResidentRoster(results: ShiftResults) {
  for (let resident = 0; resident < results.totalResidents; resident++) {
    const onSupplyShift = resident < results.supply_crew;
    ctx.fillStyle = onSupplyShift ? "#040505" : "#c9d2c9";
    ctx.fillRect(18 + resident * 45, 16, 36, 36);
    ctx.fillStyle = onSupplyShift ? "#ffffff" : "#233e43";
    ctx.font = "16px system-ui";
    ctx.fillText(String(resident + 1), 31 + resident * 45, 40);
  }
}

function drawShiftChart(results: ShiftResults) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawResidentRoster(results);
  ctx.fillStyle = "#233e43";
  ctx.font = "14px system-ui";
  ctx.fillText(
    `Producers: ${results.supply_crew} / ${results.totalResidents}`,
    18,
    76,
  );

  const rows: ReportRow[] = [
    { label: "Production", value: results.production, color: "#27766b" },
    { label: "Consumption", value: results.consumption, color: "#a44d23" },
  ];

  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    const labelY = 102 + i * 52;
    ctx.fillStyle = "#233e43";
    ctx.fillText(`${row.label}: ${row.value}`, 18, labelY);
    ctx.fillStyle = row.color;
    ctx.fillRect(18, labelY + 8, row.value * 14, 20);
  }
}

function updateShiftReadout(results: ShiftResults) {
  readout.textContent =
    `Assigned: ${results.supply_crew}/6 · Production: ${results.production} · Consumption: ${results.consumption} · Balance: ${
      results.balance > 0 ? "+" : ""
    }${results.balance}`;
}

function updateShiftReport() {
  const results = calculateShiftResults(supply_crew);
  drawShiftChart(results);
  updateShiftReadout(results);
}

document.querySelector<HTMLButtonElement>("#allocation-less")!.onclick = () => {
  supply_crew = Math.max(0, supply_crew - 1);
  updateShiftReport();
};
document.querySelector<HTMLButtonElement>("#allocation-more")!.onclick = () => {
  supply_crew = Math.min(6, supply_crew + 1);
  updateShiftReport();
};
document.querySelector<HTMLButtonElement>("#allocation-reset")!.onclick =
  () => {
    supply_crew = 2;
    updateShiftReport();
  };
updateShiftReport();
