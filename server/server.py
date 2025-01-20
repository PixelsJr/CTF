import flask
import json
import os


def main():
    app = flask.Flask(__name__)

    # File path for JSON data
    JSON_PATH = './data.json'

    # Path to the manifest file
    MANIFEST_PATH = os.path.join(app.static_folder, 'manifest.json')

    # Server dir
    BASE_DIR = os.path.dirname(os.path.abspath(__file__))

    # Go one directory up
    PARENT_DIR = os.path.dirname(BASE_DIR)


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
        return flask.jsonify(offers), 200

    @app.route('/')
    def serve_file(filename=None):
        if filename is None: return flask.send_from_directory(os.path.join(PARENT_DIR, 'client', 'public'), 'index.html')
        return flask.send_from_directory(os.path.join(PARENT_DIR, 'client', 'build', 'static'), filename)

    # Run the app
    app.run(debug=True, port=80)


if __name__ == '__main__':
    main()