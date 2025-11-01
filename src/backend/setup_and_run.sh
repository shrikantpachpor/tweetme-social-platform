#!/bin/bash
# Backend setup and startup script

echo "Setting up TweetMe Backend..."

# Create virtual environment if it doesn't exist
if [ ! -d "venv" ]; then
    echo "Creating virtual environment..."
    python -m venv venv
fi

# Activate virtual environment
if [[ "$OSTYPE" == "msys" || "$OSTYPE" == "win32" ]]; then
    source venv/Scripts/activate
else
    source venv/bin/activate
fi

# Install requirements
echo "Installing Python dependencies..."
pip install -r requirements.txt

# Create .env file if it doesn't exist
if [ ! -f ".env" ]; then
    echo "Creating .env file from template..."
    cp ../.env.example .env
    echo "Please edit .env file with your configuration"
fi

# Run migrations
echo "Running database migrations..."
python manage.py migrate

# Create superuser prompt
echo ""
echo "Do you want to create a superuser account? (y/n)"
read create_super
if [ "$create_super" = "y" ]; then
    python manage.py createsuperuser
fi

# Start development server
echo ""
echo "Starting Django development server..."
echo "Backend will be available at http://localhost:8000"
echo "Admin interface at http://localhost:8000/admin"
python manage.py runserver