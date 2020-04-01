---
layout: post
title: 'Designing a Neural Network in Keras'
date: 2020-03-24 16:38:02 -0500
description: 'Discusses the appropriate questions to ask and steps to take in designing and implementing a neural network in Keras for a given problem. Includes a a toy example implementation regarding sentiment analysis. Emphasis on dense, convolutional, and recurrent neural networks, with particular implementation focus on recurrent LSTM networks.'
tags: computing
---

## Table of Contents
1. [Preface](#preface)
2. [Tools for the Job](#tools-for-the-job)
3. [Procedure](#procedure)
    1. [Prerequisites](#prerequisites)
    2. [Finding a Dataset](#finding-a-dataset)
    3. [Santizing the Dataset](#sanitizing-the-dataset)
    4. [Choosing a Neural Network Architecture](#choosing-a-neural-network-architecture)
    5. [Implementing the Neural Network](#implementing-the-neural-network)
    6. [Training and Testing](#training-and-testing)
4. [Advice](#advice)

----------------------------------------------------------------------------------------------

## Preface

A natural model for computation has always been the brain. After all, the most intimate form of 'thinking' to which we, as humans, can relate to is the thinking we do ourselves. The brain is the physical center of our thought, and more specifically the incredible amount of neurons which compose the gestalt of the brain. Naturally, these neurons and the enormous number of connections they form have been the subject of much scientific scrutiny. The structural characteristics of these biological neural networks have formed the basis of a burgeoning branch of computing, the study of Artificial Neural Networks.  

Artificial Neural Networks (ANNs) are a type of algorithm based on pattern recognition. The theory of their operation is roughly based on the operation of biological neural networks, where similar inputs should produce similar outputs. More specifically, the neural network attempts to comprehend relevant characteristics (or features) of an input (which can be virtually anything that can be stored on a computer, such as text and images) to produce consistent and correct output on input samples it has never seen before. 

Neural Networks typically operate in two phases: training and usage. The **training** phase involves presenting the neural network with a dataset. This dataset should, in some way, encode the relationship that the neural network should discover py pairing an input and its desired output. By examining the pairs from the dataset, the neural network develops a sort of "intuition" about the nature of the input and how it relates to the output, even if that relationship is not linear or explicitly labeled in the dataset. The emergent intuition is what makes neural networks work seemingly magically.  

In this post I will discuss how to design and construct a deep neural network from scratch using Keras. Throughout, I will address the important questions one must ask in designing a neural network. At every step in the process, there are precise decisions that must be made that are specific the problem in question. In addition, answers to these questions and specific code samples will be provided for one particular application of neural networks: sentiment analysis.

At the end of the article, a functioning neural network for sentiment analysis will be complete, alongside a general procedure for creating a neural network that can be used as a guide.

## Tools for the Job
You will need a few items before creating a neural network. Of course, the various libraries listed below can be substituted for others, but for this tutorial and implementation, Keras will be used:

* **[Python (at least version 3.6)](https://www.python.org/downloads/):** Python is the programming language and interpretter we will be using to implement the neural network.
* **[PIP (Python package manager)](https://pip.pypa.io/en/stable/installing/):** PIP is a tool for installing packages and libraries. We will use several libraries to create a neural network, but PIP will typically install most of them for us automatically. If you Python version is at least 3.4, PIP should come installed with your python installation.
* **[TensorFlow (Backend Neural Network Library)](https://www.tensorflow.org/install/):** A backend neural network library. This library will handle most of the heavy matrix math that forms the mathematical basis of neural networks.
* **[Keras (Frontend Neural Network Library)](https://keras.io/#installation):** A frontend neural network library for Python. Keras makes implementing neural networks much simpler than implementing them strictly in TensorFlow. 
* **A Dataset:** The dataset is what is used to mold the neural network to perform a particular task. Without a dataset, the neural network has no example information to know what to do. Examples of datatsets and handy places to look for datasets is covered in the [Finding a Dataset](#finding-a-dataset) section.
* **A Question to Answer:** Perhaps the most obvious 'item' needed, but an important one to note regardless. This question and the implicit assumptions it carries form a big role in the design process of creating a neural network. 

Of course, I forgo the obvious tools needed of a computer and a code editor. For context, the code editor I use is [VS Code](https://code.visualstudio.com). Internet connection is also needed to install the libraries, but I presuppose that is not issue if you can read this article.

## Procedure
The procedure for implementing a neural network is provided below. Each step also includes instructions for a concrete example. For this article, the example under investigation will be the **sentiment analysis** of provided sentences. In simpler terms, the neural network will examine sentences, and attempt to extract the connotation of the sentence. Does the sentence reflect a positive (happy, good) sentiment, or a negative (disapproving, bad) sentiment? Or is it neutral? 

Although the specific implementation details will be provided in reference to the above problem, the procedure for designing a neural network (the essence of this article) is in the general case. The sentiment analysis example is provided for make the general procedure more substantive and provide context for the advice given.

### Prerequisites
Before starting the process of creating a neural network, ensure all of the software under the [Tools for the Job](#tools-for-the-job) section are correctly installed. Specific installation instructions can be found in each of the links above. Should any errors be encountered during the installation process, a Google search of the error should be the very first destination. If they are correctly installed, run following code in Python:

```python
import numpy as np
import keras

print(keras.__version__)
```

You should see some number printed (such as 2.3.1) to the console. If you see some warnings, no worries. If you see some errors, or errors at any point in installation, be sure to Google the error.

Once the tools are appropriately installed, the fun part can begin, and it begins with a simple question:

> **What should the neural network do?**

This question is the driving force behind the neural network, and presumably the question itself forms the impetus behind choosing to design a neural network in the first place. In fact, its emphasis might seem silly given how obvious it is.

However, I do reccomend thinking over the question in more detail:

* What is the task of the hypothetical neural network? 
* What form does should input take? 
* What about the output? 
* Are the specific features or characteristics known ahead of time to be important? 
* How should the input be structured? 

Consider these questions in the context of the sentiment analysis examples:

* **Task**: Neural network should take a sentence and attempt to identify the sentiment or emotional connotation of a provided sentence. In a more sophisticated system, it might be used to automatically determine how an individual posting a review feels about a product. 
* **Input**: Input will be a string of words, a sentence specifically.
* **Output**: Since the network attempts to determine the sentiment of a sentence (as defined previously), maybe a good output format is from -1 to 1, where positive numbers indicate a more positive sentiment, and negative numbers a more negative sentiment.
* **Potential important aspects**: Intuitively, adjectives seem to be an important aspect of the emotional quality of a sentence.
* **Input structure**: A sentence paired with a number between -1 and 1 that indicates its sentiment, likely assigned by human intuition.

One last question worth considering, and one that takes prime importance in the development of a neural network:

What kind of data should be used?

### Finding a Dataset
Locating an appropriate dataset is the first step outside of the conceptual, and in many ways will define the success of the neural network. 

Rather than collecting the data yourself, the odds are somebody somewhere has already assembled the data. Many such datasets can be found online. Listed below are a few repositories of datasets, which make for good starting points beyond a a simple Google search for an appropriate dataset:

* [UC Irvine Machine Learning Repository](https://archive.ics.uci.edu/ml/datasets.php): A large list of datasets for machine learning
* [Deep Learning Datasets](http://deeplearning.net/datasets/): A short list of datasets for common deep learning tasks
* [Pathmind Open Datasets](https://pathmind.com/wiki/open-datasets): A list of some openly available and usable datasets
* [Data on the Mind](http://www.dataonthemind.org): Cognitive science datasets *(I find this one quite useful for my interests!)*

In addition, beyond searching on Google for datasets directly, Google offers another useful tool specifically for datasets: [Google Dataset Search](https://datasetsearch.research.google.com). This tool operates similarly to Google's main search interface, but is specific to datasets.

Sometimes an exact dataset for the problem you want does not exist. Often, the problem as imagined might be too abstract. In that case, it helps to picture an application of your idea. For example, sentiment analysis might be useful for automatically determining the opinion of a public figure from comments or social media posts about that individual. Looking for datasets regarding posts about celebrities, or datasets containing social media posts in general and filtering based on their subject matter might be a good place to look. 

Another issue is the your current concept for the output is not well-represented in datasets, or would be difficult to collect in the form of data. In that case, it's helpful to imagine similar analogues of the concept, perhaps with quantification built in. In the case of sentiment analysis, reviews are a clear choice. The text will often contain linguistic indicators of sentiment, and the corresponding sentiment "output" would be the number of stars or rating associated with the review. Clearly this is not a perfect data model of sentiment, but the idea is that the neural network will detect the salient patterns in the data for the model we want.

The above are issues in finding a dataset. Once a seemingly appropriate dataset is located, there are a couple more things to look out for:

* **Size of the dataset**: If the dataset is not big enough, there is no way the neural network can learn in the general sense. It will either not learn at all, or *overfit* to the provided data. Overfitting will be discussed more in depth later, but the gist is that the model memorizes the data provided without understanding the underlying behavior of the data. 
* **Quality of the data**: Many datasets might be the right rough subject matter, but the data is not the right resolution, or maybe outdated. THe data might also just not be up to snuff. Be sure to glance over the dataset itself to ensure it meets your intial expectations.
* **Range of the data**: The data sure cover the range of cases you might expect. If the data points are all very similar, the neural net will not be versatile. There should be a diversity of data points throughout the dataset.

Let's search for a dataset for the sentiment analysis problem! The first step should be imagining 

### Sanitizing the Dataset
Data is noisy. Data is messy. Data is difficult. Most of all the data in the world is not readily understandable (or even accessible) by computers. 

In short, data is unclean. So data must be *sanitized*.

The sanitization process includes many different parts, but in essence, the procedure is making the dataset as informative and easily parsed as possible. Imagine yourself, looking over a spreadsheet in Excel. If a column has a header reading **Price ($)**, you would expect a positive number in every cell as you scroll through that column, maybe with two decimal points at most. But if you find a negative number amongst the positive numbers, or the word "twelve", you would be frustrated at the inconsistency. A 'frustrated' neural network would probably just fail outright. Data sanization helps avoid making your neural network frustrated by standardizing input. Here are some common considerations and techniques for data sanitization:

* 
* 
* 

Now let's sanitize the dataset for the sentiment analysis neural network!

### Choosing a Neural Network Architecture
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Enim facilisis gravida neque convallis a cras semper auctor. Sollicitudin nibh sit amet commodo. Habitant morbi tristique senectus et netus. Nisl nisi scelerisque eu ultrices vitae auctor eu. In cursus turpis massa tincidunt dui ut ornare lectus sit. Tincidunt arcu non sodales neque sodales ut. Vitae congue eu consequat ac felis donec et. Senectus et netus et malesuada fames. Turpis cursus in hac habitasse platea dictumst quisque sagittis purus. Risus feugiat in ante metus dictum at tempor commodo ullamcorper. Feugiat vivamus at augue eget arcu dictum varius duis at. Tempor orci dapibus ultrices in iaculis nunc. Sed euismod nisi porta lorem mollis. Eu feugiat pretium nibh ipsum consequat nisl vel. Nulla porttitor massa id neque aliquam vestibulum morbi blandit. Facilisi cras fermentum odio eu feugiat pretium.

### Implementing the Neural Network
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Enim facilisis gravida neque convallis a cras semper auctor. Sollicitudin nibh sit amet commodo. Habitant morbi tristique senectus et netus. Nisl nisi scelerisque eu ultrices vitae auctor eu. In cursus turpis massa tincidunt dui ut ornare lectus sit. Tincidunt arcu non sodales neque sodales ut. Vitae congue eu consequat ac felis donec et. Senectus et netus et malesuada fames. Turpis cursus in hac habitasse platea dictumst quisque sagittis purus. Risus feugiat in ante metus dictum at tempor commodo ullamcorper. Feugiat vivamus at augue eget arcu dictum varius duis at. Tempor orci dapibus ultrices in iaculis nunc. Sed euismod nisi porta lorem mollis. Eu feugiat pretium nibh ipsum consequat nisl vel. Nulla porttitor massa id neque aliquam vestibulum morbi blandit. Facilisi cras fermentum odio eu feugiat pretium.

### Training and Testing
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Enim facilisis gravida neque convallis a cras semper auctor. Sollicitudin nibh sit amet commodo. Habitant morbi tristique senectus et netus. Nisl nisi scelerisque eu ultrices vitae auctor eu. In cursus turpis massa tincidunt dui ut ornare lectus sit. Tincidunt arcu non sodales neque sodales ut. Vitae congue eu consequat ac felis donec et. Senectus et netus et malesuada fames. Turpis cursus in hac habitasse platea dictumst quisque sagittis purus. Risus feugiat in ante metus dictum at tempor commodo ullamcorper. Feugiat vivamus at augue eget arcu dictum varius duis at. Tempor orci dapibus ultrices in iaculis nunc. Sed euismod nisi porta lorem mollis. Eu feugiat pretium nibh ipsum consequat nisl vel. Nulla porttitor massa id neque aliquam vestibulum morbi blandit. Facilisi cras fermentum odio eu feugiat pretium.

## Advice
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Enim facilisis gravida neque convallis a cras semper auctor. Sollicitudin nibh sit amet commodo. Habitant morbi tristique senectus et netus. Nisl nisi scelerisque eu ultrices vitae auctor eu. In cursus turpis massa tincidunt dui ut ornare lectus sit. Tincidunt arcu non sodales neque sodales ut. Vitae congue eu consequat ac felis donec et. Senectus et netus et malesuada fames. Turpis cursus in hac habitasse platea dictumst quisque sagittis purus. Risus feugiat in ante metus dictum at tempor commodo ullamcorper. Feugiat vivamus at augue eget arcu dictum varius duis at. Tempor orci dapibus ultrices in iaculis nunc. Sed euismod nisi porta lorem mollis. Eu feugiat pretium nibh ipsum consequat nisl vel. Nulla porttitor massa id neque aliquam vestibulum morbi blandit. Facilisi cras fermentum odio eu feugiat pretium.