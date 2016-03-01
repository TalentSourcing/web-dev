<?php
/**
 * Created by PhpStorm.
 * User: mishayalavarthy
 * Date: 3/1/16
 * Time: 10:00 AM
 */


require 'init_database.php';

class Chat {
    private $conn = null;

    public function Chat () {
        $this->conn = TalentMeDB::getConnection();
    }

    //the database connection is working, but insert is NOT
    function createGroupChat ($creator_user_email, $group_id) {
        $sql = "INSERT INTO ChatLineTable ".
            "(id, chat_id, user_email, text_line, time_stamp, group_id) ".
            "VALUES ('', '', '$creator_user_email','','', '')";

        if ($this->conn->query($sql)) {
            echo "Insert success!<br>";
        }
        else {
            echo "Error Message: $this->conn->error <br>";
        }
    }
}

$dbi = new Chat();
$dbi->createGroupChat("", "", "misha.yalavarthy@gmail.com", "", "", "");


/*

    //naina - please help on completing this function
    function createIndividualChat ($creator_user_email, $recipient_user_email, $chat_id){


        //do we need to pass in a null value for ID, since it is integer autoincremented.
        try{

            $sql = "INSERT INTO ChatLineTable ".
            "(id, chat_id, user_email, text_line, time_stamp, group_id)" .
            "VALUES ('', $chat_id, $creator_user_email','','','')";

            $sql = "INSERT INTO ChatLineTable ".
            "(id, chat_id, user_email, text_line, time_stamp, group_id)" .
            "VALUES ('', $chat_id, $recipient_user_email','','','')";

            echo "Success.";
        }

        catch(Exception $e){
            echo "Error Message" $e->getMessage();
        }
    }


    function send ($chat_id, $user_email, $text_line){

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
}

$dbi = new Chat();
$dbi->createGroupChat("", "", "misha.yalavarthy@gmail.com", "", "", "2");
//$dbi->createIndividualChat("","1","misha.yalavarthy@gmail.com","", "", "");
//$dbi->createIndividualChat("","1","recipient.email@gmail.com","", "", "");
//$dbi->send("","2","misha.yalavarthy@gmail.com", "Hello, do you want to work today?","6.30.55pm.3.1.2016,"");
//$dbi->getChatList("", "", "misha.yalavarthy@gmail.com,"","","");
//$dbi->getChat("", "3", "", "", "", "");


?>
