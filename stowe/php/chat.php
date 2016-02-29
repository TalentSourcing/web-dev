<?php

require 'init_database.php';

class DatabaseInterface {
    private $conn = null;

public function DatabaseInterface () {
        $this->conn = TalentMeDB::getConnection();
    }

function createGroupChat ($creator_user_email, $group_id){

    $sql = "INSERT INTO ChatLineTable"

}
