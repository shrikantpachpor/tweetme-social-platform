@echo off
REM Backend setup and startup script for Windows

echo Setting up TweetMe Backend...

REM Create virtual environment if it doesn't exist
if not exist "venv" (
    echo Creating virtual environment...
    python -m venv venv
)

REM Activate virtual environment
call venv\Scripts\activate.bat

REM Install requirements
echo Installing Python dependencies...
pip install -r requirements.txt

REM Create .env file if it doesn't exist
if not exist ".env" (
    echo Creating .env file from template...
    copy "..\.env.example" ".env"
    echo Please edit .env file with your configuration
)

REM Run migrations
echo Running database migrations...
python manage.py migrate

REM Create superuser prompt
echo.
set /p create_super="Do you want to create a superuser account? (y/n): "
if /i "%create_super%"=="y" (
    python manage.py createsuperuser
)

REM Start development server
echo.
echo Starting Django development server...
echo Backend will be available at http://localhost:8000
echo Admin interface at http://localhost:8000/admin
python manage.py runserver