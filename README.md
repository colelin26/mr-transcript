# WATranscript

https://www.wa-transcript.com/

Web application for UW students to make study plans, verify graduation requirement and convert
GPA based on UW transcripts.

## Motivation

I have some upper year friends who are about to graduate and are applying for
graduate schools. When I saw them calculating GPA and checking if they were able
to declare certain majors, I realized that it could be easily automated. "Quest", the student information system at
UWaterloo did not provide such functionability, so I decided to make a web app
for it.

If you are not a UWaterloo student but also want to get a taste about what the
app is like, you can simply click the "demo" button and see how the app works
when a sample(my) transcript is used.

## Usage

1. `yarn && cd client && yarn` to install the npm packages. A UW
   API need to be provided for the server to work. This can be done by setting
   up an `.env` file with `API_KEY` as the UWaterloo Open API key.
2. `yarn dev` to start the project

## Scraping

The app used `pdftotext` from `poppler` to convert the transcript from DPF to a text
file, and used regular expressions extensively to parse and scrape the data.

Only the data related to the courses are serialized for now.

## GPA Calculation

The GPA conversion is based on [OMSAS](https://www.ouac.on.ca/guide/omsas-conversion-table/).
Earned credits are also taken into the factors as this is how the official
transcript calculates the overall percentage average. i.e. The higher the
credits are, the higher
the weight of a course would be.

## Screenshot

**Upload Page**

![Alt text](/doc/UploadPage.png)

**Course Table UI**

![Alt text](/doc/UI.png)

**Check Graduation Requirement**

![Alt text](/doc/GraduationRequirement.png)

**Drawer UI**

![Alt text](/doc/UI2.png)

**Download Scraped Data**

![Alt text](/doc/DownloadData.png)
