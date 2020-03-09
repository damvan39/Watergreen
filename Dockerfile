FROM alpine
WORKDIR /usr/src/app
COPY . ./
#CMD [ "bash", "startup.sh" ]
CMD tail -f /dev/null
