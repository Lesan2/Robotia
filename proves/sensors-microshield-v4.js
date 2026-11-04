/* ROBOTIA V3 · Repte de Sensors i actuadors del kit real Microshield 04/11/2026.
   Només defineix contingut de categoria sensors, sense alterar cap altre repte.
   Els s0–s19 mantenen l’ID per preservar dades històriques. */
(function(){
"use strict";
const revisions={
  "s0": {
    "title": "Primer LED RGB de la Microshield",
    "level": 1,
    "difficulty": 1,
    "accent": "#0f766e",
    "points": 1,
    "maxNote": 5,
    "brief": "Encén els quatre NeoPixel integrats de P16 amb un color i després apaga’ls.",
    "tags": [
      "NeoPixel",
      "P16"
    ],
    "linkedFlow": null,
    "deliverables": [
      "Enllaç MakeCode compartit o programa .hex",
      "Fotografia de connexions (o esquema si és una activitat de disseny)",
      "Vídeo, prova o explicació de dues condicions",
      "Explicació de les dades, els pins i què fa l’actuador"
    ]
  },
  "s1": {
    "title": "Alarma PIR i NeoPixel integrats",
    "level": 4,
    "difficulty": 3,
    "accent": "#0f766e",
    "points": 4,
    "maxNote": 8,
    "brief": "Detecta moviment amb el PIR i activa els quatre LEDs RGB de la placa; diferencia moviment i repòs.",
    "tags": [
      "PIR",
      "NeoPixel",
      "P2",
      "P16"
    ],
    "linkedFlow": null,
    "deliverables": [
      "Enllaç MakeCode compartit o programa .hex",
      "Fotografia de connexions (o esquema si és una activitat de disseny)",
      "Vídeo, prova o explicació de dues condicions",
      "Explicació de les dades, els pins i què fa l’actuador"
    ]
  },
  "s2": {
    "title": "Alarma d’humitat amb NeoPixel",
    "level": 4,
    "difficulty": 3,
    "accent": "#0f766e",
    "points": 4,
    "maxNote": 8,
    "brief": "Llegeix la humitat de terra, calibra un llindar i utilitza els LED RGB P16 com a indicador.",
    "tags": [
      "Humitat",
      "Analògic",
      "NeoPixel"
    ],
    "linkedFlow": null,
    "deliverables": [
      "Enllaç MakeCode compartit o programa .hex",
      "Fotografia de connexions (o esquema si és una activitat de disseny)",
      "Vídeo, prova o explicació de dues condicions",
      "Explicació de les dades, els pins i què fa l’actuador"
    ]
  },
  "s3": {
    "title": "Barrera automàtica amb col·lisió i servo",
    "level": 4,
    "difficulty": 3,
    "accent": "#0f766e",
    "points": 4,
    "maxNote": 8,
    "brief": "Quan el sensor de col·lisió es prem, obre una barrera amb un servomotor; quan es deixa anar, la tanca.",
    "tags": [
      "Col·lisió",
      "Servo",
      "S8"
    ],
    "linkedFlow": null,
    "deliverables": [
      "Enllaç MakeCode compartit o programa .hex",
      "Fotografia de connexions (o esquema si és una activitat de disseny)",
      "Vídeo, prova o explicació de dues condicions",
      "Explicació de les dades, els pins i què fa l’actuador"
    ]
  },
  "s4": {
    "title": "Servo per inclinació i ràdio",
    "level": 5,
    "difficulty": 4,
    "accent": "#0d9488",
    "points": 5,
    "maxNote": 9,
    "brief": "Dues micro:bit: el comandament envia la inclinació i el receptor controla el servo S8.",
    "tags": [
      "Ràdio",
      "2 programes",
      "Servo"
    ],
    "linkedFlow": null,
    "deliverables": [
      "Enllaços MakeCode dels dos programes: emissor i receptor",
      "Fotografia de connexions (o esquema si és una activitat de disseny)",
      "Vídeo, prova o explicació de dues condicions",
      "Explicació de les dades, els pins i què fa l’actuador"
    ]
  },
  "s5": {
    "title": "Semàfor acústic amb RGB integrat",
    "level": 4,
    "difficulty": 3,
    "accent": "#0f766e",
    "points": 4,
    "maxNote": 8,
    "brief": "El micròfon de micro:bit V2 activa una alarma de colors a P16 quan se supera un llindar.",
    "tags": [
      "Micròfon",
      "NeoPixel",
      "So"
    ],
    "linkedFlow": null,
    "deliverables": [
      "Enllaç MakeCode compartit o programa .hex",
      "Fotografia de connexions (o esquema si és una activitat de disseny)",
      "Vídeo, prova o explicació de dues condicions",
      "Explicació de les dades, els pins i què fa l’actuador"
    ]
  },
  "s6": {
    "title": "Motor DC amb sensor de col·lisió",
    "level": 5,
    "difficulty": 4,
    "accent": "#0d9488",
    "points": 5,
    "maxNote": 9,
    "brief": "Fes girar un motor groc M3 quan es prem el sensor de col·lisió, i atura’l en deixar-lo anar.",
    "tags": [
      "Motor DC",
      "Col·lisió",
      "M3"
    ],
    "linkedFlow": null,
    "deliverables": [
      "Enllaç MakeCode compartit o programa .hex",
      "Fotografia de connexions (o esquema si és una activitat de disseny)",
      "Vídeo, prova o explicació de dues condicions",
      "Explicació de les dades, els pins i què fa l’actuador"
    ]
  },
  "s7": {
    "title": "Estació de llum amb pantalla OLED",
    "level": 5,
    "difficulty": 4,
    "accent": "#0d9488",
    "points": 5,
    "maxNote": 9,
    "brief": "Mesura la llum amb un sensor analògic, calcula un estat i el presenta a la pantalla OLED.",
    "tags": [
      "Llum",
      "OLED",
      "I²C"
    ],
    "linkedFlow": null,
    "deliverables": [
      "Enllaç MakeCode compartit o programa .hex",
      "Fotografia de connexions (o esquema si és una activitat de disseny)",
      "Vídeo, prova o explicació de dues condicions",
      "Explicació de les dades, els pins i què fa l’actuador"
    ]
  },
  "s8": {
    "title": "NeoPixel intermitent a P16",
    "level": 1,
    "difficulty": 1,
    "accent": "#0f766e",
    "points": 1,
    "maxNote": 5,
    "brief": "Fes parpellejar els quatre LEDs RGB integrats amb un bucle i una pausa.",
    "tags": [
      "NeoPixel",
      "Bucle",
      "P16"
    ],
    "linkedFlow": null,
    "deliverables": [
      "Enllaç MakeCode compartit o programa .hex",
      "Fotografia de connexions (o esquema si és una activitat de disseny)",
      "Vídeo, prova o explicació de dues condicions",
      "Explicació de les dades, els pins i què fa l’actuador"
    ]
  },
  "s9": {
    "title": "NeoPixel amb botons A i B",
    "level": 1,
    "difficulty": 1,
    "accent": "#0f766e",
    "points": 1,
    "maxNote": 5,
    "brief": "Canvia els quatre LED RGB integrats de color amb els botons de la micro:bit.",
    "tags": [
      "NeoPixel",
      "Botons"
    ],
    "linkedFlow": null,
    "deliverables": [
      "Enllaç MakeCode compartit o programa .hex",
      "Fotografia de connexions (o esquema si és una activitat de disseny)",
      "Vídeo, prova o explicació de dues condicions",
      "Explicació de les dades, els pins i què fa l’actuador"
    ]
  },
  "s10": {
    "title": "Aplaudiment amb NeoPixel",
    "level": 4,
    "difficulty": 3,
    "accent": "#0f766e",
    "points": 4,
    "maxNote": 8,
    "brief": "Utilitza el micròfon de la micro:bit V2 per activar els LED RGB amb un aplaudiment.",
    "tags": [
      "Micròfon",
      "NeoPixel"
    ],
    "linkedFlow": null,
    "deliverables": [
      "Enllaç MakeCode compartit o programa .hex",
      "Fotografia de connexions (o esquema si és una activitat de disseny)",
      "Vídeo, prova o explicació de dues condicions",
      "Explicació de les dades, els pins i què fa l’actuador"
    ]
  },
  "s11": {
    "title": "Brunzidor integrat d’alarma",
    "level": 2,
    "difficulty": 2,
    "accent": "#0f766e",
    "points": 2,
    "maxNote": 6,
    "brief": "Activa el brunzidor de la Microshield amb un botó, i silencia’l amb un altre.",
    "tags": [
      "Brunzidor",
      "P0"
    ],
    "linkedFlow": null,
    "deliverables": [
      "Enllaç MakeCode compartit o programa .hex",
      "Fotografia de connexions (o esquema si és una activitat de disseny)",
      "Vídeo, prova o explicació de dues condicions",
      "Explicació de les dades, els pins i què fa l’actuador"
    ]
  },
  "s12": {
    "title": "Servo amb botons A i B",
    "level": 2,
    "difficulty": 2,
    "accent": "#0f766e",
    "points": 2,
    "maxNote": 6,
    "brief": "Controla les dues posicions d’un servo S8 des dels botons de la micro:bit.",
    "tags": [
      "Servo",
      "Botons",
      "S8"
    ],
    "linkedFlow": null,
    "deliverables": [
      "Enllaç MakeCode compartit o programa .hex",
      "Fotografia de connexions (o esquema si és una activitat de disseny)",
      "Vídeo, prova o explicació de dues condicions",
      "Explicació de les dades, els pins i què fa l’actuador"
    ]
  },
  "s13": {
    "title": "Alarma d’ultrasons amb HC-SR04",
    "level": 4,
    "difficulty": 3,
    "accent": "#0f766e",
    "points": 4,
    "maxNote": 8,
    "brief": "Mesura la distància amb HC-SR04 i activa una alerta si un objecte és massa a prop.",
    "tags": [
      "Ultrasons",
      "5 V",
      "Adaptador"
    ],
    "linkedFlow": null,
    "deliverables": [
      "Enllaç MakeCode compartit o programa .hex",
      "Fotografia de connexions (o esquema si és una activitat de disseny)",
      "Vídeo, prova o explicació de dues condicions",
      "Explicació de les dades, els pins i què fa l’actuador"
    ]
  },
  "s14": {
    "title": "Prova de motor DC M3",
    "level": 2,
    "difficulty": 2,
    "accent": "#0f766e",
    "points": 2,
    "maxNote": 6,
    "brief": "Fes girar i aturar un motor groc amb la Microshield i comprova el sentit.",
    "tags": [
      "Motor DC",
      "M3"
    ],
    "linkedFlow": null,
    "deliverables": [
      "Enllaç MakeCode compartit o programa .hex",
      "Fotografia de connexions (o esquema si és una activitat de disseny)",
      "Vídeo, prova o explicació de dues condicions",
      "Explicació de les dades, els pins i què fa l’actuador"
    ]
  },
  "s15": {
    "title": "Comandament ràdio dels NeoPixel",
    "level": 4,
    "difficulty": 3,
    "accent": "#0f766e",
    "points": 4,
    "maxNote": 8,
    "brief": "Una micro:bit envia ordres A/B per ràdio i una altra encén els NeoPixel P16 de la shield.",
    "tags": [
      "Ràdio",
      "2 programes",
      "NeoPixel"
    ],
    "linkedFlow": null,
    "deliverables": [
      "Enllaços MakeCode dels dos programes: emissor i receptor",
      "Fotografia de connexions (o esquema si és una activitat de disseny)",
      "Vídeo, prova o explicació de dues condicions",
      "Explicació de les dades, els pins i què fa l’actuador"
    ]
  },
  "s16": {
    "title": "Servo controlat a distància",
    "level": 5,
    "difficulty": 4,
    "accent": "#0d9488",
    "points": 5,
    "maxNote": 9,
    "brief": "Comandament ràdio A/B que mou el servo S8 en el receptor.",
    "tags": [
      "Ràdio",
      "2 programes",
      "Servo"
    ],
    "linkedFlow": null,
    "deliverables": [
      "Enllaços MakeCode dels dos programes: emissor i receptor",
      "Fotografia de connexions (o esquema si és una activitat de disseny)",
      "Vídeo, prova o explicació de dues condicions",
      "Explicació de les dades, els pins i què fa l’actuador"
    ]
  },
  "s17": {
    "title": "Alarma PIR sense fils",
    "level": 5,
    "difficulty": 4,
    "accent": "#0d9488",
    "points": 5,
    "maxNote": 9,
    "brief": "Una micro:bit amb PIR P2 comunica moviment a una altra micro:bit, que activa una alerta.",
    "tags": [
      "PIR",
      "Ràdio",
      "2 programes"
    ],
    "linkedFlow": null,
    "deliverables": [
      "Enllaços MakeCode dels dos programes: emissor i receptor",
      "Fotografia de connexions (o esquema si és una activitat de disseny)",
      "Vídeo, prova o explicació de dues condicions",
      "Explicació de les dades, els pins i què fa l’actuador"
    ]
  },
  "s18": {
    "title": "Cotxe per gestos i ràdio",
    "level": 6,
    "difficulty": 5,
    "accent": "#0d9488",
    "points": 6,
    "maxNote": 10,
    "brief": "Robot amb dos motors M3/M4 que rep ordres d’inclinació d’una altra micro:bit.",
    "tags": [
      "Ràdio",
      "2 programes",
      "Motors"
    ],
    "linkedFlow": null,
    "deliverables": [
      "Enllaços MakeCode dels dos programes: emissor i receptor",
      "Fotografia de connexions (o esquema si és una activitat de disseny)",
      "Vídeo, prova o explicació de dues condicions",
      "Explicació de les dades, els pins i què fa l’actuador"
    ]
  },
  "s19": {
    "title": "Barrera ultrasons i servo per ràdio",
    "level": 6,
    "difficulty": 5,
    "accent": "#0d9488",
    "points": 7,
    "maxNote": 10,
    "brief": "Combina ultrasons HC-SR04, servo S8 i un comandament de dues micro:bit.",
    "tags": [
      "Ultrasons",
      "Servo",
      "Ràdio",
      "2 programes"
    ],
    "linkedFlow": null,
    "deliverables": [
      "Enllaços MakeCode dels dos programes: emissor i receptor",
      "Fotografia de connexions (o esquema si és una activitat de disseny)",
      "Vídeo, prova o explicació de dues condicions",
      "Explicació de les dades, els pins i què fa l’actuador"
    ]
  }
};
const additions=[
  {
    "id": "s20",
    "category": "sensors",
    "kind": "practical",
    "title": "Col·lisió: lectura digital P1",
    "level": 1,
    "difficulty": 1,
    "accent": "#0f766e",
    "points": 1,
    "maxNote": 5,
    "brief": "Mostra 0 quan prems el sensor de col·lisió KS0021 i 1 quan està lliure.",
    "tags": [
      "Digital",
      "Col·lisió"
    ],
    "linkedFlow": null,
    "deliverables": [
      "Enllaç MakeCode compartit o programa .hex",
      "Fotografia de connexions (o esquema si és una activitat de disseny)",
      "Vídeo, prova o explicació de dues condicions",
      "Explicació de les dades, els pins i què fa l’actuador"
    ]
  },
  {
    "id": "s21",
    "category": "sensors",
    "kind": "practical",
    "title": "Col·lisió: comptar pulsacions",
    "level": 2,
    "difficulty": 2,
    "accent": "#0f766e",
    "points": 2,
    "maxNote": 6,
    "brief": "Fes un comptador d’activacions reals del sensor, sense comptar moltes vegades una mateixa pulsació.",
    "tags": [
      "Comptador",
      "Digital"
    ],
    "linkedFlow": null,
    "deliverables": [
      "Enllaç MakeCode compartit o programa .hex",
      "Fotografia de connexions (o esquema si és una activitat de disseny)",
      "Vídeo, prova o explicació de dues condicions",
      "Explicació de les dades, els pins i què fa l’actuador"
    ]
  },
  {
    "id": "s22",
    "category": "sensors",
    "kind": "practical",
    "title": "Sensor de col·lisió amb OLED",
    "level": 4,
    "difficulty": 3,
    "accent": "#0f766e",
    "points": 4,
    "maxNote": 8,
    "brief": "Mostra PREMUT / LLIURE en una OLED segons el sensor de col·lisió.",
    "tags": [
      "Col·lisió",
      "OLED"
    ],
    "linkedFlow": null,
    "deliverables": [
      "Enllaç MakeCode compartit o programa .hex",
      "Fotografia de connexions (o esquema si és una activitat de disseny)",
      "Vídeo, prova o explicació de dues condicions",
      "Explicació de les dades, els pins i què fa l’actuador"
    ]
  },
  {
    "id": "s23",
    "category": "sensors",
    "kind": "practical",
    "title": "PIR: detectar moviment P2",
    "level": 1,
    "difficulty": 1,
    "accent": "#0f766e",
    "points": 1,
    "maxNote": 5,
    "brief": "Llegeix el PIR de 3,3 V i representa el seu estat a la pantalla de micro:bit.",
    "tags": [
      "PIR",
      "Digital"
    ],
    "linkedFlow": null,
    "deliverables": [
      "Enllaç MakeCode compartit o programa .hex",
      "Fotografia de connexions (o esquema si és una activitat de disseny)",
      "Vídeo, prova o explicació de dues condicions",
      "Explicació de les dades, els pins i què fa l’actuador"
    ]
  },
  {
    "id": "s24",
    "category": "sensors",
    "kind": "practical",
    "title": "PIR: pausa i estabilització",
    "level": 2,
    "difficulty": 2,
    "accent": "#0f766e",
    "points": 2,
    "maxNote": 6,
    "brief": "Construeix un detector que només avisi quan canvia l’estat del PIR.",
    "tags": [
      "PIR",
      "Variables"
    ],
    "linkedFlow": null,
    "deliverables": [
      "Enllaç MakeCode compartit o programa .hex",
      "Fotografia de connexions (o esquema si és una activitat de disseny)",
      "Vídeo, prova o explicació de dues condicions",
      "Explicació de les dades, els pins i què fa l’actuador"
    ]
  },
  {
    "id": "s25",
    "category": "sensors",
    "kind": "practical",
    "title": "Llum: lectura analògica P0",
    "level": 1,
    "difficulty": 1,
    "accent": "#0f766e",
    "points": 1,
    "maxNote": 5,
    "brief": "Mostra la lectura del TEMT6000 (0–1023) segons la llum ambiental.",
    "tags": [
      "Llum",
      "Analògic"
    ],
    "linkedFlow": null,
    "deliverables": [
      "Enllaç MakeCode compartit o programa .hex",
      "Fotografia de connexions (o esquema si és una activitat de disseny)",
      "Vídeo, prova o explicació de dues condicions",
      "Explicació de les dades, els pins i què fa l’actuador"
    ]
  },
  {
    "id": "s26",
    "category": "sensors",
    "kind": "practical",
    "title": "Llum: clar o fosc",
    "level": 2,
    "difficulty": 2,
    "accent": "#0f766e",
    "points": 2,
    "maxNote": 6,
    "brief": "Defineix un llindar i mostra CLAR o FOSC amb les lectures del TEMT6000.",
    "tags": [
      "Llum",
      "Condició"
    ],
    "linkedFlow": null,
    "deliverables": [
      "Enllaç MakeCode compartit o programa .hex",
      "Fotografia de connexions (o esquema si és una activitat de disseny)",
      "Vídeo, prova o explicació de dues condicions",
      "Explicació de les dades, els pins i què fa l’actuador"
    ]
  },
  {
    "id": "s27",
    "category": "sensors",
    "kind": "practical",
    "title": "Humitat: lectura analògica",
    "level": 1,
    "difficulty": 1,
    "accent": "#0f766e",
    "points": 1,
    "maxNote": 5,
    "brief": "Mostra els valors de la sonda d’humitat del terra en sec i humit.",
    "tags": [
      "Humitat",
      "Analògic"
    ],
    "linkedFlow": null,
    "deliverables": [
      "Enllaç MakeCode compartit o programa .hex",
      "Fotografia de connexions (o esquema si és una activitat de disseny)",
      "Vídeo, prova o explicació de dues condicions",
      "Explicació de les dades, els pins i què fa l’actuador"
    ]
  },
  {
    "id": "s28",
    "category": "sensors",
    "kind": "practical",
    "title": "Humitat: calibració i llindar",
    "level": 2,
    "difficulty": 2,
    "accent": "#0f766e",
    "points": 2,
    "maxNote": 6,
    "brief": "Defineix un llindar personalitzat de substrat sec/humit amb una variable.",
    "tags": [
      "Humitat",
      "Variable"
    ],
    "linkedFlow": null,
    "deliverables": [
      "Enllaç MakeCode compartit o programa .hex",
      "Fotografia de connexions (o esquema si és una activitat de disseny)",
      "Vídeo, prova o explicació de dues condicions",
      "Explicació de les dades, els pins i què fa l’actuador"
    ]
  },
  {
    "id": "s29",
    "category": "sensors",
    "kind": "practical",
    "title": "OLED: primer missatge",
    "level": 1,
    "difficulty": 1,
    "accent": "#0f766e",
    "points": 1,
    "maxNote": 5,
    "brief": "Fes que l’OLED mostri un missatge fix després d’inicialitzar-la.",
    "tags": [
      "OLED",
      "I²C"
    ],
    "linkedFlow": null,
    "deliverables": [
      "Enllaç MakeCode compartit o programa .hex",
      "Fotografia de connexions (o esquema si és una activitat de disseny)",
      "Vídeo, prova o explicació de dues condicions",
      "Explicació de les dades, els pins i què fa l’actuador"
    ]
  },
  {
    "id": "s30",
    "category": "sensors",
    "kind": "practical",
    "title": "OLED: dues pantalles amb botons",
    "level": 2,
    "difficulty": 2,
    "accent": "#0f766e",
    "points": 2,
    "maxNote": 6,
    "brief": "Alterna dos textos diferents a l’OLED amb els botons A i B.",
    "tags": [
      "OLED",
      "Botons"
    ],
    "linkedFlow": null,
    "deliverables": [
      "Enllaç MakeCode compartit o programa .hex",
      "Fotografia de connexions (o esquema si és una activitat de disseny)",
      "Vídeo, prova o explicació de dues condicions",
      "Explicació de les dades, els pins i què fa l’actuador"
    ]
  },
  {
    "id": "s31",
    "category": "sensors",
    "kind": "practical",
    "title": "RGB integrat: tres colors",
    "level": 1,
    "difficulty": 1,
    "accent": "#0f766e",
    "points": 1,
    "maxNote": 5,
    "brief": "Fes mostrar tres colors a la tira de quatre NeoPixel de la placa.",
    "tags": [
      "NeoPixel",
      "Colors"
    ],
    "linkedFlow": null,
    "deliverables": [
      "Enllaç MakeCode compartit o programa .hex",
      "Fotografia de connexions (o esquema si és una activitat de disseny)",
      "Vídeo, prova o explicació de dues condicions",
      "Explicació de les dades, els pins i què fa l’actuador"
    ]
  },
  {
    "id": "s32",
    "category": "sensors",
    "kind": "practical",
    "title": "RGB integrat: animació",
    "level": 2,
    "difficulty": 2,
    "accent": "#0f766e",
    "points": 2,
    "maxNote": 6,
    "brief": "Crea un joc de llums que encengui els quatre NeoPixel un a un.",
    "tags": [
      "NeoPixel",
      "Bucle"
    ],
    "linkedFlow": null,
    "deliverables": [
      "Enllaç MakeCode compartit o programa .hex",
      "Fotografia de connexions (o esquema si és una activitat de disseny)",
      "Vídeo, prova o explicació de dues condicions",
      "Explicació de les dades, els pins i què fa l’actuador"
    ]
  },
  {
    "id": "s33",
    "category": "sensors",
    "kind": "practical",
    "title": "Llum + OLED: indicador de foscor",
    "level": 4,
    "difficulty": 3,
    "accent": "#0f766e",
    "points": 4,
    "maxNote": 8,
    "brief": "Mesura la llum i mostra el valor i CLAR/FOSC en una pantalla OLED.",
    "tags": [
      "Llum",
      "OLED",
      "Variable"
    ],
    "linkedFlow": null,
    "deliverables": [
      "Enllaç MakeCode compartit o programa .hex",
      "Fotografia de connexions (o esquema si és una activitat de disseny)",
      "Vídeo, prova o explicació de dues condicions",
      "Explicació de les dades, els pins i què fa l’actuador"
    ]
  },
  {
    "id": "s34",
    "category": "sensors",
    "kind": "practical",
    "title": "Humitat + OLED: regar o esperar",
    "level": 4,
    "difficulty": 3,
    "accent": "#0f766e",
    "points": 4,
    "maxNote": 8,
    "brief": "Mostra a l’OLED el valor de la sonda i l’avís REGAR/NO REGAR.",
    "tags": [
      "Humitat",
      "OLED"
    ],
    "linkedFlow": null,
    "deliverables": [
      "Enllaç MakeCode compartit o programa .hex",
      "Fotografia de connexions (o esquema si és una activitat de disseny)",
      "Vídeo, prova o explicació de dues condicions",
      "Explicació de les dades, els pins i què fa l’actuador"
    ]
  },
  {
    "id": "s35",
    "category": "sensors",
    "kind": "practical",
    "title": "Col·lisió + PIR + OLED",
    "level": 5,
    "difficulty": 4,
    "accent": "#0d9488",
    "points": 5,
    "maxNote": 9,
    "brief": "Llegeix dos sensors digitals i mostra a l’OLED el seu estat independent.",
    "tags": [
      "Dos sensors",
      "OLED"
    ],
    "linkedFlow": null,
    "deliverables": [
      "Enllaç MakeCode compartit o programa .hex",
      "Fotografia de connexions (o esquema si és una activitat de disseny)",
      "Vídeo, prova o explicació de dues condicions",
      "Explicació de les dades, els pins i què fa l’actuador"
    ]
  },
  {
    "id": "s36",
    "category": "sensors",
    "kind": "practical",
    "title": "PIR + col·lisió + RGB",
    "level": 5,
    "difficulty": 4,
    "accent": "#0d9488",
    "points": 5,
    "maxNote": 9,
    "brief": "Crea una alarma que només s’activi quan hi ha moviment i també s’ha premut el sensor.",
    "tags": [
      "Lògica I",
      "Dos sensors",
      "NeoPixel"
    ],
    "linkedFlow": null,
    "deliverables": [
      "Enllaç MakeCode compartit o programa .hex",
      "Fotografia de connexions (o esquema si és una activitat de disseny)",
      "Vídeo, prova o explicació de dues condicions",
      "Explicació de les dades, els pins i què fa l’actuador"
    ]
  },
  {
    "id": "s37",
    "category": "sensors",
    "kind": "practical",
    "title": "PIR + llum + RGB",
    "level": 5,
    "difficulty": 4,
    "accent": "#0d9488",
    "points": 5,
    "maxNote": 9,
    "brief": "Només activa els NeoPixel quan és fosc i es detecta moviment.",
    "tags": [
      "PIR",
      "Llum",
      "NeoPixel"
    ],
    "linkedFlow": null,
    "deliverables": [
      "Enllaç MakeCode compartit o programa .hex",
      "Fotografia de connexions (o esquema si és una activitat de disseny)",
      "Vídeo, prova o explicació de dues condicions",
      "Explicació de les dades, els pins i què fa l’actuador"
    ]
  },
  {
    "id": "s38",
    "category": "sensors",
    "kind": "practical",
    "title": "Humitat + servo de reg simulat",
    "level": 5,
    "difficulty": 4,
    "accent": "#0d9488",
    "points": 5,
    "maxNote": 9,
    "brief": "Obre una porteta amb S8 quan la terra està seca i tanca-la quan està humida.",
    "tags": [
      "Humitat",
      "Servo"
    ],
    "linkedFlow": null,
    "deliverables": [
      "Enllaç MakeCode compartit o programa .hex",
      "Fotografia de connexions (o esquema si és una activitat de disseny)",
      "Vídeo, prova o explicació de dues condicions",
      "Explicació de les dades, els pins i què fa l’actuador"
    ]
  },
  {
    "id": "s39",
    "category": "sensors",
    "kind": "practical",
    "title": "Barrera completa: col·lisió, servo i OLED",
    "level": 6,
    "difficulty": 5,
    "accent": "#0d9488",
    "points": 6,
    "maxNote": 10,
    "brief": "Integra col·lisió, servo i OLED per mostrar OBERT/TANCAT i moure una barrera.",
    "tags": [
      "Col·lisió",
      "Servo",
      "OLED"
    ],
    "linkedFlow": null,
    "deliverables": [
      "Enllaç MakeCode compartit o programa .hex",
      "Fotografia de connexions (o esquema si és una activitat de disseny)",
      "Vídeo, prova o explicació de dues condicions",
      "Explicació de les dades, els pins i què fa l’actuador"
    ]
  },
  {
    "id": "s40",
    "category": "sensors",
    "kind": "practical",
    "title": "Porta de motor amb col·lisió i OLED",
    "level": 6,
    "difficulty": 5,
    "accent": "#0d9488",
    "points": 6,
    "maxNote": 10,
    "brief": "Integra el motor M3 amb un sensor de col·lisió i una pantalla OLED d’estat.",
    "tags": [
      "Motor",
      "Col·lisió",
      "OLED"
    ],
    "linkedFlow": null,
    "deliverables": [
      "Enllaç MakeCode compartit o programa .hex",
      "Fotografia de connexions (o esquema si és una activitat de disseny)",
      "Vídeo, prova o explicació de dues condicions",
      "Explicació de les dades, els pins i què fa l’actuador"
    ]
  },
  {
    "id": "s41",
    "category": "sensors",
    "kind": "practical",
    "title": "Alarma PIR amb OLED i RGB",
    "level": 6,
    "difficulty": 5,
    "accent": "#0d9488",
    "points": 6,
    "maxNote": 10,
    "brief": "Integra PIR P2, OLED I²C i els quatre NeoPixel interns en una alarma de moviment.",
    "tags": [
      "PIR",
      "OLED",
      "NeoPixel"
    ],
    "linkedFlow": null,
    "deliverables": [
      "Enllaç MakeCode compartit o programa .hex",
      "Fotografia de connexions (o esquema si és una activitat de disseny)",
      "Vídeo, prova o explicació de dues condicions",
      "Explicació de les dades, els pins i què fa l’actuador"
    ]
  },
  {
    "id": "s42",
    "category": "sensors",
    "kind": "practical",
    "title": "Control de terra amb OLED i RGB",
    "level": 6,
    "difficulty": 5,
    "accent": "#0d9488",
    "points": 6,
    "maxNote": 10,
    "brief": "Fes una estació d’humitat que mostri lectura i avisos amb OLED i NeoPixel.",
    "tags": [
      "Humitat",
      "OLED",
      "NeoPixel"
    ],
    "linkedFlow": null,
    "deliverables": [
      "Enllaç MakeCode compartit o programa .hex",
      "Fotografia de connexions (o esquema si és una activitat de disseny)",
      "Vídeo, prova o explicació de dues condicions",
      "Explicació de les dades, els pins i què fa l’actuador"
    ]
  },
  {
    "id": "s43",
    "category": "sensors",
    "kind": "practical",
    "title": "Dos sensors analògics + OLED",
    "level": 6,
    "difficulty": 5,
    "accent": "#0d9488",
    "points": 7,
    "maxNote": 10,
    "brief": "Llegeix llum i humitat en pins diferents i compara les dues lectures en una mateixa pantalla.",
    "tags": [
      "Dos analògics",
      "OLED"
    ],
    "linkedFlow": null,
    "deliverables": [
      "Enllaç MakeCode compartit o programa .hex",
      "Fotografia de connexions (o esquema si és una activitat de disseny)",
      "Vídeo, prova o explicació de dues condicions",
      "Explicació de les dades, els pins i què fa l’actuador"
    ]
  },
  {
    "id": "s44",
    "category": "sensors",
    "kind": "practical",
    "title": "Llum: mitjana i històric a OLED",
    "level": 5,
    "difficulty": 4,
    "accent": "#0d9488",
    "points": 5,
    "maxNote": 9,
    "brief": "Programa una mitjana de cinc lectures del TEMT6000 i mostra-la a la pantalla OLED.",
    "tags": [
      "Llum",
      "Càlcul",
      "OLED"
    ],
    "linkedFlow": null,
    "deliverables": [
      "Enllaç MakeCode compartit o programa .hex",
      "Fotografia de connexions (o esquema si és una activitat de disseny)",
      "Vídeo, prova o explicació de dues condicions",
      "Explicació de les dades, els pins i què fa l’actuador"
    ]
  },
  {
    "id": "s45",
    "category": "sensors",
    "kind": "practical",
    "title": "Alarma multi-sensor completa",
    "level": 6,
    "difficulty": 5,
    "accent": "#0d9488",
    "points": 6,
    "maxNote": 10,
    "brief": "Combina PIR P2 i col·lisió P1, tria diversos estats i indica-los a OLED i RGB.",
    "tags": [
      "Dos sensors",
      "OLED",
      "NeoPixel"
    ],
    "linkedFlow": null,
    "deliverables": [
      "Enllaç MakeCode compartit o programa .hex",
      "Fotografia de connexions (o esquema si és una activitat de disseny)",
      "Vídeo, prova o explicació de dues condicions",
      "Explicació de les dades, els pins i què fa l’actuador"
    ]
  },
  {
    "id": "s46",
    "category": "sensors",
    "kind": "practical",
    "title": "LM35: lectura de temperatura condicionada",
    "level": 2,
    "difficulty": 2,
    "accent": "#0f766e",
    "points": 2,
    "maxNote": 6,
    "brief": "Llegeix la temperatura del mòdul LM35 només després de verificar la seva alimentació i sortida.",
    "tags": [
      "LM35",
      "Condicionat"
    ],
    "linkedFlow": null,
    "deliverables": [
      "Enllaç MakeCode compartit o programa .hex",
      "Fotografia de connexions (o esquema si és una activitat de disseny)",
      "Vídeo, prova o explicació de dues condicions",
      "Explicació de les dades, els pins i què fa l’actuador"
    ]
  },
  {
    "id": "s47",
    "category": "sensors",
    "kind": "practical",
    "title": "Tres sensors seguidors de línia",
    "level": 5,
    "difficulty": 4,
    "accent": "#0d9488",
    "points": 5,
    "maxNote": 9,
    "brief": "Llegeix els tres sensors KS0050 i decideix si el camí va a esquerra, centre o dreta.",
    "tags": [
      "Línia",
      "5 V",
      "Adaptador"
    ],
    "linkedFlow": null,
    "deliverables": [
      "Enllaç MakeCode compartit o programa .hex",
      "Fotografia de connexions (o esquema si és una activitat de disseny)",
      "Vídeo, prova o explicació de dues condicions",
      "Explicació de les dades, els pins i què fa l’actuador"
    ]
  },
  {
    "id": "s48",
    "category": "sensors",
    "kind": "practical",
    "title": "Tira externa de 30 LED RGB",
    "level": 2,
    "difficulty": 2,
    "accent": "#0f766e",
    "points": 2,
    "maxNote": 6,
    "brief": "Prova un color i una animació en la tira de 30 LED del kit, amb el cable corrector.",
    "tags": [
      "Tira LED",
      "30 NeoPixel",
      "5 V"
    ],
    "linkedFlow": null,
    "deliverables": [
      "Enllaç MakeCode compartit o programa .hex",
      "Fotografia de connexions (o esquema si és una activitat de disseny)",
      "Vídeo, prova o explicació de dues condicions",
      "Explicació de les dades, els pins i què fa l’actuador"
    ]
  },
  {
    "id": "s49",
    "category": "sensors",
    "kind": "practical",
    "title": "Ultrasons: mesura de distància",
    "level": 2,
    "difficulty": 2,
    "accent": "#0f766e",
    "points": 2,
    "maxNote": 6,
    "brief": "Mostra la distància de l’HC-SR04 després d’adaptar la sortida ECHO a 3,3 V.",
    "tags": [
      "Ultrasons",
      "Condicionat"
    ],
    "linkedFlow": null,
    "deliverables": [
      "Enllaç MakeCode compartit o programa .hex",
      "Fotografia de connexions (o esquema si és una activitat de disseny)",
      "Vídeo, prova o explicació de dues condicions",
      "Explicació de les dades, els pins i què fa l’actuador"
    ]
  },
  {
    "id": "s50",
    "category": "sensors",
    "kind": "practical",
    "title": "Sensor de col·lisió: alarma amb brunzidor",
    "level": 4,
    "difficulty": 3,
    "accent": "#0f766e",
    "points": 4,
    "maxNote": 8,
    "brief": "Un contacte digital P1 desencadena una alarma al brunzidor integrat P0.",
    "tags": [
      "Col·lisió",
      "Brunzidor"
    ],
    "linkedFlow": null,
    "deliverables": [
      "Enllaç MakeCode compartit o programa .hex",
      "Fotografia de connexions (o esquema si és una activitat de disseny)",
      "Vídeo, prova o explicació de dues condicions",
      "Explicació de les dades, els pins i què fa l’actuador"
    ]
  },
  {
    "id": "s51",
    "category": "sensors",
    "kind": "practical",
    "title": "Sensor de llum: histèresi RGB",
    "level": 5,
    "difficulty": 4,
    "accent": "#0d9488",
    "points": 5,
    "maxNote": 9,
    "brief": "Evita que els NeoPixel parpellegin quan la llum oscil·la al voltant d’un llindar.",
    "tags": [
      "Llum",
      "RGB",
      "Variables"
    ],
    "linkedFlow": null,
    "deliverables": [
      "Enllaç MakeCode compartit o programa .hex",
      "Fotografia de connexions (o esquema si és una activitat de disseny)",
      "Vídeo, prova o explicació de dues condicions",
      "Explicació de les dades, els pins i què fa l’actuador"
    ]
  },
  {
    "id": "s52",
    "category": "sensors",
    "kind": "practical",
    "title": "Codi de ports i compatibilitats",
    "level": 1,
    "difficulty": 1,
    "accent": "#0f766e",
    "points": 1,
    "maxNote": 5,
    "brief": "Demostra amb un esquema real quins pins comparteixen els sensors i els servos.",
    "tags": [
      "Connexions",
      "Seguretat"
    ],
    "linkedFlow": null,
    "deliverables": [
      "Enllaç MakeCode compartit o programa .hex",
      "Fotografia de connexions (o esquema si és una activitat de disseny)",
      "Vídeo, prova o explicació de dues condicions",
      "Explicació de les dades, els pins i què fa l’actuador"
    ]
  },
  {
    "id": "s53",
    "category": "sensors",
    "kind": "practical",
    "title": "Repte lliure · Un sensor",
    "level": 2,
    "difficulty": 2,
    "accent": "#0f766e",
    "points": 2,
    "maxNote": 6,
    "brief": "Inventa una lectura original amb un sensor real del kit i explica quina dada ofereix.",
    "tags": [
      "Lliure",
      "Sensor"
    ],
    "linkedFlow": null,
    "deliverables": [
      "Enllaç MakeCode compartit o programa .hex",
      "Fotografia de connexions (o esquema si és una activitat de disseny)",
      "Vídeo, prova o explicació de dues condicions",
      "Explicació de les dades, els pins i què fa l’actuador"
    ]
  },
  {
    "id": "s54",
    "category": "sensors",
    "kind": "practical",
    "title": "Repte lliure · Un actuador",
    "level": 2,
    "difficulty": 2,
    "accent": "#0f766e",
    "points": 2,
    "maxNote": 6,
    "brief": "Crea un efecte propi amb un actuador del kit i controla’n com a mínim dos estats.",
    "tags": [
      "Lliure",
      "Actuador"
    ],
    "linkedFlow": null,
    "deliverables": [
      "Enllaç MakeCode compartit o programa .hex",
      "Fotografia de connexions (o esquema si és una activitat de disseny)",
      "Vídeo, prova o explicació de dues condicions",
      "Explicació de les dades, els pins i què fa l’actuador"
    ]
  },
  {
    "id": "s55",
    "category": "sensors",
    "kind": "practical",
    "title": "Repte lliure integrat · Domini",
    "level": 6,
    "difficulty": 5,
    "accent": "#0d9488",
    "points": 8,
    "maxNote": 10,
    "brief": "Crea un sistema original i complet que combini sensors, actuadors i programació avançada amb el kit.",
    "tags": [
      "Lliure",
      "Sensor + actuador",
      "Projecte"
    ],
    "linkedFlow": null,
    "deliverables": [
      "Enllaç MakeCode compartit o programa .hex",
      "Fotografia de connexions (o esquema si és una activitat de disseny)",
      "Vídeo, prova o explicació de dues condicions",
      "Explicació de les dades, els pins i què fa l’actuador"
    ]
  }
];
const guides={
  "s0": {
    "materials": "micro:bit + Microshield; 4 LED RGB integrats",
    "steps": [
      "Connexions proposades: P16 és intern; no connectis cap tira externa.",
      "Inicialitza una tira de 4 NeoPixel GRB al P16",
      "En prémer A mostra color verd i executa «mostrar»",
      "En prémer B neteja la tira i executa «mostrar»",
      "Comprova: Els 4 LEDs s’encenen i s’apaguen a les ordres."
    ],
    "safety": "No assignis P16 a un altre dispositiu.",
    "materialStatus": "directe",
    "assessment": "1 punt possibles, cota màxima 5/10. Valora proporcionalment connexions, lectura/acció, lògica i demostració.",
    "check": "Els 4 LEDs s’encenen i s’apaguen a les ordres.",
    "pins": "P16 és intern; no connectis cap tira externa.",
    "links": [
      {
        "label": "Extensió oficial micro:shield",
        "url": "https://makecode.microbit.org/pkg/MakeAndLearn/pxt-microshield"
      },
      {
        "label": "Manual Micro:Shield",
        "url": "https://projectes.xtec.cat/digital/wp-content/uploads/usu2317/2024/02/Manual-d_us-micro_shield.pdf"
      }
    ]
  },
  "s1": {
    "materials": "PIR KS0052; Microshield amb 4 NeoPixel",
    "steps": [
      "Connexions proposades: PIR G/V/S a P2 (3,3 V); 4 NeoPixel interns P16.",
      "Connecta el PIR a P2 amb la placa apagada",
      "Espera 5–10 s d’estabilització",
      "Crea la tira NeoPixel de 4 LED a P16",
      "Si P2 = 1 mostra vermell; si no, verd; executa «mostrar»",
      "Prova moviment i absència de moviment",
      "Comprova: Canvia d’estat sense confondre P2 amb un servo S2."
    ],
    "safety": "PIR 3,3 V; no utilitzis P16 per a una altra sortida.",
    "materialStatus": "directe",
    "assessment": "4 punts possibles, cota màxima 8/10. Valora proporcionalment connexions, lectura/acció, lògica i demostració.",
    "check": "Canvia d’estat sense confondre P2 amb un servo S2.",
    "pins": "PIR G/V/S a P2 (3,3 V); 4 NeoPixel interns P16.",
    "links": [
      {
        "label": "Extensió oficial micro:shield",
        "url": "https://makecode.microbit.org/pkg/MakeAndLearn/pxt-microshield"
      },
      {
        "label": "Manual Micro:Shield",
        "url": "https://projectes.xtec.cat/digital/wp-content/uploads/usu2317/2024/02/Manual-d_us-micro_shield.pdf"
      }
    ]
  },
  "s2": {
    "materials": "Sensor d’humitat de terra compatible 3,3 V; Microshield; NeoPixel interns",
    "steps": [
      "Connexions proposades: Humitat analògica P0 (selector P0/BUZZER a P0); LED RGB interns P16.",
      "Connecta la sonda G/V/S a P0 després de verificar que és de 3,3 V",
      "Llegeix P0 analògic i mostra’n el valor",
      "Compara una lectura en sec i una en humit",
      "Defineix un llindar segons les lectures reals",
      "Fes que els NeoPixel P16 canviïn de color",
      "Comprova: El LED canvia segons la humitat i els valors s’han calibrat."
    ],
    "safety": "No submergeixis l’electrònica. La resposta de la sonda depèn de la versió.",
    "materialStatus": "directe verificant versió",
    "assessment": "4 punts possibles, cota màxima 8/10. Valora proporcionalment connexions, lectura/acció, lògica i demostració.",
    "check": "El LED canvia segons la humitat i els valors s’han calibrat.",
    "pins": "Humitat analògica P0 (selector P0/BUZZER a P0); LED RGB interns P16.",
    "links": [
      {
        "label": "Extensió oficial micro:shield",
        "url": "https://makecode.microbit.org/pkg/MakeAndLearn/pxt-microshield"
      },
      {
        "label": "Manual Micro:Shield",
        "url": "https://projectes.xtec.cat/digital/wp-content/uploads/usu2317/2024/02/Manual-d_us-micro_shield.pdf"
      }
    ]
  },
  "s3": {
    "materials": "Col·lisió KS0021; servo KS0194; Microshield; bateria adequada",
    "steps": [
      "Connexions proposades: Col·lisió GVS P1, digital 0 = premut; servo S8 (= P8).",
      "Connecta el sensor a P1 (3,3 V) i el servo a S8",
      "Comprova alimentació adequada del servo i prova sense càrrega",
      "En iniciar posa el servo a 0°",
      "Si P1 = 0 mou el servo a 90°; si no, torna a 0°",
      "Demostra dues posicions",
      "Comprova: La barrera obre i tanca d’acord amb la lectura P1."
    ],
    "safety": "S1 comparteix P1: NO hi connectis el servo. Servo nominal 4,8–6 V.",
    "materialStatus": "amb alimentació de servo comprovada",
    "assessment": "4 punts possibles, cota màxima 8/10. Valora proporcionalment connexions, lectura/acció, lògica i demostració.",
    "check": "La barrera obre i tanca d’acord amb la lectura P1.",
    "pins": "Col·lisió GVS P1, digital 0 = premut; servo S8 (= P8).",
    "links": [
      {
        "label": "Extensió oficial micro:shield",
        "url": "https://makecode.microbit.org/pkg/MakeAndLearn/pxt-microshield"
      },
      {
        "label": "Manual Micro:Shield",
        "url": "https://projectes.xtec.cat/digital/wp-content/uploads/usu2317/2024/02/Manual-d_us-micro_shield.pdf"
      }
    ]
  },
  "s4": {
    "materials": "2 micro:bit; Microshield; servo KS0194; bateria adequada",
    "steps": [
      "Connexions proposades: Servo S8 (= P8) a la receptora; comunicació per ràdio sense cables.",
      "Emissor i receptor: mateix grup de ràdio",
      "Emissor: envia dreta, esquerra o centre segons inclinació",
      "Receptor: interpreta les ordres i mou S8 a dues posicions segures",
      "Comprova l’aturada i entrega dos programes",
      "Comprova: Amb el comandament pots ordenar posicions diferents de manera repetible."
    ],
    "safety": "Comprova alimentació 4,8–6 V del servo abans d’activar-lo.",
    "materialStatus": "amb alimentació de servo comprovada",
    "assessment": "5 punts possibles, cota màxima 9/10. Valora proporcionalment connexions, lectura/acció, lògica i demostració.",
    "check": "Amb el comandament pots ordenar posicions diferents de manera repetible.",
    "pins": "Servo S8 (= P8) a la receptora; comunicació per ràdio sense cables.",
    "links": [
      {
        "label": "Extensió oficial micro:shield",
        "url": "https://makecode.microbit.org/pkg/MakeAndLearn/pxt-microshield"
      },
      {
        "label": "Manual Micro:Shield",
        "url": "https://projectes.xtec.cat/digital/wp-content/uploads/usu2317/2024/02/Manual-d_us-micro_shield.pdf"
      }
    ]
  },
  "s5": {
    "materials": "micro:bit V2 amb micròfon; Microshield RGB integrat",
    "steps": [
      "Connexions proposades: Micròfon de micro:bit V2; NeoPixel interns P16.",
      "Llegeix el nivell de so 0..255 en un «per sempre»",
      "Calibra valors ambientals i un llindar",
      "Si se supera posa el NeoPixel vermell; si no, verd",
      "Mostra les lectures i prova diversos sons",
      "Comprova: El color canvia segons el nivell de so i el llindar triat."
    ],
    "safety": "Requereix micro:bit V2. L’escala 0–255 no són decibels.",
    "materialStatus": "només micro:bit V2",
    "assessment": "4 punts possibles, cota màxima 8/10. Valora proporcionalment connexions, lectura/acció, lògica i demostració.",
    "check": "El color canvia segons el nivell de so i el llindar triat.",
    "pins": "Micròfon de micro:bit V2; NeoPixel interns P16.",
    "links": [
      {
        "label": "Extensió oficial micro:shield",
        "url": "https://makecode.microbit.org/pkg/MakeAndLearn/pxt-microshield"
      },
      {
        "label": "Manual Micro:Shield",
        "url": "https://projectes.xtec.cat/digital/wp-content/uploads/usu2317/2024/02/Manual-d_us-micro_shield.pdf"
      }
    ]
  },
  "s6": {
    "materials": "Motor groc; adaptador JST a fils; Microshield; sensor KS0021; bateria",
    "steps": [
      "Connexions proposades: Motor a M3±; col·lisió GVS P1; M3 reserva pins P4–P7.",
      "Prepara el cable adaptador del motor i fixa’l als borns M3",
      "Comprova alimentació i activa la placa",
      "Llegeix col·lisió P1 (0 = premut)",
      "Motor M3 velocitat baixa quan es prem i aturada en deixar-lo anar",
      "Comprova amb la roda aixecada",
      "Comprova: El motor respon al contacte i s’atura en deixar-lo anar."
    ],
    "safety": "No connectis motors a GVS. No ocupis P4–P7 mentre fas servir M3/M4.",
    "materialStatus": "requereix adaptador JST i alimentació",
    "assessment": "5 punts possibles, cota màxima 9/10. Valora proporcionalment connexions, lectura/acció, lògica i demostració.",
    "check": "El motor respon al contacte i s’atura en deixar-lo anar.",
    "pins": "Motor a M3±; col·lisió GVS P1; M3 reserva pins P4–P7.",
    "links": [
      {
        "label": "Extensió oficial micro:shield",
        "url": "https://makecode.microbit.org/pkg/MakeAndLearn/pxt-microshield"
      },
      {
        "label": "Manual Micro:Shield",
        "url": "https://projectes.xtec.cat/digital/wp-content/uploads/usu2317/2024/02/Manual-d_us-micro_shield.pdf"
      }
    ]
  },
  "s7": {
    "materials": "TEMT6000; OLED KS0271; Microshield; 4 fils Dupont",
    "steps": [
      "Connexions proposades: Llum GVS P0 analògic; OLED SDA P20 / SCL P19; selector blau 3V3.",
      "Posa P0/BUZZER a P0",
      "Connecta TEMT6000 a P0 i OLED a P19/P20 amb blaus 3V3",
      "Inicialitza l’OLED una vegada",
      "Llegeix P0 i calcula clar/fosc",
      "Mostra el valor i el resultat a l’OLED",
      "Comprova: La pantalla mostra mesures i canvia l’estat amb la llum."
    ],
    "safety": "No canviïs els pins blaus a 5 V amb OLED connectada.",
    "materialStatus": "directe",
    "assessment": "5 punts possibles, cota màxima 9/10. Valora proporcionalment connexions, lectura/acció, lògica i demostració.",
    "check": "La pantalla mostra mesures i canvia l’estat amb la llum.",
    "pins": "Llum GVS P0 analògic; OLED SDA P20 / SCL P19; selector blau 3V3.",
    "links": [
      {
        "label": "Extensió oficial micro:shield",
        "url": "https://makecode.microbit.org/pkg/MakeAndLearn/pxt-microshield"
      },
      {
        "label": "Manual Micro:Shield",
        "url": "https://projectes.xtec.cat/digital/wp-content/uploads/usu2317/2024/02/Manual-d_us-micro_shield.pdf"
      }
    ]
  },
  "s8": {
    "materials": "Microshield amb 4 NeoPixel",
    "steps": [
      "Connexions proposades: LED RGB integrat P16, sense cables.",
      "Inicialitza la tira de 4 NeoPixel a P16",
      "Al «per sempre» posa color i mostra",
      "Espera 500 ms, neteja i mostra",
      "Repeteix el procés",
      "Comprova: Els quatre LED parpellegen de forma visible."
    ],
    "safety": "No cal un LED extern; el kit ja té 4 NeoPixel interns.",
    "materialStatus": "directe",
    "assessment": "1 punt possibles, cota màxima 5/10. Valora proporcionalment connexions, lectura/acció, lògica i demostració.",
    "check": "Els quatre LED parpellegen de forma visible.",
    "pins": "LED RGB integrat P16, sense cables.",
    "links": [
      {
        "label": "Extensió oficial micro:shield",
        "url": "https://makecode.microbit.org/pkg/MakeAndLearn/pxt-microshield"
      },
      {
        "label": "Manual Micro:Shield",
        "url": "https://projectes.xtec.cat/digital/wp-content/uploads/usu2317/2024/02/Manual-d_us-micro_shield.pdf"
      }
    ]
  },
  "s9": {
    "materials": "Microshield i micro:bit",
    "steps": [
      "Connexions proposades: LED integrats P16; botons A/B.",
      "Inicialitza una tira de 4 a P16",
      "A → mostra blau",
      "B → mostra groc",
      "Executa «mostrar» després de canviar el color",
      "Comprova: Els botons produeixen colors diferents."
    ],
    "safety": "No facis servir un LED extern que no consti al kit.",
    "materialStatus": "directe",
    "assessment": "1 punt possibles, cota màxima 5/10. Valora proporcionalment connexions, lectura/acció, lògica i demostració.",
    "check": "Els botons produeixen colors diferents.",
    "pins": "LED integrats P16; botons A/B.",
    "links": [
      {
        "label": "Extensió oficial micro:shield",
        "url": "https://makecode.microbit.org/pkg/MakeAndLearn/pxt-microshield"
      },
      {
        "label": "Manual Micro:Shield",
        "url": "https://projectes.xtec.cat/digital/wp-content/uploads/usu2317/2024/02/Manual-d_us-micro_shield.pdf"
      }
    ]
  },
  "s10": {
    "materials": "micro:bit V2; Microshield",
    "steps": [
      "Connexions proposades: Micròfon incorporat; NeoPixel P16.",
      "Llegeix el nivell de so de la micro:bit V2",
      "Tria un llindar per distingir un aplaudiment",
      "Encén RGB P16 en superar el llindar",
      "Torna a apagar quan acaba el so",
      "Comprova: Llum d’alerta quan detecta un so prou intens."
    ],
    "safety": "Si la micro:bit és V1, no disposa del micròfon V2.",
    "materialStatus": "només micro:bit V2",
    "assessment": "4 punts possibles, cota màxima 8/10. Valora proporcionalment connexions, lectura/acció, lògica i demostració.",
    "check": "Llum d’alerta quan detecta un so prou intens.",
    "pins": "Micròfon incorporat; NeoPixel P16.",
    "links": [
      {
        "label": "Extensió oficial micro:shield",
        "url": "https://makecode.microbit.org/pkg/MakeAndLearn/pxt-microshield"
      },
      {
        "label": "Manual Micro:Shield",
        "url": "https://projectes.xtec.cat/digital/wp-content/uploads/usu2317/2024/02/Manual-d_us-micro_shield.pdf"
      }
    ]
  },
  "s11": {
    "materials": "Micro:Shield amb brunzidor integrat",
    "steps": [
      "Connexions proposades: Selector P0/BUZZER a BUZZER; P0 reservat.",
      "Col·loca P0/BUZZER en BUZZER",
      "En prémer A, toca un to curt amb Música",
      "En prémer B, atura el so",
      "Prova que el brunzidor no bloquegi el programa",
      "Comprova: El brunzidor sona i es pot aturar."
    ],
    "safety": "No connectis un sensor a P0 mentre el brunzidor l’ocupa.",
    "materialStatus": "directe",
    "assessment": "2 punts possibles, cota màxima 6/10. Valora proporcionalment connexions, lectura/acció, lògica i demostració.",
    "check": "El brunzidor sona i es pot aturar.",
    "pins": "Selector P0/BUZZER a BUZZER; P0 reservat.",
    "links": [
      {
        "label": "Extensió oficial micro:shield",
        "url": "https://makecode.microbit.org/pkg/MakeAndLearn/pxt-microshield"
      },
      {
        "label": "Manual Micro:Shield",
        "url": "https://projectes.xtec.cat/digital/wp-content/uploads/usu2317/2024/02/Manual-d_us-micro_shield.pdf"
      }
    ]
  },
  "s12": {
    "materials": "Microshield; servo KS0194; bateria o alimentació adequada",
    "steps": [
      "Connexions proposades: Servo S8 (= P8); botons interns A/B.",
      "Connecta el servo al G/V/S de S8 amb placa apagada",
      "Comprova alimentació adequada del servo",
      "A mou-lo a 30°; B mou-lo a 90°",
      "Prova sense càrrega i evita topalls",
      "Comprova: El servo arriba a dues posicions diferents."
    ],
    "safety": "Servo nominal 4,8–6 V; la bateria sola pot no donar prou força.",
    "materialStatus": "amb alimentació de servo comprovada",
    "assessment": "2 punts possibles, cota màxima 6/10. Valora proporcionalment connexions, lectura/acció, lògica i demostració.",
    "check": "El servo arriba a dues posicions diferents.",
    "pins": "Servo S8 (= P8); botons interns A/B.",
    "links": [
      {
        "label": "Extensió oficial micro:shield",
        "url": "https://makecode.microbit.org/pkg/MakeAndLearn/pxt-microshield"
      },
      {
        "label": "Manual Micro:Shield",
        "url": "https://projectes.xtec.cat/digital/wp-content/uploads/usu2317/2024/02/Manual-d_us-micro_shield.pdf"
      }
    ]
  },
  "s13": {
    "materials": "HC-SR04; adaptador de nivell ECHO 5→3,3 V; Microshield",
    "steps": [
      "Connexions proposades: TRIG P14 / ECHO P15 amb reductor a ECHO; alimentació 5 V; sense OLED.",
      "Verifica el model i prepara el reductor de nivell d’ECHO",
      "Connecta VCC 5 V, G, TRIG P14, ECHO P15 a través de l’adaptador",
      "Llegeix distància en cm",
      "Si distància < 10 cm, mostra avís; si no, apaga’l",
      "Comprova: L’alerta canvia a 5 cm i 20 cm."
    ],
    "safety": "PROHIBIT connectar ECHO 5 V directament al pin de micro:bit.",
    "materialStatus": "només amb adaptador de nivell",
    "assessment": "4 punts possibles, cota màxima 8/10. Valora proporcionalment connexions, lectura/acció, lògica i demostració.",
    "check": "L’alerta canvia a 5 cm i 20 cm.",
    "pins": "TRIG P14 / ECHO P15 amb reductor a ECHO; alimentació 5 V; sense OLED.",
    "links": [
      {
        "label": "Extensió oficial micro:shield",
        "url": "https://makecode.microbit.org/pkg/MakeAndLearn/pxt-microshield"
      },
      {
        "label": "Manual Micro:Shield",
        "url": "https://projectes.xtec.cat/digital/wp-content/uploads/usu2317/2024/02/Manual-d_us-micro_shield.pdf"
      }
    ]
  },
  "s14": {
    "materials": "Microshield; motor groc; cable adaptador JST; tornavís; alimentació",
    "steps": [
      "Connexions proposades: Motor M3+ / M3−; reserva P4–P7.",
      "Prepara adaptador JST a fils compatible",
      "Fixa els dos conductors als borns M3",
      "Amb bateria i ON, fes-lo girar a velocitat baixa",
      "Atura’l i comprova el sentit",
      "Comprova: El motor gira i s’atura quan l’ordres."
    ],
    "safety": "Motor als borns M3, mai als pins de senyal.",
    "materialStatus": "requereix adaptador JST i alimentació",
    "assessment": "2 punts possibles, cota màxima 6/10. Valora proporcionalment connexions, lectura/acció, lògica i demostració.",
    "check": "El motor gira i s’atura quan l’ordres.",
    "pins": "Motor M3+ / M3−; reserva P4–P7.",
    "links": [
      {
        "label": "Extensió oficial micro:shield",
        "url": "https://makecode.microbit.org/pkg/MakeAndLearn/pxt-microshield"
      },
      {
        "label": "Manual Micro:Shield",
        "url": "https://projectes.xtec.cat/digital/wp-content/uploads/usu2317/2024/02/Manual-d_us-micro_shield.pdf"
      }
    ]
  },
  "s15": {
    "materials": "Dues micro:bit; Microshield amb RGB integrats",
    "steps": [
      "Connexions proposades: RGB interns P16; ràdio entre plaques.",
      "Crea emissor amb A = VERMELL i B = APAGAT",
      "Al receptor inicialitza 4 NeoPixel P16",
      "Configura el mateix grup de ràdio als dos",
      "En rebre ordres actualitza colors i mostra",
      "Entrega emissor i receptor",
      "Comprova: Els LED de la receptora responen a les ordres."
    ],
    "safety": "Són necessaris dos programes, no només un enllaç.",
    "materialStatus": "directe amb dues plaques",
    "assessment": "4 punts possibles, cota màxima 8/10. Valora proporcionalment connexions, lectura/acció, lògica i demostració.",
    "check": "Els LED de la receptora responen a les ordres.",
    "pins": "RGB interns P16; ràdio entre plaques.",
    "links": [
      {
        "label": "Extensió oficial micro:shield",
        "url": "https://makecode.microbit.org/pkg/MakeAndLearn/pxt-microshield"
      },
      {
        "label": "Manual Micro:Shield",
        "url": "https://projectes.xtec.cat/digital/wp-content/uploads/usu2317/2024/02/Manual-d_us-micro_shield.pdf"
      }
    ]
  },
  "s16": {
    "materials": "Dues micro:bit; Microshield; servo; alimentació adequada",
    "steps": [
      "Connexions proposades: Servo S8 (= P8) al receptor.",
      "Emissor: A envia OBRE i B envia TANCA",
      "Receptor: mateixa ràdio i servo a S8",
      "En rebre OBRE → 30°, TANCA → 90°",
      "Prova amb servo descarregat i entrega dos programes",
      "Comprova: Servo es mou entre dues posicions des del comandament."
    ],
    "safety": "Servo nominal 4,8–6 V; comprova alimentació.",
    "materialStatus": "amb alimentació de servo comprovada",
    "assessment": "5 punts possibles, cota màxima 9/10. Valora proporcionalment connexions, lectura/acció, lògica i demostració.",
    "check": "Servo es mou entre dues posicions des del comandament.",
    "pins": "Servo S8 (= P8) al receptor.",
    "links": [
      {
        "label": "Extensió oficial micro:shield",
        "url": "https://makecode.microbit.org/pkg/MakeAndLearn/pxt-microshield"
      },
      {
        "label": "Manual Micro:Shield",
        "url": "https://projectes.xtec.cat/digital/wp-content/uploads/usu2317/2024/02/Manual-d_us-micro_shield.pdf"
      }
    ]
  },
  "s17": {
    "materials": "Dues micro:bit; PIR KS0052; Microshield RGB integrats",
    "steps": [
      "Connexions proposades: PIR GVS P2; al receptor RGB intern P16.",
      "Emissor llegeix PIR P2 i envia MOVIMENT / REPÒS per ràdio",
      "Receptor configura la mateixa ràdio i 4 NeoPixel a P16",
      "Vermell quan rep MOVIMENT i verd en REPÒS",
      "Evita enviar missatges repetits innecessaris",
      "Entrega els dos programes",
      "Comprova: Les dues plaques reaccionen a canvis reals de moviment."
    ],
    "safety": "Espera el temps d’estabilització del PIR abans de provar.",
    "materialStatus": "directe amb dues plaques",
    "assessment": "5 punts possibles, cota màxima 9/10. Valora proporcionalment connexions, lectura/acció, lògica i demostració.",
    "check": "Les dues plaques reaccionen a canvis reals de moviment.",
    "pins": "PIR GVS P2; al receptor RGB intern P16.",
    "links": [
      {
        "label": "Extensió oficial micro:shield",
        "url": "https://makecode.microbit.org/pkg/MakeAndLearn/pxt-microshield"
      },
      {
        "label": "Manual Micro:Shield",
        "url": "https://projectes.xtec.cat/digital/wp-content/uploads/usu2317/2024/02/Manual-d_us-micro_shield.pdf"
      }
    ]
  },
  "s18": {
    "materials": "Dues micro:bit; 2 motors grocs; adaptadors JST; Microshield; rodes",
    "steps": [
      "Connexions proposades: Motors M3/M4; reservar P4–P7; acceleròmetre a la placa emissora.",
      "Connecta els dos motors a M3 i M4 amb adaptadors",
      "Emissor: envia ordres endavant, enrere, esquerra, dreta i STOP",
      "Receptor: controla M3/M4 amb motors i sentit apropiat",
      "Afegeix parada si es perd la ràdio",
      "Prova amb rodes elevades i després a velocitat baixa",
      "Comprova: Gira, avança i s’atura amb ordres clares i segura."
    ],
    "safety": "P4–P7 ocupats pels motors. No connectis mai un motor a un GVS.",
    "materialStatus": "requereix adaptadors de motor i alimentació",
    "assessment": "6 punts possibles, cota màxima 10/10. Valora proporcionalment connexions, lectura/acció, lògica i demostració.",
    "check": "Gira, avança i s’atura amb ordres clares i segura.",
    "pins": "Motors M3/M4; reservar P4–P7; acceleròmetre a la placa emissora.",
    "links": [
      {
        "label": "Extensió oficial micro:shield",
        "url": "https://makecode.microbit.org/pkg/MakeAndLearn/pxt-microshield"
      },
      {
        "label": "Manual Micro:Shield",
        "url": "https://projectes.xtec.cat/digital/wp-content/uploads/usu2317/2024/02/Manual-d_us-micro_shield.pdf"
      }
    ]
  },
  "s19": {
    "materials": "HC-SR04; divisor ECHO 5→3,3 V; servo; 2 micro:bit; alimentació",
    "steps": [
      "Connexions proposades: Ultrasons TRIG P14/ECHO P15 amb adaptador; servo S8; blaus a 5 V sense OLED.",
      "Prepara adaptació ECHO 5→3,3 V abans de connectar",
      "Connecta sonar 5 V a P14/P15 i servo a S8 amb alimentació verificada",
      "Emissor A = AUTO, B = STOP",
      "Receptor AUTO obre servo si distància < 10 cm i el tanca si no",
      "Atura en STOP i prova els dos programes",
      "Comprova: Barrera automàtica + desactivació remota funcionen."
    ],
    "safety": "ECHO directe 5 V danya la micro:bit; no connectis OLED de 3,3 V als blaus posats a 5 V.",
    "materialStatus": "només amb adaptador ECHO i alimentació de servo",
    "assessment": "7 punts possibles, cota màxima 10/10. Valora proporcionalment connexions, lectura/acció, lògica i demostració.",
    "check": "Barrera automàtica + desactivació remota funcionen.",
    "pins": "Ultrasons TRIG P14/ECHO P15 amb adaptador; servo S8; blaus a 5 V sense OLED.",
    "links": [
      {
        "label": "Extensió oficial micro:shield",
        "url": "https://makecode.microbit.org/pkg/MakeAndLearn/pxt-microshield"
      },
      {
        "label": "Manual Micro:Shield",
        "url": "https://projectes.xtec.cat/digital/wp-content/uploads/usu2317/2024/02/Manual-d_us-micro_shield.pdf"
      }
    ]
  },
  "s20": {
    "materials": "KS0021; Microshield; 3 fils GVS",
    "steps": [
      "Connexions proposades: Col·lisió G/V/S al port P1 (3,3 V).",
      "Connecta G/V/S amb placa apagada",
      "Llegeix digital P1 en «per sempre»",
      "Mostra 0 quan es prem i 1 quan es deixa anar",
      "Comprova: Mostra els dos valors correctes."
    ],
    "safety": "Comprova les lletres G/V/S, no et refiïs només dels colors.",
    "materialStatus": "directe",
    "assessment": "1 punt possibles, cota màxima 5/10. Valora proporcionalment connexions, lectura/acció, lògica i demostració.",
    "check": "Mostra els dos valors correctes.",
    "pins": "Col·lisió G/V/S al port P1 (3,3 V).",
    "links": [
      {
        "label": "Extensió oficial micro:shield",
        "url": "https://makecode.microbit.org/pkg/MakeAndLearn/pxt-microshield"
      },
      {
        "label": "Manual Micro:Shield",
        "url": "https://projectes.xtec.cat/digital/wp-content/uploads/usu2317/2024/02/Manual-d_us-micro_shield.pdf"
      }
    ]
  },
  "s21": {
    "materials": "KS0021; Microshield",
    "steps": [
      "Connexions proposades: Col·lisió digital P1.",
      "Inicialitza comptador a zero",
      "Detecta el canvi de lliure a premut",
      "Suma 1 només una vegada per pulsació",
      "Mostra el recompte",
      "Comprova: Una pulsació suma exactament un punt, no 30."
    ],
    "safety": "Utilitza detecció de canvi d’estat o una espera fins a alliberar el sensor.",
    "materialStatus": "directe",
    "assessment": "2 punts possibles, cota màxima 6/10. Valora proporcionalment connexions, lectura/acció, lògica i demostració.",
    "check": "Una pulsació suma exactament un punt, no 30.",
    "pins": "Col·lisió digital P1.",
    "links": [
      {
        "label": "Extensió oficial micro:shield",
        "url": "https://makecode.microbit.org/pkg/MakeAndLearn/pxt-microshield"
      },
      {
        "label": "Manual Micro:Shield",
        "url": "https://projectes.xtec.cat/digital/wp-content/uploads/usu2317/2024/02/Manual-d_us-micro_shield.pdf"
      }
    ]
  },
  "s22": {
    "materials": "KS0021; OLED KS0271; 4 Dupont; Microshield",
    "steps": [
      "Connexions proposades: Col·lisió P1; OLED P19=SCL/P20=SDA, blaus 3V3.",
      "Connecta sensor a P1 i OLED amb quatre fils a P19/P20",
      "Selector blau a 3V3",
      "Inicialitza OLED 128×64 una sola vegada",
      "Llegeix P1 i mostra PREMUT si 0, LLIURE si 1",
      "Evita reescriure el text sense canvi",
      "Comprova: OLED reflecteix el contacte de manera estable."
    ],
    "safety": "OLED només 3,3 V; no canviar el selector a 5 V.",
    "materialStatus": "directe",
    "assessment": "4 punts possibles, cota màxima 8/10. Valora proporcionalment connexions, lectura/acció, lògica i demostració.",
    "check": "OLED reflecteix el contacte de manera estable.",
    "pins": "Col·lisió P1; OLED P19=SCL/P20=SDA, blaus 3V3.",
    "links": [
      {
        "label": "Extensió oficial micro:shield",
        "url": "https://makecode.microbit.org/pkg/MakeAndLearn/pxt-microshield"
      },
      {
        "label": "Manual Micro:Shield",
        "url": "https://projectes.xtec.cat/digital/wp-content/uploads/usu2317/2024/02/Manual-d_us-micro_shield.pdf"
      }
    ]
  },
  "s23": {
    "materials": "PIR KS0052; Microshield",
    "steps": [
      "Connexions proposades: PIR GVS P2 (3,3 V).",
      "Connecta PIR a P2 amb la placa apagada",
      "Espera estabilització inicial",
      "Llegeix P2 digital (1 = moviment)",
      "Mostra 0 o 1 a la pantalla",
      "Comprova: Canvia el valor quan detecta moviment."
    ],
    "safety": "L’estat pot quedar actiu uns segons després del moviment.",
    "materialStatus": "directe",
    "assessment": "1 punt possibles, cota màxima 5/10. Valora proporcionalment connexions, lectura/acció, lògica i demostració.",
    "check": "Canvia el valor quan detecta moviment.",
    "pins": "PIR GVS P2 (3,3 V).",
    "links": [
      {
        "label": "Extensió oficial micro:shield",
        "url": "https://makecode.microbit.org/pkg/MakeAndLearn/pxt-microshield"
      },
      {
        "label": "Manual Micro:Shield",
        "url": "https://projectes.xtec.cat/digital/wp-content/uploads/usu2317/2024/02/Manual-d_us-micro_shield.pdf"
      }
    ]
  },
  "s24": {
    "materials": "PIR KS0052; Microshield",
    "steps": [
      "Connexions proposades: PIR digital P2.",
      "Espera l’estabilització del PIR",
      "Crea una variable estatAnterior",
      "Llegeix P2 i compara amb estatAnterior",
      "Mostra una icona només quan canvia l’estat",
      "Actualitza estatAnterior",
      "Comprova: La pantalla no parpelleja contínuament."
    ],
    "safety": "El PIR es pot mantenir actiu diversos segons, no és un pols instantani.",
    "materialStatus": "directe",
    "assessment": "2 punts possibles, cota màxima 6/10. Valora proporcionalment connexions, lectura/acció, lògica i demostració.",
    "check": "La pantalla no parpelleja contínuament.",
    "pins": "PIR digital P2.",
    "links": [
      {
        "label": "Extensió oficial micro:shield",
        "url": "https://makecode.microbit.org/pkg/MakeAndLearn/pxt-microshield"
      },
      {
        "label": "Manual Micro:Shield",
        "url": "https://projectes.xtec.cat/digital/wp-content/uploads/usu2317/2024/02/Manual-d_us-micro_shield.pdf"
      }
    ]
  },
  "s25": {
    "materials": "TEMT6000; Microshield",
    "steps": [
      "Connexions proposades: Sensor analògic P0 GVS 3,3 V; selector P0/BUZZER = P0.",
      "Comprova P0/BUZZER en P0",
      "Connecta TEMT6000 a P0",
      "Llegeix P0 analògic i mostra’l cada 300 ms",
      "Compara llum i foscor",
      "Comprova: La lectura canvia amb la quantitat de llum."
    ],
    "safety": "P0 no pot fer de brunzidor i sensor alhora.",
    "materialStatus": "directe",
    "assessment": "1 punt possibles, cota màxima 5/10. Valora proporcionalment connexions, lectura/acció, lògica i demostració.",
    "check": "La lectura canvia amb la quantitat de llum.",
    "pins": "Sensor analògic P0 GVS 3,3 V; selector P0/BUZZER = P0.",
    "links": [
      {
        "label": "Extensió oficial micro:shield",
        "url": "https://makecode.microbit.org/pkg/MakeAndLearn/pxt-microshield"
      },
      {
        "label": "Manual Micro:Shield",
        "url": "https://projectes.xtec.cat/digital/wp-content/uploads/usu2317/2024/02/Manual-d_us-micro_shield.pdf"
      }
    ]
  },
  "s26": {
    "materials": "TEMT6000; Microshield",
    "steps": [
      "Connexions proposades: TEMT6000 a P0, selector P0.",
      "Llegeix P0 en clar i fosc",
      "Tria un llindar entre les dues lectures",
      "Si valor < llindar mostra FOSC, si no CLAR",
      "Prova el canvi",
      "Comprova: Diferencia dues il·luminacions amb un llindar justificat."
    ],
    "safety": "Calibrar el llindar al lloc de classe.",
    "materialStatus": "directe",
    "assessment": "2 punts possibles, cota màxima 6/10. Valora proporcionalment connexions, lectura/acció, lògica i demostració.",
    "check": "Diferencia dues il·luminacions amb un llindar justificat.",
    "pins": "TEMT6000 a P0, selector P0.",
    "links": [
      {
        "label": "Extensió oficial micro:shield",
        "url": "https://makecode.microbit.org/pkg/MakeAndLearn/pxt-microshield"
      },
      {
        "label": "Manual Micro:Shield",
        "url": "https://projectes.xtec.cat/digital/wp-content/uploads/usu2317/2024/02/Manual-d_us-micro_shield.pdf"
      }
    ]
  },
  "s27": {
    "materials": "Sonda d’humitat de terra compatible 3,3 V",
    "steps": [
      "Connexions proposades: Sonda G/V/S P0; selector P0/BUZZER=P0.",
      "Confirma que el sensor admet 3,3 V",
      "Llegeix analògic P0",
      "Prova substrat sec i humit",
      "Mostra i registra dos valors",
      "Comprova: La sonda retorna dos valors diferents."
    ],
    "safety": "No submergeixis circuits ni connector; evitar oxidació prolongada.",
    "materialStatus": "directe verificant versió",
    "assessment": "1 punt possibles, cota màxima 5/10. Valora proporcionalment connexions, lectura/acció, lògica i demostració.",
    "check": "La sonda retorna dos valors diferents.",
    "pins": "Sonda G/V/S P0; selector P0/BUZZER=P0.",
    "links": [
      {
        "label": "Extensió oficial micro:shield",
        "url": "https://makecode.microbit.org/pkg/MakeAndLearn/pxt-microshield"
      },
      {
        "label": "Manual Micro:Shield",
        "url": "https://projectes.xtec.cat/digital/wp-content/uploads/usu2317/2024/02/Manual-d_us-micro_shield.pdf"
      }
    ]
  },
  "s28": {
    "materials": "Sonda d’humitat compatible; Microshield",
    "steps": [
      "Connexions proposades: Sonda P0 analògic.",
      "Recull lectures sec i humit",
      "Inicialitza la variable llindar",
      "Compara la mesura amb el llindar",
      "Mostra SECA/HUMIDA",
      "Explica el sentit de la comparació segons el sensor",
      "Comprova: Diferencia clarament les dues proves."
    ],
    "safety": "No pressuposis si més lectura equival a més humitat; verifica-ho.",
    "materialStatus": "directe verificant versió",
    "assessment": "2 punts possibles, cota màxima 6/10. Valora proporcionalment connexions, lectura/acció, lògica i demostració.",
    "check": "Diferencia clarament les dues proves.",
    "pins": "Sonda P0 analògic.",
    "links": [
      {
        "label": "Extensió oficial micro:shield",
        "url": "https://makecode.microbit.org/pkg/MakeAndLearn/pxt-microshield"
      },
      {
        "label": "Manual Micro:Shield",
        "url": "https://projectes.xtec.cat/digital/wp-content/uploads/usu2317/2024/02/Manual-d_us-micro_shield.pdf"
      }
    ]
  },
  "s29": {
    "materials": "OLED KS0271; Microshield; 4 fils Dupont",
    "steps": [
      "Connexions proposades: OLED GND / VCC 3,3 V / SCL P19 / SDA P20.",
      "Connecta els 4 fils individualment",
      "Selector blau a 3V3",
      "Afegeix l’extensió SSD1306 OLED",
      "Inicialitza 128×64 en «en iniciar»",
      "Mostra HOLA",
      "Comprova: El text apareix de manera estable a l’OLED."
    ],
    "safety": "Els pins P19/P20 són I²C i no s’han de connectar al revés.",
    "materialStatus": "directe",
    "assessment": "1 punt possibles, cota màxima 5/10. Valora proporcionalment connexions, lectura/acció, lògica i demostració.",
    "check": "El text apareix de manera estable a l’OLED.",
    "pins": "OLED GND / VCC 3,3 V / SCL P19 / SDA P20.",
    "links": [
      {
        "label": "Extensió oficial micro:shield",
        "url": "https://makecode.microbit.org/pkg/MakeAndLearn/pxt-microshield"
      },
      {
        "label": "Manual Micro:Shield",
        "url": "https://projectes.xtec.cat/digital/wp-content/uploads/usu2317/2024/02/Manual-d_us-micro_shield.pdf"
      }
    ]
  },
  "s30": {
    "materials": "OLED KS0271; Microshield",
    "steps": [
      "Connexions proposades: OLED a P19/P20 amb selector 3V3.",
      "Inicialitza OLED una vegada",
      "En prémer A, mostra NOM",
      "En prémer B, mostra CLASSE",
      "Neteja només si és necessari i comprova ambdós botons",
      "Comprova: Cada botó mostra el seu missatge a la pantalla."
    ],
    "safety": "No canviïs l’alimentació de l’OLED a 5 V.",
    "materialStatus": "directe",
    "assessment": "2 punts possibles, cota màxima 6/10. Valora proporcionalment connexions, lectura/acció, lògica i demostració.",
    "check": "Cada botó mostra el seu missatge a la pantalla.",
    "pins": "OLED a P19/P20 amb selector 3V3.",
    "links": [
      {
        "label": "Extensió oficial micro:shield",
        "url": "https://makecode.microbit.org/pkg/MakeAndLearn/pxt-microshield"
      },
      {
        "label": "Manual Micro:Shield",
        "url": "https://projectes.xtec.cat/digital/wp-content/uploads/usu2317/2024/02/Manual-d_us-micro_shield.pdf"
      }
    ]
  },
  "s31": {
    "materials": "Microshield RGB integrats",
    "steps": [
      "Connexions proposades: P16 intern, 4 LED NeoPixel.",
      "Inicialitza 4 NeoPixel al pin P16",
      "Crea una seqüència de vermell, verd i blau",
      "Executa «mostrar» després de cada color",
      "Afegeix pauses curtes",
      "Comprova: Els 3 colors es veuen de manera seqüenciada."
    ],
    "safety": "No necessita una tira externa de 30 LED.",
    "materialStatus": "directe",
    "assessment": "1 punt possibles, cota màxima 5/10. Valora proporcionalment connexions, lectura/acció, lògica i demostració.",
    "check": "Els 3 colors es veuen de manera seqüenciada.",
    "pins": "P16 intern, 4 LED NeoPixel.",
    "links": [
      {
        "label": "Extensió oficial micro:shield",
        "url": "https://makecode.microbit.org/pkg/MakeAndLearn/pxt-microshield"
      },
      {
        "label": "Manual Micro:Shield",
        "url": "https://projectes.xtec.cat/digital/wp-content/uploads/usu2317/2024/02/Manual-d_us-micro_shield.pdf"
      }
    ]
  },
  "s32": {
    "materials": "Microshield RGB integrats",
    "steps": [
      "Connexions proposades: P16 intern, 4 NeoPixel.",
      "Inicialitza 4 NeoPixel P16",
      "Recorre posicions 0..3 amb un bucle",
      "Encén només el LED corresponent i mostra",
      "Fes una pausa i neteja",
      "Comprova: Veus els quatre LEDs encendre’s per torns."
    ],
    "safety": "Recorda mostrar cada canvi i no utilitzar índex 4.",
    "materialStatus": "directe",
    "assessment": "2 punts possibles, cota màxima 6/10. Valora proporcionalment connexions, lectura/acció, lògica i demostració.",
    "check": "Veus els quatre LEDs encendre’s per torns.",
    "pins": "P16 intern, 4 NeoPixel.",
    "links": [
      {
        "label": "Extensió oficial micro:shield",
        "url": "https://makecode.microbit.org/pkg/MakeAndLearn/pxt-microshield"
      },
      {
        "label": "Manual Micro:Shield",
        "url": "https://projectes.xtec.cat/digital/wp-content/uploads/usu2317/2024/02/Manual-d_us-micro_shield.pdf"
      }
    ]
  },
  "s33": {
    "materials": "TEMT6000; OLED KS0271; Microshield",
    "steps": [
      "Connexions proposades: Llum P0, selector P0; OLED P19/P20 amb blaus 3V3.",
      "Connecta llum a P0 i OLED a I²C",
      "Inicialitza OLED una sola vegada",
      "Llegeix P0 analògic i guarda en variable",
      "Mostra número i estat segons un llindar",
      "Prova amb una llanterna",
      "Comprova: La pantalla canvia d’estat segons la llum."
    ],
    "safety": "P0/Buzzer en P0 i blaus en 3V3.",
    "materialStatus": "directe",
    "assessment": "4 punts possibles, cota màxima 8/10. Valora proporcionalment connexions, lectura/acció, lògica i demostració.",
    "check": "La pantalla canvia d’estat segons la llum.",
    "pins": "Llum P0, selector P0; OLED P19/P20 amb blaus 3V3.",
    "links": [
      {
        "label": "Extensió oficial micro:shield",
        "url": "https://makecode.microbit.org/pkg/MakeAndLearn/pxt-microshield"
      },
      {
        "label": "Manual Micro:Shield",
        "url": "https://projectes.xtec.cat/digital/wp-content/uploads/usu2317/2024/02/Manual-d_us-micro_shield.pdf"
      }
    ]
  },
  "s34": {
    "materials": "Sonda d’humitat compatible 3,3 V; OLED; Microshield",
    "steps": [
      "Connexions proposades: Sonda P0; OLED P19/P20 a 3V3.",
      "Verifica la sonda i connecta P0",
      "Connecta OLED a I²C 3V3",
      "Llegeix P0 i desa el valor",
      "Estableix llindar sec/humit",
      "Mostra REGAR o NO REGAR segons la lectura",
      "Comprova: Diferencia dues situacions d’humitat."
    ],
    "safety": "No confonguis percentatge amb lectura 0–1023; calibra.",
    "materialStatus": "directe verificant versió",
    "assessment": "4 punts possibles, cota màxima 8/10. Valora proporcionalment connexions, lectura/acció, lògica i demostració.",
    "check": "Diferencia dues situacions d’humitat.",
    "pins": "Sonda P0; OLED P19/P20 a 3V3.",
    "links": [
      {
        "label": "Extensió oficial micro:shield",
        "url": "https://makecode.microbit.org/pkg/MakeAndLearn/pxt-microshield"
      },
      {
        "label": "Manual Micro:Shield",
        "url": "https://projectes.xtec.cat/digital/wp-content/uploads/usu2317/2024/02/Manual-d_us-micro_shield.pdf"
      }
    ]
  },
  "s35": {
    "materials": "Col·lisió KS0021; PIR KS0052; OLED; Microshield",
    "steps": [
      "Connexions proposades: Col·lisió P1; PIR P2; OLED P19/P20 3V3.",
      "Connecta col·lisió a P1 i PIR a P2",
      "Connecta OLED als pins I²C amb selector 3V3",
      "Inicialitza OLED i espera estabilització PIR",
      "Mostra alhora contacte i moviment",
      "Prova les quatre combinacions possibles",
      "Comprova: Identifica les dues entrades de manera independent."
    ],
    "safety": "P1 i P2 són diferents, no ocupis S1 ni S2 amb servos.",
    "materialStatus": "directe",
    "assessment": "5 punts possibles, cota màxima 9/10. Valora proporcionalment connexions, lectura/acció, lògica i demostració.",
    "check": "Identifica les dues entrades de manera independent.",
    "pins": "Col·lisió P1; PIR P2; OLED P19/P20 3V3.",
    "links": [
      {
        "label": "Extensió oficial micro:shield",
        "url": "https://makecode.microbit.org/pkg/MakeAndLearn/pxt-microshield"
      },
      {
        "label": "Manual Micro:Shield",
        "url": "https://projectes.xtec.cat/digital/wp-content/uploads/usu2317/2024/02/Manual-d_us-micro_shield.pdf"
      }
    ]
  },
  "s36": {
    "materials": "PIR KS0052; col·lisió KS0021; RGB integrats",
    "steps": [
      "Connexions proposades: PIR P2; col·lisió P1; NeoPixel P16.",
      "Connecta els dos sensors digitals",
      "Inicialitza 4 NeoPixel en P16",
      "Si P2=1 I P1=0 mostra vermell",
      "Si no, mostra verd",
      "Comprova totes les combinacions",
      "Comprova: L’alarma requereix dues condicions alhora."
    ],
    "safety": "PIR pot romandre actiu uns segons; comprova el seu retard.",
    "materialStatus": "directe",
    "assessment": "5 punts possibles, cota màxima 9/10. Valora proporcionalment connexions, lectura/acció, lògica i demostració.",
    "check": "L’alarma requereix dues condicions alhora.",
    "pins": "PIR P2; col·lisió P1; NeoPixel P16.",
    "links": [
      {
        "label": "Extensió oficial micro:shield",
        "url": "https://makecode.microbit.org/pkg/MakeAndLearn/pxt-microshield"
      },
      {
        "label": "Manual Micro:Shield",
        "url": "https://projectes.xtec.cat/digital/wp-content/uploads/usu2317/2024/02/Manual-d_us-micro_shield.pdf"
      }
    ]
  },
  "s37": {
    "materials": "PIR; TEMT6000; RGB integrats",
    "steps": [
      "Connexions proposades: PIR P2; TEMT6000 P0, selector P0; RGB P16.",
      "Llegeix nivell de llum P0 i fixa llindar",
      "Llegeix moviment P2 després d’estabilització",
      "Si fosc I moviment, encén RGB P16",
      "Si no, apaga els LED",
      "Comprova els quatre casos",
      "Comprova: Només s’encén quan coincideixen foscor i moviment."
    ],
    "safety": "Dues entrades, cap pin compartit amb LED RGB P16.",
    "materialStatus": "directe",
    "assessment": "5 punts possibles, cota màxima 9/10. Valora proporcionalment connexions, lectura/acció, lògica i demostració.",
    "check": "Només s’encén quan coincideixen foscor i moviment.",
    "pins": "PIR P2; TEMT6000 P0, selector P0; RGB P16.",
    "links": [
      {
        "label": "Extensió oficial micro:shield",
        "url": "https://makecode.microbit.org/pkg/MakeAndLearn/pxt-microshield"
      },
      {
        "label": "Manual Micro:Shield",
        "url": "https://projectes.xtec.cat/digital/wp-content/uploads/usu2317/2024/02/Manual-d_us-micro_shield.pdf"
      }
    ]
  },
  "s38": {
    "materials": "Sonda compatible 3,3 V; servo KS0194; Microshield; alimentació",
    "steps": [
      "Connexions proposades: Humitat P0 (P0/BUZZER=P0); servo S8 (= P8).",
      "Calibra el sensor d’humitat P0",
      "Comprova alimentació correcta del servo S8",
      "En iniciar, servo a posició tancada",
      "Si sec obre a 90°, si humit tanca a 0°",
      "Prova sense càrrega",
      "Comprova: Posició del servo segueix el llindar d’humitat."
    ],
    "safety": "Servo 4,8–6 V nominal; no confonguis P0 amb brunzidor.",
    "materialStatus": "amb alimentació de servo comprovada",
    "assessment": "5 punts possibles, cota màxima 9/10. Valora proporcionalment connexions, lectura/acció, lògica i demostració.",
    "check": "Posició del servo segueix el llindar d’humitat.",
    "pins": "Humitat P0 (P0/BUZZER=P0); servo S8 (= P8).",
    "links": [
      {
        "label": "Extensió oficial micro:shield",
        "url": "https://makecode.microbit.org/pkg/MakeAndLearn/pxt-microshield"
      },
      {
        "label": "Manual Micro:Shield",
        "url": "https://projectes.xtec.cat/digital/wp-content/uploads/usu2317/2024/02/Manual-d_us-micro_shield.pdf"
      }
    ]
  },
  "s39": {
    "materials": "Col·lisió; servo; OLED; Microshield; bateria adequada",
    "steps": [
      "Connexions proposades: Col·lisió P1; servo S8; OLED P19/P20 a 3V3.",
      "Connecta col·lisió P1 i OLED I²C 3V3",
      "Comprova servo S8 sense càrrega",
      "Inicialitza OLED i servo una sola vegada",
      "P1=0 obre servo i mostra OBERT",
      "P1=1 tanca i mostra TANCAT",
      "Evita reescriptures constants",
      "Comprova: La pantalla i el servo coincideixen amb l’estat de la barrera."
    ],
    "safety": "No connectis servo a S1 i OLED als blaus 5V.",
    "materialStatus": "amb alimentació de servo comprovada",
    "assessment": "6 punts possibles, cota màxima 10/10. Valora proporcionalment connexions, lectura/acció, lògica i demostració.",
    "check": "La pantalla i el servo coincideixen amb l’estat de la barrera.",
    "pins": "Col·lisió P1; servo S8; OLED P19/P20 a 3V3.",
    "links": [
      {
        "label": "Extensió oficial micro:shield",
        "url": "https://makecode.microbit.org/pkg/MakeAndLearn/pxt-microshield"
      },
      {
        "label": "Manual Micro:Shield",
        "url": "https://projectes.xtec.cat/digital/wp-content/uploads/usu2317/2024/02/Manual-d_us-micro_shield.pdf"
      }
    ]
  },
  "s40": {
    "materials": "Motor groc; adaptador JST; col·lisió; OLED; Microshield",
    "steps": [
      "Connexions proposades: Motor M3 (P4–P7 ocupats); col·lisió P1; OLED P19/P20 3V3.",
      "Prepara motor M3 amb adaptador i roda aixecada",
      "Connecta P1 i OLED I²C amb selector 3V3",
      "Inicialitza pantalla i llegeix el sensor",
      "Si contacte P1=0 gira motor i mostra MOTOR ON",
      "Si no, atura i mostra MOTOR OFF",
      "Comprova l’aturada",
      "Comprova: La pantalla i el moviment corresponen al mateix estat."
    ],
    "safety": "No connectis motor a un pin GVS ni sensors a P4–P7 amb M3.",
    "materialStatus": "requereix adaptador JST i alimentació",
    "assessment": "6 punts possibles, cota màxima 10/10. Valora proporcionalment connexions, lectura/acció, lògica i demostració.",
    "check": "La pantalla i el moviment corresponen al mateix estat.",
    "pins": "Motor M3 (P4–P7 ocupats); col·lisió P1; OLED P19/P20 3V3.",
    "links": [
      {
        "label": "Extensió oficial micro:shield",
        "url": "https://makecode.microbit.org/pkg/MakeAndLearn/pxt-microshield"
      },
      {
        "label": "Manual Micro:Shield",
        "url": "https://projectes.xtec.cat/digital/wp-content/uploads/usu2317/2024/02/Manual-d_us-micro_shield.pdf"
      }
    ]
  },
  "s41": {
    "materials": "PIR; OLED; Microshield RGB",
    "steps": [
      "Connexions proposades: PIR P2; OLED P19/P20 a 3V3; RGB interns P16.",
      "Connecta PIR i OLED correctament",
      "Inicialitza OLED i NeoPixel una sola vegada",
      "Espera estabilització PIR",
      "Si moviment mostra ALERTA i RGB vermell",
      "Si no, mostra REPÒS i RGB verd",
      "Evita parpelleig en canviar d’estat",
      "Comprova: Pantalla i LED concorden amb la detecció."
    ],
    "safety": "No canviïs el selector blau a 5V si hi ha OLED.",
    "materialStatus": "directe",
    "assessment": "6 punts possibles, cota màxima 10/10. Valora proporcionalment connexions, lectura/acció, lògica i demostració.",
    "check": "Pantalla i LED concorden amb la detecció.",
    "pins": "PIR P2; OLED P19/P20 a 3V3; RGB interns P16.",
    "links": [
      {
        "label": "Extensió oficial micro:shield",
        "url": "https://makecode.microbit.org/pkg/MakeAndLearn/pxt-microshield"
      },
      {
        "label": "Manual Micro:Shield",
        "url": "https://projectes.xtec.cat/digital/wp-content/uploads/usu2317/2024/02/Manual-d_us-micro_shield.pdf"
      }
    ]
  },
  "s42": {
    "materials": "Sonda d’humitat compatible; OLED; RGB interns",
    "steps": [
      "Connexions proposades: Sonda P0; OLED P19/P20 blaus 3V3; RGB P16.",
      "Calibra humitat sec/humit amb P0",
      "Inicialitza OLED i RGB P16",
      "Guarda la lectura en una variable",
      "Diferencia almenys tres trams i mostra text",
      "Canvia el color RGB segons el tram",
      "Comprova cada estat",
      "Comprova: Indicacions OLED i RGB coincideixen amb les lectures."
    ],
    "safety": "No submergeixis la placa ni interpretis 0–1023 com un percentatge exacte.",
    "materialStatus": "directe verificant versió",
    "assessment": "6 punts possibles, cota màxima 10/10. Valora proporcionalment connexions, lectura/acció, lògica i demostració.",
    "check": "Indicacions OLED i RGB coincideixen amb les lectures.",
    "pins": "Sonda P0; OLED P19/P20 blaus 3V3; RGB P16.",
    "links": [
      {
        "label": "Extensió oficial micro:shield",
        "url": "https://makecode.microbit.org/pkg/MakeAndLearn/pxt-microshield"
      },
      {
        "label": "Manual Micro:Shield",
        "url": "https://projectes.xtec.cat/digital/wp-content/uploads/usu2317/2024/02/Manual-d_us-micro_shield.pdf"
      }
    ]
  },
  "s43": {
    "materials": "TEMT6000; sonda d’humitat compatible; OLED; Microshield",
    "steps": [
      "Connexions proposades: Llum P0; humitat P1 analògic; OLED P19/P20 blaus 3V3.",
      "Comprova que els dos sensors admeten 3,3 V",
      "Connecta llum P0 i humitat P1, no comparteixen pin",
      "Connecta i inicialitza OLED I²C",
      "Guarda cadascuna de les lectures en una variable",
      "Mostra dades i dos avisos diferenciats",
      "Comprova cadascun per separat",
      "Comprova: Mostra dues mesures independents i llindars calibrats."
    ],
    "safety": "No cal usar P12 com analògic: P0 i P1 sí admeten ADC.",
    "materialStatus": "directe verificant versió",
    "assessment": "7 punts possibles, cota màxima 10/10. Valora proporcionalment connexions, lectura/acció, lògica i demostració.",
    "check": "Mostra dues mesures independents i llindars calibrats.",
    "pins": "Llum P0; humitat P1 analògic; OLED P19/P20 blaus 3V3.",
    "links": [
      {
        "label": "Extensió oficial micro:shield",
        "url": "https://makecode.microbit.org/pkg/MakeAndLearn/pxt-microshield"
      },
      {
        "label": "Manual Micro:Shield",
        "url": "https://projectes.xtec.cat/digital/wp-content/uploads/usu2317/2024/02/Manual-d_us-micro_shield.pdf"
      }
    ]
  },
  "s44": {
    "materials": "TEMT6000; OLED; Microshield",
    "steps": [
      "Connexions proposades: Llum P0; OLED P19/P20 blaus 3V3.",
      "Inicialitza OLED i dues variables suma i i",
      "Llegeix cinc cops P0 amb un bucle i suma",
      "Calcula mitjana = suma / 5",
      "Mostra a OLED el resultat",
      "Repeteix al prémer A sense acumular lectures antigues",
      "Comprova: La mitjana és coherent i canvia amb la llum."
    ],
    "safety": "La lectura P0 s’ha de fer amb el selector P0 actiu.",
    "materialStatus": "directe",
    "assessment": "5 punts possibles, cota màxima 9/10. Valora proporcionalment connexions, lectura/acció, lògica i demostració.",
    "check": "La mitjana és coherent i canvia amb la llum.",
    "pins": "Llum P0; OLED P19/P20 blaus 3V3.",
    "links": [
      {
        "label": "Extensió oficial micro:shield",
        "url": "https://makecode.microbit.org/pkg/MakeAndLearn/pxt-microshield"
      },
      {
        "label": "Manual Micro:Shield",
        "url": "https://projectes.xtec.cat/digital/wp-content/uploads/usu2317/2024/02/Manual-d_us-micro_shield.pdf"
      }
    ]
  },
  "s45": {
    "materials": "PIR; col·lisió; OLED; RGB integrats",
    "steps": [
      "Connexions proposades: PIR P2; col·lisió P1; OLED P19/P20 blaus 3V3; RGB P16.",
      "Connecta PIR, col·lisió i OLED",
      "Inicialitza OLED i RGB",
      "Defineix diferents estats segons P1 i P2",
      "Mostra un missatge i color diferent per cada situació",
      "Redueix reescriptures i comprova cada cas",
      "Comprova: Estat visual consistent amb les dues lectures."
    ],
    "safety": "P1/S1 i P2/S2 comparteixen el pin: no hi connectis servos.",
    "materialStatus": "directe",
    "assessment": "6 punts possibles, cota màxima 10/10. Valora proporcionalment connexions, lectura/acció, lògica i demostració.",
    "check": "Estat visual consistent amb les dues lectures.",
    "pins": "PIR P2; col·lisió P1; OLED P19/P20 blaus 3V3; RGB P16.",
    "links": [
      {
        "label": "Extensió oficial micro:shield",
        "url": "https://makecode.microbit.org/pkg/MakeAndLearn/pxt-microshield"
      },
      {
        "label": "Manual Micro:Shield",
        "url": "https://projectes.xtec.cat/digital/wp-content/uploads/usu2317/2024/02/Manual-d_us-micro_shield.pdf"
      }
    ]
  },
  "s46": {
    "materials": "LM35 del kit; alimentació de fabricant verificada; Microshield",
    "steps": [
      "Connexions proposades: Senyal analògic P0; G a GND; alimentació nominal del mòdul segons fitxa.",
      "Demana verificació prèvia de model i tensió",
      "Alimenta el LM35 segons les especificacions",
      "Confirma que S no supera 3,3 V abans de connectar a P0",
      "Llegeix P0 i calcula °C a partir de 10 mV/°C",
      "Contrasta amb temperatura de referència",
      "Comprova: La conversió a graus és coherent amb el voltatge del senyal."
    ],
    "safety": "NO muntar sense verificar tensió d’alimentació i senyal. P12 no és analògic.",
    "materialStatus": "només amb verificació de tensió docent",
    "assessment": "2 punts possibles, cota màxima 6/10. Valora proporcionalment connexions, lectura/acció, lògica i demostració.",
    "check": "La conversió a graus és coherent amb el voltatge del senyal.",
    "pins": "Senyal analògic P0; G a GND; alimentació nominal del mòdul segons fitxa.",
    "links": [
      {
        "label": "Extensió oficial micro:shield",
        "url": "https://makecode.microbit.org/pkg/MakeAndLearn/pxt-microshield"
      },
      {
        "label": "Manual Micro:Shield",
        "url": "https://projectes.xtec.cat/digital/wp-content/uploads/usu2317/2024/02/Manual-d_us-micro_shield.pdf"
      }
    ]
  },
  "s47": {
    "materials": "3 KS0050; 3 adaptadors de nivell TTL 5→3,3 V; Microshield",
    "steps": [
      "Connexions proposades: P12/P13/P14 blaus a 5 V; cada sortida S passa per adaptador.",
      "Prepara tres adaptadors de nivell de senyal",
      "Connecta sensors a P12, P13 i P14 amb V=5V",
      "Llegeix cada sortida digital després de l’adaptació",
      "Mostra el patró i classifica esquerra/centre/dreta",
      "Prova amb cinta negra i fons clar",
      "Comprova: Distingeix almenys tres posicions de línia."
    ],
    "safety": "No connectis cap senyal TTL 5 V directament a la micro:bit; amb blaus a 5V no connectis l’OLED de 3V3.",
    "materialStatus": "només amb tres adaptadors de nivell",
    "assessment": "5 punts possibles, cota màxima 9/10. Valora proporcionalment connexions, lectura/acció, lògica i demostració.",
    "check": "Distingeix almenys tres posicions de línia.",
    "pins": "P12/P13/P14 blaus a 5 V; cada sortida S passa per adaptador.",
    "links": [
      {
        "label": "Extensió oficial micro:shield",
        "url": "https://makecode.microbit.org/pkg/MakeAndLearn/pxt-microshield"
      },
      {
        "label": "Manual Micro:Shield",
        "url": "https://projectes.xtec.cat/digital/wp-content/uploads/usu2317/2024/02/Manual-d_us-micro_shield.pdf"
      }
    ]
  },
  "s48": {
    "materials": "Tira WS2812B 30 LED; cable corrector GVS; font de 5 V adequada",
    "steps": [
      "Connexions proposades: GND comú; +5 V de font adequada; DIN cap al senyal compatible, p. ex. P13 amb adaptació verificada.",
      "Revisa cable corrector del kit que respecti G/V/S",
      "Comprova font d’alimentació 5 V adequada a la tira",
      "Connecta DIN d’entrada amb senyal compatible",
      "Prova a baixa brillantor i pocs LEDs",
      "Fes dos colors i una animació senzilla",
      "Comprova: La tira mostra els colors i no provoca caiguda de tensió."
    ],
    "safety": "30 LEDs poden consumir força corrent: mai alimentar-los amb un pin de 3,3 V.",
    "materialStatus": "només amb cable corrector i font 5 V",
    "assessment": "2 punts possibles, cota màxima 6/10. Valora proporcionalment connexions, lectura/acció, lògica i demostració.",
    "check": "La tira mostra els colors i no provoca caiguda de tensió.",
    "pins": "GND comú; +5 V de font adequada; DIN cap al senyal compatible, p. ex. P13 amb adaptació verificada.",
    "links": [
      {
        "label": "Extensió oficial micro:shield",
        "url": "https://makecode.microbit.org/pkg/MakeAndLearn/pxt-microshield"
      },
      {
        "label": "Manual Micro:Shield",
        "url": "https://projectes.xtec.cat/digital/wp-content/uploads/usu2317/2024/02/Manual-d_us-micro_shield.pdf"
      }
    ]
  },
  "s49": {
    "materials": "HC-SR04; adaptador de nivell 5→3,3 V; Microshield",
    "steps": [
      "Connexions proposades: TRIG P14, ECHO P15 via adaptador; VCC 5 V; GND comú.",
      "Confirma el reductor de 5 a 3,3 V per a ECHO",
      "Connecta alimentació 5 V i GND comú",
      "TRIG P14 i ECHO P15 adaptat",
      "Llegeix temps de pols i calcula distància",
      "Mostra i compara 5 i 20 cm",
      "Comprova: Les mesures varien amb la distància."
    ],
    "safety": "No connectis ECHO directament: pot emetre 5 V.",
    "materialStatus": "només amb adaptador de nivell",
    "assessment": "2 punts possibles, cota màxima 6/10. Valora proporcionalment connexions, lectura/acció, lògica i demostració.",
    "check": "Les mesures varien amb la distància.",
    "pins": "TRIG P14, ECHO P15 via adaptador; VCC 5 V; GND comú.",
    "links": [
      {
        "label": "Extensió oficial micro:shield",
        "url": "https://makecode.microbit.org/pkg/MakeAndLearn/pxt-microshield"
      },
      {
        "label": "Manual Micro:Shield",
        "url": "https://projectes.xtec.cat/digital/wp-content/uploads/usu2317/2024/02/Manual-d_us-micro_shield.pdf"
      }
    ]
  },
  "s50": {
    "materials": "Col·lisió KS0021; Microshield i brunzidor",
    "steps": [
      "Connexions proposades: Col·lisió P1; brunzidor integrat P0; selector P0/BUZZER=BUZZER.",
      "Connecta col·lisió a P1",
      "Posa selector en BUZZER",
      "Si P1=0 toca un to d’alerta",
      "Si P1=1 atura la música",
      "Evita reactivar el so contínuament",
      "Comprova: El so només s’activa durant el contacte."
    ],
    "safety": "P0 reservat pel brunzidor, no hi connectis cap sensor.",
    "materialStatus": "directe",
    "assessment": "4 punts possibles, cota màxima 8/10. Valora proporcionalment connexions, lectura/acció, lògica i demostració.",
    "check": "El so només s’activa durant el contacte.",
    "pins": "Col·lisió P1; brunzidor integrat P0; selector P0/BUZZER=BUZZER.",
    "links": [
      {
        "label": "Extensió oficial micro:shield",
        "url": "https://makecode.microbit.org/pkg/MakeAndLearn/pxt-microshield"
      },
      {
        "label": "Manual Micro:Shield",
        "url": "https://projectes.xtec.cat/digital/wp-content/uploads/usu2317/2024/02/Manual-d_us-micro_shield.pdf"
      }
    ]
  },
  "s51": {
    "materials": "TEMT6000; Microshield; RGB integrats",
    "steps": [
      "Connexions proposades: Llum P0 (selector P0); RGB P16.",
      "Llegeix P0 i estableix dos llindars propers",
      "Guarda un estat FOSC o CLAR",
      "Canvia a FOSC quan baixi del primer llindar",
      "Torna a CLAR només si supera el llindar alt",
      "Controla el RGB segons l’estat",
      "Comprova: El RGB no oscil·la quan la lectura queda entre llindars."
    ],
    "safety": "Dos llindars diferents eviten canvis constants.",
    "materialStatus": "directe",
    "assessment": "5 punts possibles, cota màxima 9/10. Valora proporcionalment connexions, lectura/acció, lògica i demostració.",
    "check": "El RGB no oscil·la quan la lectura queda entre llindars.",
    "pins": "Llum P0 (selector P0); RGB P16.",
    "links": [
      {
        "label": "Extensió oficial micro:shield",
        "url": "https://makecode.microbit.org/pkg/MakeAndLearn/pxt-microshield"
      },
      {
        "label": "Manual Micro:Shield",
        "url": "https://projectes.xtec.cat/digital/wp-content/uploads/usu2317/2024/02/Manual-d_us-micro_shield.pdf"
      }
    ]
  },
  "s52": {
    "materials": "Microshield; guia de connexions; fotografia pròpia",
    "steps": [
      "Connexions proposades: P1=S1, P2=S2, P8=S8; OLED P19/P20; RGB P16.",
      "Identifica G, V i S sobre la placa",
      "Marca les diferències entre GVS 3,3 V i blaus seleccionables",
      "Explica per què P1 i S1 comparteixen recurs",
      "Marca P19/P20 de l’OLED i P16 intern",
      "Adjunta esquema i una explicació",
      "Comprova: Explica correctament els pins sense fer connexions insegures."
    ],
    "safety": "No cal connectar cap mòdul en aquesta activitat.",
    "materialStatus": "directe",
    "assessment": "1 punt possibles, cota màxima 5/10. Valora proporcionalment connexions, lectura/acció, lògica i demostració.",
    "check": "Explica correctament els pins sense fer connexions insegures.",
    "pins": "P1=S1, P2=S2, P8=S8; OLED P19/P20; RGB P16.",
    "links": [
      {
        "label": "Extensió oficial micro:shield",
        "url": "https://makecode.microbit.org/pkg/MakeAndLearn/pxt-microshield"
      },
      {
        "label": "Manual Micro:Shield",
        "url": "https://projectes.xtec.cat/digital/wp-content/uploads/usu2317/2024/02/Manual-d_us-micro_shield.pdf"
      }
    ]
  },
  "s53": {
    "materials": "Qualsevol sensor compatible del kit; Microshield",
    "steps": [
      "Connexions proposades: Selecciona un GVS segur segons el sensor concret.",
      "Escull un sensor disponible i identifica si és digital o analògic",
      "Explica el pin i la tensió",
      "Llegeix la dada en MakeCode",
      "Mostra el valor o estat i comprova dues condicions",
      "Documenta el muntatge",
      "Comprova: S’ha de poder comprovar el funcionament amb el sensor real."
    ],
    "safety": "Si uses un mòdul 5 V, prepara abans l’adaptació requerida.",
    "materialStatus": "lliure amb component compatible",
    "assessment": "2 punts possibles, cota màxima 6/10. Valora proporcionalment connexions, lectura/acció, lògica i demostració.",
    "check": "S’ha de poder comprovar el funcionament amb el sensor real.",
    "pins": "Selecciona un GVS segur segons el sensor concret.",
    "links": [
      {
        "label": "Extensió oficial micro:shield",
        "url": "https://makecode.microbit.org/pkg/MakeAndLearn/pxt-microshield"
      },
      {
        "label": "Manual Micro:Shield",
        "url": "https://projectes.xtec.cat/digital/wp-content/uploads/usu2317/2024/02/Manual-d_us-micro_shield.pdf"
      }
    ]
  },
  "s54": {
    "materials": "OLED, NeoPixel P16, brunzidor o servo/motor amb alimentació verificada",
    "steps": [
      "Connexions proposades: Tria els ports segons el component que facis servir.",
      "Escull un actuador del kit disponible",
      "Explica la connexió i els pins",
      "Crea almenys dues sortides diferents",
      "Fes una demostració",
      "Entrega el programa i documentació",
      "Comprova: L’actuador reacciona a dues ordres o estats."
    ],
    "safety": "Servos i motors exigeixen alimentació adequada i cable adaptat.",
    "materialStatus": "lliure amb component compatible",
    "assessment": "2 punts possibles, cota màxima 6/10. Valora proporcionalment connexions, lectura/acció, lògica i demostració.",
    "check": "L’actuador reacciona a dues ordres o estats.",
    "pins": "Tria els ports segons el component que facis servir.",
    "links": [
      {
        "label": "Extensió oficial micro:shield",
        "url": "https://makecode.microbit.org/pkg/MakeAndLearn/pxt-microshield"
      },
      {
        "label": "Manual Micro:Shield",
        "url": "https://projectes.xtec.cat/digital/wp-content/uploads/usu2317/2024/02/Manual-d_us-micro_shield.pdf"
      }
    ]
  },
  "s55": {
    "materials": "Kit real de sensors i actuadors; Microshield; material auxiliar verificat",
    "steps": [
      "Connexions proposades: Ports a escollir i justificar; no compartir pins incompatibles.",
      "Dissenya una idea original i una necessitat real",
      "Utilitza almenys dos sensors o lectures i dos tipus de sortida",
      "Fes servir variables, càlculs, decisions i bucles funcionals",
      "Implementa el muntatge sense conflictes de pins",
      "Afegeix calibració, estat i condició de sortida o aturada",
      "Prova tres situacions i documenta errors i millores",
      "Explica i comparteix tots els programes",
      "Comprova: La rúbrica completa de 8 punts exigeix idea, complexitat, entrades, sortides, variables, càlculs, bucles i fiabilitat."
    ],
    "safety": "No s’accepten connexions insegures; adaptar components de 5 V quan calgui.",
    "materialStatus": "lliure avançat, compatibilitat obligatòria",
    "assessment": "8 punts possibles, cota màxima 10/10. Valora proporcionalment connexions, lectura/acció, lògica i demostració.",
    "check": "La rúbrica completa de 8 punts exigeix idea, complexitat, entrades, sortides, variables, càlculs, bucles i fiabilitat.",
    "pins": "Ports a escollir i justificar; no compartir pins incompatibles.",
    "links": [
      {
        "label": "Extensió oficial micro:shield",
        "url": "https://makecode.microbit.org/pkg/MakeAndLearn/pxt-microshield"
      },
      {
        "label": "Manual Micro:Shield",
        "url": "https://projectes.xtec.cat/digital/wp-content/uploads/usu2317/2024/02/Manual-d_us-micro_shield.pdf"
      }
    ]
  }
};
const previous=window.ROBOTIA_REPTE_GUIDES||{};
window.ROBOTIA_REPTE_GUIDES={...previous,...guides};
window.ROBOTIA_SENSORS_V4={revisions,additions,revision:"microshield-2026-11-04"};
})();