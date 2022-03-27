#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include <WiFiClient.h>

int LED = 2; //Pin D4 on board
int SENSOR = 12; //pin D6 on board
int sensorStatus = 0;

const char* ssid = "REPLACE_NETWORK_NAME";
const char* password = "REPLACE_NETWORK_PASSWORD";

//name of Server
const char* server = "REPLACE_DOMAIN_NAME_IP";

//Define interrupt routine
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

  Serial.println("Starting connection...");
  WiFi.begin(ssid,password);

  while(WiFi.status() != WL_CONNECTED){
    delay(500);
    Serial.println("Connecting...");
  }

  Serial.println("Wifi connected");
  Serial.print("IP address: ");
  Serial.println(WiFi.localIP());

  //enable interrupt
  ETS_GPIO_INTR_ENABLE();
}

void loop() {
  // put your main code here, to run repeatedly:

  if(sensorStatus == 1){
    ETS_GPIO_INTR_DISABLE(); //disable interrupts
    if(WiFi.status() == WL_CONNECTED){
      WiFiClient clnt;
      HTTPClient http;
      
      http.begin(clnt,server);
      //define content type
      http.addHeader("Content-Type","application/x-www-form-urlencoded");
      //Data to be sent
      String httpData = "REPLACE_WITH_DATA_TO_SEND";
      //Send post request
      int httpSend = http.POST(httpData);

      sensorStatus = 0;
      ETS_GPIO_INTR_ENABLE(); //enable interrupts
    }else{
      Serial.println("Wifi disconnected...");
      sensorStatus == 0;
    }
  }else{
    //Do nothing  
  }
}

//Triggers http post request, blinks led
void handleInterrupt(){
  digitalWrite(LED,HIGH);
  delayMicroseconds(2000000); //3s delay
  digitalWrite(LED,LOW);

  sensorStatus = 1;
}
