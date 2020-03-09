FROM alpine
WORKDIR /usr/src/app
COPY . ./
#RUN apk add python3
#CMD [ "bash", "startup.sh" ]
CMD modprobe w1-gpio && modprobe w1-therm
CMD tail -f /dev/null
