#!/bin/bash

API="http://localhost:4741"
URL_PATH="/change-budget"

curl "${API}${URL_PATH}/" \
  --include \
  --request PATCH \
  --header "Authorization: Bearer ${TOKEN}" \
  --header "Content-Type: application/json" \
  --data '{
    "budget": {
      "oldBudget": "'"${OLDBUDGET}"'",
      "newBudget": "'"${NEWBUDGET}"'"
    }
  }'

echo
