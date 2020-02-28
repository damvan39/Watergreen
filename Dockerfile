FROM python:3.8-slim-buster
WORKDIR /usr/src/app
COPY . ./
CMD [ "python", "./Wretrival.py" ]
