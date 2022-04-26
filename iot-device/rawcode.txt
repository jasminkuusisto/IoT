// IoT Proto, Sends Date/Time data via url-encoded HTTP Post request
// to a server, once PIR motion sensor detects movement via external interrupt 

#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include <NTPClient.h>
#include <WiFiUdp.h>

int LED = 2; //Pin D4 on board
int SENSOR = 12; //pin D6 on board
int sensorStatus = 0; //movement detection flag
 
const char* ssid = "REPLACE_NETWORK_NAME";
const char* password = "REPLACE_NETWORK_PASSWORD";

//date time offset for our timezone
const long utcOffsetInSeconds = 3*60*60;

//define timeclient for getting date/time
WiFiUDP ntpUDP;
NTPClient timeClient(ntpUDP,"pool.ntp.org",utcOffsetInSeconds);

//name of Server
const char* server = "REPLACE_SERVER_NAME/IP_ADDRESS";

//Store interrupt in RAM memory instead of flash
//Otherwise causes crashes
void ICACHE_RAM_ATTR handleInterrupt();

void setup() {
  // put your setup code here, to run once:
  Serial.begin(115200); //Debugging monitor, default baudrate
  pinMode(LED,OUTPUT);
  pinMode(SENSOR,INPUT_PULLUP); 
  digitalWrite(LED,LOW);

  //External interrupt for sensor on rising edge
  attachInterrupt(digitalPinToInterrupt(SENSOR),handleInterrupt,RISING);

  //disable interrupt while connecting to WiFi
  ETS_GPIO_INTR_DISABLE();

  Serial.println("Starting Wi-Fi connection...");
  WiFi.begin(ssid,password);

  while(WiFi.status() != WL_CONNECTED){
    delay(500);
    Serial.println("Connecting...");
  }

  Serial.println("Wifi connected");
  Serial.print("IP address: ");
  Serial.println(WiFi.localIP());

  //Enable time client
  timeClient.begin();
  
  //enable interrupt
  ETS_GPIO_INTR_ENABLE();
}

void loop() {
  // put your main code here, to run repeatedly:
  
  if(sensorStatus == 1){
    ETS_GPIO_INTR_DISABLE(); //disable interrupts
    if(WiFi.status() == WL_CONNECTED){
 
      //Update time, get date and time via ntpclient
      timeClient.update();
      time_t epochTime = timeClient.getEpochTime();
      struct tm *ptm = gmtime((time_t *)&epochTime);
      int dateYear = ptm->tm_year+1900;
      int dateMonth = ptm->tm_mon+1;
      int dateDay = ptm->tm_mday;
      String formattedTime = timeClient.getFormattedTime();

      //Create http and Wifi instances
      WiFiClient client;
      HTTPClient http;
      
      bool begins = http.begin(client,server);
      if(begins){
        Serial.println("Http works");  
      }else{
        Serial.println("Http not working...");  
      }
      
      //define content type
      http.addHeader("Content-Type","application/x-www-form-urlencoded");
      //Date/Time to be sent in format "YYYY-MM-DD HH:MM:SS"
      String httpData = "date=" +String(dateYear) + "-" + 
      String(dateMonth) + "-" + String(dateDay) + " " + formattedTime; 
      Serial.print("Data sent: ");
      Serial.println(httpData);

      //Send post request
      int httpSend = http.POST(httpData);
      String payload = http.getString(); //return response

      //Print Http request code and response on serial monitor
      Serial.print("HTTP code: ");
      Serial.println(httpSend);

      Serial.print("Response: ");
      Serial.println(payload);

      //reset interrupt flag
      sensorStatus = 0;
      ETS_GPIO_INTR_ENABLE(); //enable interrupts
    }else{
      Serial.println("Wifi disconnected...");
      sensorStatus = 0;
      ETS_GPIO_INTR_ENABLE();
    }
  }else{
    //Do nothing when movement not detected
  }
}

//Interrupt routine
//Triggers http post request, blinks led
void handleInterrupt(){
  digitalWrite(LED,HIGH);
  delayMicroseconds(2000000); //2s delay
  digitalWrite(LED,LOW);

  sensorStatus = 1;
}
