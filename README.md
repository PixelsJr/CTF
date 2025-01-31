# Capture the Flag (CTF) Web Application

## Overview

This project is a submission to TalTech's ASI KARIKAS 2025 competition (https://asikarikas.ee/).

This is a vulnerable web application designed to help computer science enthuasiasts learn about potential security flaws in web applications. The goal is to provide an interactive educational experience that highlights various vulnerabilities commonly found in web apps.

### Purpose

The application consists of multiple security vulnerabilities (seven to be exact) that users must find. The flags represent various attack vectors that are designed to you understand how to find and exploit vulnerabilities.

---

## Features

- **Diverse Vulnerabilities**: The app contains different types of security flaws, such as:
  - Weak or non-existent passwords
  - Granting admin rights to regular users
  - SQL Injection
  - And more...
- **Educational Experience**: The application is crafted to help users understand common vulnerabilities and learn how they can exploit them.
- **Multiple Flags**: At least 7 flags are hidden in the application. More flags will earn you additional points.

---

## Vulnerabilities Included

- **Username enumeration and password brute-forceability**: Some areas of the app allow you to enumerate account username's and then brute-force their passwords.
- **Cross-Site Scripting (XSS)**: Some user input fields are vulnerable to a stored XSS vulnerability, allowing attackers to execute JavaScript code on every browser that might visit the page.
- **Client-side validation bypass**: The attacker is able to break the app's front-end functionality in specific ways to do things they should not be able to do.
- **Insecure Direct Object References (IDOR)**: Users can directly manipulate api calls to access unauthorized resources.
- **JWT token manipulation**: JWT tokens (that are used for authorization) can be modified and then signed in a way that the server accepts them.
- **Local file inclusion (LFI)**: The attacker is able to cleverly manipulate a poorly-coded api and use it's output to be able to read all files on the server.
- **File Upload Vulnerability**: A file upload functionality contains an RCE vulnerability, allowing the attacker to get shell access to the server hosting the webapp.
- **BONUS: Privilege escalation**: Upon getting a shell to the server, the attacker is able to escalate their privileges to administrator.

---

## How to Run the Application Locally

Follow these steps to run the application on your local machine:

### Prerequisites

- Node.js (Tested on v23.6.0)
- npm (Tested on 10.9.2)
- Python (Tested on 3.13.0)
- PHP binaries (Tested on Zend Engine v4.4.3) (Definitely see README_additional.md for more info)

### Installation Steps

1. Clone this repository to your local machine:
   ```git clone https://github.com/LellerLololol/CTF-VEEBIRAKENDUS.git```
2. Navigate to the project directory:
   ```CTF-VEEBIRAKENDUS```
3. Install the dependencies (/client folder):
   ```npm install```
4. Build the project:
   ```npm run build```
4. Follow the steps in README_additional.md to properly configure the project.
5. Start the application (/server folder):
   ```python server.py```

---

## Flags

The web application contains 7 flags hidden within the vulnerabilities. Each flag can be discovered by exploiting the 7 different vulnerabilities. Here are the flag locations:

1. **Flag 1**: Found by enumerating a specific username, brute-forcing their password and logging into the account.
2. **Flag 2**: Found after performing XSS on another user and retrieving their cookies.
3. **Flag 3**: Can be bought in the shop for enough money (or by changing the client-side code) and can then be viewed in /Profile.
4. **Flag 4**: Is revealed after getting access (via IDOR) to an account with an ID of 1.
5. **Flag 5**: Can be viewed after getting access to /admin via JWT token manipulation.
6. **Flag 6**: Can be found by reading the C:\Windows\System32\drivers\etc\hosts file with a broken api.
7. **Flag 7**: Found by manipulating **JWT token manipulation** and signing it to be accepted by the server.

---

## Solution Walkthrough

The full walkthrough can be found in the `walkthrough.md` file.

---

## Solution Walkthrough

The full walkthrough to find all flags can be found in the `walkthrough.md` file.

---

## License

This project is licensed under the GNU General Public License (GPL) Version 3 - see the [LICENSE](LICENSE) file for details.

---

## Acknowledgments

- This project was created ONLY for educational purposes.
- Thanks to ASI KARIKAS for hosting such an interesting competition.

---

## Credits / Authors

- **Developers**: LellerLololol and PixelsJr
- **Team**: [INSERT TEAM NAME SEST ME POLE VEEL OTSUSTANUD]