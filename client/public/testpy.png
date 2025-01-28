import requests

# Define the URL of the server and the file you want to request
url = "http://192.168.1.159:8000/index.html"

try:
    # Send GET request to the server
    response = requests.get(url)

    # Check if the request was successful (status code 200)
    if response.status_code == 200:
        print("File content retrieved successfully:")
        print(response.text)  # Print the content of the file
    else:
        print(f"Failed to retrieve file. Status code: {response.status_code}")

except requests.exceptions.RequestException as e:
    print(f"Error while making the request: {e}")
