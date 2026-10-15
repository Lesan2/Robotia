/*
 * ROBOTIA V3 — Complement d'Apps Script per publicar qualificacions.
 *
 * NO substitueix el Code.gs existent: és un arxiu NO INTEGRAT, preparat
 * per afegir al projecte Apps Script que ja serveix cloudInfo().
 *
 * PUNT D'INTEGRACIÓ (dins de cloudInfo, DESPRÉS de verificar el token):
 *   result.publishedFeedback = robotiaPublishedFeedbackForVerifiedEmail_(result.email);
 *
 * Important: NO cridar aquesta funció amb un email subministrat pel navegador.
 * L'email ha de provenir del token Google ja verificat al servidor.
 * Cap funció d'aquí permet a l'alumnat modificar qualificacions.
 */
const ROBOTIA_PRIVATE_GRADES_SHEET_ID_ = "1DqBcfjOzdL8_vO0hXynbAVa42wBuaB3FhMIsOblR6l4";
function robotiaPublishedFeedbackForVerifiedEmail_(verifiedEmail) {
  const email = String(verifiedEmail || "").trim().toLowerCase();
  if (!/^[a-z0-9._%+-]+@instituticaria\.cat$/.test(email)) {
    return { email: email, unavailable: true };
  }
  const result = { email: email, grades: {}, general: [], exercises: [] };
  try {
    const book = SpreadsheetApp.openById(ROBOTIA_PRIVATE_GRADES_SHEET_ID_);
    const students = robotiaGradeRows_(book, "Alumnes");
    // Alumnes: A=correu, J=flux, K=micro:bit, L=sensors,
    // M=pràctiques, N=actitud, O=robot, P=final, S=publicar.
    const record = students.slice(1).find(row =>
      String(row[0] || "").trim().toLowerCase() === email
    );
    if (record && robotiaIsPublished_(record[18])) {
      const fields = [
        ["flux", 9], ["microbit", 10], ["sensors", 11],
        ["practices", 12], ["attitude", 13], ["robot", 14], ["final", 15]
      ];
      fields.forEach(([key, index]) => {
        const grade = robotiaValidGrade_(record[index]);
        if (grade !== null) result.grades[key] = grade;
      });
    }

    // Observacions: A=correu, B=data, C=tipus, D=nota,
    // E=comentari publicable, F=privat (MAI es retorna), G=publicar.
    const observations = robotiaGradeRows_(book, "Observacions");
    observations.slice(1).forEach(row => {
      if (String(row[0] || "").trim().toLowerCase() !== email) return;
      if (!robotiaIsPublished_(row[6])) return;
      const grade = robotiaValidGrade_(row[3]);
      const note = String(row[4] || "").trim();
      if (!note && grade === null) return;
      result.general.push({
        date: robotiaSafeGradeDate_(row[1]),
        type: String(row[2] || "Observació").slice(0, 100),
        comment: note.slice(0, 3000),
        ...(grade === null ? {} : { grade: grade })
      });
    });

    // Correccions: A=correu, B=ID repte, C=títol, H=nota docent,
    // I=comentari publicable, J=PRIVAT (MAI es retorna), K=publicar.
    // La proposta IA (G) tampoc es publica com a nota docent.
    const corrections = robotiaGradeRows_(book, "Correccions");
    const latestByChallenge = new Map();
    corrections.slice(1).forEach(row => {
      if (String(row[0] || "").trim().toLowerCase() !== email) return;
      if (!robotiaIsPublished_(row[10])) return;
      const id = String(row[1] || "").trim().slice(0, 100);
      if (!id) return;
      const grade = robotiaValidGrade_(row[7]);
      const note = String(row[8] || "").trim();
      if (!note && grade === null) return;
      latestByChallenge.set(id, {
        id: id,
        title: String(row[2] || id).slice(0, 200),
        comment: note.slice(0, 3000),
        ...(grade === null ? {} : { grade: grade })
      });
    });
    result.exercises = [...latestByChallenge.values()];
  } catch (error) {
    console.warn("ROBOTIA: no es poden consultar notes publicades.", error);
    return { email: email, unavailable: true };
  }
  return result;
}
function robotiaGradeRows_(book, tabName) {
  const sheet = book.getSheetByName(tabName);
  if (!sheet) throw new Error("Falta la pestanya " + tabName);
  const rows = sheet.getLastRow(), columns = sheet.getLastColumn();
  if (!rows) return [];
  return sheet.getRange(1, 1, rows, columns).getValues();
}
function robotiaIsPublished_(value) {
  if (value === true) return true;
  const v = String(value || "").trim().toLowerCase();
  return ["sí", "si", "true", "1", "publicat", "publicada"].includes(v);
}
function robotiaValidGrade_(value) {
  if (value === null || value === undefined || String(value).trim() === "") return null;
  const n = Number(String(value).replace(",", "."));
  return Number.isFinite(n) && n >= 0 && n <= 10 ? n : null;
}
function robotiaSafeGradeDate_(value) {
  if (value instanceof Date && !isNaN(value.getTime())) {
    return Utilities.formatDate(value, Session.getScriptTimeZone(), "yyyy-MM-dd");
  }
  return String(value || "").slice(0, 30);
}
