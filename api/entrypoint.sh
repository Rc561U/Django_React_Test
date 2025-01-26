#!/bin/bash
set -e

# Wait for the PostgreSQL database to be available
./wait-for-it.sh postgres:5432 --timeout=30 -- echo "Database is up - continuing..."
exec "$@"