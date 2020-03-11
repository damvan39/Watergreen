import socket
import sys
HOST = '127.0.0.1'  # The server's hostname or IP address
PORT = 8080        # The port used by the server
message = sys.argv[1]
message = bytes(message, 'utf-8')
with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
    s.connect((HOST, PORT))
    s.sendall(message)
    data = s.recv(1024)

print('Received', repr(data))