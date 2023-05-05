FROM fedora-minimal

RUN microdnf install -y python3 npm nodejs

ADD . /app
RUN cd /app && npm install
#RUN cd /app && npm install && npm run build

WORKDIR /app
VOLUME /app

EXPOSE 3000
EXPOSE 9229

ENTRYPOINT ["npm"]
CMD ["-h"]