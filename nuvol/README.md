# ROBOTIA · Núvol — versió de proves

**ATENCIÓ:** encara cal autoritzar i desplegar el servei amb el compte institucional. El codi està preparat i s'ha provat amb un Drive simulat, però no existeix cap desplegament real ni s'han provat les polítiques de l'institut. No posar dades reals d'alumnes en aquesta carpeta de desenvolupament.

## Què es conserva

El codi de v0.13, l'editor, les notes provisionals, els reptes i els fitxers `.robotia` / `.robotiaportfolio` no es modifiquen. S'hi afegeix un panell independent al portafoli. La branca de seguretat `backup/abans-nuvol-2026-09-20` conserva la versió pública original. A GitHub, la versió en desenvolupament és `dev/nuvol`. L'aplicació pública a l'arrel no s'ha de substituir fins a acabar les proves.

## Pas 1 — Administració del centre

Abans d'activar el servei per a alumnes, confirmeu amb el responsable TIC / protecció de dades del centre que es pot usar aquest flux de dades i que la política de comptes permet Google Identity Services i Apps Script. El servei ha de desplegar-se amb `jlesan@instituticaria.cat`. La carpeta `ROBOTIA - Desenvolupament` compartida amb AC Quimera només és per a proves fictícies, NO per dades reals.

## Pas 2 — Google Identity Services

Des del compte institucional autoritzat, a Google Cloud Console, creeu o seleccioneu un projecte i configureu l'aplicació d'OAuth com a **interna** (si està disponible al Workspace), després creeu un **Client ID de tipus Aplicació web**. A Orígens JavaScript autoritzats indiqueu només `https://lesan2.github.io` (sense `/Robotia/`). Guardeu l'ID del client (acaba en `.apps.googleusercontent.com`). No cal compartir cap secret del client. Si el centre no permet crear clients OAuth, cal que l'administrador ho faci o autoritzi l'app.

## Pas 3 — Apps Script

Obriu `https://script.google.com/home/projects/create` iniciant sessió com `jlesan@instituticaria.cat`. Copieu **tot** `nuvol/Code.gs` com a codi del projecte. Creeu un fitxer HTML anomenat **Bridge** (sense `.html` al nom dins de l'editor) i copieu-hi **tot** `nuvol/Bridge.html`.

A Configuració del projecte > Propietats del script afegiu:

* `ROBOTIA_FOLDER_ID`: `1b0n_u--Aea_p5stfi664ec00fcq-1_2Q` (carpeta de desenvolupament fictícia).
* `ROBOTIA_CLIENT_ID`: el Client ID OAuth del pas anterior.

Desplegueu > Desplegament nou > Aplicació web: executar **com a mi** (el compte institucional que té accés a la carpeta). Per provar en el centre, escolliu accés per als comptes del domini institucional si aquesta opció hi és; eviteu `només jo` si han d'accedir-hi altres usuaris en el futur. Autoritzeu Drive i la connexió externa de tokeninfo quan Google ho sol·liciti. Copieu l'URL del desplegament que acaba en `/exec` (no el `/dev`).

## Pas 4 — Connectar la versió de proves

Al fitxer `proves/nuvol/config.js` de GitHub de la branca `main` (només la ruta de proves; **no** substituïu `index.html` de l'arrel), empleneu:

```
window.ROBOTIA_CLOUD_CONFIG = {
  clientId: 'EL_TEUS_CLIENT_ID.apps.googleusercontent.com',
  bridgeUrl: 'https://script.google.com/macros/s/EL_TEU_DESPLEGAMENT/exec'
};
```

Després visiteu `https://lesan2.github.io/Robotia/proves/`, entreu amb `jlesan@instituticaria.cat` i feu una activitat fictícia. Premeu «Desar al núvol». Comproveu que apareix una carpeta sota `USUARIS_PROVES` a `ROBOTIA - Desenvolupament`. Amb un altre navegador o ordinador, torneu a iniciar sessió i premeu «Carregar / fusionar». Verifiqueu que el diagrama apareix intacte.

## Prova de parelles

Amb dos comptes institucionals de prova AUTORITZATS pel centre, deseu primer un repte de prova amb l'alumne A, compartiu-lo amb el correu B i tanqueu la pestanya. Entra B l'endemà, desa el seu portafoli, obre «Invitacions», accepta i «Carregar / fusionar». B només rep aquesta activitat, no el portafoli complet. Les versions posteriors de la mateixa activitat viuen a `ACTIVITATS_COMPARTIDES_PROVES` i requereixen recuperar la versió més recent abans de modificar-la. Si hi ha una versió antiga en un altre dispositiu, la sincronització es bloqueja i descarrega una còpia local en lloc de sobreescriure dades.

## Límit conegut

No hi ha edició simultània en temps real; hi ha desament automàtic mentre la pestanya està activa i recuperació en iniciar sessió de nou. Quan hi ha dues sessions obertes, el control de revisions obliga a fusionar els canvis. La versió de proves encara no integra qualificacions a Google Sheets; aquesta funcionalitat s'ha deixat fora deliberadament del mòdul mínim de guardar/carregar i compartir. No utilitzeu la carpeta compartida amb AC Quimera per a notes de l'alumnat.
