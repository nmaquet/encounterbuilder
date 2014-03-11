@echo off
for /f "tokens=2 delims==" %%a in ('wmic OS Get localdatetime /value') do set "dt=%%a"
set "YY=%dt:~2,2%" & set "YYYY=%dt:~0,4%" & set "MM=%dt:~4,2%" & set "DD=%dt:~6,2%"
set "HH=%dt:~8,2%" & set "Min=%dt:~10,2%" & set "Sec=%dt:~12,2%"
set fullstamp=%YYYY%-%MM%-%DD%_%HH%-%Min%-%Sec%
set fullstamp=%fullstamp: =%
mongodump -h %MONGODB_HOST% --port %MONGODB_PORT% -u %MONGODB_USER% -p %MONGODB_PASSWORD% --authenticationDatabase %MONGODB_DBID% --db %MONGODB_DBID% --out .\%fullstamp%\
