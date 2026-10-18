# ROBOTIA V3 · Ampliació d'Aprendre (19/10/2026)

## Objectiu
Ampliar el material de suport per a 3r ESO en tres àrees: diagrames de flux, blocs MakeCode i Micro:Shield / kit bàsic de sensors i actuadors.

## Què ha canviat
- `lliçons-v3.js`: actualitzat el text sobre comptadors/bucles i arreglat l'enllaç de variables a `https://makecode.microbit.org/blocks/variables`.
- **Nou** `aprendre-ampliat-v3.js`: material nou a les pestanyes Aprendre sense substituir els continguts previs.
  - Diagrames visuals: comptador amb variables, suma acumulada en bucle i control d'humitat amb entrada/variable/decisió.
  - Diferenciació entre entrada/sortida, procés/càlcul, decisió, repetició i variable.
  - Explicació de 15 famílies de blocs MakeCode.
  - Sis exemples de codi JavaScript de MakeCode que es poden copiar: comptador A/B, repeteix quatre cops, bucle amb índex, mentre, temperatura, ràdio.
  - Tutorials de Micro:Shield I PIR+NeoPixel, II humitat+NeoPixel, III barrera d'ultrasons+servo, amb connexions, extensions, passos, pseudocodi, comprovacions i ampliacions.
- **Nou** `diccionari-makecode-v3.js`: 91 descripcions de blocs essencials agrupades per família, amb cercador, exemple i enllaços oficials. No pretén catalogar totes les extensions de tercers disponibles a MakeCode.
- **Nou** `blocs-visuals-v3.js`: botó «Veure blocs» als sis exemples de JavaScript; representa els blocs mitjançant el renderitzador oficial de MakeCode i manté sempre disponible el codi de text com a alternativa.
- `index.html`: actualitzats els scripts amb paràmetres de revisió per evitar versions antigues de la memòria cau.

## Materials de referència
- PDF proporcionat per l'Institut: **Reptes Conjunt de sensors i actuadors Secundària Bàsic – micro_shield – accessible.pdf**, 19 pàgines.
  - pàgines 1–4: PIR pin P1 + NeoPixel pin P8, extensió tinker-kit i NeoPixel.
  - pàgines 5–10: Humitat pin P2 + NeoPixel P8; variable Humitat, arrodoniment, llindars 30 i 60 i pausa 1000 ms.
  - pàgines 11–19: ultrasons TRIG/ECHO P7/P8 (exemple), servomotor S2; extensió microshield/Sonar, distància 10 cm, posicions 0/90 graus.
- PDF **R14 - micro:bit – accessible.pdf**, especialment categories de blocs i variables (pàgines finals).
- Documentació oficial: https://makecode.microbit.org/blocks/variables , https://makecode.microbit.org/blocks/loops , https://makecode.microbit.org/blocks-embed .
- Portal XTEC Micro:Shield: https://projectes.xtec.cat/digital/equipaments-i-infraestructures/robotica/formacio-tecnica-robotica/components-i-accessoris/microshield/

## Precaucions materials
- Els pins P1, P2, P7, P8 i S2 corresponen als **exemples de la guia**; comprovar els connectors disponibles al muntatge real.
- Respectar GND, alimentació correcta i senyal. No aplicar una sortida ECHO de 5 V a una entrada de micro:bit de 3,3 V sense adaptació de nivell.
- Cal calibrar els llindars d'humitat en funció del sensor.
- Els codis d'exemple de MakeCode són didàctics. Els de dispositius externs tenen pseudocodi perquè les funcions exactes depenen de les extensions del kit.
- Els continguts s'han enriquit sense afectar reptes, desaments, notes ni portafolis.

## Estat de les proves
- Parse JavaScript correcte de les noves llibreries i index.
- Prova simulada de DOM correcta dels tres mòduls (ampliació, diccionari i botons visuals).
- Confirmat l'ordre de càrrega de scripts: lliçons → ràdio → materials → ampliació → diccionari → blocs visuals.
- **Pendent:** prova visual a Chrome amb xarxa per confirmar que el servei extern MakeCode retorna l'SVG dels blocs.

## Ús
Obrir https://lesan2.github.io/Robotia/proves/ i forçar actualització (Ctrl+F5). Anar a **Aprendre**, i triar les pestanyes de Diagrames, micro:bit o Sensors. La part nova s'afegeix després del contingut inicial i dels exemples actuals.
