# Waldorfski dječji vrtić Duga: sajt

Običan statički sajt (HTML, CSS, JS). Nema instalacije, nema build koraka. Radi na GitHub Pagesu.

## Postavljanje na GitHub Pages

1. Na github.com napravi novi repozitorij (npr. `vrtic-duga`), Public.
2. Klikni **Add file → Upload files** i prevuci SVE iz ovog zipa (index.html, assets, favicon.svg, 404.html, robots.txt, .nojekyll). Fajl `.nojekyll` je skriven na nekim sistemima; ako ga ne vidiš, nije bitno, sajt radi i bez njega.
3. **Commit changes**.
4. **Settings → Pages → Source: Deploy from a branch → Branch: main, folder: / (root) → Save**.
5. Za minut-dva sajt je na `https://TVOJ-USERNAME.github.io/vrtic-duga/`.

Putanje su relativne, pa radi i na podputanji (`/vrtic-duga/`) i na vlastitoj domeni.

## Forma "Dogovorite posjet"

Sajt nema server. Zato forma radi ovako:

- **Sada:** na "Zakažite posjet" otvara se e-mail program s popunjenom porukom za info@waldorfskivrticduga.hr. Roditelj samo pošalje.
- **Pravo slanje bez e-mail programa:** napravi besplatnu formu na formspree.io (ili web3forms.com), kopiraj njihovu adresu i upiši je u `assets/js/main.js`, pri vrhu:

```js
var FORM_ENDPOINT = 'https://formspree.io/f/xxxxxxxx';
```

Onda forma šalje direktno i roditelj vidi "Hvala, ime!".

## Šta mijenjati

- Tekstovi: `index.html`, običan tekst između tagova.
- Slike: `assets/img/` (zamijeni istim imenom fajla). Sada su stock fotografije s Unsplasha; zamijeni ih pravim fotografijama vrtića.
- Telefon, adresa, e-mail: traži `021 207 081`, `Put Skalica 47` i `info@waldorfskivrticduga.hr` u `index.html` i u `assets/js/main.js`.
- Boje i razmaci: `assets/css/style.css` (varijable na vrhu, `--sun-500`, `--tangerine-500`...).
- Vlastita domena: u Settings → Pages upiši domenu, GitHub sam napravi CNAME fajl.

## Šta je u folderu

```
index.html          cijela stranica
404.html            stranica za pogrešan link
favicon.svg  robots.txt  .nojekyll
assets/css/style.css
assets/js/main.js   meni, forma, animacije
assets/js/vendor/   GSAP, ScrollTrigger, Lenis (lokalno, bez CDN-a)
assets/fonts/       Grandstander, Lexend, Nunito (lokalno)
assets/img/         fotografije
```

Animacije se gase same kod ljudi koji imaju uključeno "smanji pokrete" u sistemu.
