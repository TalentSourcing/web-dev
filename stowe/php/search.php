<?php

require 'init_database.php';

header('content-type: application/json; charset=utf-8');
header("access-control-allow-origin: *");

$conn = TalentMeDB::getConnection();

// get the q parameter from URL
$q = $_REQUEST["q"];
$parserTokens = preg_split("/[\ \n\,]+/", $q);

if (strlen($q) < 1) {
	echo "Search term too short";
} else {
       	$json_objs_users = searchForUsers($parserTokens);
	$json_objs_groups = searchForGroups($parserTokens);

	$searchResult = array('user' => $json_objs_users, 'group' => $json_objs_groups);
	echo json_encode($searchResult);
}

TalentMeDB::close();


function searchForUsers($parserTokens) {
	global $conn;

	$sql = "SELECT user_email, first_name, last_name, skills, profile_img, objective FROM UserTable";
	$result = $conn->query($sql);

	if ($result->num_rows != 0) {
		//echo "Found $result->num_rows users!<br>";
		$json_objs_userlist = array();
		$data = array();

		while ($row = $result->fetch_assoc()) {
			$searchString = $row["first_name"]." ".$row["last_name"]." ".$row["skills"];
			$searchTokens = preg_split("/[\ \n\,\:]+/", $searchString);

			foreach ($parserTokens as $token) {
				foreach ($searchTokens as $searchToken) {
					if (in_array($row, $json_objs_userlist)) {
						continue;
					}

					if (strcasecmp($searchToken, $token) == 0) {
						$json_objs_userlist[] = $row;
					}
				}
			}
		}

		foreach ($json_objs_userlist as $key => $value) {
			//echo "Key: ".$key."<br>Value: ".$value."<br>";
		}
		//echo json_encode($data);	// for separated return
		return $json_objs_userlist;
	}
}

function searchForGroups($parserTokens) {
	global $conn;

	$sql = "SELECT * FROM GroupTable"; 
	$result = $conn->query($sql);

	if ($result->num_rows != 0) {
		//echo "Found $result->num_rows groups!<br>";
		$json_objs_grouplist = array();
		$data = array();

		while ($row = $result->fetch_assoc()) {
			$searchString = $row["group_name"]." ".$row["founder_name"]." ".$row["desired_skills"];
			$searchTokens = preg_split("/[\ \n\,\:]+/", $searchString);

			foreach ($parserTokens as $token) {
				foreach ($searchTokens as $searchToken) {
					if (in_array($row, $json_objs_grouplist)) {
						continue;
					}

					if (strcasecmp($searchToken, $token) == 0) {
						$json_objs_grouplist[] = $row;
					}
				}
			}
		}

		foreach ($json_objs_grouplist as $key => $value) {
			//echo "Key: ".$key."<br>Value: ".$value."<br>";
		}
		//echo json_encode($data);	// for separated return
		return $json_objs_grouplist;
	}
	return null;
}

?>
