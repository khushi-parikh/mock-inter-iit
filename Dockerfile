FROM python:3.11

# Set the working directory to /app
WORKDIR /app

# Copy the requirements.txt file and all other necessary files to the working directory
COPY . /app

# Install any needed packages specified in requirements.txt
RUN pip install -r requirements.txt

# Make port 80 available for the app
EXPOSE 80

# Define environment variable
ENV NAME World

# Run app.py when the container launches
CMD ["python", "app.py"]