#include <ArduinoBLE.h>

/***** Start of BLE Variables *****/

BLEService heartRateService("180D"); // BLE Heart Rate Service

// BLE Heart Rate Measurement Characteristic"

BLEUnsignedCharCharacteristic heartRateChar("2A37",  // standard 16-bit characteristic UUID

    BLERead | BLENotify);  // remote clients will be able to get notifications if this characteristic changes

                              // the characteristic is 2 bytes long as the first field needs to be "Flags" as per BLE specifications

                              // https://developer.bluetooth.org/gatt/characteristics/Pages/CharacteristicViewer.aspx?u=org.bluetooth.characteristic.heart_rate_measurement.xml

int oldHeartRate = 0;  // last heart rate reading from analog input
long previousMillis = 0;  // last time the heart rate was checked, in ms

/***** End of BLE Variables *****/

/***** Start of BPM Variables *****/

int PulseSensorPurplePin = 0;   // Pulse Sensor PURPLE WIRE connected to ANALOG PIN 0
int LED13 = 13;                 //  The on-board Arduino LED
int Signal;                     // holds the incoming raw data. Signal value can range from 0-1024
int Threshold = 792;            // Determine which Signal to "count as a beat", and which to ingore.

/***** End of BPM Variables *****/

void setup() {
    
    pinMode(LED13,OUTPUT);         // pin that will blink to your heartbeat!
    setupBLEModule();             // start up the BLE peripheral module
  
}

void loop() {

  // listen for BLE peripherals to connect:

  BLEDevice central = BLE.central();

  // if a central is connected to peripheral:

  if (central) {

    Serial.print("Connected to central: ");

    // print the central's MAC address:

    Serial.println(central.address());

    // turn on the LED to indicate the connection:

    digitalWrite(13, HIGH);

    // check the heart rate measurement every 200ms

    // as long as the central is still connected:

    while (central.connected()) {

      long currentMillis = millis();

      // if 200ms have passed, check the heart rate measurement:

      if (currentMillis - previousMillis >= 200) {

        previousMillis = currentMillis;

        updateHeartRate();

      }

    }

    // when the central disconnects, turn off the LED:

    digitalWrite(13, LOW);

    Serial.print("Disconnected from central: ");

    Serial.println(central.address());

  }
}

void setupBLEModule() {

    Serial.begin(9600);    // initialize serial communication
    while (!Serial);

    pinMode(13, OUTPUT);   // initialize the LED on pin 13 to indicate when a central is connected

    // begin initialization
    if (!BLE.begin()) {
        Serial.println("starting BLE failed!");

        while (1);
    }

    /* Set a local name for the BLE device

        This name will appear in advertising packets

        and can be used by remote devices to identify this BLE device

        The name can be changed but maybe be truncated based on space left in advertisement packet */

    BLE.setLocalName("HeartRateSketch");

    BLE.setAdvertisedService(heartRateService);  // add the service UUID

    heartRateService.addCharacteristic(heartRateChar); // add the Heart Rate Measurement characteristic

    BLE.addService(heartRateService); // Add the BLE Heart Rate service

    heartRateChar.writeValue(oldHeartRate); // set initial value for this characteristic

    /* Now activate the BLE device.  It will start continuously transmitting BLE

        advertising packets and will be visible to remote BLE central devices

        until it receives a new connection */

    // start advertising
    BLE.advertise();

    Serial.println("Bluetooth device active, waiting for connections...");
}

void updateHeartRate() {

    /* Read the current voltage level on the A0 analog input pin.

        This is used here to simulate the heart rate's measurement.

    */

    int heartRateMeasurement = analogRead(PulseSensorPurplePin);

    int heartRate = map(heartRateMeasurement, 0, 1023, 0, 100);

    if (heartRate != oldHeartRate) {      // if the heart rate has changed

        Serial.print("Heart Rate is now: "); // print it

        Serial.println(heartRate);

        heartRateChar.writeValue(heartRate);  // and update the heart rate measurement characteristic

        oldHeartRate = heartRate;           // save the level for next comparison

        if(heartRateMeasurement > Threshold) {                     // If the signal is above "550", then "turn-on" Arduino's on-Board LED.
            digitalWrite(LED13,HIGH);
        } else {
            digitalWrite(LED13,LOW);                //  Else, the sigal must be below "550", so "turn-off" this LED.
        }

        delay(10);

    }
}