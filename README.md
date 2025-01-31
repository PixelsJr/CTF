# Capture the Flag (CTF) Web Application

## Overview

This project is a vulnerable web application designed to help employees discover and learn about potential security flaws in web applications. The goal is to provide an interactive educational experience that highlights various vulnerabilities commonly found in web apps.

### Purpose

The application consists of multiple security vulnerabilities (at least seven flags) that users must find. These flaws will serve as learning tools for individuals interested in web security and cybersecurity in general. The flags represent various attack scenarios that are designed to help users understand how to exploit vulnerabilities and then mitigate them.

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

- **Weak/Non-existent Passwords**: Some areas of the app may allow weak or default passwords that can easily be guessed or cracked.
- **Admin Rights Escalation**: Regular users may have the ability to access administrative rights under certain conditions.
- **SQL Injection**: Some user input fields are vulnerable to SQL Injection, allowing attackers to execute unauthorized SQL queries.
- **Cross-Site Scripting (XSS)**: There are points in the app where user input is not sanitized, leading to potential XSS vulnerabilities.
- **File Upload Vulnerability**: A file upload functionality may not properly validate the file type or content, leading to the possibility of uploading malicious files.
- **Insecure Direct Object References (IDOR)**: Users can directly manipulate URLs or requests to access unauthorized resources.
- **Sensitive Data Exposure**: Some parts of the app may expose sensitive data, either through insecure storage or transmission.

---

## How to Run the Application Locally

Follow these steps to run the CTF web application on your local machine:

### Prerequisites

- Node.js (v12 or later)
- npm (v6 or later)
- Database (SQLite, MySQL, or any other as required by the app)

### Installation Steps

1. Clone this repository to your local machine:
   ```bash git clone https://github.com/yourusername/ctf-web-application.git```
2. Navigate to the project directory:
   ```cd ctf-web-application```
3. Install the dependencies:
   ```npm install```
4. Start the application:
   ```python server.py```

---

## Flags

The web application contains at least 7 flags hidden within the vulnerabilities. Each flag can be discovered by exploiting specific vulnerabilities. Here’s an outline of the flag locations:

1. **Flag 1**: Found by exploiting the weak password vulnerability (login page).
2. **Flag 2**: Discovered after escalating user privileges to admin.
3. **Flag 3**: Located by performing SQL injection in the search form.
4. **Flag 4**: Found through Cross-Site Scripting (XSS) in a user profile.
5. **Flag 5**: Hidden after exploiting an insecure file upload functionality.
6. **Flag 6**: Uncovered through Insecure Direct Object Reference (IDOR).
7. **Flag 7**: Found by intercepting sensitive data that is improperly exposed.

---

## Solution Walkthrough

A solution walkthrough is provided to guide users through finding all the flags. Here are the general steps:

1. **Login Page**:
   - Exploit weak passwords to login and find the first flag.
2. **User Profile**:
   - Escalate privileges to admin and discover a second flag.
3. **Search Form**:
   - Use SQL Injection to retrieve a hidden flag.
4. **XSS Vulnerability**:
   - Inject a malicious script to expose the next flag.
5. **File Upload**:
   - Upload a malicious file to trigger another vulnerability.
6. **IDOR**:
   - Manipulate URLs to access unauthorized resources and find another flag.
7. **Sensitive Data**:
   - Intercept and expose sensitive data to find the last flag.

The full walkthrough can be found in the `walkthrough.md` file.

---

## Educational Value

This application provides a hands-on learning experience, showing how common web vulnerabilities can be exploited in a real-world scenario. By completing this challenge, users will gain a deeper understanding of:

- The importance of secure coding practices.
- How to identify common vulnerabilities in web applications.
- How to defend against common attacks such as SQL Injection, XSS, and privilege escalation.

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## Acknowledgments

- This project was created for educational purposes.
- Thanks to the security community for their continuous work on identifying web vulnerabilities.