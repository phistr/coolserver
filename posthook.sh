
TEXT="$OPENSHIFT_BUILD_NAME built successfully in $OPENSHIFT_BUILD_NAMESPACE\n\n$OPENSHIFT_BUILD_SOURCE\nbuild commit: $OPENSHIFT_BUILD_COMMIT"

curl -X POST -H 'Content-type: application/json' --data "{\"text\":\"$TEXT\"}" $WEBHOOK_SERVICE_URL
