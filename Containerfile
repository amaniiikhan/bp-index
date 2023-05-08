FROM fedora-minimal

RUN microdnf install -y python3 npm nodejs

ADD . /app
RUN cd /app && npm install

WORKDIR /app
VOLUME /app

EXPOSE 3000
EXPOSE 9229

ENTRYPOINT ["npm"]
CMD ["-h"]