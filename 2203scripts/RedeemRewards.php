<?php
	include 'DBConfig.php';
	$conn = new mysqli($HostName, $HostUser, $HostPass, $DatabaseName);
	if ($conn->connect_error) {
		die("Connection failed: " . $conn->connect_error);
	}

	$json = file_get_contents('php://input');
	$obj = json_decode($json,true);
	
	$username = $obj['username'];
	$userPoints = $obj['userPoints'];
	$rewardPoints = $obj['rewardPoints'];
	$newUserPoints = $userPoints - $rewardPoints;

	$sql = "UPDATE profile SET usable_points='$newUserPoints' WHERE username='$username'";
	$result = $conn->query($sql);

	if ($result === TRUE){
		$output = json_encode($newUserPoints);
		echo $output;
	}

	$conn->close();
?>