FROM docker-virtual.artifactory.corp.alleninstitute.org/aics-nginx:20171121-3

ARG TEMPLATE_DIR
ARG FILENAME

ENV TEMPLATE_DIR=${TEMPLATE_DIR:-/templates} \
    FILENAME=${FILENAME:-nginx.conf.j2}

ENV CONF_FILE="${TEMPLATE_DIR}/${FILENAME}"

COPY Docker/${FILENAME} ${CONF_FILE}

RUN mkdir app
COPY public app
