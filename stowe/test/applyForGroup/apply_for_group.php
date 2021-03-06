<?php

require '../../php/init_database.php';

const APPLY_FOR_GROUP = "apply_for_group";

class Backend {
    private $conn = null;
    private $APPLIED = "applied";

    public function Backend () {
        $this->conn = TalentMeDB::getConnection();
    }

    public function applyForGroup($user_email, $group_id) {
        // check for existence of user
        $result = $this->conn->query("SELECT * FROM UserTable WHERE user_email='$user_email'");
        if ($result->num_rows < 1) {
            echo '{"error" : "UserGroupTable insert failure: user with email '. $user_email .' does not exist in UserTable"}';
            return null;
        }

        // check for existence of group
        $result = $this->conn->query("SELECT * FROM GroupTable WHERE group_id='$group_id'");
        if ($result->num_rows < 1) {
            echo '{"error" : "UserGroupTable insert failure: Group with id '. $group_id .' does not exist in GroupTable"}';
            return null;
        }

        // check for existence of UserGroupTable row already
        $result = $this->conn->query("SELECT * FROM UserGroupTable WHERE user_email='$user_email' AND group_id=$group_id");
        if ($result->num_rows != 0) {
            echo '{"error" : "UserGroupTable insert failure: user_email/group_id row already exists in table"}';
            return null;
        }

        $sql = "INSERT INTO UserGroupTable (user_email, group_id, user_role) ".
            "VALUES ('$user_email', $group_id, '$this->APPLIED')";
        if ($this->conn->query($sql)) {
            echo '{"success" : "UserGroupTable insert success!"}';
        }
        else {
            echo '{"error" : "UserGroupTable insert Failure"}';
        }
    }
}

$backend = new Backend();

// handle request type
if (array_key_exists(APPLY_FOR_GROUP, $_GET)) {
    $request = json_decode($_GET[APPLY_FOR_GROUP]);
    $backend->applyForGroup($request->user_email, $request->group_id);
}