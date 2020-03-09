FROM alpine
WORKDIR /usr/src/app
COPY . ./
RUN apk add python3
#CMD [ "bash", "startup.sh" ]
CMD python3 /usr/src/app/Read_temp.py

