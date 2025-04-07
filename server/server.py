from flask import *
import json
import os
import jwt
import dotenv
from datetime import timedelta, datetime, timezone
import sqlite3
import subprocess
from werkzeug.utils import secure_filename
import subprocess

def main():
    # File path for JSON data
    JSON_PATH = './data.json'

    # Server dir
    BASE_DIR = os.path.dirname(os.path.abspath(__file__))

    # Go one directory up
    PROJECT_DIR = os.path.dirname(BASE_DIR)

    # Build directory:
    BUILD_DIR = os.path.join(PROJECT_DIR, 'client', 'build')

    # index.html location:
    INDEX = os.path.join(BUILD_DIR, 'index.html')

    # Marketplace offer images folder location
    UPLOAD_FOLDER = os.path.join(BASE_DIR, 'marketplace_images')

    # Load secret and algorithm from env variables for JWT tokens
    dotenv.load_dotenv()
    SECRET = os.getenv('secret')
    ALGORITHM = os.getenv('algorithm')

    # Flask app variable
    app = Flask(__name__, static_folder=os.path.join(BUILD_DIR, 'static'))
    app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
    app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # 16MB max file upload size
    
    #*See on rumal miks peab see function siin olema
    def get_keys():
        with open("keys/private_key.pem", "r") as f:
            private_key = f.read()
        with open("keys/public_key.pem", "r") as f:
            public_key = f.read()
        return (private_key, public_key)

    PRIVATE_KEY, PUBLIC_KEY = get_keys()
    

    # Route to get all offers
    @app.route('/api/updateData.json', methods=['POST'])
    def updateData():

        app.logger.error(request)

        message = request.form.get('message')

        with open("data.json", "w") as file:
            file.write(message)


        return 'goodJob', 200

    # Route to get all offers
    @app.route('/api/getAllOffers', methods=['GET'])
    def get_all_offers():
        offers = load_json_data()
        reviews = fetch_offer_reviews()
        for offer in offers:
            offer["reviews"] = reviews.get(offer["id"], [])
        return jsonify(offers), 200
    
    def get_offer(id):
        offers = load_json_data()
        reviews = fetch_offer_reviews()
        for offer in offers:
            if offer['id'] is not int(id):
                continue
            offer["reviews"] = reviews.get(offer["id"], [])
            return offer

    @app.route('/<path:filename>')
    def serve_file(filename):
        """Serves files from the 'client/build' directory"""
        file_path = os.path.join(BUILD_DIR, filename)
        if os.path.exists(file_path) and os.path.isfile(file_path):
            return send_file(file_path)
        return "404 NOT FOUND"
    
    #Serving index file, must be done for all pages, becauser reACT
    @app.route('/')
    @app.route('/Profile')
    @app.route('/admin')
    def serve_index():
        return send_file(INDEX)
    
    #Either returns the admins token or False if the request doesnt come from a admin
    @app.route('/api/is_admin', methods=['POST'])
    def is_admin():
        validation = validate_auth(request)
        if validation != "Authenticated":
            return validation

        token = request.cookies.get('token')
        if token:            
            # Validate admin status
            app.logger.error(decode_jwt(token, "admin"))
            app.logger.error(decode_jwt(token, "admin"))
            app.logger.error(decode_jwt(token, "admin"))
            app.logger.error(decode_jwt(token, "admin"))
            app.logger.error(decode_jwt(token, "admin"))
            if decode_jwt(token, 'admin') == True:
                return jsonify({'info': 'Authenticated', 'flag': 'ASIKARIKAS{JWT_TOKEN_MANIPULATION}'}), 200
            return jsonify({
                'error': "JWT token invalid 222"
            }), 400
        return jsonify({
            'error': "JWT token not present",
        }), 400
    
    """
    Seda route'i lowk pole vaja sest saadame image data otse läbi php file'i

    @app.route('/uploads/<filename>')
    def uploaded_file(filename):
        return send_from_directory(app.config['UPLOAD_FOLDER'], filename)
    """

    @app.route('/api/get_public_key', methods=['GET'])
    def get_public_key():
        path = os.path.join(BASE_DIR, 'keys/public_key.pem')
        return send_file(path, as_attachment=True)


    @app.route('/api/get_offer_filename_from_id', methods=['GET'])
    def get_offer_filename_from_id():
        offer_id = request.args.get('offer_id')
        try:
            filename = get_offer(offer_id).get('image')
            return jsonify({'filename': filename})
        except Exception as e:
            return jsonify({'error': e})



    @app.route('/api/get_image.php', methods=['GET'])
    def php_get_image():
        """
        Sends image as data blob to front-end.

        Image returned is based on the filename given
        """

        filename = request.args.get('filename')
        app.logger.error(filename)
        if filename:
            file_path = f"marketplace_images/{filename}"

            # Call PHP script via subprocess
            command = f'./php/php.exe get_image.php {file_path}'
            result = subprocess.run(command, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
            response = result.stdout.strip()   

            return jsonify({'image': response})

            """
            The php file "get_image.php" contains this:

            <?php

            $file_path = $argv[1];

            if (file_exists($file_path)) {
            $image_data = file_get_contents($file_path);
            echo base64_encode($image_data);
            } else {
            echo "Error: Image not found.";
            }

            //ONLY MEANT FOR DEVELOPMENT! DO NOT INCLUDE THIS IN PRODUCTION BUILDS!
            if (file_exists($file_path)) {
            ob_start();
            include($file_path);
            ob_end_clean();
            ob_clean();
            } 

            ?>
            """
        return abort(404)

    @app.route('/api/buy', methods=['POST'])
    def buy():
        validation = validate_auth(request)
        if validation != "Authenticated":
            return validation, 400

        data = request.get_json()
        offerID = data['id']

        user_id = int(request.cookies.get('user_id'))
        purchase_offers = execute_fetch_db_command(f"SELECT PurchaseHistory FROM users WHERE id={user_id};")[0][0]
        if purchase_offers == None:
            purchase_offers = f'{offerID}'
        else:
            purchase_offers += f',{offerID}'

        execute_commit_db_command(f"UPDATE users SET \"PurchaseHistory\" = '{purchase_offers}' WHERE id = {user_id};")
        return 'well done', 200

    @app.route('/api/Profile')
    def profile():
        #* This function contains the idor vuln
        validation = validate_auth(request)
        if validation != "Authenticated":
            return validation
        user_id = request.cookies.get('user_id')

        if user_id:
            # If token is valid, serve the profile (return user data)
            user_data = fetch_user_data(user_id) #! THIS WILL BE THE REASON FOR IDOR
            if not user_data:
                return jsonify({"error": "User not found"})
            return jsonify(user_data)           
    
    @app.route('/api/logIn', methods=['POST'])
    def login():
        data = request.get_json()
        username = data.get("username")
        password = data.get("password")
        login_result = validate_login(username, password)
        match login_result:
            case "Authenticated":
                user_id = execute_fetch_db_command(f"SELECT id FROM users WHERE username='{username}';")[0][0]
                jwt_token = create_jwt(user_id)
                response = make_response("Cookies set!")
                response.set_cookie('token', jwt_token, path='/')
                response.set_cookie('user_id', str(user_id), path='/')
                return response
            case _:
                return jsonify({"error": login_result}), 401
    
    @app.route('/api/addReview', methods=['POST'])
    def add_review():
        data = request.get_json()
        offer_id = data.get("offer_id")
        review_text = data.get("review")
        if not offer_id or not review_text:
            return jsonify({"error": "Invalid input"}), 400
        #sql_return_value = execute_commit_db_command(f"INSERT INTO reviews (offer_id, review_text) VALUES ({offer_id}, '{review_text}')")

        """I don't use the vulnerable execute_commit_db_command() function here since trying to XSS actually causes an sql injection and causes this function to fail and not store any code with XSS in it."""
        try:
            with sqlite3.connect('database.db') as db_connection:
                cursor = db_connection.cursor()
                cursor.execute("INSERT INTO reviews (offer_id, review_text) VALUES (?, ?)", (offer_id, review_text))
                db_connection.commit()
        except Exception as e:
            return jsonify({"error": "SQL error"}), 400
        return jsonify({"message": "Review added successfully"}), 201
    
    @app.route('/api/createOffer', methods=['POST'])
    def create_offer():
        validation = validate_auth(request)
        if validation != "Authenticated":
            return validation
        try:
            if not all(key in request.form for key in ('name', 'description', 'price')):
                return jsonify({'error': 'Incomplete offer'}), 400
            price = request.form.get('price')
            try:
                price = int(price)
            except ValueError:
                return jsonify({'error': 'Price is not a valid integer'}), 400

            # This if-elif block does some magic to figure out if the image is a link or an embedded file and acts accordingly
            image_path = None
            if 'image' in request.files:
                file = request.files['image']
                if file and allowed_file(file.filename):
                    filename = secure_filename(file.filename)
                    image_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
                    file.save(image_path)
            elif 'image' in request.form and request.form['image'].startswith('http'):
                image_path = request.form['image']

            if not image_path:
                return jsonify({'error': 'No image or valid URL provided'}), 400

            offers = load_json_data()
            user_id = request.cookies.get('user_id')
            new_offer_id = max([offer['id'] for offer in offers], default=0) + 1 # This makes the ID incremental
            
            new_offer = {
                'id': new_offer_id,
                'name': request.form.get('name'),
                'description': request.form.get('description'),
                'price': price,
                'image': f"{filename}", # I used filename since we have a route for /uploads and image_path didn't work
                'seller': fetch_user_data(user_id).get('username')
            }

            offers.append(new_offer)
            save_offers(offers)
            return jsonify({'message': 'Offer added successfully', 'offer': new_offer}), 201
        except Exception as e:
            return jsonify({'error': str(e)}), 500
            
    @app.route('/api/flag/<int:user_id>', methods=['GET'])
    def get_flag(user_id):
        validation = validate_auth(request)
        if validation != "Authenticated":
            return validation
        return jsonify({'flag': 'ASIKARIKAS{ENUMERATION_AND_BRUTE_FORCE}'})


    @app.route('/api/Register', methods=['POST'])
    def register_user():
        data = request.get_json()
        new_username = data.get("username")
        new_password = data.get("password")
        if not new_username or not new_password:
            return jsonify({"error": "Invalid input"}), 400
        username_exists = lambda username: bool(execute_fetch_db_command(f"SELECT 1 FROM users WHERE username = '{username}' LIMIT 1;"))
        if username_exists(new_username):
            return jsonify({"error": "Username already exists"}), 400
        sql_return_value = execute_commit_db_command(f"INSERT INTO users (username, password) VALUES ('{new_username}', '{new_password}')")
        if sql_return_value is not None and sql_return_value is False:
            return jsonify({"error": "An error has occurred"}), 500
        return jsonify({"message": "User registered successfully"}), 200

    def allowed_file(filename):
        return '.' in filename and filename.rsplit('.', 1)[1].lower() in {'png', 'jpg', 'jpeg', 'gif', 'bmp'}

    # Helper function to read the JSON file
    def load_json_data():
        if os.path.exists(JSON_PATH):
            with open(JSON_PATH, 'r', encoding='utf-8') as file:
                return json.load(file)
        else:
            return []
    
    def save_offers(offers):
        with open(JSON_PATH, 'w') as file:
            json.dump(offers, file, indent=4)


    # Helper functiom to gather a user's data
    def fetch_user_data(user_id):
        user_data = execute_fetch_db_command(f"SELECT id, username, money, PurchaseHistory FROM users WHERE id='{user_id}';")[0]
        if not bool(user_data):
            return False

        purchases = []
        if user_data[3] != None:
            purchases = user_data[3].split(',')
        purchasesOffers = []
        for pur in purchases:
            purchasesOffers.append(get_offer(pur))

        return {
            "id": user_data[0],
            "username": user_data[1],
            "money": user_data[2],
            "purchases": purchasesOffers,
            }

    # Function to fetch reviews from the database
    def fetch_offer_reviews():
        reviews = {}
        rows = execute_fetch_db_command("SELECT offer_id, review_text FROM reviews;")
        for row in rows:
            offer_id, review = row
            if offer_id not in reviews:
                reviews[offer_id] = []
            reviews[offer_id].append(review)
        return reviews

    # Helper function to validate website logins
    def validate_login(username, password):
        """
        First sql is needed to confirm if a user exists, second one is used for confirming the password.

        Yes, authentication works without the first sql query, but it is needed for the enumeration vuln to work.
        """
        if not execute_fetch_db_command(f"SELECT * FROM users WHERE username = '{username}' LIMIT 1;"):
            return "Username does not exist"
        database_output = execute_fetch_db_command(f"SELECT password FROM users WHERE username='{username}';")
        if database_output is not None and password == database_output[0][0]:
            return "Authenticated"
        return "Wrong password"
    
    # Used as auth validation for apis
    def validate_auth(request):
        token = request.cookies.get('token')
        if token:            
            # Validate the token
            if decode_jwt(token, "exp") == "JWT token invalid":
                return jsonify({
                    'error': "JWT token invalid"
                })
            return "Authenticated"
        return jsonify({
            'error': "JWT token not present"
        })

    # Helper function to create a JWT token for logging in
    def create_jwt(user_id=None):
        if user_id is None:
            raise ValueError("User ID must be provided.")
        payload = {
        'user_id': user_id,
        'admin': False,
        'exp': datetime.now(timezone.utc) + timedelta(seconds=1_728_000) # expirity time is 20 days
        }
        token = jwt.encode(payload, PRIVATE_KEY, ALGORITHM)
        return token




    """
    The following lines of code make it possible to have the JWT vuln.

    We have to use this since the devs have implemented safeguards agains algorithm confusion vulns, including one where you're not allowed to sign tokens with secrets that have the same format as an rsa public key .

    This isn't realistic in a real-life webapp unless you're extremely bad or are just using a very outdated version of PyJWT.
    """

    # prepare an override method
    def prepare_key(key):
        return jwt.utils.force_bytes(key)

    # override HS256's prepare key method to disable checking for asymmetric key words
    jwt.api_jws._jws_global_obj._algorithms['HS256'].prepare_key = prepare_key



    # Helper function to decode JWT tokens when authenticating
    def decode_jwt(token=None, dict_key=None):
        if token is None or dict_key == None or not isinstance(dict_key, str):
            raise ValueError("Token and requested namefield must both be provided.")
        try:
            decoded_header = jwt.get_unverified_header(token)
            decoded_algorithm = decoded_header.get('alg')

            #decoded_token = jwt.decode(token, PUBLIC_KEY, ALGORITHM)
            decoded_token = jwt.decode(token, PUBLIC_KEY, decoded_algorithm)
            extracted_value = decoded_token[str(dict_key)]
            if str(dict_key) == 'admin':
                return extracted_value
            if extracted_value:
                return extracted_value
            raise ValueError
        except ValueError:
            raise ValueError("Namefield not found in token.")
        except Exception as e:
            raise ValueError("JWT token invalid")
    
    # Helper function to execute commands to the database
    def execute_fetch_db_command(command: str):
        # Try block to connect to database IN READ-ONLY MODE and execute a command
        # The read-only mode is really important since this means that the sql injection vuln can ONLY read from the database and not instantly nuke it
        try:
            with sqlite3.connect('file:database.db?mode=ro', uri=True) as db_connection:
                cursor = db_connection.cursor()
                cursor.execute(command)
                result = cursor.fetchall() #* this used fetchone() before
                return result
        except sqlite3.DatabaseError as e:
            app.logger.error(f"wtf error1: {e}")
        finally:
            print("Connection closed properly.")
    
    #Executing sql command and commiting
    def execute_commit_db_command(command: str):
        try:
            with sqlite3.connect('database.db') as db_connection:
                cursor = db_connection.cursor()
                app.logger.error(command)
                cursor.execute(command)
                db_connection.commit()
        except Exception as e:
            app.logger.error(f"wtf error2: {e}")
            return False
        print("Connection closed properly.")


    # Run the app
    app.run(debug=True, port=80)

if __name__ == '__main__':
    main()