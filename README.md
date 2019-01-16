# WATranscript

https://www.wa-transcript.com/

Upload your transcript to calculate your 4.0 scale GPA and do a lot of other things!

Web application for UW students to scrape transcript data and convert GPA.

## Usage

1. `yarn && cd client && yarn` to install the npm packages. A UW
   API need to be provided for the server to work. This can be done by setting
   up an `.env` file with `API_KEY` as the UWaterloo Open API key.
2. `yarn dev` to start the project

## Scraping

The app used `pdftotext` from `poppler` to convert the transcript from DPF to a text
file, and then extensively use regular expressions to parse and scrape the data.

Although many data are obtained, only the data directly associated with the
courses are serialized for now.

## GPA Calculation

The GPA conversion is based on [OMSAS](https://www.ouac.on.ca/guide/omsas-conversion-table/).
Earned credits are also taken into the factors as this is how the official
transcript calculates the overall percentage average. i.e. The higher the
credits are, the higher
the weight of a course would be.

## To-do list

- graduation requirement check

## Screenshot

**Upload Page**

![Alt text](/doc/UploadPage.png)

**Course Table UI**

![Alt text](/doc/UI.png)
