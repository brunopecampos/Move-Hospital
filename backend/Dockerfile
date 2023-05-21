FROM python:3.7-alpine
COPY . /app
WORKDIR /app
RUN pip3 install -r requirements.txt
#RUN python3 init_db.py
CMD ["python3", "-m", "flask", "run", "--host=0.0.0.0"]