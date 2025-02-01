import subprocess
import time
import signal

js_file_path = 'xss_bot.js'

process = None

try:
    while True:
        process = subprocess.Popen(['node', js_file_path])
        process.wait()
        time.sleep(1)
finally:
    if process:
        print("Forcefully terminating the subprocess...")
        process.send_signal(signal.SIGTERM)
        process.wait()
        print("Subprocess has been terminated.")