FROM openjdk:19-jdk

COPY target/TechStore-0.0.1.jar tech-store.jar

#Using Dokerize to check whether db is up, if it is then start this service.
COPY dockerize dockerize

CMD ./dockerize -wait tcp://tech_store_db:1433 -timeout 15m java -Djava.security.egd=file:///dev/urandom -jar /tech-store.jar