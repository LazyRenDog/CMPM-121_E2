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
  ctx.fillText(`Production: ${results.production}`, 18, 102);
  ctx.fillStyle = "#27766b";
  ctx.fillRect(18, 110, results.production * 14, 20);
  ctx.fillStyle = "#233e43";
  ctx.fillText(`Consumption: ${results.consumption}`, 18, 154);
  ctx.fillStyle = "#a44d23";
  ctx.fillRect(18, 162, results.consumption * 14, 20);
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
