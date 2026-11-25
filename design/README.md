# Vrtić Duga — paket za Claude Code

Ovo je izvoz iz Claude Design canvasa "Vrtić, početna stranica" (desktop 1440 + telefon 390). Klijent je Waldorfski dječji vrtić Duga, Split. Radi se o prospect redizajnu.

## Sadržaj

| Putanja | Što je |
| --- | --- |
| `CLAUDE.md` | Pravila za Claude Code: struktura, forma, što je placeholder |
| `design/Main.dc.html` | Desktop ekran, 1440 px |
| `design/Telefon.dc.html` | Telefon ekran, 390 px |
| `design/canvas.json` | Raspored ekrana u canvasu |
| `design/ds/vrtic/tokens.json` | Design sistem "Vrtić": boje, tipografija, razmaci, radijusi, sjene, animacije |
| `design/ds/vrtic/components/bundle.css` | CSS komponenti (dugme, polja forme, ikone, zaglavlje, kartica kontakta, naljepnica) |
| `design/ds/vrtic/components/bundle.js` | Komponente `Vrtic.Button`, `Icon`, `SiteHeader`, `ContactCard`, `StickerBadge` |
| `design/ds/vrtic/fonts/` | Grandstander i Lexend, woff2 (latin i latin-ext) |
| `design/vendor/` | gsap, ScrollTrigger i lenis (min.js) |
| `assets/images/` | Svih 10 fotografija iz dizajna, preimenovane |

## Kako ga otvoriti i pretvoriti u sajt

`.dc.html` datoteke koriste Claude Design runtime. Ne otvaraju se samo dvoklikom, ali su čitljiv HTML i CSS. Claude Code ih čita kao izvor izgleda i sadržaja:

1. Neka Claude Code pročita `CLAUDE.md`, pa `design/Main.dc.html` i `design/Telefon.dc.html`.
2. Izabrati stack (npr. Astro + običan CSS, ili React). Tokeni iz `tokens.json` idu u CSS varijable (`--ink`, `--sun-500`, `--space-4` ...).
3. Fontove učitati iz `design/ds/vrtic/fonts/` preko `@font-face` (varijabilna težina 100–900).
4. U HTML-u slike pišu kao `/_blob/<id>`. Zamijeni ih putanjama iz tablice ispod.
5. Komponente `Vrtic.*` su opisane u `bundle.js` i `bundle.css`. Napravi im običan ekvivalent.
6. Jedan sajt, jedan sadržaj. Desktop i telefon dijele iste sekcije, tekstove i linkove.

## Tokeni (sažetak)

Boje: `ink #2B2140`, `ink-soft #574D6E`, pozadine `surface-100 #FFFBF1`, `surface-200 #FFF3D9`, kartica `#FFFFFF`. Akcenti (500 puni, 100 pastel, 700 za tekst): sun `#FFC52E`, berry `#FF7AA8`, sky `#5CC8F2`, grass `#8ADB5A`, tangerine `#FF8F45`, lilac `#B9A3FF`. Greška `danger-700 #B3261E`, uspjeh `success-700 #1C6B3C`. Tekst na 500 ispuni je uvijek ink.
Fontovi: naslovi Grandstander (700/800), tekst Lexend (400/500/600). Razmaci na 4 px mreži (`space-1` do `space-24`). Okviri 2 px (kartice) i 3 px (gumbi, polja), boja ink. Kartice imaju tvrdu sjenu bez zamućenja (`5px 5px 0 0 ink`, na desktopu `6px 6px 0 0`).
Cijela lista je u `design/ds/vrtic/tokens.json`.

## Breakpointi

Raspored se ravna po širini kontejnera stranice (CSS container queries), ne po prozoru: `@container (min-width: 480px)`, `720px`, `1024px`, `1280px`. Telefon je sve ispod 720 px, a kartice aktivnosti prelaze s 2 kolone na 4 kolone na 1024 px. Pri prenosu u pravi sajt može se zamijeniti običnim `@media` upitima s istim vrijednostima.

## Forma za posjetu

Forma je prozor koji izlazi na klik na bilo koji gumb koji vodi na `#posjeta`. Opis polja, validacije i stanja "poslano" je u `CLAUDE.md`. Ukratko: polja imaju DS klase `vr-field`, `vr-field__ctl`, `vr-field__err`, dani i vremena su gumbi (`.chip`, `aria-pressed`), a stanje se drži u objektu `bk` u skripti na dnu svakog `.dc.html`. Slanje nije spojeno na server.

## Slike

| ID u HTML-u (`/_blob/...`) | Datoteka |
| --- | --- |
| `1922cec430a123109bf9fb01ed3bf1fb` | `assets/images/aktivnosti-drvene-kocke.jpg` |
| `019abab5690109bd3f77ca827553e9a1` | `assets/images/grupe-djevojcica-lupa.jpg` |
| `27b6bb6e3fcd0ca28429b9f6dc1111ce` | `assets/images/odgojiteljica-s-djecom.jpg` |
| `2bb467f333e2e4862f732ad8de02a262` | `assets/images/zasto-pjescanik.jpg` |
| `8c6abf1b17574f36a86c95d91b3c405d` | `assets/images/grupe-djevojcica-boja-na-licu.jpg` |
| `acbb05cbe113087641b761a6a6e1b149` | `assets/images/kontakt-igraliste.jpg` |
| `b17f29a7dafeec35125291049f4f244f` | `assets/images/posjeta-kolo-na-travi.jpg` |
| `cf6438ae3bf59532bb5709d763ebc2b3` | `assets/images/dan-u-vrticu-kolo-u-sobi.jpg` |
| `f473242e4a61468f3f15c686ee7697c1` | `assets/images/hero-djecak-na-tepihu.jpg` |
| `d1d1bb6fb266dcffef2e6cc5d2f20eea` | `assets/images/zasto-crtanje-odgojiteljica.jpg` |

Gdje se koriste: hero `hero-djecak-na-tepihu`; grupe `grupe-djevojcica-boja-na-licu`, `aktivnosti-drvene-kocke`, `grupe-djevojcica-lupa`; odgojiteljica `odgojiteljica-s-djecom`; dan u vrtiću `dan-u-vrticu-kolo-u-sobi`; zašto `zasto-pjescanik` (+ `zasto-crtanje-odgojiteljica` samo na telefonu); posjeta `posjeta-kolo-na-travi`; kontakt `kontakt-igraliste`.

## Poznate neusklađenosti i ostaci

- Telefon namjerno nema hero fotografiju (Main ima). Ne dodavati je bez pitanja.
- Zaglavlje se skrola sa stranicom (nije zalijepljeno na vrh). Ako treba sticky, riješiti u pravom sajtu, ne u canvasu.
- Forma za posjetu ne šalje ništa. Treba backend.
- Red kartica grupa na telefonu se skrola vodoravno. Sve ostalo ne.
- U CSS-u su ostali nekorišteni blokovi iz starijih varijanti (`.uf*`, `.s5*`). Slobodno obrisati.
- Najduže sekcije na telefonu: "Zašto roditelji biraju Dugu" (oko 1450 px) i "Dan u vrtiću" (oko 1320 px). Ako treba kraće, u "Zašto" ostaviti 4 razloga umjesto 6.
- Header (`Vrtic.SiteHeader`) na vrhu ima gumb "Dogovorite posjet" koji vodi na `#posjeta`.
