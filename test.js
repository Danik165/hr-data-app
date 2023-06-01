const DoNotMatchList = new Set(['Name', 'EmailID', 'Department','Role', 'PhoneNumber'])

//const result = !DoNotMatchList.has("Manager")
const str = "Hello"
const result = str.toLowerCase().search("hell")
console.log(result)
//
//const data = [
//        {
//            "UserID": 3,
//            "Name": "XYZ",
//            "EmailID": "xyz@example.com",
//            "Phone Number": null,
//            "Gender": null,
//            "Address": null,
//            "City": null,
//            "State": null,
//            "WorkType": null,
//            "JoiningDate": null,
//            "DOB": null,
//            "Age": null,
//            "Time at Jeevan": null,
//            "Department": "Salesforce",
//            "Role": "Developer",
//            "ReportingManagerID": null,
//            "Manager Name": null,
//            "skills": []
//        },
//        {
//            "UserID": 4,
//            "Name": "Chandru",
//            "EmailID": "chandru@example.com",
//            "Phone Number": null,
//            "Gender": null,
//            "Address": null,
//            "City": null,
//            "State": null,
//            "WorkType": null,
//            "JoiningDate": null,
//            "DOB": null,
//            "Age": null,
//            "Time at Jeevan": null,
//            "Department": "Salesforce",
//            "Role": "Developer",
//            "ReportingManagerID": null,
//            "Manager Name": null,
//            "skills": []
//        },
//        {
//            "UserID": 201,
//            "Name": "Srikanth",
//            "EmailID": "srikanth@gmail.com",
//            "Phone Number": null,
//            "Gender": null,
//            "Address": null,
//            "City": null,
//            "State": null,
//            "WorkType": null,
//            "JoiningDate": null,
//            "DOB": null,
//            "Age": null,
//            "Time at Jeevan": null,
//            "Department": "Human Resources",
//            "Role": "Generalist",
//            "ReportingManagerID": null,
//            "Manager Name": null,
//            "skills": []
//        },
//        {
//            "UserID": 1000,
//            "Name": "Rahul",
//            "EmailID": "rahul@jeevantechnologies.com",
//            "Phone Number": null,
//            "Gender": null,
//            "Address": null,
//            "City": null,
//            "State": null,
//            "WorkType": null,
//            "JoiningDate": null,
//            "DOB": null,
//            "Age": null,
//            "Time at Jeevan": null,
//            "Department": "Salesforce",
//            "Role": "Developer",
//            "ReportingManagerID": null,
//            "Manager Name": null,
//            "skills": [
//                {
//                    "SkillName": "HTML",
//                    "level": "Beginner",
//                    "experience": "3"
//                }
//            ]
//        },
//        {
//            "UserID": 1001,
//            "Name": "Chandra Sekhar Reddy",
//            "EmailID": "chandrasekhar.reddy@jeevantechnologies.com",
//            "Phone Number": "0123456789",
//            "Gender": "Male",
//            "Address": "Mylapore",
//            "City": "Chennai",
//            "State": "Tamil Nadu",
//            "WorkType": "Hybrid",
//            "JoiningDate": null,
//            "DOB": "1999-12-31T18:30:00.000Z",
//            "Age": 23,
//            "Time at Jeevan": null,
//            "Department": "Salesforce",
//            "Role": "Developer",
//            "ReportingManagerID": 1000,
//            "Manager Name": "Rahul",
//            "skills": []
//        },
//        {
//            "UserID": 1336,
//            "Name": "Reshma",
//            "EmailID": "reshma.santhakumar@jeevantechnologies.com",
//            "Phone Number": null,
//            "Gender": null,
//            "Address": null,
//            "City": null,
//            "State": null,
//            "WorkType": null,
//            "JoiningDate": null,
//            "DOB": null,
//            "Age": null,
//            "Time at Jeevan": null,
//            "Department": "Salesforce",
//            "Role": "Developer",
//            "ReportingManagerID": null,
//            "Manager Name": null,
//            "skills": []
//        },
//        {
//            "UserID": 1444,
//            "Name": "Gowtham",
//            "EmailID": "gowtham.ravichander@jeevantechnologies.com",
//            "Phone Number": "7358327816",
//            "Gender": "Male",
//            "Address": "Pallavaram",
//            "City": "Chennai",
//            "State": "Tamil Nadu",
//            "WorkType": "WFO",
//            "JoiningDate": "2022-11-13T18:30:00.000Z",
//            "DOB": "1999-11-09T18:30:00.000Z",
//            "Age": 23,
//            "Time at Jeevan": "0 Years 6 Month",
//            "Department": "Salesforce",
//            "Role": "Developer",
//            "ReportingManagerID": 1000,
//            "Manager Name": "Rahul",
//            "skills": [
//                {
//                    "SkillName": "HTML",
//                    "level": "beginner",
//                    "experience": "2"
//                },
//                {
//                    "SkillName": "JavaScript",
//                    "level": "Intermediate",
//                    "experience": "2"
//                }
//            ]
//        },
//        {
//            "UserID": 1446,
//            "Name": "Satish",
//            "EmailID": "sathish.venkatesan@jeevantechnologies.com",
//            "Phone Number": "1234567890",
//            "Gender": "Male",
//            "Address": "Red Hills",
//            "City": "Chennai",
//            "State": "Tamil Nadu",
//            "WorkType": "Hybrid",
//            "JoiningDate": "2022-11-14T18:30:00.000Z",
//            "DOB": "1995-12-31T18:30:00.000Z",
//            "Age": 27,
//            "Time at Jeevan": "0 Years 6 Month",
//            "Department": "IT",
//            "Role": "Admin",
//            "ReportingManagerID": 1000,
//            "Manager Name": "Rahul",
//            "skills": []
//        }
//    ]
//
//const searchValue = 'S';
//
//// for( let i in data){
////     for(let k in data[i])
////     console.log(k)
//// }
//
//
//function searchJSON(obj, val) {
//    let results = [];
//    for (let k in obj) {
//
//      if (obj.hasOwnProperty(k)) {
//        if (typeof obj[k] === "object") {
//            results = results.concat(searchJSON(obj[k], val));
//        }else if (typeof obj[k] == 'string' && obj[k].search(val) >=0) {
//           // console.log(obj[k].search(/Gowtham/i))
//          results.push({matchedKey:k,matchValue:obj[k]});
//        }
//      }
//    }
//    return results;
//  }
//
//  //let employeed = {...}; // your JSON object
//  let key = "gowtham";
//
//  let val = / + key + /i
//
//  for(let index in data){
//
//      data[index].matchedResults = searchJSON(data[index], val);
//  }
//
//
//  console.log(data);
//