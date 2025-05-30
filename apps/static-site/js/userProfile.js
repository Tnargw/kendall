const userID = "27"; // Hardcoded for testing. Later, find this value autoatmically, most likely through cookies from the Login Page(Not setup yet)

const requestURL = "https://recservices.onrender.com/api/employees/" + userID;
const httpType = "GET";

/*
    Responsible for 
        1) Requesting data from the data base
        2) Calling the function that oragnizes the data into the correct locations
        
    Fetch Request: Ideally returns a JSON object, with data pertaining to the user.  
    The information expected from the server currently looks like:
    {
        "employee_id": 27,
        "user_id": null,
        "first_name": "Michael",
        "last_name": "Rodriguez",
        "phone_number": "415-555-1234",
        "email": "michael.rodriguez@example.com",
        "position_id": 2,
        "location_id": 1,
        "is_hourly": 0,
        "is_salaried": 1,
        "is_active": 1,
        "created_at": "2025-03-10T16:25:49.000Z",
        "updated_at": "2025-03-10T16:25:49.000Z"
    }
*/

function getJSONDataFromServer(requestURL, httpType) {
    fetch(requestURL, {
        method: httpType,
        headers: {
            "Content-type": "application/json"
        }
    })
        .then(response => response.json()) // transforms the data into a json object
        .then(jsonData => {attachJSONDataToElements(jsonData)})
        .catch(error => { console.log("Error: ", error)})
}

/* 
   Resposible for taking the JSON Object (retrieved from the server), and putting it's data into the correct locations
*/
function attachJSONDataToElements(jsonData) {
    document.getElementById("firstName").value = jsonData["first_name"]
    document.getElementById("lastName").value = jsonData["last_name"]
    document.getElementById("phoneNumber").value = jsonData["phone_number"]
    document.getElementById("emailAddress").value = jsonData["email"]

    console.log("All Data Loaded!")
}



getJSONDataFromServer(requestURL, httpType);