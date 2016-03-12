<?php

require 'init_database.php';                  //the data connection file
const IND_CHAT_LIST = 'ind_chat_list';
const GROUP_CHAT_LIST ='group_chat_list';
const GET_INDV_MSG = 'get_indv_msg';
const GET_GROUP_MSG = 'get_group_msg';
const SEND_INDV_MSG = 'send_indv_msg';
const SEND_GROUP_MSG = 'send_group_msg';
const GET_CHAT_ID = 'get_chat_id';
   
class Chat
{  
	public function Chat()
    {
        $this->conn = TalentMeDB::getConnection();
    }
	
	public function getIndList($user_email){
		
		$sql = "SELECT * FROM USERTABLE WHERE user_email <> '$user_email'";
		
		if ($result = $this->conn->query($sql)) {
			
			if ($result->num_rows > 0) {
                $json_objs = array();
                for ($i = 0; $row = $result->fetch_assoc(); $i++) {
                    $json_objs[$i] = $row;
                }
                return json_encode($json_objs);
            }
            else {
                echo '{"error" : "No individual for chat for email id: '.$user_email.'"}';
                return null;
            }
        }
        else {
            echo json_encode("{'error' : 'getIndList Failure'}");
        }
	}
	
	public function getGroupList($user_email){
		
		$sql = "SELECT  DISTINCT t1.group_name, t1.group_id, t1.group_img".
			   " FROM GROUPTABLE as t1 inner join USERGROUPTABLE as t2 ".
			   " ON t1.group_id = t2.group_id".
			   " WHERE user_email = '$user_email'";
		
		if ($result = $this->conn->query($sql)) {
			
			if ($result->num_rows > 0) {
                $json_objs = array();
                for ($i = 0; $row = $result->fetch_assoc(); $i++) {
                    $json_objs[$i] = $row;
                }
                return json_encode($json_objs);
            }
            else {
                echo '{"error" : "No Groups for chat for email id: '.$user_email.'"}';
                return null;
            }
        }
        else {
            echo json_encode("{'error' : 'getGroupList Failure'}");
        }
	}
	
	public function getIndvMsg($sender_email, $receiver_email){
		$sql = "SELECT * FROM CHATLINETABLE as t1 where ( user_email='$sender_email' OR user_email='$receiver_email' )".
					" AND group_id IS NULL".    
					" AND (SELECT COUNT(*) FROM CHATLINETABLE as t2".
					" where t1.chat_id = t2.chat_id) > 1";
		
		if ($result = $this->conn->query($sql)) {
			
			if ($result->num_rows > 0) {
                $json_objs = array();
                for ($i = 0; $row = $result->fetch_assoc(); $i++) {
                    $json_objs[$i] = $row;
                }
                return json_encode($json_objs);
            }
            else {
                echo '{"error" : "No chat msgs for email id: '.$receiver_email.'"}';
                return null;
            }
        }
        else {
            echo json_encode("{'error' : 'getIndvMsg Failure'}");
        }
	}
	
	public function getGroupMsg($sender_email, $group_id){
		//get all the group chats specific to group id
		  $sql = "SELECT t1.*, t2.first_name, t2.last_name".
						  " FROM CHATLINETABLE as t1 inner join USERTABLE as t2".
						  " on t1.user_email = t2.user_email".
						  " WHERE group_id = $group_id";
		
		if ($result = $this->conn->query($sql)) {
			if ($result->num_rows > 0) {
                $json_objs = array();
                for ($i = 0; $row = $result->fetch_assoc(); $i++) {
                    $json_objs[$i] = $row;
                }
                return json_encode($json_objs);
            }
            else {
                echo '{"error" : "No chat msgs for group id: '.$group_id.'"}';
                return null;
            }
        }
        else {
            echo json_encode("{'error' : 'getGroupMsg Failure'}");
        }
	}
	
	public function getChatId(){
		$sql = "SELECT * FROM CHATLINETABLE ORDER BY CHAT_ID DESC LIMIT 1";
		
		if ($result = $this->conn->query($sql)) {
			
			if ($result->num_rows > 0) {
                return json_encode($result->fetch_assoc());
            }
            else {
                echo '{"error" : "No data in chat table"}';
                return null;
            }
        }
        else {
            echo json_encode("{'error' : 'getChatId'}");
        }
	}
	
	public function sendIndvMsg($senderEmail,$receiverEmail,$chat_id,$sentMsg)
	{
		//get the current timestamp
		$timeStamp = date("Y-m-d H:i:s");
		
		//insert the sent msg to DB
		$sql = "INSERT INTO CHATLINETABLE".
			   "(id, chat_id, user_email, text_line, time_stamp, group_id)".
			   "VALUES (NULL, $chat_id, '$senderEmail', '$sentMsg', '$timeStamp',NULL)";
		if ($this->conn->query($sql)) {
            echo "UserGroupTable insert success!<br>";
        } else {
            echo "UserGroupTable insert Failure:";
        }
	}
	
	public function sendGroupMsg($senderEmail,$group_id,$chat_id,$sentMsg)
	{
		//get the current timestamp
		$timeStamp = date("Y-m-d H:i:s");
		
		//insert the sent msg to DB
		$sql = "INSERT INTO CHATLINETABLE".
				"(id, chat_id, user_email, text_line, time_stamp, group_id)".
				"VALUES (NULL, $chat_id, '$senderEmail', '$sentMsg', '$timeStamp', $group_id)";
		if ($this->conn->query($sql)) {
            echo "UserGroupTable insert success!<br>";
        } else {
            echo "UserGroupTable insert Failure:";
        }
	}
}

$html_data = null;

if (array_key_exists(IND_CHAT_LIST, $_GET)) 
{
    $html_data = json_decode($_GET[IND_CHAT_LIST]);
    if ($html_data != null) {
        $indv_profile = new Chat();
        $indv_profile->getIndList($html_data->user_email);
	}
}

else if(array_key_exists(GROUP_CHAT_LIST, $_GET))
{
    $html_data = json_decode($_GET[GROUP_CHAT_LIST]);
    if ($html_data != null) {
        $group_profile = new Chat();
        $group_profile->getGroupList($html_data->user_email);
	}
}

else if(array_key_exists(GET_INDV_MSG, $_GET))
{
    $html_data = json_decode($_GET[GET_INDV_MSG]);
    if ($html_data != null) {
        $group_profile = new Chat();
        $group_profile->getIndvMsg($html_data->sender_email, 
									 $html_data->receiver_email);
	}
}

else if(array_key_exists(GET_GROUP_MSG, $_GET))
{
    $html_data = json_decode($_GET[GET_GROUP_MSG]);
    if ($html_data != null) {
        $group_profile = new Chat();
        $group_profile->getGroupMsg($html_data->sender_email, 
									 $html_data->group_id);
	}
}

else if(array_key_exists(SEND_INDV_MSG, $_GET))
{
    $html_data = json_decode($_GET[SEND_INDV_MSG]);
    if ($html_data != null) {
        $group_profile = new Chat();
        $group_profile->sendIndvMsg($html_data->senderEmail, 
									$html_data->receiverEmail,
								    $html_data->chat_id,
								    $html_data->sentMsg);
	}
}

else if(array_key_exists(SEND_GROUP_MSG, $_GET))
{
    $html_data = json_decode($_GET[SEND_GROUP_MSG]);
    if ($html_data != null) {
        $group_profile = new Chat();
        $group_profile->sendGroupMsg($html_data->senderEmail, 
									$html_data->group_id,
								    $html_data->chat_id,
								    $html_data->sentMsg);
	}
}

else if(array_key_exists(GET_CHAT_ID, $_GET))
{
    $html_data = json_decode($_GET[GET_CHAT_ID]);
    if ($html_data != null) {
        $group_profile = new Chat();
        $group_profile->getChatId();
	}
}

	
?>