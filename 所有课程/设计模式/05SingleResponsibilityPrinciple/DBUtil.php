<?php

class DBUtil
{
    public function getConnection(): static
    {
        /*connect to the database ...*/
        return $this;
    }

    public function selectUsers(): array
    {
        return array(
            array("username" => "admin", "password" => "123456"),
            array("username" => "1234", "password" => "1234"),
        );
    }
}
