const int dirA = 12;
const int dirB = 13;

const int pwmA = 3;
const int pwmB = 11;


void setup() {
  // put your setup code here, to run once:
  Serial.begin(9600);

  pinMode(dirA,OUTPUT);
  pinMode(dirB,OUTPUT);
  pinMode(pwmA,OUTPUT);
  pinMode(pwmB,OUTPUT);
  
}

void loop() {
  if (Serial.available() > 0) {
    String cmd = "";
    cmd = Serial.readString();
    Serial.println(cmd);

    if (cmd == "FORWARD") {
      digitalWrite(dirA, 1);
      digitalWrite(dirB, 1);
      digitalWrite(pwmA, 1);
      digitalWrite(pwmB ,1);
    }

    if (cmd == "BACKWARD") {
      digitalWrite(dirA, 0);
      digitalWrite(dirB, 0);
      digitalWrite(pwmA, 1);
      digitalWrite(pwmB ,1);
    }

    if (cmd == "STOP") {
      digitalWrite(pwmA, 0);
      digitalWrite(pwmB, 0);
    }

    if (cmd == "LEFT") {
      digitalWrite(dirA, 1);
      digitalWrite(dirB, 0);
      digitalWrite(pwmA, 1);
      digitalWrite(pwmB ,1);
    }

    if (cmd == "RIGHT") {
      digitalWrite(dirA, 0);
      digitalWrite(dirB, 1);
      digitalWrite(pwmA, 1);
      digitalWrite(pwmB ,1);
    }
  }
  
  // put your main code here, to run repeatedly:
  double val = (analogRead(2))/2;
  Serial.println(val);
}
