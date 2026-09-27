# Refleksjonsnotat

## React i dette prosjektet

Jeg har brukt React en stund fra før, på både små og større ting, så det føles fortsatt som «hjemme» å tenke i komponenter. Det jeg liker best er at UI kan deles opp i biter som faktisk gir mening – et kort, en knapp for innsats, hele spillbrettet – og at du kan gjenbruke dem uten å copy-paste. Props og state er ikke magi lenger, men det er fortsatt lett å putte for mye i én fil hvis man ikke passer på. Her prøvde jeg å holde `Game` som samling, og la pokerregler og stokk ligge i egne filer uten React i det hele tatt.

Med React Router ble spill, regler og spillere egne ruter uten at alt lå i én komponent. TypeScript liker jeg når man modellerer kort og pokerhender – da er det tydeligere hva som faktisk kan ligge i en variabel.

Spilltilstanden ligger i Zustand: spillere, hånd, kortstokk, hvilken fase runden er i, og så videre. `persist` mot localStorage gjorde at jeg ikke mistet runde eller spillere når jeg byttet side eller lastet siden på nytt. Det jeg måtte tenke på var hva som skulle ligge i store versus lokal `useState` – for eksempel holder jeg navnet i input-feltet lokalt når du oppretter spiller, mens mynter og kort ligger globalt.

## Hvordan jeg bygde det

Først fikk jeg opp prosjektet med routing og de tre sidene, så kjernen: stokk, del ut, holde kort, bytte, utbetaling. Etterpå kom UI-detaljer – arcade-stil, tastatur, statistikk, lyd og mobil. Jeg commitet underveis på egne grener når noe hang sammen.

Jeg så på et eksempel på freeslots for å sjekke flyt i video poker, ikke for å kopiere utseendet.

## Ting som gikk galt eller irriterer

Innsats-knappene (+/−) oppfører seg rart etter en fullført runde: de ser ut som de skal fungere, men ingenting skjer. Jeg tror UI og `setBet` i store er uenige om når man får endre innsats. Jeg har skrevet ned hvordan det kan fikses, men har latt det ligge en stund mens jeg jobbet med annet.

Da jeg testet å bytte side midt i en runde var jeg usikker på om mynter og kort forsvant. Det holdt seg, fordi hele runden ligger i store med persist – men jeg måtte sjekke at alt relevant ble lagret, ikke bare spillere.

Kortene var en periode nesten uleselige fordi tekstfargen arvet fra resten av appen. Det var ren CSS på kort-knappen, ikke noe galt med spillogikken.

## Valg underveis

Jacks or Better med en enkel utbetalingstabell – kjente regler, enklere å teste.

Samme `Card`-komponent med `faceDown` for bakside, så størrelse og layout er lik.

Arcade-look, enkel Web Audio-lyd, ingen ekstra innlogging på spillere – bare navn.
