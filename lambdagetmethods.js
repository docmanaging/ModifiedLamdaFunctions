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

/* 
file: bank-address-details, method:getBankAddressDetails
file: bank-master-datails, method:getBankMasterDetails*/

async function getBankAddressDetails(requestParams,context) {

	if (requestParams.userId){	
	
		console.log("request params user Id"+requestParams.userId);
	
		var user_id = requestParams.userId;

		console.log("user Id is "+user_id);	
	
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
			var readTable2
            if (requestParams.bankID ) {
				var bank_id = requestParams.bankID;
				readTable2 = "select bank_id,TRADING_ADD_LINE1,TRADING_ADD_LINE2,TRADING_ADD_CITY,TRADING_ADD_STATE,TRADING_ADD_COUNTRY,TRADING_ADD_POST_CODE,REGISTER_ADD_LINE1,REGISTER_ADD_LINE2,REGISTER_ADD_CITY,REGISTER_ADD_STATE,REGISTER_ADD_COUNTRY,REGISTER_ADD_POST_CODE from BANK_ADDRESS where bank_id='"+ bank_id +"'";
				
			}
			else if(requestParams.bankName ){
				readTable2 = "select bank_id,bank_cust_id,bank_name,primary_contact_name,primary_email,primary_contact_num from BANK_MASTER";
				if (requestParams.bankName){
					var bank_name=requestParams.bankName;
					readTable2 += " where bank_name like '%"+ bank_name +"%'";
					if(requestParams.bankID)
					{
						var bank_id=requestParams.bankID;
						readTable2 += " or bank_id ='"+ bank_id +"'";
					}
				}
				else {
					var bank_id=requestParams.bankID;
					readTable2 += " where bank_id ='"+ bank_id +"'";
				}
			}
			else {
				console.log ("Required Params are missing");
				return {"status":422,"Message":"Required Params are missing"};
            }

            console.log("query is "+readTable2);
			const connQueryPromisified = util.promisify(connection.query).bind(connection);
			const results2 = await connQueryPromisified(readTable2); 

			console.log("results 2 is "+results2);
			return {bankaddressdetails: results2};

        }

	}
	else {
		return {"status":422,"Message":"Required Params are missing"};
	}
}

/* file: bank-core-details,method: getCustomerUsersSummary
file: Customer-Users,method: getCustomerUsersSummary 
file: bank-core-details,method: getCustomerUsersDetails
file: Customer-Users,method: getCustomerUsersDetails
file: bank-core-details,method: getCustomerUserDetails
file: Customer-Users,method: getCustomerUserDetails
file: Cstomers,method:getCustAddrDetails */

async function getCustomerUsersSummary(requestParams,context) {

	if (requestParams.customerId && requestParams.userId){	

		console.log("request params customer ID"+requestParams.customerId);
		console.log("request params userid"+requestParams.userId);
	
		var cust_id = requestParams.customerId;
		var user_id = requestParams.userId;

		console.log("customer id is "+cust_id);
		console.log("user id is "+user_id);	

		const readTable;

	    if(requestParams.customerId){
		 readTable = "select * from CUSTOMER_USERS where ID='" + user_id + "' and cust_id='" + cust_id + "' and role='admin'";
		}
		else if (requestParams.userId){
		 readTable = "select * from USERS where USER_ID='" + user_id + "' and cust_id='" + cust_id + "' and role='admin'";

		}
		console.log("query is "+readTable);
		const connQueryPromisified = util.promisify(connection.query).bind(connection);
		const results1 = await connQueryPromisified(readTable); 

        console.log("results 1 is "+results1.length);
        
    
		if (results1.length < 1) {
			console.log ("invalid user");
			return {"status":401,"Message":"user is invalid or unauthorized"};
		 } 
		else  {		
			const readTable;
			if(requestParams.getCustomerUsersSummary){
			readTable = "select role,count(*) as count from CUSTOMER_USERS where CUST_ID='" + cust_id + "' group by role";
			}
			else if(requestParams.customerId && requestParams.getCustomerUsersDetails){
			readTable = "select id as user_id,CONCAT(FIRST_NAME,' ',MIDDLE_NAME,' ',LAST_NAME) as full_name,user_id as user_name,role,active from CUSTOMER_USERS where CUST_ID='" + cust_id + "'";	
			}
			else if(requestParams.userId && requestParams.getCustomerUsersDetails){
			readTable = "select user_id,CONCAT(FIRST_NAME,' ',MIDDLE_NAME,' ',LAST_NAME) as full_name,user_name,role,active from USERS where CUST_ID='" + cust_id + "'";
			}
			else if(requestParams.customerId && requestParams.getCustomerUserDetails){
			readTable = "select id as user_id,user_id as user_name,CONCAT(FIRST_NAME,' ',MIDDLE_NAME,' ',LAST_NAME) as name, first_name,middle_name,last_name,role,mobile_num,desk_num from CUSTOMER_USERS where CUST_ID='" + cust_id + "' and ID='" + user_id + "'";	
			}
			else if(requestParams.userId && requestParams.getCustomerUserDetails){
				readTable = "select user_id,user_name,CONCAT(FIRST_NAME,' ',MIDDLE_NAME,' ',LAST_NAME) as name, first_name,middle_name,last_name,role,mobile_num,desk_num from USERS where CUST_ID='" + cust_id + "' and USER_ID='" + user_id + "'";
			}
            else if(requestParams.getCustAddrDetails){
			readTable = "select company_name,reg_num,a.cust_id,trading_add_line1,trading_add_line2,trading_add_city,trading_add_state,trading_add_country,trading_add_post_code,register_add_line1,register_add_line2,register_add_city,register_add_state,register_add_country,register_add_post_code from CUSTOMER_ADDRESS a, CUSTOMER_MASTER b where a.CUST_ID='" + cust_id + "' and a.CUST_ID=b.CUST_ID";
		    }
		    console.log("query is "+readTable);
			const connQueryPromisified = util.promisify(connection.query).bind(connection);
			const results = await connQueryPromisified(readTable);			
			return results;
        }
	}
	else {
       return {"status":422,"Message":"Required Params are missing"};
    }  
}

/* file: Countries-List, method: getCountriesList
file: Currencies-List, method: getCurrenciesList */

async function getCountriesnCurrenciesList(requestParams,context) {

	if (requestParams.userId){

	
		console.log("request params user Id"+requestParams.userId);
	
		var user_id = requestParams.userId;

		console.log("user Id is "+user_id);	
	
		const readTable = "select * from USERS where USER_ID='" + user_id + "'";
		console.log("query is "+readTable);
		const connQueryPromisified = util.promisify(connection.query).bind(connection);
		const results1 = await connQueryPromisified(readTable); 

		console.log("results 1 is "+results1.length);

		if (results1.length < 1) 
		{
			console.log ("invalid user");
			return {"status":401,"Message":"user is invalid"};
		} 
		else {
			var readTable2;
			if(requestParams.userId && requestParams.countriesList){
			 readTable2 = "select country_code,country_name,continent from COUNTRY_LIST_MASTER";
			}
			else if(requestParams.userId && requestParams.currenciesList){
			readTable2 = "select currency_code,currency_name,decimals from CURRENCY_LIST_MASTER";
			}
			console.log("query is "+readTable2);
			const connQueryPromisified = util.promisify(connection.query).bind(connection);
			const results2 = await connQueryPromisified(readTable2); 

			console.log("results 2 is "+results2);
			return {countriesList: results2};
		}

	}
	else {
		return {"status":422,"Message":"Required Params are missing"};
	}
}

/* file: Validate-Users, method: validateUser
file: Validate-customer-user, method: validateCustUser*/

async function validateUserCustUser(requestParams,context) {

	if (requestParams.userName && requestParams.password){	

		console.log("request params password "+requestParams.password);
		console.log("request params username "+requestParams.userName);
	
		
		var user_name = requestParams.userName;
		var password = requestParams.password;

		console.log("password is "+password);
		console.log("user name is "+user_name);	
        
        const readTable
        if(requestParams.userName && requestParams.Users){
		readTable = "select user_id,user_name,role,user_type,cust_id,bank_id,first_name,middle_name,last_name from USERS where USER_NAME='" + user_name + "' and password='" + password + "' and ACTIVE=TRUE";
        } 
        else if(requestParams.userName && requestParams.CUSTOMER_USERS){
        readTable = "select id as user_id,user_id as user_name,role, sales_verify, company_name,reg_num,a.cust_id,first_name,middle_name,last_name  from CUSTOMER_USERS a,CUSTOMER_MASTER b where USER_ID='" + user_name + "' and password='" + password + "' and a.ACTIVE=TRUE and a.CUST_ID=b.CUST_ID";
        }
        console.log("query is "+readTable);
		const connQueryPromisified = util.promisify(connection.query).bind(connection);
		const results1 = await connQueryPromisified(readTable); 

		console.log("results 1 is "+results1.length);
	
		if (results1.length < 1) 
		{
			console.log ("invalid user");
			return {"status":401,"message":"Provided details are Invalid"};
			
		} 
		else {
			console.log ("valid user");
			//return {"status":200,"role":result1};		
			//return results1;
			return results1;
        }
        }
        
	else {
       return {"status":422,"message":"Required Params are missing"};
    }  
}

/* file:bank-core-details, method:deleteCustomerUser
file:customer-users, method: deleteCustomerUser*/

async function deleteCustomerUser(requestParams,requestBody) {

	if (requestParams.customerId && requestParams.userId){

		console.log("request params customer ID"+requestParams.customerId);
		console.log("request params userId"+requestParams.userId);

		var cust_id = requestParams.customerId;
		var user_id= requestParams.userId;

		console.log("customer id is "+cust_id);
		console.log("user Id is "+user_id);

		console.log ("request body is "+requestBody);

		const readTable;

	    if(requestParams.customerId){
		 readTable = "select * from CUSTOMER_USERS where ID='" + user_id + "' and cust_id='" + cust_id + "' and role='admin'";
		}
		else if (requestParams.userId){
		 readTable = "select * from USERS where USER_ID='" + user_id + "' and cust_id='" + cust_id + "' and role='admin'";

		}
		console.log("query is "+readTable);
		const connQueryPromisified = util.promisify(connection.query).bind(connection);
		const results1 = await connQueryPromisified(readTable); 
		
		console.log("results 1 is "+results1.length);

		if (results1.length < 1 ) 
			{
				console.log ("invalid user");
				return {"status":401,"Message":"user is invalid or not permitted to delete user"};
			} 
		else {
			    var deleteTable1
			    if(results1.length >= 1 && requestParams.customerId) {
			     deleteTable1 = "DELETE FROM CUSTOMER_USERS WHERE ID='" + requestBody.userId + "' and cust_id='" + cust_id + "'";
			    }
                else if(results1.length >= 1 && requestParams.userId){
				deleteTable1 = "DELETE FROM USERS WHERE USER_ID='" + requestBody.userId + "' and cust_id='" + cust_id + "'";
				 }
				console.log("delete query is "+deleteTable1);
				const connQueryPromisified2 = util.promisify(connection.query).bind(connection);
				const results3 = await connQueryPromisified2(deleteTable1);   
		
				console.log(JSON.stringify(results3));
				console.log("here 123");
				const response = JSON.stringify(results3);
				console.log("response is " + response );

				return {"status":200,"Message":"User deleted successfully"};
			 }
            
           
		}
		
	else {
		return {"status":422,"Message":"Required Params are missing"};
	}
}

module.exports = {	
    getBankAddressDetails: getBankAddressDetails,
    getCustomerUsersSummary: getCustomerUsersSummary,
	getCountriesnCurrenciesList: getCountriesnCurrenciesList,
	validateUserCustUser: validateUserCustUser,
	deleteCustomerUser: deleteCustomerUser
}