FROM python:3.8-slim-buster
COPY . ./
CMD [ "python", "./WRetrival.py" ]
