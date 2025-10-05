Here in this git repo it's not pretty technical as we couldn't put our local model implementation as we had to shoot a deemo video with something that generates fast results (with the same models we using locally )
so we end up using some groq apis to replace some of the slow local models 

for the files 
there is 
# front file 
# apis file 

+ the front contains the front folder that is coded mainly with react and typescript which consume the api from the apis folder 


+ the api folder contains the agent files which were hosted from differnet machines so they re not centralised in one place is in here in git but we had no other choice as sending many git repos of each ones machine would'nt be practical

+ The implemented logical is we run local model on each machine (4 laptops ) that differ in their gpus from strong to mid ones
so the stronger ones had the heavier loads for sure

and each pc was hosting it result to others or to the front page through fastapi and ngrok ; so the hosting and the linking was a bit complexe but can be relinked and rehosted and re executed if needed a live deemo (takes some time ) 

we used the distrubuted way so we make the services we used more efficent as each pc uses it's local model in a single action 

for the files their re pretty much clear in the front folder 
in the apis folder 
we had differnt files 
as the platform chatbot that helps the user to understand the platform pricings and services 
the legal_data.py file was used with tavily api which is an api that do an online search on duckgo and give json file with differnt infos we used these infos to extract data from the user input data/prefrences 
v_crit.py file is used to generate 3 persona (for now we used 3 it can get more ) as critical judges based on the city or related to the field the user made 


(these re the ones i do remember for now as i m tired ;3 and my team left me writing this readme alone xD ! 
