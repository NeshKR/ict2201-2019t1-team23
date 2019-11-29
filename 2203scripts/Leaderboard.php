<?php
include 'DBConfig.php';
$conn = new mysqli($HostName, $HostUser, $HostPass, $DatabaseName);   // creating DB connection
if ($conn->connect_error) {
	die("Connection failed: " . $conn->connect_error);   // displays error message when connection is failed 
} 
$sql = "SELECT * FROM user ORDER BY total_trim_point DESC";   // select total trim points to be displayed in leaderboard ranking
$result = $conn->query($sql);
if ($result->num_rows >0) {
	while($row[] = $result->fetch_assoc()) {    
		$tem = $row;
		$json = json_encode($tem);
	}
}
echo $json;
$conn->close();
?>