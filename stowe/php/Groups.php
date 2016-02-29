<?php
/**

 */

require 'init_database.php';

class DatabaseInterface {
    private $conn = null;

    public function DatabaseInterface () {
        $this->conn = TalentMeDB::getConnection();
    }

    function createGroupTable ($founderuser_email, $group_name, $about, $desiredSkills, $groupImg)
    {
        $sql = "INSERT INTO GroupTable ".
            " (founderuser_email, group_name, about, desiredSkills, groupimg) ".
            "VALUES ('$founderuser_email', '$group_name', '$about', '$desiredSkills', '$groupImg') ";

        try {
            if ($this->conn->query($sql)) {
                echo "Success!";
            }
        } catch (Exception $e) {
            echo $e . "<br>";
        }
        echo "after if/else";
    }

}

$dbi = new DatabaseInterface();
$dbi->createGroupTable("bk@gmail.com", "Group1", "Computer","Java", "img.jpg");
