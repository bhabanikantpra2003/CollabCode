FROM ubuntu:20.04

ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update && apt-get install -y \
    python3 \
    default-jdk \
    gcc \
    g++ \
    golang \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app
COPY execute.sh /app/execute.sh
RUN chmod +x /app/execute.sh

ENTRYPOINT ["/app/execute.sh"]