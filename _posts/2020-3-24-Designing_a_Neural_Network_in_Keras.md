---
layout: post
title: 'Designing a Neural Network in Keras'
date: 2020-03-24 16:38:02 -0500
description: 'Discusses the appropriate questions to ask and steps to take in designing and implementing a neural network in Keras for a given problem, with a toy example implementation. Emphasis on dense, convolutional, and recurrent neural networks, with particular focus on recurrent LSTM networks.'
categories: computing
---

## Table of Contents
1. [Preface](#preface)
2. [Tools for the Job](#tools-for-the-job)
4. [Procedure](#procedure)
    1. [Prerequisites](#prerequisites)
    2. [Finding a Dataset](#finding-a-dataset)
    3. [Santizing the Dataset](#sanitizing-the-dataset)
    4. [Choosing a Neural Network Architecture](#choosing-a-neural-network-architecture)
    5. [Implementing the Neural Network](#implementing-the-neural-network)
    6. [Training and Testing](#training-and-testing)
5. [Advice](#advice)

----------------------------------------------------------------------------------------------

## Preface
Neural networks are seemingly everywhere. Recently they have taken the computer science and technology world by storm. 

## Tools for the Job
You will need a few items before creating a neural network. Of course, the various libraries listed below can be substituted for others, but for this tutorial and implementation, Keras will be used:

* **[Python (at least version 3.6)](https://www.python.org/downloads/):** Python is the programming language and interpretter we will be using to implement the neural network.
* **[PIP (Python package maager)](https://pip.pypa.io/en/stable/installing/):** PIP is a tool for installing packages and libraries. We will use several libraries to create a neural network, but PIP will typically install most of them for us automatically.
* **[TensorFlow (Backend Neural Network Library)](https://www.tensorflow.org/install/):** A backend neural network library. This library will handle most of the heavy matrix math that forms the mathematical basis of neural networks.
* **[Keras (Frontend Neural Network Library)](https://keras.io/#installation):** A frontend neural network library for Python. Keras makes implementing neural networks much simpler than implementing them strictly in TensorFlow. 
* **A Dataset:** The dataset is what is used to mold the neural network to perform a particular task. Without a dataset, the neural network has no example information to know what to do. Examples of datatsets and handy places to look for datasets is covered in section 4.2, [Finding a Dataset](#finding-a-dataset).
* **A Question to Answer:** Perhaps the most obvious 'item' needed, but an important one to note regardless. The question, and the implicit assumptions it carries, form a big role in the design process of creating a neural network. 

Of course, I forgo the obvious tools needed of a computer and a code editor. For context, the code editor I use is [VS Code](https://code.visualstudio.com). Internet connection is also needed to install the libraries, but I presuppose that is not issue if you can read this article.

## Procedure
The procedure for implementing a neural network is provided below. Each step also includes instructions for a concrete example. For this article, the example under investigation will be **sentiment analysis** of provided sentences. In simpler terms, the neural network will examine sentences, and attempt to extract the connotation of the sentence. Does the sentence reflect a positive (happy, good) sentiment, or a negative (disapproving, bad) sentiment? Or is it neutral? 

Although the specific implementation details will be provided in reference to the above problem, the procedure for designing a neural network (the essence of this article) is in the general case. The sentiment analysis example is provided for make the general procedure more substantive and provide context for the advice given.

### Prerequisites
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Enim facilisis gravida neque convallis a cras semper auctor. Sollicitudin nibh sit amet commodo. Habitant morbi tristique senectus et netus. Nisl nisi scelerisque eu ultrices vitae auctor eu. In cursus turpis massa tincidunt dui ut ornare lectus sit. Tincidunt arcu non sodales neque sodales ut. Vitae congue eu consequat ac felis donec et. Senectus et netus et malesuada fames. Turpis cursus in hac habitasse platea dictumst quisque sagittis purus. Risus feugiat in ante metus dictum at tempor commodo ullamcorper. Feugiat vivamus at augue eget arcu dictum varius duis at. Tempor orci dapibus ultrices in iaculis nunc. Sed euismod nisi porta lorem mollis. Eu feugiat pretium nibh ipsum consequat nisl vel. Nulla porttitor massa id neque aliquam vestibulum morbi blandit. Facilisi cras fermentum odio eu feugiat pretium.

### Finding a Dataset
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Enim facilisis gravida neque convallis a cras semper auctor. Sollicitudin nibh sit amet commodo. Habitant morbi tristique senectus et netus. Nisl nisi scelerisque eu ultrices vitae auctor eu. In cursus turpis massa tincidunt dui ut ornare lectus sit. Tincidunt arcu non sodales neque sodales ut. Vitae congue eu consequat ac felis donec et. Senectus et netus et malesuada fames. Turpis cursus in hac habitasse platea dictumst quisque sagittis purus. Risus feugiat in ante metus dictum at tempor commodo ullamcorper. Feugiat vivamus at augue eget arcu dictum varius duis at. Tempor orci dapibus ultrices in iaculis nunc. Sed euismod nisi porta lorem mollis. Eu feugiat pretium nibh ipsum consequat nisl vel. Nulla porttitor massa id neque aliquam vestibulum morbi blandit. Facilisi cras fermentum odio eu feugiat pretium.

### Sanitizing the Dataset
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Enim facilisis gravida neque convallis a cras semper auctor. Sollicitudin nibh sit amet commodo. Habitant morbi tristique senectus et netus. Nisl nisi scelerisque eu ultrices vitae auctor eu. In cursus turpis massa tincidunt dui ut ornare lectus sit. Tincidunt arcu non sodales neque sodales ut. Vitae congue eu consequat ac felis donec et. Senectus et netus et malesuada fames. Turpis cursus in hac habitasse platea dictumst quisque sagittis purus. Risus feugiat in ante metus dictum at tempor commodo ullamcorper. Feugiat vivamus at augue eget arcu dictum varius duis at. Tempor orci dapibus ultrices in iaculis nunc. Sed euismod nisi porta lorem mollis. Eu feugiat pretium nibh ipsum consequat nisl vel. Nulla porttitor massa id neque aliquam vestibulum morbi blandit. Facilisi cras fermentum odio eu feugiat pretium.

### Choosing a Neural Network Architecture
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Enim facilisis gravida neque convallis a cras semper auctor. Sollicitudin nibh sit amet commodo. Habitant morbi tristique senectus et netus. Nisl nisi scelerisque eu ultrices vitae auctor eu. In cursus turpis massa tincidunt dui ut ornare lectus sit. Tincidunt arcu non sodales neque sodales ut. Vitae congue eu consequat ac felis donec et. Senectus et netus et malesuada fames. Turpis cursus in hac habitasse platea dictumst quisque sagittis purus. Risus feugiat in ante metus dictum at tempor commodo ullamcorper. Feugiat vivamus at augue eget arcu dictum varius duis at. Tempor orci dapibus ultrices in iaculis nunc. Sed euismod nisi porta lorem mollis. Eu feugiat pretium nibh ipsum consequat nisl vel. Nulla porttitor massa id neque aliquam vestibulum morbi blandit. Facilisi cras fermentum odio eu feugiat pretium.

### Implementing the Neural Network
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Enim facilisis gravida neque convallis a cras semper auctor. Sollicitudin nibh sit amet commodo. Habitant morbi tristique senectus et netus. Nisl nisi scelerisque eu ultrices vitae auctor eu. In cursus turpis massa tincidunt dui ut ornare lectus sit. Tincidunt arcu non sodales neque sodales ut. Vitae congue eu consequat ac felis donec et. Senectus et netus et malesuada fames. Turpis cursus in hac habitasse platea dictumst quisque sagittis purus. Risus feugiat in ante metus dictum at tempor commodo ullamcorper. Feugiat vivamus at augue eget arcu dictum varius duis at. Tempor orci dapibus ultrices in iaculis nunc. Sed euismod nisi porta lorem mollis. Eu feugiat pretium nibh ipsum consequat nisl vel. Nulla porttitor massa id neque aliquam vestibulum morbi blandit. Facilisi cras fermentum odio eu feugiat pretium.

### Training and Testing
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Enim facilisis gravida neque convallis a cras semper auctor. Sollicitudin nibh sit amet commodo. Habitant morbi tristique senectus et netus. Nisl nisi scelerisque eu ultrices vitae auctor eu. In cursus turpis massa tincidunt dui ut ornare lectus sit. Tincidunt arcu non sodales neque sodales ut. Vitae congue eu consequat ac felis donec et. Senectus et netus et malesuada fames. Turpis cursus in hac habitasse platea dictumst quisque sagittis purus. Risus feugiat in ante metus dictum at tempor commodo ullamcorper. Feugiat vivamus at augue eget arcu dictum varius duis at. Tempor orci dapibus ultrices in iaculis nunc. Sed euismod nisi porta lorem mollis. Eu feugiat pretium nibh ipsum consequat nisl vel. Nulla porttitor massa id neque aliquam vestibulum morbi blandit. Facilisi cras fermentum odio eu feugiat pretium.

## Advice
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Enim facilisis gravida neque convallis a cras semper auctor. Sollicitudin nibh sit amet commodo. Habitant morbi tristique senectus et netus. Nisl nisi scelerisque eu ultrices vitae auctor eu. In cursus turpis massa tincidunt dui ut ornare lectus sit. Tincidunt arcu non sodales neque sodales ut. Vitae congue eu consequat ac felis donec et. Senectus et netus et malesuada fames. Turpis cursus in hac habitasse platea dictumst quisque sagittis purus. Risus feugiat in ante metus dictum at tempor commodo ullamcorper. Feugiat vivamus at augue eget arcu dictum varius duis at. Tempor orci dapibus ultrices in iaculis nunc. Sed euismod nisi porta lorem mollis. Eu feugiat pretium nibh ipsum consequat nisl vel. Nulla porttitor massa id neque aliquam vestibulum morbi blandit. Facilisi cras fermentum odio eu feugiat pretium.