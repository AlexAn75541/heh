#!/usr/bin/env python3
import base64
import os
import sys

def encode_payload():
    # Get the directory where this script is saved
    script_dir = os.path.dirname(os.path.abspath(__file__))
    file_path = os.path.join(script_dir, "payload.js")
    
    if not os.path.isfile(file_path):
        print(f"Error: {file_path} not found.")
        sys.exit(1)
        
    try:
        with open(file_path, "rb") as js_file:
            file_content = js_file.read()
            
        base64_encoded = base64.b64encode(file_content).decode("utf-8")
        
        print("--- BEGIN BASE64 PAYLOAD ---")
        print(base64_encoded)
        print("--- END BASE64 PAYLOAD ---")
        
    except Exception as e:
        print(f"An error occurred: {e}")
        sys.exit(1)

if __name__ == "__main__":
    encode_payload()