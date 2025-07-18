<?php
date_default_timezone_set('Asia/Tehran');

$user = trim($_POST['user']);
$message = trim($_POST['message']);
$time = date("Y-m-d H:i");

if ($user !== "" && $message !== "") {
    $line = "[{$time}] ID: {$user} | Message: {$message}\n";
    file_put_contents("messages.txt", $line, FILE_APPEND | LOCK_EX);
    echo "<p style='color:lime;font-family:Tahoma;'>✅ Your message was securely stored.</p>";
} else {
    echo "<p style='color:red;font-family:Tahoma;'>❌ Both fields are required.</p>";
}
?>
