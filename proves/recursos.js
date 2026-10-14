/* Recursos públics d'aprenentatge ROBOTIA: editables sense canviar els portafolis. */
window.ROBOTIA_RECURSOS = Object.freeze({
  categories: {
    flux: {
      title: 'Diagrames de flux',
      steps: ['Llegeix el repte i descompon-lo en passos senzills.', 'Col·loca INICI i les accions en ordre.', 'Afegeix decisions SÍ/NO o bucles quan calgui.', 'Comprova diferents casos abans de donar-lo per acabat.'],
      links: [{label:'Aprendre a pensar amb algoritmes',url:'https://microbit.org/projects/make-it-code-it/'}]
    },
    microbit: {
      title: 'Programació micro:bit',
      steps: ['Obre MakeCode i crea el projecte.', 'Programa i prova-ho al simulador.', 'Si tens una placa, descarrega i executa el programa.', 'Fes Compartir a MakeCode i enganxa l’enllaç propi del projecte, o adjunta un fitxer .hex.'],
      links: [{label:'Obrir MakeCode',url:'https://makecode.microbit.org/'},{label:'Blocs i instruccions MakeCode',url:'https://makecode.microbit.org/reference'},{label:'Botons, gestos i sensors integrats',url:'https://makecode.microbit.org/reference/input'},{label:'Ràdio entre plaques',url:'https://makecode.microbit.org/reference/radio'}]
    },
    sensors: {
      title: 'Sensors i actuadors externs',
      steps: ['Identifica el sensor o actuador i la seva funció.', 'Consulta l’esquema del component i els seus pins.', 'Connecta GND i alimentació correctament amb la placa desconnectada.', 'Programa l’entrada o la sortida i prova-la.', 'Entrega el programa més una foto, esquema o vídeo del muntatge.'],
      links: [{label:'Pins i connexions MakeCode',url:'https://makecode.microbit.org/reference/pins'},{label:'Projectes amb micro:bit',url:'https://microbit.org/projects/make-it-code-it/'}]
    },
    robot: {
      title: 'Projecte final del robot',
      steps: ['Dissenya el robot i reparteix les tasques del grup.', 'Prova cada motor o sensor per separat.', 'Integra els mòduls i documenta les proves.', 'Enregistra una demostració final i explica què heu millorat.'],
      links: [{label:'Projectes micro:bit',url:'https://microbit.org/projects/make-it-code-it/'},{label:'Programació MakeCode',url:'https://makecode.microbit.org/'}]
    }
  },
  challenges: {
    m7: {tip:'Per al semàfor, comprova la seqüència i els temps d’espera entre colors.'},
    m6: {tip:'Prova cada botó per separat i després tots dos alhora.'},
    s0: {tip:'Llegeix l’etiqueta del sensor i comprova quin pin utilitza.'},
    r0: {tip:'Fes una prova simple del motor abans d’integrar tot el robot.'}
  },
  security: 'No connectis motors DC directament als pins de la micro:bit. Fes servir el controlador o la placa adequada i comprova l’alimentació. Comparteix el projecte, no només l’adreça de l’editor.'
});
