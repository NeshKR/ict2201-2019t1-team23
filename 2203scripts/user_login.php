<?php
 
	// Importing DBConfig.php file.
	include 'DBConfig.php';
	 
	// Creating connection.
	 $con = mysqli_connect($HostName,$HostUser,$HostPass,$DatabaseName);
	 
	 // Getting the received JSON into $json variable.
	 $json = file_get_contents('php://input');
	 
	 // decoding the received JSON and store into $obj variable.
	 $obj = json_decode($json,true);
	 
	 // Populate product name from JSON $obj array and store into $username.
	$username = $obj['username'];
	 
	// Populate product number from JSON $obj array and store into $password.
	$password = $obj['password'];
	 
	 // Creating SQL query and insert the record into MySQL database table.
	$Sql_Query = "insert into login_account (username,password) values ('$username','$password')";
	 
 
	 if(mysqli_query($con,$Sql_Query)){
	 
			 // If the record inserted successfully then show the message as response. 
			$MSG = 'Product Successfully Inserted into MySQL Database' ;
			 
			// Converting the message into JSON format.
			$json = json_encode($MSG);
			 
			// Echo the message on screen.
			// We would also show this message on our app.
			 echo $json ;
	 
	 }
	 else{
	 
			echo 'Something Went Wrong';
	 
	 }
	mysqli_close($con);
	
?>