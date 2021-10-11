# MHI-2007 Discussions

## Background
For MHI-2007 we post weekly discussion videos and track responses to follow-up questions as a way to evaluate engagement for participation marks in the course. We would like to share the discussion responses with our guest speakers who have provided the discussion content , however, there is no easy way to export discussion post & response data via the Quercus UI. Mentors have had to manually copy and paste responses into an excel spreadsheet on OneDrive to share with guest speakers. This task is very manual and time-consuming.

To automate this process I've forked the canvas-discussion repo and configured the transformation steps to our specific requirements. Now these files can be automatically generated and the mentor would only need to mark down in our master sheet the student who had posted a response and do a quick skim through the discussion thread to ensure no student has responded as a nested reply to another response (as nested replies are not captured in the CSV output).

This project pulls via the Canvas API the discussions from MHI-2007 (Fall 2021) and exports data from each discussion as a CSV. The columns exported are:
* 'author_name',
* 'discussion_topic_title',
* 'post_message',
* 'count_of_likes',
* 'timestamp'

## Getting Started
These instructions will get you a copy of the project up and running on your local machine for use with your own API token.

### Prerequisites

1. **Install [Node 10 or greater](https://nodejs.org)**.
2. **Install [Git](https://git-scm.com/downloads)**.

### Installation and execution of script

1. Clone this repo (`git clone https://github.com/ribeirolm/canvas-discussion.git`) or download the source code. 
1. Then cd into the repo. `cd canvas-discussion`
1. Run the installation script. `npm install` (If you see `babel-node: command not found`, you've missed this step.)
1. Generate Canvas API token and copy it to clipboard. To get your API token login to Quercus and go to the Settings under your Account. Under `Approved Integrations` select `+ New Access Token` and generate a token. 
1. Create a `.env` file.
2. Add the following: `CANVAS_API_TOKEN="{YOUR API TOKEN}"` and `CANVAS_API_DOMAIN="https://q.utoronto.ca/api/v1"`.
4. Run the script. `npm start`.
5. CSV files of the discussion data (separated by discussion post) should be generated in the `output` folder.

## Authors
* [ribeirolm](https://github.com/ribeirolm) -
**Lauren Ribeiro** &lt;laurenribeiro06@gmail.com&gt;
* Thanks to [justin0022](https://github.com/justin0022) -
**Justin Lee** &lt;justin.lee@ubc.ca&gt; for developing the base repository which I was able to adjust to our specific needs for the MHI-2007 course Fall 2021.