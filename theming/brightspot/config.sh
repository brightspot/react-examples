#!/bin/bash

brightspot_path=$( cd "$(dirname "${BASH_SOURCE[0]}")" ; pwd -P )

cd $brightspot_path
zip -r custom-theme.zip _config.json  _name 