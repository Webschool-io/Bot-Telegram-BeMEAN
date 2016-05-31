<?php
ini_set('display_errors', 'On');
error_reporting(E_ALL);

$result = shell_exec("/usr/bin/git pull 2>&1");
echo $result;

?>