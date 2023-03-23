FROM openjdk:19
EXPOSE 8081
ADD target/ds-2020-0.0.1-SNAPSHOT.jar spring-docker.jar
ENTRYPOINT ["java","-jar","spring-docker.jar"]