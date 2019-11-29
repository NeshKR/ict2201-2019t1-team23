<?php
 
	// Importing DBConfig.php file.
	include 'DBConfig.php';
	 
	// Creating connection.
	$con = mysqli_connect($HostName,$HostUser,$HostPass,$DatabaseName);
	 
	// Getting the received JSON into $json variable.
	$json = file_get_contents('php://input');
	 
	// decoding the received JSON and store into $obj variable.
	$obj = json_decode($json,true);
	
	$username = $obj['username'];
	$nric = $obj['nric'];
	$mobile_number = $obj['mobile_number'];
	$email = $obj['email'];
	$dob = $obj['dob'];
	$gender = $obj['gender'];
	$physical_status = $obj['physical_status'];
	$usable_points = $obj['usable_points'];
	$total_points = $obj['total_points'];
	$challenge = $obj['challenge'];
	$avatar = $obj['avatar'];
	$orginal_username = $obj['orginal_username'];
	//$username = 'zhiying';
	//$nric = 's9812345A';
	//$mobile_number = '99998888';
	//$email = 'zhiying@gmail.com';
	//$dob = '1998-07-11';
	//$gender = 'female';
	//$physical_status = 'healthy';
	//$usable_points = 2100;
	//$total_points = 2500;
	//$challenge = '';
	//$avatar = 'https://landofblogging.files.wordpress.com/2014/01/bitstripavatarprofilepic.jpeg?w=300&h=300';
	//$orginal_username = 'zhiying';
	
	$Sql_Query = "UPDATE profile SET username = '$username', nric = '$nric', mobile_number = '$mobile_number', email = '$email', dob = '$dob', gender = '$gender', physical_status = '$physical_status', usable_points = '$usable_points', total_points = '$total_points', challenge = '$challenge', avatar = '$avatar' WHERE username = '$orginal_username'";
	$Sql_Query2 = "UPDATE user SET username = '$username', email = '$email' WHERE username = '$orginal_username'";
	$Sql_Query3 = "UPDATE login_account SET username = '$username' WHERE username = '$orginal_username'";
	$Sql_Query4 = "UPDATE profile SET username = '$username' WHERE username = '$orginal_username'";
 
	if(mysqli_query($con,$Sql_Query)){
		if(mysqli_query($con,$Sql_Query2)){
			if(mysqli_query($con,$Sql_Query3)){
				if(mysqli_query($con,$Sql_Query4)){
					// If the record inserted successfully then show the message as response. 
					$MSG = 'Your profile have been updated.' ;

					// Converting the message into JSON format.
					$json = json_encode($MSG);

					// Echo the message on screen.
					// We would also show this message on our app.
					echo $json ;
				}
				else{
					echo 'Something Went Wrong1';
				}
			}
			else{
				echo 'Something Went Wrong2';
			}
		} 
		else{
			echo 'Something Went Wrong3';
		}
	}
	else{
		echo 'Something Went Wrong4';
	}
	mysqli_close($con);
?>