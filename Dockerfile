FROM alpine
WORKDIR /usr/src/app
COPY . ./
COPY configs/uwsgi.conf /usr/src/app/uwsgi/uwsgi.conf
RUN apk add python3 py-pip gcc g++ make python3-dev build-base linux-headers pcre-dev &&\
pip3 install --upgrade pip && pip3 install flask uWSGI &&\
apk del gcc g++ make python3-dev build-base linux-headers
#CMD [ "bash", "startup.sh" ]
CMD python3 /usr/src/app/Read_temp.py
CMD tail -f /dev/null

