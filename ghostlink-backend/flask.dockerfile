# Base image
FROM python:3.12-slim-bullseye

# Set working directory
WORKDIR /app

# Copy requirements file
COPY requirements.txt .

# Install Python dependencies
RUN pip3 install --upgrade pip && \
    pip3 install -r requirements.txt

# Copy the rest of the application files
COPY . .

EXPOSE 4000

# Create a non-root user and switch to it
RUN useradd -m appuser
USER appuser

# Command to run the application when the container starts
CMD [ "python3", "app.py", "--host=0.0.0.0", "--port=4000"]