# WATranscript

https://wa-transcript.herokuapp.com/

Upload your transcript to calculate your GPA and do a lot of other things!

React Web application for UW students to scrape transcript data, convert GPA, check graduation requirement, create academic plans and visualize transcript information.

## Usage

1. `npm install && cd client && npm install` to install the environment (A UW
   API need to be provided for the server to work). This can be done by setting
   up an `env` file with `API_KEY` set in the environment.
2. `npm dev` to start the project

## Scraping

The app used `pdftotext` from `poppler` to convert the transcript from DPF to a text
file, and then extensively use regular expressions to parse and scrape the data.

Although many data are obtained, only the data directly associated with the
courses are searilized for now.

## GPA Calculation

The GPA conversion is based on [OMSAS](https://www.ouac.on.ca/guide/omsas-conversion-table/).
Earned credits are also taken into the factor as this is how the official
transcript calculates the overall percentage average. i.e. The higher the credits, the higher
the weight of a course would be.

## Screenshot

**Upload Page**

![Alt text](/doc/UploadPage.png)

**Course Table UI**

![Alt text](/doc/UI.png)
