---
layout: post
title: 'Designing a Neural Network in Keras'
date: 2020-03-24 16:38:02 -0500
description: 'Discusses the appropriate questions to ask and steps to take in designing and implementing a neural network in Keras for a given problem. Includes a a toy example implementation regarding sentiment analysis. Emphasis on dense, convolutional, and recurrent neural networks, with particular implementation focus on recurrent LSTM networks.'
tags: computing
hasmath: true
---

## Table of Contents
1. [Preface](#preface)
2. [Tools for the Job](#tools-for-the-job)
3. [Procedure](#procedure)
    1. [Prerequisites](#prerequisites)
    2. [Finding a Dataset](#finding-a-dataset)
    3. [Sanitizing the Dataset](#sanitizing-the-dataset)
    4. [Choosing a Neural Network Architecture](#choosing-a-neural-network-architecture)
    5. [Implementing the Neural Network](#implementing-the-neural-network)
    6. [Training and Testing](#training-and-testing)
4. [Advice](#advice)

----------------------------------------------------------------------------------------------

## Preface
A natural model for computation has always been the brain. After all, the most intimate form of 'thinking' to which we, as humans, can relate to is the thinking we do ourselves. The brain is the physical center of our thought, and the brain itself is but an incredible amount of neurons. Naturally, these neurons and the enormous number of connections they form have been the subject of much scientific scrutiny in biology and neuroscience. The structural characteristics of these biological neural networks have formed the basis of a burgeoning branch of computing, the study of Artificial Neural Networks.  

Artificial Neural Networks (ANNs) are a type of algorithm based on pattern recognition. The theory of their operation is roughly based on the operation of biological neural networks, where similar inputs should produce similar outputs. More specifically, the neural network attempts to comprehend relevant characteristics (or features) of an input (which can be virtually anything stored on a computer, such as text and images) to produce consistent and correct output on input samples it has never seen before. 

Neural Networks typically operate in two phases: training and usage. The **training** phase involves presenting the neural network with a dataset. This dataset should, in some way, encode the relationship that the neural network should discover py pairing an input and its desired output. By examining the pairs from the dataset, the neural network develops a sort of "intuition" about the nature of the input and how it relates to the output, even if that relationship is not linear or explicitly labeled in the dataset. The emergent intuition is what makes neural networks work seemingly magically. **Using** the neural network after it has been trained is when the neural network is actually applied to a problem -- the construction and training of a neural network are both crucial steps in its design.

In this post I will discuss how to design a deep neural network from scratch using Keras. Throughout, I will address the important questions one must ask in the design process. At every step, there are decisions that must be made specific to the problem. Answers to these questions and specific code samples will be provided for one particular application of neural networks: sentiment analysis.

At the end of the article, a functioning neural network for sentiment analysis will be complete, alongside a general procedure for creating a neural network that can be used as a guide.

## Tools for the Job
You will need a few items before creating a neural network:

* **[Python (at least version 3.6)](https://www.python.org/downloads/):** Python is the programming language and interpreter we will be using to implement the neural network.
* **[PIP (Python package manager)](https://pip.pypa.io/en/stable/installing/):** PIP is a tool for installing packages and libraries. We will use several libraries to create a neural network, but PIP will typically install most of them for us automatically. If you Python version is at least 3.4, PIP should come installed with your python installation.
* **[TensorFlow (Backend Neural Network Library)](https://www.tensorflow.org/install/):** A backend neural network library. This library will handle most of the heavy matrix math that forms the mathematical basis of neural networks.
* **[Keras (Frontend Neural Network Library)](https://keras.io/#installation):** A frontend neural network library for Python. Keras makes implementing neural networks much simpler than implementing them strictly in TensorFlow. 
* **A Dataset:** The dataset is what is used to mold the neural network to perform a particular task. Without a dataset, the neural network has no example information to know what to do. Examples of datasets and handy places to look for datasets is covered in the [Finding a Dataset](#finding-a-dataset) section.
* **A Question to Answer:** Perhaps the most obvious 'item' needed, but an important one to note regardless. This question and the implicit assumptions it carries form a big role in the design process of creating a neural network. 

I forgo the obvious tools needed of a computer and a code editor. For context, the code editor I use is [VS Code](https://code.visualstudio.com){:target="blank_"}. Internet connection is also needed to install the libraries, but I presuppose that is not an issue if you can read this article.

## Procedure
The procedure for implementing a neural network is next. Beyond an outline for designing a neural network in general, each step also includes instructions for a concrete example. Recall that the example under investigation will be **sentiment analysis** of provided sentences. In simpler terms, the neural network will examine sentences, and attempt to extract the connotation of the sentence. Does the sentence reflect a positive (happy, good) sentiment, or a negative (disapproving, bad) sentiment? Or is it neutral? 

### Prerequisites
Before starting the process of creating a neural network, ensure all of the software under the [Tools for the Job](#tools-for-the-job) section are correctly installed. Specific installation instructions can be found in each of the links above. Should any errors be encountered during the installation process, a Google search of the error should be the very first destination. If they are correctly installed, run the following code in Python:

```python
import keras

print(keras.__version__)
```

You should see some number printed (such as 2.3.1) to the console. If you see some warnings, no worries. If you see some errors, or errors at any point in installation, be sure to Google the error.

Once the tools are appropriately installed, the fun part can begin, and it begins with a simple question:

> **What should the neural network do?**

This question is the driving force behind the neural network, and presumably the question itself forms the impetus behind choosing to design a neural network in the first place. In fact, its emphasis might seem silly given how obvious it is.

However, I do recommend thinking over the question in more detail:

* What is the task of the hypothetical neural network? 
* What form should input take? 
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

The dataset is a collection of input and output pairs, where the neural network learns to associate inputs with outputs. The dataset is equivalent to "teaching" a neural network a concept. In the neural network world, teaching is called **training**.

Data comes from many sources. Often it is collected in the outside world, just as data for any study or scientific paper would. In fact, the source of many machine learning datasets is from other studies. Machine learning is just an advanced form of numeric regression, after all.

Rather than collecting the data yourself, the odds are somebody somewhere has already assembled the data. Many such datasets can be found online. Listed below are a few repositories of datasets, which make for good starting points beyond a a simple Google search for an appropriate dataset:

* [UC Irvine Machine Learning Repository](https://archive.ics.uci.edu/ml/datasets.php){:target="blank_"}: A large list of datasets for machine learning
* [Deep Learning Datasets](http://deeplearning.net/datasets/){:target="blank_"}: A short list of datasets for common deep learning tasks
* [Pathmind Open Datasets](https://pathmind.com/wiki/open-datasets){:target="blank_"}: A list of some openly available and usable datasets
* [Data on the Mind](http://www.dataonthemind.org){:target="blank_"}: Cognitive science datasets *(I find this one quite useful for my interests!)*

In addition, beyond searching on Google for datasets directly, Google offers another useful tool specifically for datasets: [Google Dataset Search](https://datasetsearch.research.google.com). This tool operates similarly to Google's main search interface, but is specific to datasets.

Sometimes an exact dataset for the problem you want does not exist. Often, the problem as imagined might be too abstract. In that case, it helps to picture an application of your idea. For example, sentiment analysis might be useful for automatically determining the opinion of a public figure from comments or social media posts about that individual. Looking for datasets regarding posts about celebrities, or datasets containing social media posts in general and filtering based on their subject matter might be a good place to look. To determine the 'sentiment' in this case, maybe assign a global sentiment value to given individuals. If a politician was widely unpopular for a certain platform or decision, the odds are that posts in that time frame will be of negative sentiment. This is not even remotely a perfect model, but I mainly want to illustrate ways that an existing dataset that might not ostensibly fit can be massaged given the surrounding context of the data.

Another issue is the your current concept for the output is not well-represented in datasets, or would be difficult to collect in the form of data. In that case, it's helpful to imagine similar analogues of the concept, perhaps with quantification built in. In the case of sentiment analysis, reviews are a clear choice. The text will often contain linguistic indicators of sentiment, and the corresponding sentiment "output" would be the number of stars or rating associated with the review. Clearly this is not a perfectly pure model of sentiment (there will indisputably be a lot of red herrings and noise), but the idea is that the neural network will detect the salient patterns in the data for the model we want.

The above are issues in finding a dataset. Once a seemingly appropriate dataset is located, there are a couple more things to watch for in the candidate dataset:

* **Size of the dataset**: If the dataset is not big enough, there is no way the neural network can learn in the general sense. It will either not learn at all, or *overfit* to the provided data. Overfitting will be discussed more in depth later, but the gist is that the model memorizes the data provided without understanding the underlying behavior of the data. 
* **Quality of the data**: Many datasets might be the right rough subject matter, but the data is not the right resolution, or maybe outdated. THe data might also just not be up to snuff. Be sure to glance over the dataset itself to ensure it meets your initial expectations.
* **Range of the data**: The data sure cover the range of cases you might expect. If the data points are all very similar, the neural net will not be versatile. There should be a diversity of data points throughout the dataset.

Let's search for a dataset for the sentiment analysis problem! Let's search the [Pathmind Datasets](https://pathmind.com/wiki/open-datasets){:target="blank_"} for something. They have an entire section dedicated to **sentiment**. The [Multi-Domain Sentiment Dataset](http://www.cs.jhu.edu/~mdredze/datasets/sentiment/){:target="blank_"} looks promising: has positive and negative entries, many entries, and a range of reviews across different products.

### Sanitizing the Dataset
Data is noisy. Data is messy. Data is difficult. Most of all the data in the world is not readily understandable (or even accessible) by computers. 

In short, data is unclean. So data must be *sanitized*.

The essence of the sanitization process is to make the dataset as informative and easily parsed as possible. Imagine looking over a spreadsheet in Excel. If a column has a header reading **Price ($)**, you would expect a positive number in every cell as you scroll through that column, maybe with two decimal points at most. But if you find a negative number amongst the positive numbers, or the word "twelve", you would be frustrated at the inconsistency. A 'frustrated' neural network would probably just fail outright, or miss out on a valuable data point. Data sanitization helps avoid making your neural network frustrated by standardizing input. Here are some common considerations and techniques for data sanitization:

* **Common Format**: The data points should all be consistently formatted. The neural network should expect the same layout for the inputs for each point.
* **Delete Redundancies**: Sometimes datasets will have duplicate entries. These are not needed and should be deleted.
* **Missing Data**: Sometimes data will have missing pieces. This can be helpful! Sometimes your model needs to act in uncertain situations, and training camples with incomplete inputs can help in these cases.

Another common question is regarding outliers: should these be removed?

Well, it depends.

Outliers can be very helpful -- they could be black swans, indicative that whatever model your neural network converges to without them is inadequate for not accounting for a potentially important edge case. Outliers can also be a sign of an erroneous data entry. Some human intuition should be applied to the treatment of outliers, but caution is advised.

Now let's sanitize the dataset for the sentiment analysis neural network! Below is a code sample for this process, applied to the above data -- specifically the `processed_stars.tar.gz` dataset, extracted to a directory:

```python
def parse_line(line):
    pattern = r"(.*?):(\d)+\s?"
    matches = re.findall(pattern, line)

    words = []
    for match in matches:
        words.extend([match[0] for i in range(int(match[1]))])
    
    pattern = r"#label#:(.*)"
    label = re.findall(pattern, line)

    label_dict = {
        "1.0": -1.0,
        "2.0": -0.5,
        "3.0":  0.0,
        "4.0":  0.5,
        "5.0":  1.0
    }

    return words, label_dict[label[0]]

def parse_file(file_name):
    xs = []
    ys = []

    with open(file_name, "r") as f:
        for line in f:
            words, label = parse_line(line)
    
            xs.append(words)
            ys.append(label)
    
    return xs, ys

def load_data(root_dir, 
        subdirs=["books", "dvd", "electronics", "kitchen"], 
        filename="all_balanced.review"):
    x_list = []
    y_list = [] 
    for subdir in subdirs:
        xs, ys = parse_file(root_dir + "/" + subdir + "/" + filename)

        x_list.extend(xs)
        y_list.extend(ys)

    return x_list, y_list
```

> NOTE: The code is undocumented (as of now). I assume the reader has basic proficiency in writing and reading Python. 

### Choosing a Neural Network Architecture
Now some work about the actual neural network can begin. Before the coding process commences, it's worth discussing *some* of the theory and background of neural network architecture. Here we will discuss three fundamental neural network architecture categories: dense, convolutional, and recurrent neural networks.

Some basic terminology is helpful from this point forward:

* **Neuron**: The atomic building block of a neural network. Receives some amount of input, applies this input to an *activation function*, and sends the output to each neuron in the next *layer* it's connected to. 
* **Activation Function**: A function associated with a neuron that takes some input, and outputs a value based on the input. Often similar to biological equivalent, where after a certain threshold, the input increases in magnitude (a spike). Some common activation functions are *ReLU*, *softmax*, and *sigmoid*. Each has different specialties, and are discussed in more detail in [Implementing the Neural Network](#implementing-the-neural-network) and [Advice](#advice). 
* **Weight**: A number associated with a connection between neurons. A higher number typically indicates that an output from a neuron in the previous layer is more important to the receiving neuron in the next layer. 
* **Layer**: A layer is a set of neurons. Neural networks are typically a linear arrangement of layers, where one *layer* (set of neurons) connects to the next *layer* of neurons. 
* **Input Layer**: The first *layer* in a neural network. typically the same size as the input data. For example, if the input has 1000 numbers (imagine a 10x10 black and white image), the input layer would have 1000 neurons.
* **Hidden Layer**: Any *layer* between the *input layer* and *output layer*. 
* **Output Layer**: The final *layer* in a neural network. Number of neurons depends on the task at hand. For a *classification* problem, there is typically the same number of output neurons as there are number of potential classes. For regression problems, the number of neurons is the dimensionality of the output (number of numbers). If one number is needed for the regression output, only one neuron in the *output layer* is needed.
* **Deep Neural Networks**: Any neural network with more than one *hidden layer*.

Now that we have an expanded lexicon, it's time to study the neural network architectures themselves. 

**************************
> **Dense Neural Network** 

Dense neural networks are the simplest neural network to imagine. They consist of one input layer, one output layer, and any number of hidden layers. And every neuron in one layer is connected to every neuron in the next layer. That's it. 

![A dense neural network example](/assets/img/nn-3-24-2020/dense-nn.png){:class="framed"}

Above is an example of this type of neural network (visual created thanks to the helpful [ANN-Visualizer Library](https://github.com/Prodicode/ann-visualizer){:target="blank_"} written by [Prodicode](https://github.com/Prodicode){:target="blank_"}). To use some of the newly-learned terminology, the above network has 3 *neurons* in the *input layer*, 1 *neuron* in the *output layer*, 3 *hidden layers* (shown in blue), where the first *hidden layer* has 5 neurons, the second has 6, and the final *hidden layer* has 3. 

Note that in the above diagram, a neuron in any layer is connected to every neuron in the next layer. This is what is meant by *dense*. A layer is *dense* is every neuron in that layer is connected to every neuron in the next layer. Layers can be individually dense, and if a network consists entirely of dense layers, the network itself is described as *dense*.

Some of the main design decisions for dense networks are ones universal to every neural network architecture: how many hidden layers, and how many neurons in each of the hidden layers? These questions are best addressed via experimentation. 

Dense neural networks, the basis of every other type of neural network, can be applied to any problem. However, they will typically not perform as well as other architectures or hybrids.

That being said, they are sufficient for a large number of problems. And besides, neural networks typically possess several dense layers, whether it is purely dense or not. 

**********************************
> **Convolutional Neural Network**

Convolutional neural networks are a bit more complex, and are inspired by neural structure in the visual system. The signature idea of convolutional neural networks is a two-step process:

1. Takes spatially clustered data apply some operation to it (**filter**)
2. Reduce the amount of data in a region (**convolution**)

Convolutional neural networks might take an image, for example, and apply a **filter** for edge detection. Then, from the edge-detected version of the image, subsample regions of the image to have an overall smaller image, with (ideally) the same general idea of the original image. The novel part about convolutional neural networks is their location agnosticity: that is, the neural network will learn characteristics of an image no matter where it's located in an image. A dense neural network, on the other hand, is very sensitive to location.

Given their inspiration from the neural structure from the visual system, convolutional networks are a natural fit for image processing, such as object recognition and classification. However, they also work well for any sort of spatial data. Specifically, data where spatial proximity and relationships are of prime importance. 

These networks are very complex, and worthy of an article of their own. We simply address their significance here, note their application domain, and continue forward.

******************************
> **Recurrent Neural Network**

Recurrent neural networks (RNNs) are also a more complex model than dense neural networks, and as the name implies, involves a form of recursion. The novel component of these networks (at least the successful RNNs) are modules called Long Short Term Memory networks (LSTMs). These, as their name imply, act as a sort of memory for the network. As the model traverses an input, it remembers past parts of the input, providing context for current pieces of input.

Recurrent ANNs capture relationships that occur across distances in time (thanks to LSTM modules), so these are well-suited to data that is temporal in nature. So textual information, signals, and time series are good problems to target with a recurrent model.  

We do not discuss the theory of RNNs here: as with convolutional neural nets, we mention their basic premise, application domain, and move onward.

*************************************************************************

There are other architectures, but these three cover the types that have received the most attention.

Now let's choose a good architecture for the sentiment analysis problem. Based on what we know, recurrent neural networks seem to be a good potential fit for the problem. Given the fact that the input format is text-based, and sentiment is an artifact of sentence meaning, RNNs seem to be the way to go!

### Implementing the Neural Network
Now that the neural network architecture has been decided upon, it's time to implement the actual neural network model! This is the code intensive part of the process, so particular attention will be paid to the specific sentiment analysis example.

Below is a code sample for the sentiment analysis network:

```python
class Sentiment(object):
    @staticmethod
    def build(max_features, embed_dimensions, input_length, lstm_out):
        model = Sequential()
        model.add(Embedding(max_features, embed_dimensions, input_length))
        model.add(LSTM(lstm_out, dropout=0.2, recurrent_dropout=0.2))
        model.add(Dense(1))

        return model
```

### Training and Testing
The network model has been created. Now it's time to 'teach' the neural network how to do what it is designed to do. You might notice the neural network as implemented in the previous section does not seem too relevant to the specific problem chosen, but more based on the *category* of the problem. In which case you would be correct! Part of the magic of neural networks is their generality in the overall architecture -- rather than designing an entirely new network for a new task, many times an existing architecture can be repurposed, using different data and training strategies! In fact, a big area of research is *meta-learning*, where a piece of one network trained for a different task is used in a new neural network.  

The emphasis on data should become particularly salient now. Neural networks for similar categories of tasks (image processing, text processing, etc.) will look highly similar. Often what defines the performance of a neural network is the quality of data provided. Improving data quality will always produce better results than tinkering with the architecture. The process of data sanitization may be boring and tedious at times, but more often than not is what makes or breaks a neural network, in terms of both predictive power and consistency. In the end, data is **king**. 

To some degree, the above might be a commentary on the timeless psychological dichotomy between nature and nurture, genes and environment... or neural architecture/design and data.

But I digress. Enough talk! The first step in training and testing is partitioning the data into two pieces: the **training** and **test** sets. The training set is what is used to teach the neural network, to assign the *weights* to the connections between neurons. Training is the process that molds the neural network architecture to a form that understands the data (and hopefully the problem the data represents). Testing, on the other hand, is a subset of the dataset the neural network is not exposed to during training, and is not used during training. The test set is a good way to measure if the neural network is just memorizing the training data. 

The training data is split in one final way: into actual **training** data and **validation** data. Validation is similar to testing, except it occurs during the training process. The training process itself is divided into *epochs*. An epoch is one full cycle through the training data,. Validation occurs at the end of an epoch to tune the training process better. A good amount is to split the training data to 80% is for actual training, and 20% is for validation. 

More epochs tends to mean better results. But at some point the neural network will converge, and more epochs will have marginally better returns. In other words, a good balance on epochs should be found -- otherwise, at some point computation time is wasted on training.

The next time-based *hyperparameter* (tweakable value) other than epoch count for the training process is the *batch size*. The batch size is the number of training data points sampled before the neural network can update its connections values, or learn. A higher batch size means the network samples more in the training set before reconfiguring. A lower batch size means it changes quite frequently in the learning process. Once again, a balance must be struck, and this is often problem dependent and only obtained by tweaking values. Batch size must be at least 1, and less than (or equal to) the number of training data points. Generally, 32 and other powers of 2 are used for batch size.

Another *hyperparameter* is the optimizer choice. Without diving into too much technicality, the optimizer is the mathematical method that the neural network optimizes itself to learn the input. In Keras, there are several options,but three I often use are `SGD`, `Adam`, and `RMSprop`. Each of these has merits, although I find `Adam` to work well often. Switch optimizers is quite easy, and it's worth trying several to see which works best for a particular problem.

The last *hyperparameter* is the loss function. The loss function is a pretty easy choice, as it often depends on the type of problem to solve:

* Regression: **Mean Squared Error (MSE)**
* Binary classification (2 options): **Binary Crossentropy**
* Multiple classes classification (2+ options): **Categorical Crossentropy**

Given a model, below is an example training and testing framework:

```python
# Hyperparameters
EPOCHS = 5
BATCH_SIZE = 128
OPTIMIZER = SGD()
VALIDATION_PERCENT = 0.2
LOSS="mean_squared_error"

# VERBOSE=1 just makes the training process visible
VERBOSE=1

# Collected the (sanitized) data
(x_train, y_train), (x_test, y_test) = load_data("/path/to/data")

# Create the model (for example, by using the previously defined method and class)
model = Sentiment.build(128, 1000, 500, 200)

# Displays a summary of model configuration
model.summary()
input("Press enter to coninue...")

# Compile the model (assign its optimizer and loss function)
model.compile(
    loss=LOSS,
    optimizer=OPTIMIZER,
    metrics=["accuracy"]
)

# Train the model
model.fit(
    x_train, y_train,
    batch_size=BATCH_SIZE,
    epochs=EPOCHS,
    verbose=VERBOSE,
    validation_split=VALIDATION_PERCENT,
)

# Find the overall accuracy of the model on the training data
score = model.evaluate(x_test, y_test, verbose=VERBOSE)
```

Once the model is trained, the network is complete! Should the reported accuracy not be satisfactory, there are several techniques to try and increase the performance of the network.

## Advice
The single best piece of advice for improving a neural network is the following:

**Test, test, test! And then test some more!**

If you have an idea about something that might improve the performance, try it out! Make the change, and run the training and testing again. Compare the final performance to the original one. See if it does better or worse.

That being said, there are some common tips and pitfalls when creating a neural network:

### Overfitting to train (lack of generalization)

A good idea is to introduce dropout layers! Dropout layers are not so much layers as they are modifiers on the previous layer. A dropout layer has one parameter, the dropout rate. The dropout rate is the probability that a neuron in the previous layer will not fire, even when it's supposed to (during training). The effect this has is to force neurons in later layers to be less dependent on that neuron, and more dependent on other neurons instead. If a network was memorizing too much

### Takes a long time to train

Reduce the number of layers and number of neurons in the layers! This is a tuning process, and there's no particular science to it (as with much of neural network design). Ttry reducing the layers slowly, and see how much performance degrades. In fact, start with as few neurons and layers as you think might work. When that fails (but quickly), slowly add more complexity: more layers, more neurons. Do this until an acceptable accuracy occurs. This method is preferable than starting with a complex network and trimming it. Otherwise, you would wait a long time training a network that might not work at all anyway.

### Otherwise...

Tweak everything! As you likely noticed, there are several parameters and easily configurable values in neural networks. Change the small things, and watch their impact. The accumulation of small improvements can add up to a much better neural network.

### But above all else...

**Improve your data!** This is the most likely culprit (other than on common and standard datasets, like MNIST). A better dataset can change everything. A better dataset is universally better than an over-engineered neural network.