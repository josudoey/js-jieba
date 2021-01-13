FROM trzeci/emscripten:latest
RUN apt-get update && apt-get install -y automake gettext libtool libtool-bin pkg-config
