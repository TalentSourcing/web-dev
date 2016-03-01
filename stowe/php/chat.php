<?php

require 'init_database.php';

class DatabaseInterface {
    private $conn = null;

public function DatabaseInterface () {
        $this->conn = TalentMeDB::getConnection();
    }

function createGroupChat ($creator_user_email, $group_id){

    $sql = "INSERT INTO ChatLineTable ".
        "(id, chat_id, user_email, text_line, time_stamp, group_id) ".
        "VALUES ('', '', $creator_user_email','','',  '$group_id')";

    if ($this->conn->query($sql)){
        echo "Insert success!";
    }
    else{
        echo "Insert Failure: " . $this->conn->error . "<br>";
    }
}

//naina - please help on completing this function
function createIndividualChat ($creator_user_email, $recipient_user_email){

$sql = "SELECT user_email " .
    "FROM UserTable " .
    "WHERE user_name " .
    "LIKE '$recipient_user_email'";



    try{

        $sql = "INSERT INTO ChatLineTable ".
        "(id, chat_id, user_email, text_line, time_stamp, group_id)" .
        "VALUES ('$creator_user_email', )";

        echo "Success.";
    }

    catch(Exception $e){
        echo "Error Message" $e->getMessage();
    }

}


function send ($user_email, $chat_id, $text_line){

$time_stamp = date(h.i.sa.d.m.y);

    try{

        $sql = "INSERT INTO ChatLineTable ".
        "(id, chat_id, user_email, text_line, time_stamp, group_id) " .
        "VALUES ('','$chat_id', '$user_email, '$text_line','$time_stamp','')";

        echo "Success.";
    }

    catch(Exception $e){
        echo "Error Message" $e->getMessage();
    }

}


//returns list of chatId’s affiliated with user
function getChatList ($user_email){

    try{
        $sql = "SELECT user_name, chat_id" .
            "FROM ChatLineTable";

        echo "Success.";

    }
    catch(Exception $e){
        echo "Error Message" $e->getMessage();
    }
}


//query for chatId, return list of chat lines
function getChat ($chat_id){

    try{
        $sql = "SELECT chat_id, text_line" .
            "FROM ChatLineTable";

        echo "Success.";
    }

    catch(Exception $e){
        echo "Error Message" $e->getMessage();
    }
}
