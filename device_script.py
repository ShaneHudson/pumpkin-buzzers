#!/usr/bin/python3
# -*- coding: utf-8 -*-

import board
import busio
import requests
import time
from firebase import Firebase

# I2C setup
from adafruit_cap1188.i2c import CAP1188_I2C
i2c = busio.I2C(board.SCL, board.SDA)
cap = CAP1188_I2C(i2c)

# API
config =  # CONFIGURATION OBJECT FROM FIREBASE

firebase = Firebase(config)
db = firebase.database()
current_quiz = db.child("activeQuizID").get().val()
quizzes = db.child("quizzes").get()
quiz = quizzes.val()[current_quiz]

while True:
    for i in range(1, 9):

        # cap[i].raw_value == 127 when near to touch. cap[i].value true/false but larger distance triggers it
        if cap[i].raw_value == 127:

            quizzes = db.child("quizzes").get()
            questions = quizzes.val()[current_quiz]['questions']
            current_question = quizzes.val()[current_quiz]["currentQuestion"]

            if current_question >= 0:
                if "buzzed" not in questions[current_question] or not questions[current_question]['buzzed'] or questions[current_question]['buzzed'] is None:
                    data = { "buzzed": "Pumpkin " + str(i) }
                    db.child("quizzes").child(current_quiz).child("questions").child(current_question).update(data)
