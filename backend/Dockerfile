FROM python:3.7-alpine
COPY . /app
WORKDIR /app
RUN pip3 install -r requirements.txt
ENTRYPOINT ["python3"] 
CMD ["-m", "flask", "run", "--host=0.0.0.0"]