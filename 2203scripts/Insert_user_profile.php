<?php
 
	// Importing DBConfig.php file.
	include 'DBConfig.php';
	 
	// Creating connection.
	$conn = new mysqli($HostName,$HostUser,$HostPass,$DatabaseName);
	 
	// Getting the received JSON into $json variable.
	$json = file_get_contents('php://input');
	 
	// decoding the received JSON and store into $obj variable.
	$obj = json_decode($json,true);
	
	$username = $obj['username'];

	//$sql = "SELECT * FROM profile where username='zhiying'";
	$sql = "SELECT * FROM profile where username='$username'";
	$result = $conn->query($sql);

	if ($result->num_rows == 1) 
	{
		// output data of each row
		while($row = $result->fetch_assoc()) {
			//$user_profile = "username: " . $row["username"]. ", nric: " . $row["nric"]. ", mobile number: " . $row["mobile_number"].", email: " . $row["email"].", date of birth: " . $row["dob"]. ", gender: " . $row["gender"]. ", physical status: " . $row["physical_status"];
			$user_profile = $row["username"]. "," . $row["nric"]. "," . $row["mobile_number"]. "," . $row["email"]. "," . $row["dob"] . "," . $row["gender"]. "," . $row["physical_status"];
		}
		// Converting the message into JSON format.
		$json = json_encode($user_profile);
		// Echo the message on screen.
		// We would also show this message on our app.
		echo $json ;
	}
	else {
		echo "User profile not found!";
	}
	$conn->close();

?>