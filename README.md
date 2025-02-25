# aviation_AI

## project description
### research
Aviatize AI is a two-legged project which aims to build intelligence and predictions around the educational paths of students in aviation schools. 

The first part is merely getting a clear view on the data structures of the Aviation platform. The second leag is the actual AI extension for the Aviatize aviation school management platform with as sole aim to provide for intelligent aviation learning progress insights and predictive models for success/failure of students attending the schools' courses. 

The goal is not to build another piece of software, rather an interactive AI add-on which allows piloting school owners to question existing structured data dumps so they get meaningful insights on all students, including predictions on whether students are likely to do "well", "average" or whether they are in the "danger zone" of dropping out. 

Users should be able to ask open questions in the extension. 

The data on which the app builds its insights is taken from the API endpoints of the Aviatize platform, which is properly documented on their swagger page on https://beta.aviatize.com/api/index.html 

You are now looking at the **first part**.

You can find the second part in my repository with as title "aviation_AI_output".

### endpoints
These are the most pertinent endpoints we will be using to feed our AI extension:
- **Flight Plans** *POST api/flight-plans*
- **Grading Sheets** *POST api/grading/grading-sheet*
... potentially extended with data from the following endpoints:
- **Training Syllabus** *POST api/training-syllabuses*, with deeper lying levels Training Events, Training Event Items, and Training Items
- **Planned Training Events** *POST api/planned-training-events*

### data extraction and analysis
To assess whether a student is performing well, moderately, or is at risk of failing, we will consider extracting and analyzing data points in the lines of the following:
- **Attendance Records**: Frequency and punctuality of attendance in scheduled training sessions
- **Performance Scores**: Grades or scores from practical and theoretical assessments
- **Progress Milestones**: Completion status of key training milestones or modules
- **Instructor Feedback**: Qualitative assessments and comments from instructors
- **Flight Hours Logged**: Number of flight hours completed versus the required hours

To predict whether a student is "good," "average," or in the "danger zone," we look at:

| Category                      | Data Points                                      | Source Endpoint                      |
|--------------------------------|-------------------------------------------------|--------------------------------------|
| 📅 **Attendance & Training Data** | Number of scheduled trainings, student attendance | `api/planned-training-events`      |
| ✈️ **Flight Experience**        | Number of flight hours, types of flights         | `api/flight-plans`                  |
| 🏆 **Assessment Scores**        | Practical and theoretical grades                 | `api/grading/grading-sheet`         |
| 🗣️ **Instructor Feedback**       | Qualitative evaluations from instructors        | `api/grading/grading-sheet`         |
| 🔥 **Training Completion**      | Percentage of completed modules                  | `api/training-syllabuses`           |

We will first log these data points in the console and then display them in the frontend.

### implementation
In current scope we decided to build a stand alone nodeJS server application, which takes Aviatize API data, so we learn what the data structure is for the relevant endpoints. Our "second leg" app enables the actual interaction with the data through an AI layer.

- **Define the Workflow**: Outline the steps required to process the data, apply AI models, and generate performance assessments
- **Our implementation methodology Implement Data Processing Nodes**: Create nodes in LangGraph that handle data extraction from the Aviatize API, data cleaning, and preprocessing
- **Apply AI Models**: Utilize nodes that apply machine learning models to predict student performance categories (e.g., "Good," "Moderate," "At Risk")
- **Generate Reports**: Create nodes that compile the analysis results into comprehensive reports for instructors and flight school administrators

## stack
![Static Badge](https://img.shields.io/badge/built_in-JavaScript-D85937?style=flat)
&nbsp;&nbsp;&nbsp;
![Static Badge](https://img.shields.io/badge/AI_tool-Langraph-C2CBA9?style=flat)
&nbsp;&nbsp;&nbsp;
![Static Badge](https://img.shields.io/badge/data_from-MongoDB-D7E4EC?style=flat)
&nbsp;&nbsp;&nbsp;

## planning
[GANTT chart](https://docs.google.com/spreadsheets/d/1Xz3UcsKheMnLBxPb7cIgCECvu0LNfSPh-nyv5ipezY4/edit?usp=sharing)

## npm dependencies
### basis
- express: webserver
- langraph (npm install @langchain/langgraph-cli): AI-graph framework
- mongodb: MongoDB driver
- dotenv: safe handling of sensitive data
- node-cron: repetitive task automation (for reporting)
### admin dashboarding with react
- npx create-react-app admin-dashboard
- axios 
- react-router-dom

## brands I care about
[![Lada Badge](https://img.shields.io/badge/lada-yellow?logo=lada&logoColor=white&style=flat)](https://www.ladarymco.com/)