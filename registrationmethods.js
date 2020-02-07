const mysql = require('mysql');
const util = require('util');
//create connection to mysql DB
const connection = mysql.createConnection({
  host     : process.env.RDS_HOSTNAME,
  user     : process.env.RDS_USERNAME,
  password : process.env.RDS_PASSWORD,
  port     : process.env.RDS_PORT,
  database : process.env.RDS_DATABASE
});

//connect to mysql DB
connection.connect();

// file:bank-core-datails, method:registerBank
async function registerBank(requestParams,requestBody) {

	if (requestParams.userId){

		
		console.log("request params user id"+requestParams.userId);
	
		var user_id = requestParams.userId;		
		console.log("user id is "+user_id);



	
		const readTable = "select * from USERS where USER_ID='" + user_id + "' and user_type='wmuser' and role='admin'";
		console.log("query is "+readTable);
		const connQueryPromisified = util.promisify(connection.query).bind(connection);
		const results1 = await connQueryPromisified(readTable); 

		console.log("results 1 is "+results1.length);

		if (results1.length < 1) 
		{
			console.log ("invalid user");
			return {"status":401,"Message":"user is invalid or not permitted to setup Bank"};
		} 
		else {		
	
			
			var writeTable1 = "INSERT INTO BANK_MASTER(BANK_CUST_ID,BANK_NAME,PRIMARY_CONTACT_NAME,PRIMARY_EMAIL,PRIMARY_CONTACT_NUM,CHECKER_VERIFIED,ACTIVE,"
					writeTable1 += "CREATED_BY,UPDATED_BY)"
					writeTable1 += "VALUES ('" + requestBody.bankDetails.bankCustomerId + "','" + requestBody.bankDetails.bankName + "','" + requestBody.bankDetails.primaryContactName + "','" + requestBody.bankDetails.primaryContactEmailId + "','" + requestBody.bankDetails.primaryContactPhoneNo + "',FALSE,TRUE,"
					writeTable1 += "'" + requestParams.userId + "','" + requestParams.userId + "')";

					console.log("insert query is "+writeTable1);
					const connQueryPromisified2 = util.promisify(connection.query).bind(connection);
					const results2 = await connQueryPromisified2(writeTable1);  
					
					console.log(JSON.stringify(results2));
					console.log("here 123");
					const response = JSON.stringify(results2);
					console.log("response is " + response );
					const data = JSON.parse(response);
					const bank_id = data.insertId;

					//return results;
					console.log("here 1");
					console.log ("bank_id is " + bank_id);
					console.log("here 2");

					var writeTable2 = "INSERT INTO BANK_PREFERENCES(BANK_ID,SERVICE_SUBSCRIBED,SERV_START_DATE,SERV_END_DATE,BANK_USER_SUPPORT,CLIENT_USER_SUPPORT,PAYMENT_AUTH,"
					writeTable2 += "NO_PAYMENT_AUTH,CREATED_BY,UPDATED_BY)"
					writeTable2 += "VALUES ('" + bank_id + "','" + requestBody.bankDetails.bankServiceSubscription + "','" + requestBody.bankDetails.servciceActivationStartDate + "','" + requestBody.bankDetails.serviceActivationEndDate + "','" + requestBody.bankDetails.supportReqforBankUserMgmt + "',"
					writeTable2 += "'" + requestBody.bankDetails.supportReqforClientUserMgmt + "','" + requestBody.bankDetails.authManualPymtActivity + "','" + requestBody.bankDetails.authNonPymtActivity + "','" + user_id + "','" + user_id + "')";

					console.log("insert query is "+writeTable2);
					const connQueryPromisified3 = util.promisify(connection.query).bind(connection);
					const results3 = await connQueryPromisified3(writeTable2);   
 
					var writeTable3 = "INSERT INTO BANK_ADDRESS(BANK_ID,TRADING_ADD_LINE1,TRADING_ADD_LINE2,TRADING_ADD_CITY,TRADING_ADD_STATE,TRADING_ADD_COUNTRY,TRADING_ADD_POST_CODE,"
					writeTable3 += "REGISTER_ADD_LINE1,REGISTER_ADD_LINE2,REGISTER_ADD_CITY,REGISTER_ADD_STATE,REGISTER_ADD_COUNTRY,REGISTER_ADD_POST_CODE,CREATED_BY,UPDATED_BY)"
					writeTable3 += "VALUES ('" + bank_id + "','" + requestBody.bankDetails.addressLine1 + "','" + requestBody.bankDetails.addressLine2 + "','" + requestBody.bankDetails.cityName + "','" + requestBody.bankDetails.state + "','" + requestBody.bankDetails.country + "','" + requestBody.bankDetails.postCode + "',"
					writeTable3 += "'" + requestBody.bankDetails.regAddressLine1 + "','" + requestBody.bankDetails.regAddressLine2 + "','" + requestBody.bankDetails.regCity + "','" + requestBody.bankDetails.regState + "','" + requestBody.bankDetails.regCountry + "','" + requestBody.bankDetails.regPostCode + "','" + user_id + "','" + user_id + "')";

					console.log("insert query is "+writeTable3);
					const connQueryPromisified4 = util.promisify(connection.query).bind(connection);
					const results4 = await connQueryPromisified3(writeTable3);   
 
				
				return {"status":201,"Message":"Bank setup is completed successfully"};
			}
		//	else {
		//		console.log ("invalid user");
		//		return {"status":400,"Message":"User already exists"};
		//	}
	//	}

	//
	}
	else {
		return {"status":422,"Message":"Required Params are missing"};
	}
}

//file:bank-master-details, method:registerBankMasterDetails
async function registerBankMasterDetails(requestParams,requestBody) {

	if (requestParams.userId){

		
		console.log("request params user id"+requestParams.userId);
	
		var user_id = requestParams.userId;		
		console.log("user id is "+user_id);

	
		const readTable = "select * from USERS where USER_ID='" + user_id + "' and user_type='wmuser' and role='admin'";
		console.log("query is "+readTable);
		const connQueryPromisified = util.promisify(connection.query).bind(connection);
		const results1 = await connQueryPromisified(readTable); 

		console.log("results 1 is "+results1.length);

		if (results1.length < 1) 
		{
			console.log ("invalid user");
			return {"status":401,"Message":"user is invalid or not permitted to setup Bank"};
		} 
		else {		
	
			
			var writeTable1 = "INSERT INTO BANK_MASTER(BANK_CUST_ID,BANK_NAME,PRIMARY_CONTACT_NAME,PRIMARY_EMAIL,PRIMARY_CONTACT_NUM,CHECKER_VERIFIED,ACTIVE,"
					writeTable1 += "CREATED_BY,UPDATED_BY)"
					writeTable1 += "VALUES ('" + requestBody.bankCustomerId + "','" + requestBody.bankName + "','" + requestBody.primaryContactName + "','" + requestBody.primaryContactEmailId + "','" + requestBody.primaryContactPhoneNo + "',FALSE,TRUE,"
					writeTable1 += "'" + requestParams.userId + "','" + requestParams.userId + "')";

					console.log("insert query is "+writeTable1);
					const connQueryPromisified2 = util.promisify(connection.query).bind(connection);
					const results2 = await connQueryPromisified2(writeTable1);  
					
					console.log(JSON.stringify(results2));
					console.log("here 123");
					const response = JSON.stringify(results2);
					console.log("response is " + response );
					const data = JSON.parse(response);
					const bank_id = data.insertId;

					//return results;
					console.log("here 1");
					console.log ("bank_id is " + bank_id);
					
				
				return {"status":201,"bank_id":bank_id};
			}
		//	else {
		//		console.log ("invalid user");
		//		return {"status":400,"Message":"User already exists"};
		//	}
	//	}

	//
	}
	else {
		return {"status":422,"Message":"Required Params are missing"};
	}
}

//file:bank-address-details, method:UploadBankAddressDetails
async function UploadBankAddressDetails(requestParams,requestBody) {

	if (requestParams.userId){

		
		console.log("request params user id"+requestParams.userId);
	
		var user_id = requestParams.userId;		
		console.log("user id is "+user_id);
	
		const readTable = "select * from USERS where USER_ID='" + user_id + "' and user_type='wmuser' and role='admin'";
		console.log("query is "+readTable);
		const connQueryPromisified = util.promisify(connection.query).bind(connection);
		const results1 = await connQueryPromisified(readTable); 

		console.log("results 1 is "+results1.length);

		if (results1.length < 1) 
		{
			console.log ("invalid user");
			return {"status":401,"Message":"user is invalid or not permitted to setup Bank"};
		} 
		else {
			
			const readTable2 = "select * from BANK_ADDRESS where BANK_ID='" + requestParams.bankID + "'";
			console.log("query is " + readTable);
			const connQueryPromisified1 = util.promisify(connection.query).bind(connection);
			const results2 = await connQueryPromisified1(readTable2);

			console.log("results 2 is " + results2.length);

			if (results2.length >= 1) {
				console.log("Updating bank address details");

				var updateTable1 = "UPDATE BANK_ADDRESS SET TRADING_ADD_LINE1='" + requestBody.addressLine1 + "',TRADING_ADD_LINE2='" + requestBody.addressLine2 + "',TRADING_ADD_CITY='" + requestBody.cityName + "',TRADING_ADD_STATE='" + requestBody.state + "',TRADING_ADD_COUNTRY='" + requestBody.country + "',TRADING_ADD_POST_CODE='" + requestBody.postCode + "',"
					updateTable1 += "REGISTER_ADD_LINE1='" + requestBody.regAddressLine1 + "',REGISTER_ADD_LINE2='" + requestBody.regAddressLine2 + "',REGISTER_ADD_CITY='" + requestBody.regCity + "',REGISTER_ADD_STATE='" + requestBody.regState + "',REGISTER_ADD_COUNTRY='" + requestBody.regCountry + "',REGISTER_ADD_POST_CODE='" + requestBody.regPostCode + "',UPDATED_BY='" + requestParams.userId + "'"
					updateTable1 += ",UPDATED_AT=CURRENT_TIMESTAMP WHERE BANK_ID='" + requestParams.bankID + "'";
					
				console.log("update query is "+updateTable1);
				const connQueryPromisified2 = util.promisify(connection.query).bind(connection);
				const results4 = await connQueryPromisified2(updateTable1);   
		
				console.log(JSON.stringify(results4));
				console.log("here 123");
				const response = JSON.stringify(results4);
				console.log("response is " + response );

				console.log("Address Details Updated Successfully");
				return { "status": 201, "Message": "Address Details Updated Successfully"};		
				
			}
			else {
			
				var writeTable3 = "INSERT INTO BANK_ADDRESS(BANK_ID,TRADING_ADD_LINE1,TRADING_ADD_LINE2,TRADING_ADD_CITY,TRADING_ADD_STATE,TRADING_ADD_COUNTRY,TRADING_ADD_POST_CODE,"
				writeTable3 += "REGISTER_ADD_LINE1,REGISTER_ADD_LINE2,REGISTER_ADD_CITY,REGISTER_ADD_STATE,REGISTER_ADD_COUNTRY,REGISTER_ADD_POST_CODE,CREATED_BY,UPDATED_BY)"
				writeTable3 += "VALUES ('" + requestParams.bankID + "','" + requestBody.addressLine1 + "','" + requestBody.addressLine2 + "','" + requestBody.cityName + "','" + requestBody.state + "','" + requestBody.country + "','" + requestBody.postCode + "',"
				writeTable3 += "'" + requestBody.regAddressLine1 + "','" + requestBody.regAddressLine2 + "','" + requestBody.regCity + "','" + requestBody.regState + "','" + requestBody.regCountry + "','" + requestBody.regPostCode + "','" + user_id + "','" + user_id + "')";

				console.log("insert query is "+writeTable3);
				const connQueryPromisified2 = util.promisify(connection.query).bind(connection);
				const results2 = await connQueryPromisified2(writeTable3);   
					
					return {"status":201,"Message":"Bank address details are uploaded successfully"};
			}
		}
		//	else {
		//		console.log ("invalid user");
		//		return {"status":400,"Message":"User already exists"};
		//	}
	//	}

	//
	}
	else {
		return {"status":422,"Message":"Required Params are missing"};
	}
}

//file:customers, method:registerUser
async function registerUser(requestBody) {

	if (requestBody.companyName && requestBody.userFirstName && requestBody.userLastName && requestBody.userPassword && requestBody.yourContactNumber && requestBody.yourEmailAddress) {

		const readTable = "select * from USERS where USER_ID ='" + requestBody.yourEmailAddress + "'";
		console.log("query is " + readTable);
		const connQueryPromisified1 = util.promisify(connection.query).bind(connection);
		const results1 = await connQueryPromisified1(readTable);

		console.log("results 1 is " + results1.length);

		if (results1.length >= 1) {
			console.log("User already exists");
			return { "status": 401, "Message": "User already exists" };
		}
		else {	

			var writeTable1 = "INSERT INTO CUSTOMER_MASTER(COMPANY_NAME,REG_NUM,COUNTRY,CONTACT_NUMBER,ACTIVE,"
					writeTable1 += "CREATED_BY,SALES_VERIFY,UPDATED_BY)"
					writeTable1 += "VALUES ('" + requestBody.companyName + "','" + requestBody.companyRegNumber + "','" + requestBody.companyLocation + "','" + requestBody.yourContactNumber + "',TRUE,"
					writeTable1 += "'" + requestBody.yourEmailAddress + "',FALSE,'" + requestBody.yourEmailAddress + "')";

					console.log("insert query is "+writeTable1);
					const connQueryPromisified2 = util.promisify(connection.query).bind(connection);
					const results2 = await connQueryPromisified2(writeTable1);   
					
					console.log(JSON.stringify(results2));
					console.log("here 123");
					const response = JSON.stringify(results2);
					console.log("response is " + response );
					const data = JSON.parse(response);
					const cust_id = data.insertId;

					//return results;
					console.log("here 1");
					console.log ("cust_id is " + cust_id);
					console.log("here 2");

					var writeTable2 = "INSERT INTO CUSTOMER_USERS(USER_ID,CUST_ID,FIRST_NAME,MIDDLE_NAME,LAST_NAME,EMAIL_ID,ROLE,"
					writeTable2 += "PASSWORD,MOBILE_NUM,PRIMARY_CONTACT,ACTIVE,CREATED_BY,UPDATED_BY,SECURITY_QUESTION,SECURITY_ANSWER)"
					writeTable2 += "VALUES ('" + requestBody.yourEmailAddress + "','" + cust_id + "','" + requestBody.userFirstName + "','" + requestBody.userMiddleName + "','" + requestBody.userLastName + "',"
					writeTable2 += "'" + requestBody.yourEmailAddress + "','admin','" + requestBody.userPassword + "','" + requestBody.yourContactNumber + "',TRUE,TRUE,'" + requestBody.yourEmailAddress + "','" + requestBody.yourEmailAddress + "','" + requestBody.securityQuestion + "','" + requestBody.securityAnswer + "')";

					console.log("insert query is "+writeTable2);
					const connQueryPromisified3 = util.promisify(connection.query).bind(connection);
					const results3 = await connQueryPromisified3(writeTable2);   

			
				console.log("Registered Successfully, Your account number is "+cust_id);
				return { "status": 201, "Message": "Your are Registered Successfully"};
			
		}

	} else {
		return { "status": 400, "Message": "Invalid Request" };
	}

}

//file:customers-users, method:addCustomerUser
async function addCustomerUser(requestParams,requestBody) {

	if (requestParams.customerId && requestParams.userId){

		console.log("request params customer ID"+requestParams.customerId);
		console.log("request params user id"+requestParams.userId);

		var cust_id = requestParams.customerId;
		var user_id = requestParams.userId;

		console.log("customer id is "+cust_id);
		console.log("user id is "+user_id);

		if (requestBody.userName && requestBody.firstName && requestBody.middleName && requestBody.lastName && requestBody.role && requestBody.mobileNum){	

			const readTable = "select * from USERS where USER_ID='" + user_id + "' and cust_id='" + cust_id + "' and role='admin'";
			console.log("query is "+readTable);
			const connQueryPromisified = util.promisify(connection.query).bind(connection);
			const results1 = await connQueryPromisified(readTable); 

			console.log("results 1 is "+results1.length);

			if (results1.length < 1) 
			{
				console.log ("invalid user");
				return {"status":401,"Message":"user is invalid or not permitted to add user"};
			} 
			else {

				var user_name= requestBody.userName;
				var first_name = requestBody.firstName;
				var middle_name = requestBody.middleName;
				var last_name = requestBody.lastName;
				var role = requestBody.role;
				var mobile_num = requestBody.mobileNum;

				console.log("user name is "+user_name);
				console.log("first name is "+first_name);
				console.log("middle name is "+middle_name);
				console.log("last name is "+last_name);
				console.log("role is "+role);
				console.log("mobile num is "+mobile_num);
		
				const readTable = "select * from USERS where USER_NAME='" + user_name + "'";
				console.log("query is "+readTable);
				const connQueryPromisified = util.promisify(connection.query).bind(connection);
				const results1 = await connQueryPromisified(readTable); 

				console.log("results 1 is "+results1.length);

				if (results1.length < 1) 
				{
					var writeTable = "INSERT INTO USERS(USER_NAME,CUST_ID,USER_TYPE,FIRST_NAME,MIDDLE_NAME,LAST_NAME,EMAIL_ID,ROLE,"
					writeTable += "PASSWORD,MOBILE_NUM,PRIMARY_CONTACT,ACTIVE,CREATED_BY,UPDATED_BY)"
					writeTable += "VALUES ('" + user_name + "','" + cust_id + "','custuser','" + first_name + "','" + middle_name + "','" + last_name + "',"
					writeTable += "'" + user_name + "','" + role + "','temp123456','" + mobile_num + "',FALSE,FALSE,'" + user_name + "','" + user_name + "')";

					console.log("insert query is "+writeTable);
					const connQueryPromisified = util.promisify(connection.query).bind(connection);
					const results = await connQueryPromisified(writeTable);   
					
					return {"status":201,"Message":"User added successfully"};
				}
				else {
					console.log ("invalid user");
					return {"status":400,"Message":"User already exists"};
				}
			}

		} else {
			return {"status":400,"Message":"Invalid Request"};
		}
	}
	else {
		return {"status":422,"Message":"Required Params are missing"};
	}
}

module.exports = {
    registerBank: registerBank,
    registerBankMasterDetails: registerBankMasterDetails,
    UploadBankAddressDetails: UploadBankAddressDetails,
    registerUser: registerUser,
    addCustomerUser: addCustomerUser
}