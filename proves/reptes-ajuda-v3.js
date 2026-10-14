window.ROBOTIA_REPTE_GUIDES = {
  "f27": {
    "materials": "Editor de diagrames",
    "steps": [
      "Llegeix una temperatura C.",
      "Calcula Fahrenheit amb F = C × 9/5 + 32.",
      "Mostra F i acaba. Prova amb 0 ºC (32 ºF) i 100 ºC (212 ºF)."
    ]
  },
  "f28": {
    "materials": "Editor de diagrames",
    "steps": [
      "Demana un nombre.",
      "Si és negatiu, avisa que no pots calcular-ne l'arrel real.",
      "Si és zero o positiu, calcula i mostra'n l'arrel."
    ]
  },
  "f29": {
    "materials": "Editor de diagrames",
    "steps": [
      "Inicialitza la variable intents=0.",
      "Demana la clau i comprova si és correcta.",
      "Si falla, augmenta intents i repeteix; si arriba a tres, bloqueja."
    ]
  },
  "f30": {
    "materials": "Editor de diagrames",
    "steps": [
      "Inicialitza el comptador.",
      "Mostra un nombre parell i incrementa el comptador.",
      "Repeteix fins que hagis mostrat 20 nombres."
    ]
  },
  "m9": {
    "materials": "micro:bit i MakeCode (simulador o placa)",
    "steps": [
      "Crea un projecte MakeCode amb el teu nom.",
      "Mostra el nom al bloc «en iniciar».",
      "Substitueix-lo per «per sempre» i observa la diferència.",
      "Comparteix l'enllaç propi del projecte."
    ]
  },
  "m10": {
    "materials": "micro:bit compatible amb so i MakeCode",
    "steps": [
      "Programa «en prémer botó A» per mostrar una cara contenta.",
      "Programa «en prémer botó B» per mostrar una cara trista.",
      "Afegeix una melodia a cada acció i compara diferents BPM."
    ]
  },
  "m11": {
    "materials": "micro:bit i MakeCode",
    "steps": [
      "Crea la variable comptador i inicialitza-la a zero.",
      "En prémer A suma 1, en prémer B resta 1.",
      "Mostra el valor i comprova diverses pulsacions."
    ]
  },
  "m12": {
    "materials": "2 micro:bit, 2 programes MakeCode",
    "steps": [
      "A les dues plaques, fixa el mateix grup de ràdio (p. ex. 1).",
      "Emissor: crea una variable que amb A suma i amb B resta.",
      "En prémer A+B, envia el valor numèric.",
      "Receptor: «en rebre número» mostra'l a la matriu LED.",
      "Entrega tots dos programes."
    ]
  },
  "m13": {
    "materials": "2 micro:bit, ràdio i MakeCode",
    "steps": [
      "Crea un comandament que enviï números de moviment per ràdio.",
      "Al receptor, assigna variables X i Y per als punts del LED.",
      "Quan arribi una ordre, actualitza la posició i dibuixa el cursor."
    ]
  },
  "m14": {
    "materials": "2 micro:bit i un projecte de cursor per ràdio",
    "steps": [
      "Amplia el programa de cursor.",
      "Afegeix el reinici quan reps l'ordre corresponent.",
      "Evita valors de coordenades fora de 0..4.",
      "Prova les accions i les variants."
    ]
  },
  "s1": {
    "materials": "Micro:Shield, sensor PIR, tira NeoPixel, cables",
    "steps": [
      "Afegeix les extensions tinker-kit i NeoPixel.",
      "Connecta el sensor PIR al pin P1 i NeoPixel (10 LED) al pin P8 de la Micro:Shield, segons la guia.",
      "Comprova GND a GND; configura la tira de 10 LED.",
      "Si hi ha moviment, mostra vermell; si no, verd."
    ]
  },
  "s2": {
    "materials": "Micro:Shield, sensor d'humitat, NeoPixel, cables",
    "steps": [
      "Afegeix les extensions dels sensors i NeoPixel.",
      "Crea la variable Humitat i desa-hi el valor llegit.",
      "Mostra el valor i compara'l amb el llindar triat.",
      "Canvia el color de NeoPixel segons el resultat."
    ]
  },
  "s3": {
    "materials": "Micro:Shield, ultrasons, servo, cables i barrera",
    "steps": [
      "Connecta el sensor d'ultrasons segons els pins del seu esquema.",
      "Connecta el servo al connector S2 de la guia.",
      "Si la distància és inferior a 10 cm, obre la barrera.",
      "Si no, torna a la posició inicial.",
      "Demostra el funcionament amb un objecte."
    ]
  },
  "s4": {
    "materials": "2 micro:bit, Micro:Shield, servo, alimentació i ràdio",
    "steps": [
      "Configura el mateix grup ràdio a les dues plaques.",
      "L'emissora detecta la inclinació dreta o esquerra.",
      "A la receptora, el servo es mou a 30° quan inclines a la dreta, i a 90° quan inclines a l'esquerra.",
      "Entrega els dos programes i mostra el moviment."
    ]
  },
  "s5": {
    "materials": "micro:bit amb micròfon, Micro:Shield, LED verd i vermell",
    "steps": [
      "Connecta el LED vermell a P0 i el verd a P1, amb GND correcte.",
      "Al bucle per sempre llegeix el nivell de so (0–255).",
      "Exemple de llindar: 80. Per sota: P1 encès i P0 apagat.",
      "Per sobre: P0 encès i P1 apagat.",
      "Comprova el sensor amb sons diferents."
    ]
  },
  "s8": {
    "materials": "micro:bit, Micro:Shield, LED extern i cables",
    "steps": [
      "Comprova el tipus de LED i el pin d'alimentació.",
      "Alterna el pin digital entre 1 i 0 amb pauses.",
      "Prova diferents períodes de parpelleig i filma el resultat."
    ]
  },
  "s9": {
    "materials": "micro:bit, LED extern, cables",
    "steps": [
      "Connecta correctament el LED a un pin digital.",
      "En prémer A encén-lo i en prémer B apaga'l.",
      "Comprova que les accions no s'inverteixin."
    ]
  },
  "s10": {
    "materials": "micro:bit amb micròfon, LED extern, Micro:Shield",
    "steps": [
      "Llegeix el nivell de so o detecta soroll fort.",
      "Defineix un llindar segons el soroll de l'aula.",
      "Quan es supera, encén o fes parpellejar el LED.",
      "Compara diverses intensitats."
    ]
  },
  "s11": {
    "materials": "micro:bit i Micro:Shield amb brunzidor",
    "steps": [
      "Identifica el brunzidor de la Micro:Shield i el seu interruptor.",
      "Activa el brunzidor amb un botó o una condició.",
      "Tria una durada breu i prova quan s'ha d'aturar."
    ]
  },
  "s12": {
    "materials": "Micro:Shield, servo, bateria i cables",
    "steps": [
      "Connecta el servo al connector adequat i comprova l'alimentació.",
      "En prémer A, mou-lo a un angle, per exemple 30°.",
      "En prémer B, mou-lo a 90°.",
      "Mostra'n el moviment de manera repetible."
    ]
  },
  "s13": {
    "materials": "Micro:Shield, sensor d'ultrasons, avís LED o brunzidor",
    "steps": [
      "Connecta el sensor d'ultrasons segons l'esquema del fabricant.",
      "Llegeix la distància en cm.",
      "Si és inferior a 10 cm, activa l'avís.",
      "Si no, apaga'l.",
      "Prova-ho a dues distàncies diferents."
    ]
  },
  "s14": {
    "materials": "Micro:Shield, motor DC, alimentació i controlador",
    "steps": [
      "Connecta el motor DC al port específic de motors, mai a un pin de senyal.",
      "Verifica la font d'alimentació i la bateria.",
      "Programa avançar, parar i invertir el sentit.",
      "Prova-ho amb el motor lliure abans de muntar les rodes."
    ]
  },
  "rb0": {
    "materials": "2 micro:bit, Micro:Shield, motors DC, xassís, rodes i bateria",
    "steps": [
      "Construeix el xassís i fixa els motors.",
      "Programa dos micro:bit amb el mateix grup de ràdio.",
      "Segons la pauta: B endavant, A parar, A+B enrere i inclinacions per girar.",
      "Comprova totes les ordres abans de decorar el cotxe."
    ]
  },
  "rb2": {
    "materials": "2 micro:bit, Micro:Shield, actuador, cables i material per a l'estructura",
    "steps": [
      "Inventa un truc i dibuixa com funcionarà.",
      "Programa una placa emissora i una receptora per ràdio.",
      "Fes activar un actuador i integra'l en una estructura original.",
      "Documenta la construcció i prepara una presentació grupal d'uns 5 minuts."
    ]
  },
  "m15": {
    "materials": "Dues micro:bit, dos programes MakeCode (simulador de ràdio o plaques)",
    "steps": [
      "Crea dos projectes diferents: EMISSOR i RECEPTOR.",
      "A «en iniciar», estableix a tots dos el mateix grup de ràdio (exemple 7).",
      "EMISSOR: quan prems A, envia la cadena «HOLA»; quan prems B, envia «ADEU».",
      "RECEPTOR: al bloc «en rebre cadena», mostra el text rebut.",
      "Prova les dues ordres i desa l'enllaç o el fitxer .hex de cadascun."
    ]
  },
  "m16": {
    "materials": "Dues micro:bit i dos projectes MakeCode",
    "steps": [
      "Al començament dels dos programes, configura el mateix grup de ràdio.",
      "COMANDAMENT: A envia el número 1; B envia 2; A+B envia 3.",
      "RECEPTOR: en rebre número, si és 1 mostra cara contenta; si és 2, trista; si és 3, cor.",
      "Comprova les tres respostes, amb les plaques separades i sense cables.",
      "Entrega els dos programes i una prova visual."
    ]
  },
  "m17": {
    "materials": "Dues micro:bit, MakeCode, acceleròmetre integrat",
    "steps": [
      "Fixa el mateix grup de ràdio en totes dues plaques.",
      "Al comandament, llegeix l'eix X de l'acceleròmetre cada 150–250 ms.",
      "Si X < −300 envia «ESQUERRA»; si X > 300 envia «DRETA»; si no envia «CENTRE». Els llindars són orientatius.",
      "Al receptor, mostra una fletxa esquerra, dreta o un punt segons l'ordre.",
      "Prova moviments suaus i explica com evites enviar senyals confusos quan X està prop del llindar."
    ]
  },
  "m18": {
    "materials": "Dues micro:bit V2 amb altaveu (o receptor amb altaveu compatible), MakeCode",
    "steps": [
      "Configura el mateix grup de ràdio a les dues plaques.",
      "A l'emissor, A envia el número 262 (Do4) i B envia 294 (Re4).",
      "Al receptor, quan rebi el número, reprodueix aquesta freqüència durant 1/4 de segon amb els blocs de música.",
      "Afegeix A+B per enviar 330 (Mi4) i prova una seqüència musical.",
      "Entrega els dos programes i una demostració; no confonguis enviar números amb enviar so per ràdio."
    ]
  },
  "s15": {
    "materials": "Dues micro:bit, Micro:Shield, LED extern o tira NeoPixel, cables i alimentació adequada",
    "steps": [
      "Connecta el LED extern al port GVS adequat; si és NeoPixel, consulta la fitxa (exemple P8 i 10 LED).",
      "A les dues micro:bit configura el mateix grup de ràdio.",
      "EMISSOR: A envia ON i B envia OFF.",
      "RECEPTOR: en rebre ON, encén l'actuador; en rebre OFF, apaga'l.",
      "Prova el comandament a distància i grava el circuit i el resultat."
    ]
  },
  "s16": {
    "materials": "Dues micro:bit, Micro:Shield, servo, bateria i cables",
    "steps": [
      "Connecta el servo al port específic per a servos de la Micro:Shield, orientant correctament GND, alimentació i senyal.",
      "Fixa el mateix grup de ràdio als dos programes.",
      "EMISSOR: A envia «OBRE» i B envia «TANCA».",
      "RECEPTOR: segons l'ordre, mou el servo a 30° o 90° (ajusta els angles segons la mecànica).",
      "Prova les dues posicions amb el servo descarregat, després fixa l'actuador al projecte.",
      "Entrega els dos programes, foto del connector i vídeo."
    ]
  },
  "s17": {
    "materials": "Dues micro:bit, PIR, Micro:Shield, LED o receptor V2 amb so",
    "steps": [
      "Connecta el sensor PIR a un GVS compatible (a la guia bàsica, P1). Comprova la tensió i orientació.",
      "EMISSOR (amb PIR): fixa grup de ràdio i llegeix si hi ha moviment. Envia MOVIMENT o REPOS.",
      "RECEPTOR: quan rep MOVIMENT mostra un símbol d'alerta i activa so o LED; amb REPOS ho apaga.",
      "Afegeix un petit retard i comprova què passa sense moviment.",
      "Prova el muntatge mentre la segona micro:bit és lluny del sensor."
    ]
  },
  "s18": {
    "materials": "Dues micro:bit, Micro:Shield amb controlador, xassís, dos motors DC, bateria i cables",
    "steps": [
      "Primer connecta els motors DC als ports de motor del controlador; mai directament als pins GVS.",
      "Configura ràdio amb el mateix grup en comandament i robot.",
      "EMISSOR: detecta inclinació endavant, enrere i dreta/esquerra; envia ordres de text o nombre.",
      "RECEPTOR: associa cada ordre al control dels dos motors; inclou sempre STOP.",
      "Afegeix un sistema d'aturada si durant uns segons no arriba cap missatge nou.",
      "Prova amb les rodes aixecades, després a velocitat baixa sobre el terra.",
      "Entrega els dos programes i el vídeo de control remot."
    ]
  },
  "s19": {
    "materials": "Dues micro:bit, Micro:Shield, sensor d'ultrasons compatible, servo, alimentació i barrera lleugera",
    "steps": [
      "Connecta ultrasons segons el model (TRIG i ECHO separats si correspon) i el servo al port adequat.",
      "Configura el mateix grup ràdio en comandament i receptor.",
      "COMANDAMENT: A activa AUTO, B envia STOP.",
      "RECEPTOR: amb AUTO activat, llegeix la distància i obre si és inferior a 10 cm; en cas contrari tanca.",
      "Quan arriba STOP, desactiva AUTO i posa el servo en una posició segura.",
      "Demostra AUTO amb dos objectes a distàncies diferents i l'aturada remota.",
      "Entrega els dos programes, l'esquema del sensor i un vídeo del sistema."
    ]
  }
};