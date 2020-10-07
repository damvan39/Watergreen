FROM alpine
WORKDIR /usr/src/app
COPY . ./
# the following command installs all the dependencies and python and pip, then updates pip and installs uWSGI and the removes all the software not needed
RUN apk add python3 py-pip 
#gcc python3-dev build-base linux-headers pcre-dev &&\
#pip3 install --upgrade pip && pip3 install flask uWSGI &&\
#apk del gcc g++ make python3-dev build-base linux-headers
#CMD uwsgi --http 0.0.0.0:80 --wsgi-file api/api.py --callable app
CMD tail -f /dev/null
