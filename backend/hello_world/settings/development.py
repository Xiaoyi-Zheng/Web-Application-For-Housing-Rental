import os
from hello_world.settings.base import *

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'j&mkksqeliy4&6613uqw@*wqwblqu*)qgn_)9xutfeb%#0h9xb'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = ["backend","localhost","192.168.50.152","ec2-18-188-108-51.us-east-2.compute.amazonaws.com"]
