#!/bin/bash

set -e

GIT_DIR=$(git rev-parse --show-toplevel)

# array of app template folder names
APPS=
temp=($GIT_DIR/template/apps/*)
for i in "${temp[@]}"
do
   APPS+=($(echo "$i" | rev | cut -d/ -f1 | rev))
done

NEW_FOLDER=$1
TEMPLATE=

for i in "${APPS[@]}"
do
   if [ "$i" = "$2" ]; then
       TEMPLATE=$2
   fi
done

if [[ -z ${2:-} ]] || [ -z "$TEMPLATE" ]
then
    APPS="${APPS[*]}"
    # remove leading whitespace characters
    APPS="${APPS#"${APPS%%[![:space:]]*}"}"
    # remove trailing whitespace characters
    APPS="${APPS%"${APPS##*[![:space:]]}"}"
    # replace space with pipe delimiter
    APPS=${APPS// / | }
    echo "USAGE: $0 [ <new-folder-name> ] [ $APPS ]"
    exit 1
fi

mkdir $GIT_DIR/$1
cp -r $GIT_DIR/template/brightspot $GIT_DIR/$1/brightspot
cp -r $GIT_DIR/template/apps/$2 $GIT_DIR/$1/app
echo "Successfully initialized example [$1]."
