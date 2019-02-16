#include <WiFi101.h>
#include <ArduinoHttpClient.h>
#include "arduino_secrets.h" // secrets which can be hidden if you upload on github

const char serverAddress[] = "dweet.io";
String myDweet = "curious-minute";
String contentType = "application/json";
String postPath = "/dweet/for/";
int port = 80;

WiFiClient wifi;
HttpClient client = HttpClient(wifi, serverAddress, port);

void setup() {
  // put your setup code here, to run once:
  Serial.begin(9600);
  Serial.println("Starting");
  
  // while you're not connected to a WiFi AP,
  while ( WiFi.status() != WL_CONNECTED) {
    Serial.print("Attempting to connect to Network named: ");
    Serial.println(ssid);           // print the network name (SSID)
    WiFi.begin(ssid, pass);         // try to connect
    delay(5000);                    // wait 2 seconds before next attempt
  }
}

void loop() {
  dweet();
  delay(10000);
}

void dweet() {
  postPath += myDweet; // create full path

  String postData = "{\"randomValue\":\"" + String(5) +"\"}"; ;//switch 5 with any other data you want

  client.post(postPath,contentType,postData);

  int statusCode = client.responseStatusCode();
  String response = client.responseBody();

  Serial.print("Status code: ");
  Serial.println(statusCode);
  Serial.print("Response: ");
  Serial.println(response);

  Serial.println("Wait ten seconds\n");
}
