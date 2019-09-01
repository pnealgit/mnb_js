# mnb_js
Simple Markov Network Brain with Javascript

Background links:
My own take on networked brains ala Chris Adami's and
his teams ideas.

See: 

 Chris Adami's site (http://adamilab.msu.edu/markov-network-brains/)

 Another good description (http://devosoft.org/a-quick-introduction-to-markov-network-brains/)

 And Jefferey Cave's really neat implementation
 (https://medium.com/@jefferey.cave/fun-with-markov-network-brains-8041c35ca883)



How to Run:
1. Download the repository one way or another.
2. Open a Chrome browser (maybe others will work)
3. Point it at "file:///your fully qualified directory name/index.html -- I use file:///Users/pneal/mnb_js/index.html
4. You should see a red whirling rover in a field of grey with blue boxes.
5. Turn on View->Developer->Javascript Console for more info

Overview:

1. The red 'rover' has 3 sensors.
2. The sensors detect whether or not it senses a wall or the side of a cube.
3. The data returned from the sensors is sent to the think module
4. The think module contains the Markov Network Brain (MNB).
5. The think module returns the best sensor choice to use.
6. The rover turns in the direction of the best sensor.

Deep Copy Hassles:

1. I had to do deep copy on the "genome" because mutation and crossover should
not be done on the original "brain" in the POPULATION array.

2. So I did the JSON trick
    - BRAIN = JSON.parse(JSON.stringify(POPULATION[0]));
    - POPULATION[POP_SIZE-1] = JSON.parse(JSON.stringify(BRAIN))


