<h1>CTF-VEEBIRAKENDUS<h1>


<h3>Kuidas käivitada<h3>


1. Tõmba see source code alla
2. Installi Python ja Node
3. Tee Client directoryst uus build (npm run build)
4. Installi vajalikud python moodulid (pip install requirements.txt)
5. Jooksuta app (python ./server.py)





<h3>Vulnid<h3>


1. User regristration vormis on võimalik enumerateda päris palju username ja siis nende logini brute-forceda (meil ainuke bruteforcetav on mingi "banned for weak password" account sest teistel on actually normid paroolid)
2. SQL injection sisselogimisel et saada mingeid emaile või credit card infot (AINULT LUGEMISEKS. Kuna database openitakse read-only modes ei ole võimalik injectioniga sinna midagi juurde kirjutada)
    (Tegelt tahaksin selle panna mingisse teise sqli vormi ehk mitte kohe logini sest see rikub ara pointi teha mingi 3 teist vulni)
3. XSS vuln offerite rewiedes et saade teiste kasutajate credentiale/muud infot (nt sisselogimiseks mingisse "verified accounti" sest by default pole uutel kontodel voimalik palju teha)
4. idor abil võimalik lugeda kõikide teiste userite infot (nt mingeid invoice või full-on kontot vahetada)
5. JWT token bypass et saada admini staatust (kui oled juba sisse loginud)
6. /private aladirectory kuhu saab AINULT ligi läbi ssrf vulni (lykkab mingi et lehte ei saa avada sest vale ip). Kui aga logime (akki adminisse?) sisse siis saame mingi avatar selection screeni abil bypassida ip blokki ja saame ligi privatile.
    Äkki admini asemel lykkab jwt-le hoopis mingi "experimental_features" toggle'i?
7. Mingis php failis labi get argide teha lfi et lugeda pmst koiki faile mis os-is on (akki teeks seda /private all?)

(8 ja 9 personally natuke sus aga pohh)
8. secret developer panel koos loginiga (mille credentialid on lih indexi htmlis commentina) (paneli saab üles leida kui minna robots.txt)
9. developer portalis võimalik mingeid api keyisi saada või api calle teha mida niisama ei saa?
    Või teha siia mingi sql-i kasutav search propmt (search for usernames) aga labi selle voimalik teha vulni nr 2?

10. Võimalik saada php code execution (ja läbi selle reverse shell), kui olla sisse logitud ja teha uus marketplace offer, kus pildi asemel laed php faili ja executid selle
11. (BONUS): pärast reverse shelli on võimalik privescida rootiks





