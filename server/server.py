import flask
import json
import os


def main():
    app = flask(__name__)

    # File path for JSON data
    JSON_PATH = 'data.json'

    # Helper function to read the JSON file
    def read_json_data():
        if os.path.exists(JSON_PATH):
            with open(JSON_PATH, 'r') as file:
                return json.load(file)
        else:
            return []
        
    # Route to get all offers
    @app.route('/api/getAllOffers', methods=['GET'])
    def get_users():
        offers = read_json_data()
        return flask.jsonify(offers), 200

    app.run(debug=True, port=80)


if __name__ == '__main__':
    main()