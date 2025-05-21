Aby uruchomić projekt lokalnie i uniknąć problemów z CORS, należy skorzystać z prostego serwera HTTP:
npx serve
Nie otwieraj pliku index.html bezpośrednio w przeglądarce (np. przez file://), 
ponieważ może to spowodować błędy związane z polityką CORS. npx serve uruchamia lokalny serwer, który pozwala poprawnie ładować zasoby np. http://localhost:3000/
Baza danych jest hostowana na SupaBase, SpringBoot na Railwayu (Dokumentacja REST API)
