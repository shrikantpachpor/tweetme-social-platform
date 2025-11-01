import subprocess
import sys

def get_package_version(package_name):
    try:
        result = subprocess.run([sys.executable, '-m', 'pip', 'show', package_name], 
                              capture_output=True, text=True)
        if result.returncode == 0:
            for line in result.stdout.split('\n'):
                if line.startswith('Version:'):
                    return line.split(':', 1)[1].strip()
        return "Not installed"
    except Exception as e:
        return f"Error: {e}"

packages = ['django', 'django-allauth', 'django-cors-headers', 'djangorestframework', 'django-rest-auth']

print("Package versions:")
for package in packages:
    version = get_package_version(package)
    print(f"{package}: {version}")