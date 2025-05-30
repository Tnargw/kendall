### **TimeClock.html - Workflow**

#### **Assigned Group Member**
Chad Lipop
- **Webpage:** timeClock.html
- **UI Elements:** [Assign Week/Due Date]
- **Workflows/User Stories:** [Assign Week/Due Date]
- **API Calls:** [Assign Week/Due Date]
- **Test Cases:** [Assign Week/Due Date]

---
#### **Overview**
- The time clock page will allow employees and managers to view time clock events such as clock-in, clock-out, and hours worked.
**Employees**
- Can view their TimeClock Events 
  - clockInTime
  - clockOutTime 
  - hours worked 
For the Network Request only current Employee’s TimeClock Events are retrieved 

**Manager**
- Can view TimeClock Events for their entire team
Time Clock Event details are extended to see extra detail like
- Linked Shift and its details (startTime, endTime, Employees who were assigned to work, plannedWorkHours)
- Can view TimeClock events based on a certain period of time (like calendar)
- Can view hours worked for all Employees on their team
- Filter based on position, etc
- Ability to edit TimeClock Events if an employee couldn’t clock in/clock out because of technical difficulties
*Can export employees/hours
- As an XLS/Excel
- As a TSV

---
#### **UI Elements**
**Employee view**
- Table showing the clockInTime, clockOutTime, and Hours worked

**Manager view**
- Table showing the clockInTime, clockOutTime, and Hours worked with a filters by employee(s), position. Edit/Export buttons
- Shift details calendar or table showing who is (startTime, endTime, Employees who were assigned to work, plannedWorkHours) Edit/Export buttons
---
#### **Process & Workflow**
- [Describe user stories in a step-by-step process (or use a flowchart). Include refereces to UI elements being interacted with by the user]
A possible workflow
	![Process Workflow](https://github.com/user-attachments/assets/2d99fed8-2c54-4517-8bd6-0efbf7369610)

---
#### **API Calls & Data Handling**
- [Define the network interactions on this page, with the data stored in the request (refer to UI elements) and given in the response]
- Network request will need to include the access level of the user employee/manager this will result in diffent data being sent from backedn as disucused above. At this point we don't have API details so it will need to be sorted out in future semester
---
#### **Test Cases & Error Handling**
- [Define actions to test including successes, failures, and edge cases. Describe the input, process the data goes through, expected output, and reasoning]
One key thing you will want to test is security that the correct access is given for the correct user type employee/manager

- **Input:** User input or action (form submitted, button clicked, selection changed)
- **Process:** Define if the data is handled by only the front-end or if it involves a network request to the back-end
- **Output:** Reponse/returned data/changes to the page
- **Reasoning:** Explain the test case, why is it a success/failure

| Input | Process | Output |  Reasoning |
| :--: | :--: | :--: | :--: |
|  |  |  |  |

---
## Notes
*This document should be maintained and updated regularly as workflows develop and evolve.*
