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


/*
 * ESCRIPTURA DOCENT (preparada, NO activada a la passarel·la).
 * INTEGRAR NOMÉS DESPRÉS D'AUTENTICAR EL TOKEN GOOGLE EN EL BACKEND.
 * No acceptar mai verifiedTeacherEmail des del POST/body del navegador.
 * Exemple servidor, després de validar el token de cada crida:
 *   const saved = robotiaSaveCorrectionForVerifiedTeacher_(verifiedEmail, payload);
 */
function robotiaSaveCorrectionForVerifiedTeacher_(verifiedTeacherEmail, payload) {
  robotiaRequireTeacher_(verifiedTeacherEmail);
  if (!payload || typeof payload !== "object") throw new Error("Falten dades de correcció");
  const email = String(payload.email || "").trim().toLowerCase();
  const id = String(payload.id || "").trim();
  if (!/^[a-z0-9._%+-]+@instituticaria\.cat$/.test(email)) throw new Error("Correu alumne incorrecte");
  if (!/^[a-z0-9_-]{1,32}$/i.test(id)) throw new Error("ID de repte incorrecte");
  const grade = robotiaValidGrade_(payload.grade);
  if (payload.grade !== "" && payload.grade !== null && payload.grade !== undefined && grade === null) {
    throw new Error("La nota ha de ser de 0 a 10");
  }
  const ai = robotiaValidGrade_(payload.ai);
  if (payload.ai !== "" && payload.ai !== null && payload.ai !== undefined && ai === null) {
    throw new Error("Proposta IA incorrecta");
  }
  const workId = String(payload.workId || "").slice(0, 100);
  const title = String(payload.title || id).slice(0, 200);
  const category = String(payload.category || "").slice(0, 30);
  const publicComment = String(payload.comment || "").slice(0, 3000);
  const privateComment = String(payload.privateComment || "").slice(0, 3000);
  const evidence = String(payload.evidenceUrl || "").slice(0, 500);
  const today = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), "yyyy-MM-dd");
  const values = [email,id,title,category,workId,"Corregit · esborrany",
    ai === null ? "" : ai,grade === null ? "" : grade,
    publicComment,privateComment,"No",today,
    String(verifiedTeacherEmail).trim().toLowerCase(),evidence,String(payload.deliveredAt || "").slice(0, 40)];
  const lock = LockService.getScriptLock();
  if (!lock.tryLock(15000)) throw new Error("Correcció ocupada: torna-ho a provar");
  try {
    const sheet = SpreadsheetApp.openById(ROBOTIA_PRIVATE_GRADES_SHEET_ID_).getSheetByName("Correccions");
    if (!sheet) throw new Error("Falta la pestanya Correccions");
    const rows = sheet.getLastRow();
    const existing = rows > 1 ? sheet.getRange(2,1,rows-1,5).getValues() : [];
    let target = rows + 1;
    for (let i = existing.length - 1; i >= 0; i--) {
      const row = existing[i];
      if (String(row[0] || "").trim().toLowerCase() === email &&
          String(row[1] || "").trim() === id && String(row[4] || "").trim() === workId) {
        target = i + 2; break;
      }
    }
    sheet.getRange(target,1,1,15).setValues([values]);
    return { saved:true, email:email, id:id, row:target, published:false };
  } finally {lock.releaseLock()}
}
function robotiaSetCorrectionPublishedForVerifiedTeacher_(verifiedTeacherEmail, email, id, workId, published) {
  robotiaRequireTeacher_(verifiedTeacherEmail);
  email = String(email || "").trim().toLowerCase();
  id = String(id || "").trim();
  workId = String(workId || "").trim();
  if (!/^[a-z0-9._%+-]+@instituticaria\.cat$/.test(email) ||
      !/^[a-z0-9_-]{1,32}$/i.test(id)) throw new Error("Destinatari incorrecte");
  if (typeof published !== "boolean") throw new Error("Cal confirmar expressament la publicació");
  const lock=LockService.getScriptLock();
  if (!lock.tryLock(15000)) throw new Error("Publicació ocupada: torna-ho a provar");
  try {
    const sheet = SpreadsheetApp.openById(ROBOTIA_PRIVATE_GRADES_SHEET_ID_).getSheetByName("Correccions");
    const last=sheet.getLastRow();
    if(last<2)throw new Error("Encara no hi ha correccions");
    const rows=sheet.getRange(2,1,last-1,5).getValues();
    const matching=[];
    rows.forEach((row,i)=>{
      if(String(row[0]||"").trim().toLowerCase()===email&&String(row[1]||"").trim()===id&&String(row[4]||"").trim()===workId)matching.push(i+2);
    });
    if(matching.length!==1)throw new Error("La correcció no és única; revisa ID i identificador de treball");
    sheet.getRange(matching[0],11).setValue(published?"Sí":"No");
    return {published:published,email:email,id:id};
  } finally {lock.releaseLock()}
}
function robotiaRequireTeacher_(verifiedEmail) {
  if (String(verifiedEmail || "").trim().toLowerCase() !== "jlesan@instituticaria.cat") {
    throw new Error("Accés docent no autoritzat");
  }
}
