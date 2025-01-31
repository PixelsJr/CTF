<h1>CTF-VEEBIRAKENDUS<h1>

<h3>Kuidas käivitada<h3>

1. Tõmba see source code alla
2. Installi Python ja Node
3. Tee Client directoryst uus build (npm run build)
4. Installi vajalikud python moodulid (pip install requirements.txt)
5. Jooksuta app (python ./server.py)

<h3>Vulnid<h3>

<h1>Hetke seisuga olemas 7/7 vulni<h1>


<h1>Olemas vulnid:<h1>

1. User regristration vormis on võimalik enumerateda päris palju username ja siis nende logini brute-forceda (meil ainuke bruteforcetav on mingi "banned for weak password" account sest teistel on actually normid paroolid)
   <span style="color: red;">VULN OLEMAS - VAJA AINULT EXPLOITIDA</span>

2. idor abil võimalik lugeda kõikide teiste userite infot (nt mingeid invoice või full-on kontot vahetada)
   <span style="color: red;">VULN OLEMAS</span>

3. JWT token bypass et enableda experimental features (kui oled juba sisse loginud)
   <span style="color: red;">VULN OLEMAS, vaja ainult exploidi peale teha midagi</span>

4. Offerite buyimiseks vajaliku raha valideerimist saab client-sides muuta sest back-end ei kontrolli kui paju raha sul on.
   <span style="color: red;">VULN OLEMAS?</span>

5. Mingis php(?) failis labi get argide teha lfi et lugeda pmst koiki faile mis os-is on (akki teeks seda /private all?)
   VULN ON CONFIRMITUD, ainult vaja teha viis kuidagi user saaks sellest actually teada (scripti prglt muuta ise ei saa)

6. Võimalik saada php code execution (ja läbi selle reverse shell), kui olla sisse logitud ja teha uus marketplace offer, kus pildi asemel laed exetuable scripti ja executid selle
   VULN ON OLEMAS

7. XSS vuln offerite rewiedes et saade teiste kasutajate credentiale/muud infot (nt sisselogimiseks mingisse "verified accounti" sest by default pole uutel kontodel voimalik palju teha)
   <span style="color: red;">VULN OLEMAS JA ON EXECUTABLE, kuid bot pole tehtud</span>


<h1>Possible vulnid:<h1>

8. SQL injection marketplace offerite VÕI oma purchasite searchimisel?

9. (BONUS): pärast reverse shelli on võimalik privescida rootiks