# technologie-chmurowe-zadanie-8.3-express-redis-postgres
Stwórz prostą aplikację express w JavaScript, która będzie służyć do dodawania i odczytywania wiadomości z serwera Redis. Aplikacja będzie konteneryzowana za pomocą Docker, z plikiem Dockerfile definiującym proces budowy obrazu i plikiem package.json zawierającym zależności. Docker Compose będzie wykorzystywane do zarządzania aplikacją i serwerem Redis za pomocą pliku docker-compose.yml, który definiuje serwisy, porty i polecenia do uruchomienia. Po uruchomieniu serwisów za pomocą polecenia docker-compose up --build, API będzie dostępne pod adresem http://localhost:3000 w przeglądarce.