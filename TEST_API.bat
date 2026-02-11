@echo off
REM SmartAI API Testing Script for Windows
REM Run individual test commands from here

SETLOCAL ENABLEDELAYEDEXPANSION

REM Color codes
set GREEN=[92m
set YELLOW=[93m
set RED=[91m
set NC=[0m

echo.
echo %YELLOW%========================================%NC%
echo  SmartAI API Testing Tool
echo %YELLOW%========================================%NC%
echo.

set "API_URL=http://localhost:5000/api"
set "TOKEN="

:MENU
echo.
echo %YELLOW%Choose a test:%NC%
echo.
echo 1. Health Check
echo 2. Register New User
echo 3. Login User
echo 4. Get My Profile
echo 5. Get Subscription Plans
echo 6. Generate Article
echo 7. Generate Blog Titles
echo 8. Generate Image
echo 9. Remove Background
echo 10. Exit
echo.

set /p CHOICE="Enter your choice (1-10): "

if "%CHOICE%"=="1" goto HEALTH_CHECK
if "%CHOICE%"=="2" goto REGISTER
if "%CHOICE%"=="3" goto LOGIN
if "%CHOICE%"=="4" goto GET_PROFILE
if "%CHOICE%"=="5" goto GET_PLANS
if "%CHOICE%"=="6" goto ARTICLE_WRITER
if "%CHOICE%"=="7" goto BLOG_TITLES
if "%CHOICE%"=="8" goto IMAGE_GEN
if "%CHOICE%"=="9" goto BG_REMOVAL
if "%CHOICE%"=="10" goto EXIT
goto MENU

:HEALTH_CHECK
echo.
echo %YELLOW%[TEST] Health Check%NC%
echo.
curl -X GET "%API_URL%/health"
echo.
pause
goto MENU

:REGISTER
echo.
echo %YELLOW%[TEST] Register New User%NC%
echo.
set /p NAME="Enter name: "
set /p EMAIL="Enter email: "
set /p PASSWORD="Enter password: "
echo.
curl -X POST "%API_URL%/auth/register" ^
  -H "Content-Type: application/json" ^
  -d "{\"name\":\"%NAME%\",\"email\":\"%EMAIL%\",\"password\":\"%PASSWORD%\",\"confirmPassword\":\"%PASSWORD%\"}"
echo.
pause
goto MENU

:LOGIN
echo.
echo %YELLOW%[TEST] Login User%NC%
echo.
set /p EMAIL="Enter email: "
set /p PASSWORD="Enter password: "
echo.
for /f "tokens=*" %%i in ('curl -s -X POST "%API_URL%/auth/login" -H "Content-Type: application/json" -d "{\"email\":\"%EMAIL%\",\"password\":\"%PASSWORD%\"}"') do set TOKEN=%%i
echo Response: !TOKEN!
echo.
echo %GREEN%Token saved. Use it for authenticated requests.%NC%
echo.
pause
goto MENU

:GET_PROFILE
echo.
echo %YELLOW%[TEST] Get My Profile%NC%
echo.
if "%TOKEN%"=="" (
  set /p TOKEN="Enter your JWT token: "
)
echo.
curl -X GET "%API_URL%/auth/me" ^
  -H "Authorization: Bearer %TOKEN%"
echo.
pause
goto MENU

:GET_PLANS
echo.
echo %YELLOW%[TEST] Get Subscription Plans%NC%
echo.
curl -X GET "%API_URL%/payments/plans"
echo.
pause
goto MENU

:ARTICLE_WRITER
echo.
echo %YELLOW%[TEST] Article Writer Tool%NC%
echo.
if "%TOKEN%"=="" (
  set /p TOKEN="Enter your JWT token: "
)
set /p PROMPT="Enter article topic: "
echo.
curl -X POST "%API_URL%/tools/article-writer" ^
  -H "Authorization: Bearer %TOKEN%" ^
  -H "Content-Type: application/json" ^
  -d "{\"prompt\":\"%PROMPT%\",\"tone\":\"professional\",\"wordLimit\":500,\"language\":\"english\"}"
echo.
pause
goto MENU

:BLOG_TITLES
echo.
echo %YELLOW%[TEST] Blog Title Generator%NC%
echo.
if "%TOKEN%"=="" (
  set /p TOKEN="Enter your JWT token: "
)
set /p TOPIC="Enter blog topic: "
echo.
curl -X POST "%API_URL%/tools/blog-titles" ^
  -H "Authorization: Bearer %TOKEN%" ^
  -H "Content-Type: application/json" ^
  -d "{\"topic\":\"%TOPIC%\",\"count\":5}"
echo.
pause
goto MENU

:IMAGE_GEN
echo.
echo %YELLOW%[TEST] Image Generation%NC%
echo.
if "%TOKEN%"=="" (
  set /p TOKEN="Enter your JWT token: "
)
set /p PROMPT="Enter image description: "
echo.
curl -X POST "%API_URL%/tools/image-generation" ^
  -H "Authorization: Bearer %TOKEN%" ^
  -H "Content-Type: application/json" ^
  -d "{\"prompt\":\"%PROMPT%\",\"style\":\"digital art\",\"width\":1024,\"height\":768,\"quality\":\"high\"}"
echo.
pause
goto MENU

:BG_REMOVAL
echo.
echo %YELLOW%[TEST] Background Removal%NC%
echo.
if "%TOKEN%"=="" (
  set /p TOKEN="Enter your JWT token: "
)
set /p IMG_URL="Enter image URL: "
echo.
curl -X POST "%API_URL%/tools/background-removal" ^
  -H "Authorization: Bearer %TOKEN%" ^
  -H "Content-Type: application/json" ^
  -d "{\"imageUrl\":\"%IMG_URL%\"}"
echo.
pause
goto MENU

:EXIT
echo.
echo %GREEN%Thank you for testing SmartAI API!%NC%
echo.
exit /b

endlocal
