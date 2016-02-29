<?php

require 'init_database.php';

class DatabaseInterface {
    private $conn = null;

public function DatabaseInterface () {
        $this->conn = TalentMeDB::getConnection();
    }

function createGroupChat ($creator_user_email, $group_id){

    $sql = "INSERT INTO ChatLineTable ". "(creator_user_email, group_id)". "VALUES        ('$creator_user_email', '$group_id')";

    if ($this->conn->query($sql)){
        echo "Insert success!";
    }
    else{
        echo "Insert Failure: " . $this->conn->error . "<br>";
    }
}
