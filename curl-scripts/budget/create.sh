#!/bin/bash

API="http://localhost:4741"
URL_PATH="/budgets"

curl "${API}${URL_PATH}/" \
  --include \
  --request PATCH \
  --header "Authorization: Bearer ${TOKEN}" \
  --header "Content-Type: application/json" \
  --data '{
    "budget": {
      "total": "'"${TOTAL}"'"
    }
  }'

echo
