# TweetMe - Full Stack Social Media Platform

A Twitter-inspired microblogging social media application built with Django REST Framework and React.

## 🎓 Learning Journey

This project was built following the comprehensive Django tutorial series by **[CodingEntrepreneurs](https://www.youtube.com/c/CodingEntrepreneurs)** on YouTube, with additional features, bug fixes, and customizations added during development.

**Original Tutorial Series**: Django + React Tutorial by CodingEntrepreneurs

## 🔧 My Contributions & Enhancements

During the development process, I encountered and resolved several technical challenges:

- **Authentication Flow**: Fixed CSRF token handling and cookie-based authentication
- **CORS Configuration**: Debugged and resolved cross-domain request issues between React and Django
- **Timeline Algorithm**: Enhanced the tweet timeline to properly display user's own tweets alongside followed users' content
- **Error Handling**: Improved frontend error states and user feedback
- **Code Optimization**: Refactored Redux actions and removed redundant API calls
- **Bug Fixes**: Resolved form submission issues and axios configuration problems

## ✨ Features

### Core Social Media Functionality
- **User Authentication**: Secure registration and login system
- **Tweet Management**: Create, reply, and retweet posts
- **Social Interactions**: Like/unlike tweets and posts
- **User Relationships**: Follow/unfollow other users
- **User Profiles**: Individual profile pages with tweet timelines
- **Timeline Feed**: Curated content from followed users

### Technical Features
- **RESTful API**: Well-structured Django REST Framework endpoints
- **Real-time Updates**: Dynamic UI updates without page refresh
- **Responsive Design**: Mobile-friendly interface
- **Form Validation**: Client-side and server-side validation
- **State Management**: Redux for complex application state

## 🛠 Tech Stack

### Backend
- **Django 5.2.7** - Web framework
- **Django REST Framework** - API development
- **SQLite** - Database
- **dj-rest-auth** - Authentication system

### Frontend
- **React 16.8.5** - UI library
- **Redux** - State management
- **Formik** - Form handling
- **Axios** - HTTP client
- **Webpack 4** - Module bundler

### Development Tools
- **Node.js 16.20.2** - JavaScript runtime
- **npm** - Package management
- **Babel** - JavaScript compiler

## 🚀 Quick Start

### Prerequisites
- **Python 3.8+** (tested with 3.10)
- **Node.js 16+** (tested with 16.20.2)
- **Git** for cloning the repository

### Option 1: Automated Setup (Recommended)

#### For Windows Users:
```bash
# Clone the repository
git clone https://github.com/your-username/tweetme.git
cd tweetme

# Setup and run backend (in first terminal)
cd src/backend
setup_and_run.bat

# Setup and run frontend (in second terminal) 
cd src/frontend
setup_and_run.bat
```

#### For macOS/Linux Users:
```bash
# Clone the repository
git clone https://github.com/your-username/tweetme.git
cd tweetme

# Make scripts executable
chmod +x src/backend/setup_and_run.sh
chmod +x src/frontend/setup_and_run.sh

# Setup and run backend (in first terminal)
cd src/backend
./setup_and_run.sh

# Setup and run frontend (in second terminal)
cd src/frontend  
./setup_and_run.sh
```

### Option 2: Manual Setup

#### Backend Setup
```bash
# Navigate to backend directory
cd src/backend

# Create and activate virtual environment
python -m venv venv

# Activate virtual environment
# Windows:
venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Setup environment variables
cp ../.env.example .env
# Edit .env with your settings

# Run database migrations
python manage.py migrate

# Create superuser (optional)
python manage.py createsuperuser

# Start development server
python manage.py runserver
```

#### Frontend Setup
```bash
# Navigate to frontend directory (in new terminal)
cd src/frontend

# Install dependencies
npm install

# Start development server
npm run build-client
```

### Access the Application
- **Frontend**: http://localhost:8080
- **Backend API**: http://localhost:8000
- **Django Admin**: http://localhost:8000/admin (if superuser created)

## 📱 Usage

1. **Access the application**: Navigate to `http://localhost:8080`
2. **Create an account**: Register a new user account
3. **Start tweeting**: Post your first tweet
4. **Social interaction**: Follow other users and engage with their content
5. **Explore profiles**: Visit user profiles at `http://localhost:8080/{user_id}`

## 🧠 What I Learned

Through building this project, I gained hands-on experience with:

- **Full-Stack Development**: Connecting Django backend with React frontend
- **API Design**: Creating RESTful endpoints with proper HTTP methods
- **Authentication Systems**: Implementing secure token-based authentication
- **Database Relationships**: Designing complex many-to-many relationships (followers, likes)
- **State Management**: Managing complex application state with Redux
- **Problem Solving**: Debugging cross-domain issues, authentication flows, and API integration
- **Modern JavaScript**: ES6+ features, async/await, and React hooks
- **Build Tools**: Webpack configuration and development workflows

## 🔧 Technical Challenges Solved

### Authentication Flow
- Implemented cookie-based authentication with CSRF protection
- Resolved token handling between frontend and backend
- Fixed login state persistence across page refreshes

### Cross-Domain Communication
- Configured CORS settings for React (port 8080) and Django (port 8000)
- Resolved preflight request issues with custom headers
- Implemented proper cookie handling for authentication

### Timeline Algorithm
- Modified Django QuerySet to include user's own tweets in timeline
- Optimized database queries for follower relationships
- Implemented proper tweet ordering and filtering

## 🚀 Deployment

### Environment Setup for Production
1. Set `DEBUG=False` in your `.env` file
2. Configure a production database (PostgreSQL recommended)
3. Set up static file serving
4. Configure email settings for user registration
5. Use environment variables for all sensitive data

### Deployment Options
- **Heroku**: Use the included `requirements.txt` and configure buildpacks
- **DigitalOcean**: Deploy using Docker or traditional VPS setup  
- **AWS**: Use EC2 with RDS for database
- **Vercel/Netlify**: Frontend can be deployed separately as static files

## 🔧 Development

### Project Structure
```
tweetme/
├── src/
│   ├── backend/           # Django REST API
│   │   ├── requirements.txt
│   │   ├── manage.py
│   │   ├── setup_and_run.sh/.bat
│   │   └── ...
│   └── frontend/          # React Application  
│       ├── package.json
│       ├── setup_and_run.sh/.bat
│       └── src/
├── .env.example          # Environment template
├── .gitignore           # Git ignore rules
└── README.md           # This file
```

### Available Commands

#### Backend
- `python manage.py runserver` - Start development server
- `python manage.py migrate` - Run database migrations  
- `python manage.py createsuperuser` - Create admin user
- `python manage.py collectstatic` - Collect static files (production)

#### Frontend  
- `npm run build-client` - Start development server with hot reload
- `npm run dev:build-client` - Build client bundle in watch mode
- `npm run dev:build-server` - Build server bundle in watch mode

### API Endpoints
- `POST /rest-auth/login/` - User login
- `POST /rest-auth/logout/` - User logout  
- `GET /api/tweets/` - Get timeline tweets
- `POST /api/tweets/` - Create new tweet
- `POST /api/tweets/{id}/reply/` - Reply to tweet
- `GET /api/tweets/{id}/like/` - Toggle like
- `GET /api/profiles/{id}/toggle-follow/` - Follow/unfollow user

## 🤝 Contributing

This project welcomes contributions! Here's how you can help:

### Ways to Contribute
- 🐛 **Bug Reports**: Found a bug? Open an issue with details
- 💡 **Feature Requests**: Have ideas? Suggest new features  
- 📖 **Documentation**: Help improve setup instructions
- 🧪 **Testing**: Add tests or test on different platforms
- 🎨 **UI/UX**: Improve the frontend design and user experience

### Development Workflow
1. **Fork** the repository
2. **Clone** your fork: `git clone https://github.com/your-username/tweetme.git`
3. **Create branch**: `git checkout -b feature/your-feature-name`
4. **Make changes** and test thoroughly
5. **Commit**: `git commit -m "Add: your feature description"`
6. **Push**: `git push origin feature/your-feature-name`  
7. **Pull Request**: Open a PR with description of changes

### Code Standards
- Follow existing code formatting and structure
- Add comments for complex logic
- Test your changes on both Windows and Unix systems
- Update documentation if you change functionality

## � License

This project is open source and available under the [MIT License](LICENSE).

### Attribution
Built following the Django tutorial series by **[CodingEntrepreneurs](https://www.youtube.com/c/CodingEntrepreneurs)** with additional features and enhancements.

## 🙏 Acknowledgments

- **CodingEntrepreneurs** for the foundational tutorial series
- **Django** and **React** communities for excellent documentation  
- **Contributors** who help improve this project
- **Stack Overflow** community for debugging assistance

## 🆘 Support

### Getting Help & Professional Contact
- 📚 **Documentation**: Check this README and code comments
- 🐛 **Issues**: [Open an issue](https://github.com/your-username/tweetme/issues) for bugs or feature requests
- 💬 **Discussions**: [Start a discussion](https://github.com/your-username/tweetme/discussions) for questions or collaboration ideas
- 🤝 **Professional Contact**: Connect via GitHub Issues (tag: "collaboration") or LinkedIn
- 💼 **Hiring Opportunities**: Open to full-stack development roles - contact via GitHub Issues
- 🌐 **No Email Required**: All communication welcomed through GitHub's built-in tools

### Common Issues
- **Port conflicts**: Change ports in settings if 8000/8080 are in use
- **Database errors**: Delete `db.sqlite3` and run migrations again  
- **Node.js errors**: Ensure you're using Node 16+ and clear npm cache
- **Python errors**: Check virtual environment activation and package versions

## 🏷️ GitHub Topics

When uploading to GitHub, add these topics for better discoverability:
`django` `react` `redux` `social-media` `twitter-clone` `full-stack` `python` `javascript` `rest-api` `authentication` `cors` `webpack`

## 📊 Repository Info

- **Language Breakdown**: Python (Backend), JavaScript (Frontend), CSS (Styling)
- **Framework**: Django 5.2.7 + React 16.8.5  
- **Database**: SQLite (development) / PostgreSQL (production recommended)
- **Authentication**: Cookie-based with CSRF protection
- **API**: RESTful design with django-rest-framework

---

**⭐ If this project helped you learn full-stack development, please give it a star!**

*This project showcases practical full-stack development skills including Django REST API development, React/Redux state management, user authentication, modern web development practices, and professional code organization for open-source distribution.*