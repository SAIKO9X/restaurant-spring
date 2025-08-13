# Estágio 1: Build da Aplicação com Maven
# Usamos a imagem do Eclipse Temurin com o JDK completo para compilar
FROM eclipse-temurin:17-jdk-alpine AS build

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Copia o pom.xml e o código-fonte para o container
COPY pom.xml .
COPY .mvn/ .mvn/
COPY mvnw .
COPY mvnw.cmd .
COPY src ./src

# Executa o comando do Maven para empacotar a aplicação
RUN ./mvnw package -DskipTests


# Estágio 2: Imagem Final de Execução
FROM eclipse-temurin:17-jre-alpine

# Define o diretório de trabalho
WORKDIR /app

# Copia apenas o arquivo .jar compilado do estágio de build para a imagem final
COPY --from=build /app/target/*.jar app.jar

# Expõe a porta que a aplicação Spring Boot usa
EXPOSE 8080

# Comando para iniciar a aplicação quando o container for executado
ENTRYPOINT ["java", "-jar", "app.jar"]