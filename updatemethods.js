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

// file:customer-users, method:updateCustomerUserDetails
async function updateCustomerUserDetails(requestParams,requestBody) {
	if (requestParams.customerId && requestParams.userId){	

		console.log("request params customer ID"+requestParams.customerId);
		console.log("request params username"+requestParams.userId);
	
		var cust_id = requestParams.customerId;
		var user_id = requestParams.userId;

		console.log("customer id is "+cust_id);
		console.log("user name is "+user_id);		
			
		
		const readTable = "select * from USERS where USER_ID ='" + requestParams.userId + "' and CUST_ID='" + requestParams.customerId + "'";
		console.log("query is " + readTable);
		const connQueryPromisified1 = util.promisify(connection.query).bind(connection);
		const results1 = await connQueryPromisified1(readTable);

		console.log("results 1 is " + results1.length);

		if (results1.length < 1) {
			console.log("Invalid User details");
			return { "status": 401, "Message": "Invalid User details" };
		}
		else {

		

			var updateTable1 = "UPDATE USERS SET FIRST_NAME='" + requestBody.firstName + "',MIDDLE_NAME='" + requestBody.middleName + "',LAST_NAME='" + requestBody.lastName + "',MOBILE_NUM='" + requestBody.mobileNum + "',DESK_NUM='" + requestBody.workNum + "'"
				updateTable1 += ",UPDATED_BY='" + requestParams.userId + "'"
				updateTable1 += ",UPDATED_AT=CURRENT_TIMESTAMP WHERE USER_ID='" + requestParams.userId + "'";
				
			console.log("update query is "+updateTable1);
			const connQueryPromisified2 = util.promisify(connection.query).bind(connection);
			const results4 = await connQueryPromisified2(updateTable1);   
	
			console.log(JSON.stringify(results4));
			console.log("here 123");
			const response = JSON.stringify(results4);
			console.log("response is " + response );

			console.log("User Details Updated Successfully");
			return { "status": 201, "Message": "User Details Updated Successfully"};		
				
			
		}	
	}
	else {
       return {"status":422,"Message":"Required Params are missing"};
    }  
}

// file:customers, method:updateCustAddrDetails
async function updateCustAddrDetails(requestParams,requestBody) {
	if (requestParams.customerId && requestParams.userId){	

		console.log("request params customer ID"+requestParams.customerId);
		console.log("request params username"+requestParams.userId);
	
		var cust_id = requestParams.customerId;
		var user_id = requestParams.userId;

		console.log("customer id is "+cust_id);
		console.log("user name is "+user_id);		
			
		
		const readTable = "select * from USERS where USER_ID ='" + requestParams.userId + "' and CUST_ID='" + requestParams.customerId + "'";
		console.log("query is " + readTable);
		const connQueryPromisified1 = util.promisify(connection.query).bind(connection);
		const results1 = await connQueryPromisified1(readTable);

		console.log("results 1 is " + results1.length);

		if (results1.length < 1) {
			console.log("Invalid User details");
			return { "status": 401, "Message": "Invalid User details" };
		}
		else {

			const readTable2 = "select * from CUSTOMER_ADDRESS where CUST_ID='" + requestParams.customerId + "'";
			console.log("query is " + readTable);
			const connQueryPromisified1 = util.promisify(connection.query).bind(connection);
			const results2 = await connQueryPromisified1(readTable2);

			console.log("results 2 is " + results2.length);

			if (results2.length >= 1) {
				console.log("Updating user details");

				var updateTable1 = "UPDATE CUSTOMER_ADDRESS SET TRADING_ADD_LINE1='" + requestBody.tradAddLine1 + "',TRADING_ADD_LINE2='" + requestBody.tradAddLine2 + "',TRADING_ADD_CITY='" + requestBody.tradAddCity + "',TRADING_ADD_STATE='" + requestBody.tradAddState + "',TRADING_ADD_COUNTRY='" + requestBody.tradAddCountry + "',TRADING_ADD_POST_CODE='" + requestBody.tradAddPostalCode + "',"
					updateTable1 += "REGISTER_ADD_LINE1='" + requestBody.regAddLine1 + "',REGISTER_ADD_LINE2='" + requestBody.regAddLine2 + "',REGISTER_ADD_CITY='" + requestBody.regAddCity + "',REGISTER_ADD_STATE='" + requestBody.regAddState + "',REGISTER_ADD_COUNTRY='" + requestBody.regAddCountry + "',REGISTER_ADD_POST_CODE='" + requestBody.regAddPostalCode + "',UPDATED_BY='" + requestParams.userId + "'"
					updateTable1 += ",UPDATED_AT=CURRENT_TIMESTAMP WHERE CUST_ID='" + requestParams.customerId + "'";
					
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
	
				var writeTable1 = "INSERT INTO CUSTOMER_ADDRESS(CUST_ID,TRADING_ADD_LINE1,TRADING_ADD_LINE2,TRADING_ADD_CITY,TRADING_ADD_STATE,TRADING_ADD_COUNTRY,TRADING_ADD_POST_CODE,"
					writeTable1 += "REGISTER_ADD_LINE1,REGISTER_ADD_LINE2,REGISTER_ADD_CITY,REGISTER_ADD_STATE,REGISTER_ADD_COUNTRY,REGISTER_ADD_POST_CODE,CREATED_BY,UPDATED_BY)"
					writeTable1 += "VALUES ('" + requestParams.customerId + "','" + requestBody.tradAddLine1 + "','" + requestBody.tradAddLine2 + "','" + requestBody.tradAddCity + "','" + requestBody.tradAddState + "','" + requestBody.tradeAddCountry + "','" + requestBody.tradeAddPostalCode + "',",
					writeTable1 += "'" + requestBody.regAddLine1 + "','" + requestBody.regAddLine2 + "','" + requestBody.regAddCity + "','" + requestBody.regAddState + "','" + requestBody.regAddCountry + "','" + requestBody.regAddPostalCode + "','" + requestParams.userId + "','" + requestParams.userId + "')";

				console.log("insert query is "+writeTable1);
				const connQueryPromisified2 = util.promisify(connection.query).bind(connection);
				const results3 = await connQueryPromisified2(writeTable1);   
		
				console.log(JSON.stringify(results3));
				console.log("here 123");
				const response = JSON.stringify(results3);
				console.log("response is " + response );

				console.log("Address Details Added Successfully");
				return { "status": 201, "Message": "Address Details Added Successfully"};		
			}	
		}	
	}
	else {
       return {"status":422,"Message":"Required Params are missing"};
    }  
}

module.exports = {
    updateCustomerUserDetails: updateCustomerUserDetails,
    updateCustAddrDetails: updateCustAddrDetails
}