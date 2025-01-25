from flask import *
import json
import os


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

    # Flask app variable
    app = Flask(__name__,
                static_folder=os.path.join(BUILD_DIR, 'static'))

    # Helper function to read the JSON file
    def read_json_data():
        if os.path.exists(JSON_PATH):
            with open(JSON_PATH, 'r') as file:
                return json.load(file)
        else:
            return []
        
    # Route to get all offers
    @app.route('/api/getAllOffers', methods=['GET'])
    def get_offers():
        offers = read_json_data()
        return jsonify(offers), 200

    @app.route('/<path:filename>')
    def serve_file(filename):
        # Serve files from the 'client/build' directory
        
        #DEBUGGING
        app.logger.info(f"request filename: {filename}")


        # Construct the full path to the file
        file_path = os.path.join(BUILD_DIR, filename)

        # Check if the file exists
        if os.path.exists(file_path) and os.path.isfile(file_path):
            return send_file(file_path)
        return "404 NOT FOUND"
    
    @app.route('/')
    def serve_index():
        return send_file(INDEX)
    
    @app.route('/Profile')
    def Profile():
        return serve_index()
    
    @app.route('/api/logIn', methods=['POST'])
    def login():
        response = request.get_json()

        return "kai ara"
    
    

    # Run the app
    app.run(debug=True, port=80)


if __name__ == '__main__':
    main()