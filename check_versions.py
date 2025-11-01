import sys
import os

# Add the virtual environment's site-packages to the path
script_dir = os.path.dirname(os.path.abspath(__file__))
venv_path = os.path.join(script_dir, "src", "backend", "venv", "Lib", "site-packages")
if os.path.exists(venv_path) and venv_path not in sys.path:
    sys.path.insert(0, venv_path)

try:
    import django
    print(f"Django version: {django.__version__}")
except ImportError as e:
    print(f"Django import error: {e}")

try:
    import allauth
    print(f"Django-allauth version: {allauth.__version__}")
except ImportError as e:
    print(f"Django-allauth import error: {e}")

try:
    import corsheaders
    print(f"Django-cors-headers version: {corsheaders.__version__}")
except ImportError as e:
    print(f"Django-cors-headers import error: {e}")

try:
    import rest_framework
    print(f"Django REST Framework version: {rest_framework.__version__}")
except ImportError as e:
    print(f"Django REST Framework import error: {e}")