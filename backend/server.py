from flask import Flask, g, jsonify, request
from flask_cors import CORS, cross_origin
from playhouse.shortcuts import model_to_dict

import models
from resources.dogs import dog

DEBUG = True
PORT = 3000

app = Flask(__name__)
CORS(app, origins=['http://localhost:300', 'http://localhost:3001', 'http://localhost:3000'], supports_credentials=True)
CORS(dog, origins=['http://localhost:300', 'http://localhost:3001', 'http://localhost:3000'], supports_credentials=True)
app.config['CORS_HEADERS'] = 'Content-Type'


@app.before_request
def before_requestcd():
  g.db = models.DATABASE
  g.db.connect()

@app.after_request
def before_request(response):
  g.db.close()
  return response

# Get all the dogs
@dog.route('/all', methods=["GET"])
def get_all_dogs():
  try:
    dogs = [model_to_dict(dog) for dog in models.Dog.select()]
    return jsonify(data=dogs, status={"code": 200, "message": "Success"})
  except models.Dog.DoesNotExist:
    return jsonify(data={}, status={
      "code": 401,
      "message": "Error getting the resources"
    })

# Make a new dog
@dog.route('/add', methods=["POST"])
def create_dogs():
  payload = request.get_json()
  dog = models.Dog.create(**payload)
  dog_dict = model_to_dict(dog)
  return jsonify(data=dog_dict, status={"code": 201, "message": "Success"})

@dog.route('/delete', methods=['POST'])
def delete_dog():
  payload = request.get_json()
  try:
    dog = models.Dog.get(models.Dog.id == payload['id'])
    dog.delete_instance()
  except Exception as e:
    print(f"There was error: {e}")
  return jsonify(data={"id": payload['id']}, status={"code": 201, "message": "Success"})

@dog.route('/update', methods=['POST', 'OPTIONS'])
def update_dog():
  payload = request.get_json()
  dog = models.Dog.get(models.Dog.id == payload['id'])
  dog.name = payload.name
  dog.owner = payload.owner
  dog.breed = payload.breed
  dog.save()
  return jsonify(data=model_to_dict(**dog), status={"code": 201, "message": "Success"})

  
# Initalize App
if __name__ == '__main__':
  app.register_blueprint(dog, url_prefix='/api/v1/dogs')
  models.initialize()
  app.run(debug=DEBUG, port=PORT)
