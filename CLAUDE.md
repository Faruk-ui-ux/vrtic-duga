# CLAUDE.md — Waldorfski dječji vrtić Duga (Split)

Prospect redizajn početne stranice. Dizajn je gotov u Claude Design canvasu (`design/`), a tvoj zadatak je napraviti pravi sajt od njega. Prvo pročitaj `README.md`.

## Što je ovo
- Dva ekrana jedne stranice: `design/Main.dc.html` (desktop 1440) i `design/Telefon.dc.html` (telefon 390). Isti sadržaj, isti redoslijed sekcija. Ne smiju se razilaziti.
- Telefon je glavni ekran. Roditelji sajt gledaju na mobitelu, pa mobilni prikaz mora biti jednako dobar kao desktop, ne "smanjena verzija".
- `.dc.html` je format Claude Design runtimea (`<x-dc>`, `sc-if`, `sc-for`, `{{ }}`). Nije običan HTML. Pretvori ga u svoj stack (npr. Astro/React + CSS), a izgled prepiši 1:1.

## Pravila koja se ne mijenjaju
- Boje, fontovi, razmaci i radijusi samo iz `design/ds/vrtic/tokens.json`. Ne izmišljaj nove vrijednosti.
- Razmaci na mreži od 4 px. Svaki tekst ima zadan `line-height` i `letter-spacing`.
- Naslovi (h1/h2) se ne lome u dva reda ako stanu u jedan. Lom je dozvoljen samo kad je namjeran (npr. hero h1, "Zašto roditelji / biraju Dugu").
- Minimalna ciljna površina za dodir je 48 px (`--size-touch`). Tekst na telefonu ne ide ispod 15 px (osim sitnih oznaka od 13 px velikim slovima).
- Fotografije moraju biti prave. Bez gradijent placeholdera. Svaka `<img>` ima `alt` na hrvatskom.
- Bez AI fraza u tekstovima. Tekstovi su kratki, konkretni i na hrvatskom.
- Bez horizontalnog skrola stranice. Jedini namjerni vodoravni skrol je red kartica grupa na telefonu (`#grupe`).

## Struktura sekcija (redoslijed)
1. `hro` hero, h1 + dva gumba. Na desktopu fotografija ide preko cijelog hero-a, od samog vrha stranice, i prelazi iza navigacije. Navigacija je blurovana cream pilula (`backdrop-filter: blur(18px) saturate(1.5)`, pozadina 78% cream) radi kontrasta, a tekst je lijevo na cream gradijentu preko slike. Na telefonu hero je namjerno bez fotografije (vlasnik je to tražio), a navigacija je ista blurovana pilula preko cream pozadine. Zaglavlje je `position:absolute` preko hero-a i skrola se sa stranicom.
2. `#grupe` "Jedna grupa, djeca od 3 do 7 godina", tri kartice dobi (3–4, 5, 6–7).
3. `aj` "Što radimo s djecom?", osam kartica aktivnosti. Telefon: mreža 2 x 4. Tablet 2 kolone, desktop 4 kolone.
4. `#odgojiteljica` "Odgojiteljica kao uzor", fotografija + dva kratka odlomka + gumb.
5. `#dan` "Dan u vrtiću", tri dijela dana (jutro, podne, poslije podne), "Kroz godinu" blagdani, fotografija.
6. `#zasto` "Zašto roditelji biraju Dugu", šest razloga + fotografija.
7. Nema posebne sekcije za formu. Forma je prozor (modal) koji izlazi na klik, vidi dolje. U sekciji "Dan u vrtiću" je na kraju ružičasto dugme "Dogovorite posjet".
7. `#kontakt` "Gdje smo", kartica s kontaktom + fotografija igrališta.
8. `footer`, logo duge, adresa, navigacija, poziv, e-mail i karta, red cvijeća na dnu (SVG, široka 100vw, centrirana, naslonjena na donji rub). Desktop: tri kružne ikone. Telefon: tri pune dugmadi s tekstom ("Nazovite 021 207 081", e-mail, "Otvorite kartu") odmah ispod adrese, pa meni, pa autorska linija. Footer nema fiksnu visinu.

Svi gumbi "Dogovorite posjet" vode na `#posjeta`. Nema mrtvih sidara.

## Forma za posjetu (prozor, id `#posjeta`)
Svaki gumb ili link `href="#posjeta"` (hero, header, grupe, odgojiteljica, Dan u vrtiću, footer) otvara prozor s formom i zatamni stranicu. Zatvara se X-om, klikom na tamnu pozadinu ili tipkom Esc. Fokus ide na prvo polje.
Polja: ime i prezime roditelja, telefon (tel tipkovnica), e-mail (email tipkovnica), ime djeteta, dob djeteta (3–7), dan posjete (sljedećih 5 radnih dana, pon–pet, od sutra), vrijeme (09:00, 11:00, 15:00), napomena (nije obavezno), pristanak za poziv.
- Validacija tek nakon prvog pokušaja slanja. Poruke su ispod polja uz `role="alert"`. Iznad gumba je zbirna poruka.
- Pravila: ime i ime djeteta barem 2 znaka, telefon barem 8 znamenki, e-mail oblika `a@b.cc`, dob, dan, vrijeme i pristanak obavezni.
- Nakon slanja: "Hvala, {ime}! Čekamo vas u {dan, datum} u {vrijeme}." + sažetak + gumb "Dogovorite novi termin" (vraća praznu formu).
- Datumi se računaju u pregledniku. Dani su na hrvatskom (nedjelju/ponedjeljak/utorak/srijedu/četvrtak/petak/subotu u akuzativu u poruci zahvale).
- **Slanje je placeholder.** U canvasu forma samo mijenja stanje. Treba je spojiti na pravi backend (e-mail vrtiću na info@waldorfskivrticduga.hr, ili servis za forme) i spriječiti dvostruko slanje. Vrijeme i dani su prijedlog, ne stvarni kalendar vrtića.

## Što je stvarno, a što placeholder
Stvarno (s javne stranice vrtića): naziv, adresa Put Skalica 47, 21000 Split, telefon 021 207 081, e-mail info@waldorfskivrticduga.hr, radno vrijeme pon–pet 07:30–16:30, osnovan 1996., jedna mješovita grupa od oko 20 djece dobi 3–7.
Placeholder, treba potvrditi s vrtićem: svi opisni tekstovi (aktivnosti, dan u vrtiću, razlozi), tekst o odgojiteljici, vremena posjeta, popis blagdana, tvrdnje tipa "boravak na zraku po svakom vremenu".
Fotografije su stock i ne prikazuju vrtić Duga. Zamijeni ih pravim fotografijama prije objave, uz pristanak roditelja za svako dijete na slici.

## Animacije (GSAP + Lenis)
Biblioteke su u `design/vendor/` (gsap 3.15, ScrollTrigger, lenis 1.3). Logika je u `componentDidMount`/`runMotion` na dnu `.dc.html` datoteka.
Ulazne animacije (rade uvijek): hero ulazi pri učitavanju (tekst odozdo, slika se smanji sa 120% na 112%, nav pilula uđe odozgo), naslovi, kartice, fotografije, čipovi i footer ulaze pri skrolu (ScrollTrigger.batch, `power3.out`, 0.8 s, razmak 0.09 s), žuta crta ispod naslova u "Dan u vrtiću" se ucrta, forma se otvara fade + pomak, kvačica poskoči.
Efekti vezani uz skrol (samo kad se stranica stvarno skrola, tj. `innerHeight < scrollHeight`): paralaks hero slike (desktop), tekst hero-a odlazi gore i blijedi, paralaks fotografija unutar okvira (`.frame`, `.bd-ph`, `.ug-ph`, `.z3-big`, `.z3-sm`), sunce i avion lebde u "Što radimo s djecom" (desktop ≥1280), narandžasta traka napretka skrola na vrhu ekrana, Lenis mekani skrol i glatki prelaz na sidra.
Važno: u Claude Design canvasu je ploča visoka koliko i cijela stranica, pa se skrol efekti tamo ne vide. U canvasu se elementi koji su već u vidnom polju otkrivaju odmah, uz rezervu od 3 s da ništa ne ostane skriveno (bio je bug da je footer ostajao prazan). U pravom sajtu to nije potrebno.
Sve se isključuje kad korisnik ima `prefers-reduced-motion: reduce`.
