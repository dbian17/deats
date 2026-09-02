import sys
sys.path.insert(0, '.')

from flask import Flask, jsonify, request

from app.dynamo import dynamo_service_client

app = Flask(__name__)


@app.route('/list', methods=['GET'])
@app.route('/list/', methods=['GET'])
def load_list():
    places = dynamo_service_client.get_all_ranked_place_data()
    return jsonify([{**place_data.__dict__} for place_data in places])

@app.route('/place/<place_name>', methods=['GET'])
@app.route('/place/<place_name>/', methods=['GET'])
def get_place(place_name):
    place_data = dynamo_service_client.get_place_data(place_name)
    place_review = dynamo_service_client.get_place_review(place_name)
    return jsonify({**place_data.__dict__, **place_review.__dict__})

# @app.route('/place', methods=['POST'])
# def add_place():
#     new_place_data = request_parser.parse_place_data(request)
#     new_place_review = request_parser.parse_place_review(request)
#     dynamo_service_client.add_place(new_place_data, new_place_review)
#     return "receive"