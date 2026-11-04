# ROBOTIA V3 · Sensors i actuadors · Kit del centre (04/11/2026)

## Objectiu
Activitats que es puguin desenvolupar amb les peces reals del **Conjunt de sensors i actuadors de Secundària – Bàsic**, la placa Microshield i la micro:bit. Material de referència: `Guia_visual_microbit_microshield_revisada.docx` (04/11/2026).

## Què s'ha fet
- Fitxer nou `sensors-microshield-v4.js`: actualitza sense reciclar IDs els reptes `s0`–`s19` i afegeix `s20`–`s55`.
- **56 reptes Sensors**, dels quals **24 són de +1 o +2 punts**, i els altres **32 són de +4 a +8 punts**.
- Totes les activitats avançades de +4 o més desbloquegen una **cota mínima de 8**; els senzills +1/+2 desbloquegen cota 5/6.
- Reptes lliures `s53` (sensor, +2/cota 6), `s54` (actuador, +2/cota 6) i `s55` (projecte integrat, +8/cota 10).
- Cada repte té instruccions pas a pas, materials, connexions recomanades, criteri de comprovació, avís de seguretat, punts màxims i cota.
- `index.html` carrega el catàleg específic, preserva l'estructura d'entregues, Drive, portafolis i correcció, i mostra les fitxes de cada repte.
- `materials-v3.js`: correcció **exclusivament** de les fitxes de Sensors amb les peces reals, incloent 4 fils independents per a l'OLED.
- `aprendre-ampliat-v3.js`: secció Sensors renovada per utilitzar la **mateixa font de dades** que els reptes i evitar informació contradictòria.
- Sense canvis al JavaScript del núvol, Apps Script, rúbriques d'altres categories o fulls de notes.

## Punts i cotes
**Punts potencials** de Sensors: `mínim(suma de punts dels reptes entregats amb evidència, cota màxima més alta entre els reptes entregats)`, com en Flux i micro:bit. Aquesta és una nota **potencial** que no equival a un aprovat automàtic. El **corrector docent puntua cada repte amb rúbrica de 0 a 10** (amb decimals). Els «punts del repte» i la «cota» són exclusivament el sistema de potencial de l'aplicació; **no** són l'escala de la nota individual. La **nota docent general de Sensors** es registra per separat a `Alumnes!L` i només es publica quan el professor ho decideix.

Connexió amb la qualificació:
1. `Alumnes!L` = nota docent de Sensors (0–10), introduïda després de corregir els reptes.
2. `Alumnes!M` = mitjana de les categories de pràctiques que tinguin nota (Flux, micro:bit i Sensors).
3. La qualificació final continua: **50% pràctiques, 20% actitud, 30% projecte final de robot**. Si falten àrees, no es posen zeros automàticament.
4. A `Correccions`, cada repte de sensors es registra amb categoria `sensors` i la mateixa estructura que `flux` i `microbit`. Les notes només són visibles quan el professor activa la publicació.
5. Per a dos programes de ràdio, el formulari ja disposa dels camps emissor i receptor; també apareixen directament per als reptes `s4,s15,s16,s17,s18,s19`.

## Disponibilitat del kit
**Directes o amb verificacions ordinàries**:
- col·lisió KS0021 P1 digital (0 premut)
- PIR KS0052 P2 digital (1 moviment, amb temps d'estabilització)
- TEMT6000 P0 analògic (interruptor P0/BUZZER a P0)
- sonda humitat P0 analògic (comprovar que el mòdul treballa a 3,3 V i calibrar)
- OLED KS0271: GND / VCC 3,3 V / SCL P19 / SDA P20 (selector de pins blaus 3V3)
- 4 LED RGB NeoPixel de la Microshield, interns a P16
- brunzidor intern a P0 en posició BUZZER
- ràdio entre dues micro:bit

**Només si el material està preparat**:
- servo KS0194 a S8, tensió nominal 4,8–6 V i alimentació adequada
- motors grocs M3/M4 amb adaptador JST a fils, tornavís i alimentació; ocupen P4–P7
- HC-SR04 a 5 V, TRIG P14 i ECHO P15 **amb adaptador de nivell 5→3,3 V**; cap OLED 3,3 V al mateix banc de pins blaus quan estigui a 5 V
- tres seguidors KS0050 de 5 V **amb tres adaptadors de senyal**
- tira externa 30 NeoPixel, amb cable corrector i font adequada 5 V
- LM35 només després de verificar alimentació i senyal de sortida

## Compatibilitat amb dades existents
- **Mai s'esborren ni es reutilitzen els IDs** `s0`–`s19`; es mantenen les claus dels projectes i portafolis.
- Les activitats antigues es reformulen per fer-les amb el kit real, i els seus objectius poden variar (per exemple, LED extern → 4 NeoPixel integrats; relé/bomba → motor DC). Per corregir-los, s'ha de respectar **l'objectiu, la consigna i els punts originals**.
- Des de la reparació del 04/11/2026, RobotIA conserva una **còpia de les metadades originals dels IDs s0–s19** abans de sobreescriure el catàleg a la pàgina. L'exportació i el dossier trien les metadades d'època segons la data original, el projecte o una instantània de l'assignació; **el potencial es calcula amb els punts de l'entrega original**.
- Per a registres molt antics sense data ni metadades, el programa aplica per prudència la puntuació anterior i els marca com a **pendents de revisió**. Aquest criteri no pot demostrar per si sol el contingut real de l'exercici: el docent ha de llegir les evidències.
- Els enllaços conceptualment incompatibles queden desactivats en ambdós sentits (f17→s0, f20→s3, f23→s6, f24→s7); es conserven els diagrames com a reptes de Flux independents.
- El full docent no contenia notes de Sensors ni correccions de Sensors en la verificació del 04/11/2026.
- Les altres categories (31 Flux, 19 micro:bit i 3 Robot) es mantenen sense alteracions en el catàleg.

## Validacions fetes
- Sintaxi dels arxius `index.html`, `sensors-microshield-v4.js`, `aprendre-ampliat-v3.js`, `materials-v3.js` i mòduls de núvol/corrector.
- Unicitat dels identificadors dels 109 reptes totals.
- Catàleg de Sensors amb 56 activitats; totes tenen punts, cota i guia.
- Les 24 activitats bàsiques compleixen +1/+2; les de +4 o més tenen cota igual o superior a 8.
- Prova simulada de la secció Aprendre amb el catàleg nou.
- Verificat que la categoria Sensors utilitza `scoreForCategory('sensors')` i la publicació de notes docent existent.

### Proves pendents al navegador amb comptes de prova
1. Entrar amb un compte de prova, obrir `s20` i `s1`, llegir les guies i entregar un MakeCode compartit.
2. Desconnectar, tornar a entrar i verificar que el portafoli conserva els treballs i el registre al núvol.
3. Fer `s15` amb dos programes i comprovar que emissor/receptor es mostren al corrector.
4. Fer una correcció docent amb punts parcials de Sensors, publicar-la i comprovar-la des de «Les meves notes».
5. Comprovar la compatibilitat física de cada mòdul abans del primer muntatge a l'aula.

## Còpia de seguretat i reparació de compatibilitat · 04/11/2026
- Estat original intacte a `backup/robotia-2026-11-04-original-abans-reparacions`, commit `65ae74d7c65b0f70a41621c6d47fcc2005b8d5e8`.
- Les reparacions es preparen a `fix/robotia-2026-11-04-historic-i-enllacos` abans de passar a la branca pública.
- Les proves estàtiques del codi i els casos d'historial passen; la prova amb el servidor real, els comptes d'alumnes i el maquinari segueix pendent.
