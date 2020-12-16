from flask import Flask, g, jsonify, request
from flask_cors import CORS
from playhouse.shortcuts import model_to_dict

import models
from resources.dogs import dog

DEBUG = True
PORT = 3000

app = Flask(__name__)

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
  except models.DoesNotExist:
    return jsonify(data={}, status={
      "code": 401,
      "message": "Error getting the resources"
    })

# Make a new dog
@app.route('/add', methods=["POST"])
def create_dogs():
  payload = request.get_json()
  dog = models.Dog.create(**payload)
  dog_dict = model_to_dict(dog)
  return jsonify(data=dog_dict, status={"code": 201, "message": "Success"})

@app.route('/delete', methods=['POST'])
def delete_dog():
  payload = request.get_json()
  dog = models.Dog.get(Dog.id == payload.id)
  dog.delete_instance()

@app.route('/update', methods=['POST'])
def update_dog():
  payload = request.get_json()
  dog = models.Dog.get(Dog.id == payload.id)
  dog.name = payload.name
  dog.owner = payload.owner
  dog.breed = payload.breed
  dog.save()

# Initalize App
if __name__ == '__main__':
  CORS(app)
  CORS(dogs)
  app.register_blueprint(dog, url_prefix='/api/v1/dogs')
  models.initialize()
  app.run(debug=DEBUG, port=PORT)