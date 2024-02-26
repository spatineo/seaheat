#!/bin/bash

mkdir $HOME/.aws

cat << EOF > $HOME/.aws/config
[profile default]
sso_session = sso-spatineo
sso_account_id = 905418280618
sso_role_name = SeaHeatAdministratorAccess
region = eu-west-1
output = json

[sso-session sso-spatineo]
sso_region = eu-west-1
sso_start_url = https://spatineo.awsapps.com/start
EOF
