import logging
import threading
import time
import os
import concurrent.futures
import subprocess

arg ='example'
def thread_function(name):
    value1 = subprocess.run("python Read_temp.py")
    return value1
    

with concurrent.futures.ThreadPoolExecutor() as executor:
    future = executor.submit(thread_function, arg)
    return_value = future.result()
    print(return_value)