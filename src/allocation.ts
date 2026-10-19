export {};

const canvas = document.querySelector<HTMLCanvasElement>("#allocation-canvas")!;
const ctx = canvas.getContext("2d")!;
const readout = document.querySelector<HTMLParagraphElement>(
  "#allocation-readout",
)!;

const totalResidents = 6;
let supply_crew = 2;

function drawResidentRoster(assignedToSupplies: number) {
  for (let resident = 0; resident < totalResidents; resident++) {
    const onSupplyShift = resident < assignedToSupplies;
    ctx.fillStyle = onSupplyShift ? "#27766b" : "#c9d2c9";
    ctx.fillRect(18 + resident * 45, 16, 36, 36);
    ctx.fillStyle = onSupplyShift ? "#ffffff" : "#233e43";
    ctx.font = "16px system-ui";
    ctx.fillText(String(resident + 1), 31 + resident * 45, 40);
  }
}

function drawShiftChart(
  assignedToSupplies: number,
  production: number,
  consuption: number,
) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawResidentRoster(assignedToSupplies);
  ctx.fillStyle = "#233e43";
  ctx.font = "14px system-ui";
  ctx.fillText(`Producers: ${assignedToSupplies} / ${totalResidents}`, 18, 76);
  ctx.fillText(`Production: ${production}`, 18, 102);
  ctx.fillStyle = "#27766b";
  ctx.fillRect(18, 110, production * 14, 20);
  ctx.fillStyle = "#233e43";
  ctx.fillText(`Consumption: ${consuption}`, 18, 154);
  ctx.fillStyle = "#a44d23";
  ctx.fillRect(18, 162, consuption * 14, 20);
}

function updateShiftReadout(
  assignedToSupplies: number,
  production: number,
  consumption: number,
  balance: number,
) {
  readout.textContent =
    `Assigned: ${assignedToSupplies}/6 · Production: ${production} · Consumption: ${consumption} · Balance: ${
      balance > 0 ? "+" : ""
    }${balance}`;
}

function updateShiftReport() {
  const production = supply_crew * 3;
  const consumption = totalResidents;
  const balance = production - consumption;
  drawShiftChart(supply_crew, production, consumption);
  updateShiftReadout(supply_crew, production, consumption, balance);
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
