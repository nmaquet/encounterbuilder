mongorestore -h %MONGODB_HOST% --port %MONGODB_PORT% -u %MONGODB_USER% -p %MONGODB_PASSWORD% --authenticationDatabase %MONGODB_DBID% --db %MONGODB_DBID% ".\%MONGODB_DBID%"