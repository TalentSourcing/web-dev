<?php

require 'init_database.php';

header('content-type: application/json; charset=utf-8');
header("access-control-allow-origin: *");

define("INIT_CHAT", "init_chat");

$conn = TalentMeDB::getConnection();

if (array_key_exists(INIT_CHAT, $_GET)) {
    $request = json_decode(str_rot13($_GET[INIT_CHAT]));
    initChat($request->host_email, $request->user_email);
}

TalentMeDB::close();


function initChat($host_email, $user_email) {
	global $conn;

	// check for existence of host
        $result = $conn->query("SELECT * FROM UserTable WHERE user_email='$host_email'");
        if ($result->num_rows < 1) {
            echo '{"error" : "$host_email does not exist in UserTable"}';
            return null;
        }

        // check for existence of user
        $result = $conn->query("SELECT * FROM UserTable WHERE user_email='$user_email'");
        if ($result->num_rows < 1) {
            echo '{"error" : "$user_email does not exist in UserTable"}';
            return null;
        }

        // create chat session with checking existence of chat session mechanism
/*
	// Way 1
	$sql = "SELECT * FROM ChatLineTable as t1 WHERE user_email = $host_email AND group_id IS NULL AND ".
		"SELECT * FROM ChatLineTable as t2 WHERE user_email = $user_email AND group_id IS NULL AND ".
		"(SELECT COUNT(*) FROM ChatLineTable as t2 where t1.chat_id = t2.chat_id) > 0";
	$result = $conn->query($sql);
	if (result->num_rows == 0) {
		insertChatRow($host_email, $user_email);
	}
*/
	// Way 2
	$sql_host = "SELECT * FROM ChatLineTable WHERE user_email='$host_email' AND group_id IS NULL";
	$sql_user = "SELECT * FROM ChatLineTable WHERE user_email='$user_email' AND group_id IS NULL";
        $result_host = $conn->query($sql_host);
	$result_user = $conn->query($sql_user);
        if ($result_host->num_rows == 0 || $result_user->num_rows == 0) {
		insertChatRow($host_email, $user_email);
        } else {
		if (!isChatSessionExist($result_host, $result_user)) {
			insertChatRow($host_email, $user_email);
		} else {
			echo '{"notice" : "Chat session exists!"}';
		}
	}
}

function isChatSessionExist($result_host, $result_user) {
	while ($row_host = $result_host->fetch_assoc()) {
		while ($row_user = $result_user->fetch_assoc()) {
			if ($row_host["chat_id"] == $row_user["chat_id"]) {
				return true;
			}
		}
	}
	return false;
}

function insertChatRow($host_email, $user_email) {
	global $conn;
	$chat_id = getAvailableChatId();

	$sql_host = "INSERT INTO ChatLineTable (user_email, chat_id) ".
			"VALUES ('$host_email', '$chat_id')";
	$sql_user = "INSERT INTO ChatLineTable (user_email, chat_id) ".
			"VALUES ('$user_email', '$chat_id')";

        if ($conn->query($sql_host) && $conn->query($sql_user)) {
            echo '{"success" : "ChatLineTable insert success!"}';
        } else {
            echo '{"error" : "ChatLineTable insert Failure"}';
        }
}

function getAvailableChatId() {
	global $conn;
	$id;
	
	$sql = "SELECT * FROM ChatLineTable ORDER BY chat_id DESC";
	$result = $conn->query($sql);
	if ($result->num_rows == 0) {
		$id = 1;
	} else {
		$topRow = $result->fetch_assoc();
		$id = $topRow["chat_id"] + 1;
	}

	return $id;
}

?>
