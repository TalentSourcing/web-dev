<?php

require 'init_database.php';

class DatabaseInterface {
    private $conn = null;

public function DatabaseInterface () {
        $this->conn = TalentMeDB::getConnection();
    }

function createGroupChat ($creator_user_email, $group_id){

    $sql = "INSERT INTO ChatLineTable ". "(creator_user_email, group_id) ". "VALUES        ('$creator_user_email', '$group_id')";

    if ($this->conn->query($sql)){
        echo "Insert success!";
    }
    else{
        echo "Insert Failure: " . $this->conn->error . "<br>";
    }
}


function createIndividualChat ($creator_user_email, $recipient_user_email){


    $sql = "INSERT INTO ChatLineTable ". "(user_email, user)"
}


function send ($user_email, $chat_id, $text_line){


}


//returns list of chatId’s affiliated with user
function getChatList ($user_email){

    $sql = "SELECT user_name, chat_id" .
        "FROM ChatLineTable";
}


//query for chatId, return list of chat lines
function getChat ($chat_id){

    $sql = "SELECT chat_id, text_line" .
        "FROM ChatLineTable";
}
