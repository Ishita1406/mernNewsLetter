# Newsletter Subscription Renewal Flow Simulation

## Overview

The **Newsletter Subscription Renewal Flow Simulation** simulates a subscription renewal process. It handles the flow where users receive two reminders for renewing their subscriptions. After each reminder, the system checks whether the user has renewed the subscription. The flow includes simulated waiting periods and random renewal outcomes (50% chance for renewed or not renewed status).

## Features

- **Two reminder emails**: Sends an initial renewal reminder and a second reminder if the first one is ignored.
- **Random Renewal Status**: Renewal status is randomly determined (50-50 chance) after each reminder.
- **Real-Time Logs**: Logs actions as the flow progresses, including reminders sent, status checks, and final outcomes.
- **UI**: A simple React UI allows users to trigger and view the flow.

## Technologies Used

- **Frontend**: 
  - **React** for building the user interface.
  - **Axios** for making API requests to the backend.
- **Backend**: 
  - **Node.js** and **Express** for handling requests and simulating the flow.
  - **MongoDB** for storing flow state and logs.
  
## Flow Logic

1. **First Reminder**: Sends the first renewal reminder.
2. **Waiting Period 1**: Simulates a 3-second wait and checks the renewal status. 
   - If **Renewed**, sends a "Thank You" message and ends the flow.
   - If **Not Renewed**, proceeds to the second reminder.
3. **Second Reminder**: Sends a second renewal reminder.
4. **Waiting Period 2**: Simulates a 2-second wait and checks the renewal status again.
   - If **Renewed**, sends a "Thank You" message and ends the flow.
   - If **Not Renewed**, logs "No further action" and ends the flow.

## Setup Instructions

### 1. Install the dependencies

- **Frontend**: Navigate to the `frontend` directory and install the dependencies:
  ```bash
  cd frontend
  npm install
  ```
  
- **Backend**: Navigate to the `backend` directory and install the dependencies:
  ```bash
  npm install
  ```

### 2. Run the backend

  Start the backend server:
  ```bash
  npm run dev
  ```
  
  ### 3. Run the Frontend
  
  Start the Frontend React-App:
  ```bash
  cd frontend
  npm run dev
  ```
