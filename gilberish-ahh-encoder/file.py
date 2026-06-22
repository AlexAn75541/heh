#!/usr/bin/env python3
import base64
import sys
import os

def convert_js_to_base64():
    # Check if file path argument is provided
    if len(sys.argv) < 2:
        print("Usage: python script.py <path_to_js_file>")
        sys.exit(1)
        
    file_path = sys.argv[1]
    
    # Check if file exists
    if not os.path.isfile(file_path):
        print(f"Error: File '{file_path}' not found.")
        sys.exit(1)
        
    try:
        # Read the file in binary mode to handle any encoding safely
        with open(file_path, 'rb') as js_file:
            file_content = js_file.read()
            
        # Encode to base64 bytes, then decode to standard string for terminal output
        base64_encoded = base64.b64encode(file_content).decode('utf-8')
        
        print(base64_encoded)
        
    except Exception as e:
        print(f"An error occurred: {e}")
        sys.exit(1)

if __name__ == "__main__":
    convert_js_to_base64()