#!/bin/bash

set -e

GIT_DIR=$(git rev-parse --show-toplevel)

# array of app template folder names
APPS=
temp=($GIT_DIR/.template/apps/*)
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

PACKAGE_NAME=$(echo "$NEW_FOLDER" | tr '-' '_')
echo $PACKAGE_NAME

# create new app dir
mkdir $GIT_DIR/$NEW_FOLDER

# create brightspot sub-folder and init package.json
# we initially name it after the app name so npm init will use that as the package name
# then we rename it back to brightspot
mkdir $GIT_DIR/$NEW_FOLDER/$NEW_FOLDER-brightspot
cd $GIT_DIR/$NEW_FOLDER/$NEW_FOLDER-brightspot
npm init -y
yarn add --dev typescript
yarn add --dev @brightspot/cli
cd -
mv $GIT_DIR/$NEW_FOLDER/$NEW_FOLDER-brightspot $GIT_DIR/$NEW_FOLDER/brightspot

# create brightspot src folder
mkdir -p $GIT_DIR/$NEW_FOLDER/brightspot/src/brightspot/example/$PACKAGE_NAME

# copy brightspot default files
cp $GIT_DIR/.template/brightspot/brightspot.json $GIT_DIR/$NEW_FOLDER/brightspot
cp $GIT_DIR/.template/brightspot/tsconfig.json $GIT_DIR/$NEW_FOLDER/brightspot
cp $GIT_DIR/.template/brightspot/README.md $GIT_DIR/$NEW_FOLDER/brightspot

# copy app files
cp -r $GIT_DIR/.template/apps/$2 $GIT_DIR/$1/app

echo "Successfully initialized example [$1]."
