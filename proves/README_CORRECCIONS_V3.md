# ROBOTIA V3 · Correccions del professor (18/10/2026)

## Estat real

- **Frontend disponible** a `proves/correccio-v3.js`, dins de `Professorat → Corrector de reptes`.
- **Backend preparat però no desplegat**: l'usuari té el paquet `ROBOTIA_V3_CORRECCIONS_20261018.zip` amb `Codigo.gs` (codi original íntegre + 5 funcions noves) i `Bridge.html` (llista de mètodes ampliada).
- El `Código.gs` real que ha facilitat l'usuari **JA CONTÉ** `robotiaPublishedFeedback_` i el retorn de `publishedFeedback` a `cloudInfo`. **NO** s'ha d'afegir `ROBOTIA_Grades_Addon.gs`: és un esborrany antic no necessari, que podria causar confusió.
- No s'han modificat fitxers de portafolis ni dades de notes reals durant el desenvolupament.

## Funcions noves del servidor

Cada mètode verifica el token Google mitjançant `auth_(token)` i comprova el correu docent `jlesan@instituticaria.cat`:

- `cloudTeacherList(token)`: llista d'alumnes del registre institucional.
- `cloudTeacherPortfolio(token,email)`: consulta de portafoli (sense escriure-hi).
- `cloudTeacherReadCorrections(token,email)`: correccions existents, només per al docent.
- `cloudTeacherSaveCorrection(token,payload)`: desa/actualitza el registre de correccions, sempre com a **no publicat**.
- `cloudTeacherPublishCorrection(token,email,id,workId,visible)`: publica o retira de manera explícita.

El front conserva els controls manuals d'importació/exportació com a alternativa si el backend no està desplegat o falla.

## Instal·lació (la fa el propietari del projecte Apps Script)

1. Substituir `Código.gs` pel nou fitxer complet proporcionat al paquet. Conservar una còpia de seguretat de la versió anterior.
2. Substituir `Bridge.html` pel fitxer del paquet.
3. Desar. A **Implementar → Gestionar implementacions**, editar la implementació web existent i triar **Nova versió**, sense canviar-ne la URL.
4. A ROBOTIA V3, actualitzar el navegador amb `Ctrl+F5`. Accedir com a professor.
5. Obrir **Professorat → Corrector de reptes → Comprovar connexió docent**.
6. Provar exclusivament amb l'alumne de prova abans de publicar notes reals.

### Publicació i privadesa

El full privat és `ROBOTIA · Tauler docent privat · Correccions i observacions 2026-27`. Els camps `Publicar?` es mantenen a **No** quan es desa. El docent ha de prémer «Publicar nota» després de validar-la.

L'antic `cloudInfo` continua filtrant les dades per usuari verificat i només retorna columnes publicables. Les anotacions privades i la proposta d'IA no es retornen a l'alumne.

## Proves de desenvolupament
- Parse JavaScript: servidor, pont i interfície.
- Proves simulades del servidor: bloqueig d'accés d'alumne, consulta de portafolis, desament, actualització sense duplicats, publicació, retirada, validació de notes.
- **Pendent**: prova final en el servidor real després del desplegament per part del propietari.

## Compatibilitat
No s'han substituït ni alterat `cloudSave`, `cloudInvite`, `cloudAccept`, els noms de carpetes i portafolis, les propietats ni els identificadors de reptes. El codi antic s'ha conservat sencer.
