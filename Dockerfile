FROM alpine:3.7
WORKDIR /usr/src/app
COPY . ./
RUN apk add python3 apache2
CMD [ "python", "./WRetrival.py" ]
