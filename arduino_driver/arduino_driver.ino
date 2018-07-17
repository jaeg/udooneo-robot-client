void setup() {
  // put your setup code here, to run once:
  Serial.begin(9600);
}

void loop() {
  // put your main code here, to run repeatedly:
  double val = (analogRead(2))/2;
  Serial.println(val);
}
