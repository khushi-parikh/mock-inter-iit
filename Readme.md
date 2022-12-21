# Mock-Inter-IIT

## Installation

Requires python and node.

### Set up the virtual environment
These instructions assume you have Python 3 and __pip__ (`>= v20.3`) installed. If you don't have pip installed (you probably do) you can install it with the instructions in the [pip docs](https://pip.pypa.io/en/stable/installing/).

```sh
$ python3 -m venv pythonenv                    # create a virtual env in the folder `pythonenv`
$ source pythonenv/bin/activate                # activate the virtual env
$ pip install --upgrade pip                    # securely upgrade pip
```
```sh
$ pip install -r requirements.txt              # install dependencies
$ cd ./frontend/mock_app/ && npm install       # install frontend dependencies 
```

<!-- 1. ```pip install -r requirements.txt```
2. ```cd .\frontend\mock_app\ && npm install``` -->

## Development

1. In the frontend/mock_app directory: ```npm start```  
2. In a separate terminal, in the root directory: ```python app.py```
3. Go to [http://localhost:3000/](http://localhost:3000/)
