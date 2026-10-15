# ROBOTIA V3 · Corrector docent (15/10/2026)

## Estat
- **Frontend actiu:** `proves/correccio-v3.js`, visible només en el panell Professorat amb la sessió institucional `jlesan@instituticaria.cat`. Importa un `portafoli.json` o `.robotiaportfolio`, mostra evidències, aplica rúbriques ponderades, redacta nota docent, comentari públic i anotació privada. Permet copiar la fila (15 columnes) a la pestanya Correccions del full docent o descarregar-la en TSV.
- **Full institucional privat existent:** https://docs.google.com/spreadsheets/d/1DqBcfjOzdL8_vO0hXynbAVa42wBuaB3FhMIsOblR6l4/edit
- **Publicació als alumnes:** hi ha la pantalla a `proves/comentaris-v3.js`, però NO està activada al servidor fins a integrar l'addon d'Apps Script.
- **Add-on backend preparat i provat amb dades simulades:** `proves/nuvol/ROBOTIA_Grades_Addon.gs`.
- **Sense canvis** als portafolis dels alumnes ni a les notes reals.

## Funcions de la versió actual
1. Iniciar sessió amb el compte institucional del professor.
2. Anar a Professorat → Corrector de reptes.
3. Importar el `portafoli.json` de l'alumne. Per fer proves, usar «Carregar el meu portafoli de prova».
4. Escollir repte; revisar diagrama, MakeCode, adjunts i comentaris.
5. Puntuar els tres indicadors de la rúbrica i, si es vol, aplicar-ne la mitjana ponderada a la nota docent.
6. Escriure el comentari públic i l'observació privada.
7. Copiar una fila a **Correccions**, a la primera columna d'una fila nova; si ja existeix una correcció per al mateix alumne/repte, modificar la fila en lloc de duplicar-la.
8. Mantenir **Publicar? = No** fins a revisar i validar.

## Què falta per a la publicació real
El Code.gs del desplegament institucional no està present en aquest repositori ni és accessible a les connexions actuals. Cal que el propietari de l'script faciliti el codi actual per poder inserir l'addon sense modificar ni trencar el login i `cloudSave`.

Integració un cop es disposi del codi:
- Afegir `ROBOTIA_Grades_Addon.gs` al mateix projecte Apps Script que implementa `cloudInfo`.
- Dins la implementació de `cloudInfo`, **després de verificar el Google ID token**, afegir al resultat retornat:
  `result.publishedFeedback = robotiaPublishedFeedbackForVerifiedEmail_(result.email);`
  El correu ha de provenir de la identitat verificada al servidor, mai d'un camp aportat pel navegador.
- Opcionalment, integrar els mètodes docents `robotiaSaveCorrectionForVerifiedTeacher_` i `robotiaSetCorrectionPublishedForVerifiedTeacher_` en el dispatcher del servidor, validant el token institucional en cada petició; llavors afegir el botó de desament directe al frontend.
- Publicar una **nova versió** del desplegament Apps Script.
- Fer proves només amb l'**Alumne de Prova**: nota no publicada invisible, nota publicada visible al compte correcte, observacions privades invisibles, un segon alumne mai veu dades del primer, i `cloudSave` continua funcionant.

### Contracte de dades del feedback
```json
{
  "email":"alumne@instituticaria.cat",
  "grades":{"flux":8,"microbit":7,"sensors":6,"practices":7,"attitude":9,"robot":8,"final":8},
  "general":[{"date":"2026-10-15","type":"Observació","grade":8,"comment":"..."}],
  "exercises":[{"id":"m0","title":"Hola, micro:bit!","grade":7.5,"comment":"..."}]
}
```

Els camps privats J de Correccions, F d'Observacions i R d'Alumnes **no es retornen mai**. La proposta IA (columna G de Correccions) tampoc s'ha de publicar com si fos la nota docent. Les notes globals només es retornen si la columna S d'Alumnes indica publicació, i cada correcció només si la columna K de Correccions indica Sí.

## Notes de compatibilitat
Els fitxers de ROBOTIA V2/V3, els IDs dels reptes, els enllaços de Classroom i el núvol antic no han estat modificats pel corrector. El corrector no esborra o altera el registre docent automàticament.
